import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { NextResponse } from "next/server";

/**
 * GET – Pending verification requests
 */
export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const pendingUsers = await prisma.user.findMany({
        where: { verificationStatus: "PENDING" },
        include: { profile: true },
    });

    return NextResponse.json(pendingUsers);
}

/**
 * PATCH – Approve or Reject
 */
export async function PATCH(req) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { userId, action } = await req.json();
    if (!["APPROVE", "REJECT"].includes(action)) {
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            verificationStatus: action === "APPROVE" ? "APPROVED" : "REJECTED",
            role: action === "APPROVE" ? user.requestedRole : user.role,
            updatedAt: new Date(),
        },
        include: { profile: true },
    });

    return NextResponse.json(updatedUser);
}
