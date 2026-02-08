import { prisma } from "@/libs/prisma";
import { mailer } from "@/libs/mail";
import { generateRawToken, hashToken } from "@/libs/passwordReset";
import { resetPasswordEmail } from "@/libs/emailTemplates/resetPassword";


export async function POST(req) {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    // Silent response (prevents email enumeration)
    if (!user) return Response.json({ ok: true });

    // Invalidate previous unused tokens
    await prisma.passwordResetToken.updateMany({
        where: { userId: user.id, usedAt: null },
        data: { usedAt: new Date() },
    });

    const rawToken = generateRawToken();
    const hashedToken = hashToken(rawToken);

    await prisma.passwordResetToken.create({
        data: {
            userId: user.id,
            token: hashedToken,
            expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 mins
        },
    });

    const resetLink = `${process.env.APP_URL}/reset-password?token=${rawToken}`;

    await mailer.sendMail({
        from: `"${process.env.APP_NAME || "Support"}" <${process.env.ZOHO_SMTP_USER}>`,
        to: email,
        subject: "Reset your password",
        html: resetPasswordEmail({ resetLink }),
    });


    return Response.json({ ok: true });
}
