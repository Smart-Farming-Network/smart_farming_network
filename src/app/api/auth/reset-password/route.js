import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";
import { hashToken } from "@/libs/passwordReset";

export async function POST(req) {
    const { token, password } = await req.json();

    if (!token || !password) {
        return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    const hashedToken = hashToken(token);

    const resetToken = await prisma.passwordResetToken.findFirst({
        where: {
            token: hashedToken,
            usedAt: null,
            expiresAt: { gt: new Date() },
        },
    });

    if (!resetToken) {
        return Response.json(
            { error: "Invalid or expired reset link" },
            { status: 400 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.$transaction([
        prisma.user.update({
            where: { id: resetToken.userId },
            data: { password: hashedPassword },
        }),
        prisma.passwordResetToken.update({
            where: { id: resetToken.id },
            data: { usedAt: new Date() },
        }),
    ]);

    return Response.json({ ok: true });
}
