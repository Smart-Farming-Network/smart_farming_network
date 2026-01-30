import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { getCart } from "../cart/service";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    // Fetch current cart
    const cart = await getCart(session);

    if (!cart.items || cart.items.length === 0) {
        return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Calculate total & snapshot prices
    const orderItems = cart.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.product.price
    }));

    const totalAmount = orderItems.reduce(
        (sum, i) => sum + i.quantity * i.unitPrice,
        0
    );

    // Generate unique reference
    const reference = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create order + items
    const order = await prisma.order.create({
        data: {
            userId: session?.user?.id ?? null,
            reference,
            totalAmount,
            items: {
                create: orderItems
            }
        }
    });

    // Clear cart
    if (session?.user?.id) {
        await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    } else {
        // Guest: clear cookie
        return NextResponse.json(
            { order },
            {
                status: 201,
                headers: { "Set-Cookie": "guest_cart=; Path=/; Max-Age=0" }
            }
        );
    }

    return NextResponse.json({ order }, { status: 201 });
}
