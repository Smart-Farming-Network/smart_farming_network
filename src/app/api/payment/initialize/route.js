import { NextResponse } from "next/server";
import { getCart } from "@/app/api/cart/service";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
    const session = await getServerSession(authOptions);
    const body = await req.json().catch(() => ({}));

    // 1️⃣ Resolve email (session first, fallback to request)
    const email = session?.user?.email || body.email;

    if (!email) {
        return NextResponse.json(
            { success: false, message: "Email is required" },
            { status: 400 }
        );
    }

    // 2️⃣ Get cart
    const cart = await getCart(session);

    if (!cart.items || cart.items.length === 0) {
        return NextResponse.json(
            { success: false, message: "Cart is empty" },
            { status: 400 }
        );
    }

    // 3️⃣ Calculate total
    const totalAmount = cart.items.reduce(
        (sum, item) =>
            sum + (item.product?.price || 0) * item.quantity,
        0
    );

    const reference = uuidv4();

    // 4️⃣ Create PENDING order
    await prisma.order.create({
        data: {
            userId: session?.user?.id ?? null,
            email,
            reference,
            totalAmount,
            status: "PENDING",
            items: {
                create: cart.items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: item.product?.price || 0,
                })),
            },
        },
    });

    // 5️⃣ Initialize Paystack
    const paystackRes = await fetch(
        "https://api.paystack.co/transaction/initialize",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                amount: totalAmount * 100,
                reference,
                callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/verify?reference=${reference}`,
            }),
        }
    );

    const data = await paystackRes.json();

    if (!data.status) {
        return NextResponse.json(
            {
                success: false,
                message: data.message || "Paystack initialization failed",
            },
            { status: 500 }
        );
    }

    return NextResponse.json({
        success: true,
        message: "Payment initialized",
        data: data.data, // authorization_url
    });
}
