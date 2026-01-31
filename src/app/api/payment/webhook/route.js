import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/libs/prisma";

export async function POST(req) {
    const body = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    const hash = crypto
        .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
        .update(body)
        .digest("hex");

    if (hash !== signature) {
        return NextResponse.json(
            { message: "Invalid signature" },
            { status: 401 }
        );
    }

    const event = JSON.parse(body);

    if (event.event === "charge.success") {
        const reference = event.data.reference;

        // Update order
        const order = await prisma.order.updateMany({
            where: { reference },
            data: { status: "PAID" },
        });

        // Clear user cart (if logged in)
        if (event.data.metadata?.userId) {
            await prisma.cartItem.deleteMany({
                where: { cart: { userId: event.data.metadata.userId } },
            });
        }
    }

    return NextResponse.json({ received: true });
}
