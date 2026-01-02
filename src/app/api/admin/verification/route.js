import { prisma } from '@/libs/prisma';
import { getSession } from "next-auth/react";

// GET: List all pending verification requests
export async function GET(req) {
    const session = await getSession(req);
    if (!session || session.user.role !== 'ADMIN') return new Response("Forbidden", { status: 403 });

    const pendingUsers = await prisma.user.findMany({
        where: { verificationStatus: 'PENDING' },
        include: { profile: true },
    });

    return new Response(JSON.stringify(pendingUsers), { status: 200 });
}

// PATCH: Approve or Reject a user
export async function PATCH(req) {
    const session = await getSession(req);
    if (!session || session.user.role !== 'ADMIN') return new Response("Forbidden", { status: 403 });

    const { userId, action } = await req.json(); // action: 'APPROVE' | 'REJECT'
    if (!['APPROVE', 'REJECT'].includes(action)) return new Response("Invalid action", { status: 400 });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return new Response("User not found", { status: 404 });

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            verificationStatus: action === 'APPROVE' ? 'APPROVED' : 'REJECTED',
            role: action === 'APPROVE' ? user.requestedRole : user.role,
            updatedAt: new Date(),
        },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
}
