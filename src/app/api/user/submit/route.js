import { prisma } from '@/libs/prisma';
import { getSession } from "next-auth/react";

export async function POST(req) {
    const session = await getSession(req);
    if (!session) return new Response("Unauthorized", { status: 401 });

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) return new Response("User not found", { status: 404 });

    if (!user.profile || user.profileCompletionPct < 100) {
        return new Response("Profile incomplete", { status: 400 });
    }

    await prisma.user.update({
        where: { id: session.user.id },
        data: { verificationStatus: 'PENDING', updatedAt: new Date() },
    });

    return new Response(JSON.stringify({ message: 'Profile submitted for verification' }), { status: 200 });
}
