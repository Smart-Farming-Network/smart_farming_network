import { NextResponse } from "next/server";
import { getCart, addToCart } from "./service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { cookies } from "next/headers";

/**
 * GET: fetch cart
 */
export async function GET(req) {
    const session = await getServerSession(authOptions);
    const cart = await getCart(session);

    return NextResponse.json({
        success: true,
        message: "Cart fetched successfully",
        data: cart,
    });
}

/**
 * POST: add product to cart
 */
export async function POST(req) {
    const session = await getServerSession(authOptions);
    const { productId } = await req.json();

    if (!productId) {
        return NextResponse.json(
            { success: false, message: "Missing productId" },
            { status: 400 }
        );
    }

    const cart = await addToCart(session, productId);

    return NextResponse.json({
        success: true,
        message: "Product added to cart",
        data: cart,
    });
}

/**
 * PATCH: update quantity
 */
export async function PATCH(req) {
    const session = await getServerSession(authOptions);
    const { productId, delta } = await req.json();
    const cart = await getCart(session);

    if (!productId || !delta) {
        return NextResponse.json(
            { success: false, message: "Missing productId or delta" },
            { status: 400 }
        );
    }

    if (session?.user?.id) {
        const item = cart.items.find(i => i.productId === productId);
        if (!item) return NextResponse.json({ success: false, message: "Item not found" }, { status: 404 });

        const updatedQuantity = item.quantity + delta;
        if (updatedQuantity <= 0) {
            await prisma.cartItem.delete({ where: { id: item.id } });
        } else {
            await prisma.cartItem.update({ where: { id: item.id }, data: { quantity: updatedQuantity } });
        }
    } else {
        const cookieStore = await cookies();
        let items = cart.items;
        const index = items.findIndex(i => i.productId === productId);

        if (index === -1) return NextResponse.json({ success: false, message: "Item not found" }, { status: 404 });

        const updatedQuantity = items[index].quantity + delta;
        if (updatedQuantity <= 0) {
            items.splice(index, 1);
        } else {
            items[index].quantity = updatedQuantity;
        }

        cookieStore.set("guest_cart", JSON.stringify(items), {
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });
    }

    const updatedCart = await getCart(session);
    return NextResponse.json({
        success: true,
        message: "Quantity updated",
        data: updatedCart,
    });
}

/**
 * DELETE: remove item
 */
export async function DELETE(req) {
    const session = await getServerSession(authOptions);
    const { productId } = await req.json();
    const cart = await getCart(session);

    if (!productId) return NextResponse.json({ success: false, message: "Missing productId" }, { status: 400 });

    if (session?.user?.id) {
        const item = cart.items.find(i => i.productId === productId);
        if (item) await prisma.cartItem.delete({ where: { id: item.id } });
    } else {
        const cookieStore = await cookies();
        let items = cart.items.filter(i => i.productId !== productId);
        cookieStore.set("guest_cart", JSON.stringify(items), {
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });
    }

    const updatedCart = await getCart(session);
    return NextResponse.json({
        success: true,
        message: "Item removed",
        data: updatedCart,
    });
}
