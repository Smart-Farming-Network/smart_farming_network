import { cookies } from 'next/headers';
import { prisma } from '@/libs/prisma';

const CART_COOKIE = 'guest_cart';
const COOKIE_TTL_DAYS = 7;

export async function getCart(session) {
    if (session?.user?.id) {
        // Logged-in: fetch from DB
        let cart = await prisma.cart.findUnique({
            where: { userId: session.user.id },
            include: { items: { include: { product: true } } }
        });
        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId: session.user.id }
            });
        }
        return cart;
    } else {
        // Guest: fetch from cookie
        const cookieStore = cookies();
        const cookie = cookieStore.get(CART_COOKIE);
        let items = [];
        if (cookie?.value) {
            try {
                items = JSON.parse(cookie.value);
            } catch (err) {
                items = [];
            }
        }
        return { items };
    }
}

export async function addToCart(session, productId) {
    if (session?.user?.id) {
        // Logged-in: DB cart
        let cart = await prisma.cart.findUnique({
            where: { userId: session.user.id },
            include: { items: true }
        });
        if (!cart) {
            cart = await prisma.cart.create({ data: { userId: session.user.id } });
        }
        const exists = cart.items.find(i => i.productId === productId);
        if (!exists) {
            return prisma.cartItem.create({
                data: { cartId: cart.id, productId, quantity: 1 }
            });
        }
        return exists;
    } else {
        // Guest: cookie cart
        const cookieStore = cookies();
        const cookie = cookieStore.get(CART_COOKIE);
        let items = [];
        if (cookie?.value) items = JSON.parse(cookie.value);

        const exists = items.find(i => i.productId === productId);
        if (!exists) {
            items.push({ productId, quantity: 1 });
            cookieStore.set(CART_COOKIE, JSON.stringify(items), {
                path: '/',
                maxAge: COOKIE_TTL_DAYS * 24 * 60 * 60
            });
        }
        return items;
    }
}
