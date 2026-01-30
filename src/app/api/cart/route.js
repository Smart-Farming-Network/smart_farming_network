import { addToCart } from './service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth';

export async function POST(req) {
    const session = await getServerSession(authOptions);
    const { productId } = await req.json();

    if (!productId) return new Response('Missing productId', { status: 400 });

    const cart = await addToCart(session, productId);

    return new Response(JSON.stringify(cart), { status: 200 });
}
