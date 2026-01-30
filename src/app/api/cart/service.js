import { cookies } from "next/headers";
import { prisma } from "@/libs/prisma";

const CART_COOKIE = "guest_cart";
const COOKIE_TTL_DAYS = 7;

/**
 * Normalize cart shape so UI doesn't care
 * whether cart is from DB or cookie
 */
function normalizeCartItems(items, products) {
    return items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        product: products.find(p => p.id === item.productId) || null
    }));
}

/**
 * GET CART
 */
export async function getCart(session) {
    // ===============================
    // LOGGED-IN USER → DB CART
    // ===============================
    if (session?.user?.id) {
        let cart = await prisma.cart.findUnique({
            where: { userId: session.user.id },
            include: {
                items: {
                    include: { product: true }
                }
            }
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId: session.user.id },
                include: {
                    items: { include: { product: true } }
                }
            });
        }

        return cart;
    }

    // ===============================
    // GUEST USER → COOKIE CART
    // ===============================
    const cookieStore = await cookies();
    const cookie = cookieStore.get(CART_COOKIE);

    let items = [];

    if (cookie?.value) {
        try {
            const parsed = JSON.parse(cookie.value);
            if (Array.isArray(parsed)) {
                items = parsed.filter(
                    i => i?.productId && Number.isInteger(i.quantity)
                );
            }
        } catch {
            items = [];
        }
    }

    if (items.length === 0) {
        return { items: [] };
    }

    const productIds = items.map(i => i.productId);

    const products = await prisma.product.findMany({
        where: { id: { in: productIds } }
    });

    return {
        items: normalizeCartItems(items, products)
    };
}

/**
 * ADD TO CART
 */
export async function addToCart(session, productId) {
    // ===============================
    // LOGGED-IN USER → DB CART
    // ===============================
    if (session?.user?.id) {
        let cart = await prisma.cart.findUnique({
            where: { userId: session.user.id },
            include: { items: true }
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId: session.user.id },
                include: { items: true }
            });
        }

        const existingItem = cart.items.find(
            item => item.productId === productId
        );

        if (existingItem) {
            return prisma.cartItem.update({
                where: { id: existingItem.id },
                data: {
                    quantity: { increment: 1 }
                }
            });
        }

        return prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                quantity: 1
            }
        });
    }

    // ===============================
    // GUEST USER → COOKIE CART
    // ===============================
    const cookieStore = await cookies();
    const cookie = cookieStore.get(CART_COOKIE);

    let items = [];

    if (cookie?.value) {
        try {
            const parsed = JSON.parse(cookie.value);
            if (Array.isArray(parsed)) items = parsed;
        } catch {
            items = [];
        }
    }

    const existingItem = items.find(i => i.productId === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        items.push({ productId, quantity: 1 });
    }

    cookieStore.set(CART_COOKIE, JSON.stringify(items), {
        path: "/",
        maxAge: COOKIE_TTL_DAYS * 24 * 60 * 60,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    });

    return items;
}
