import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { cookies } from "next/headers";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference");

    if (!reference) {
        return NextResponse.json({ success: false }, { status: 400 });
    }

    const res = await fetch(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            },
        }
    );

    const data = await res.json();

    if (!data.status || data.data.status !== "success") {
        await prisma.order.updateMany({
            where: { reference },
            data: { status: "FAILED" },
        });

        return NextResponse.json({ success: false });
    }

    const order = await prisma.order.findFirst({
        where: { reference },
    });

    await prisma.order.update({
        where: { id: order.id },
        data: { status: "PAID" },
    });

    // 🔥 CLEAR CART
    if (order.userId) {
        await prisma.cartItem.deleteMany({
            where: { cart: { userId: order.userId } },
        });
    } else {
        const cookieStore = cookies();
        cookieStore.delete("guest_cart");
    }

    return NextResponse.json({ success: true });
}
