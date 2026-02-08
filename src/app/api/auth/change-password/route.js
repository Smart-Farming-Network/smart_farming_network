import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) {
        return Response.json(
            { error: "Current password is incorrect" },
            { status: 400 }
        );
    }

    const hashed = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
        where: { id: user.id },
        data: { password: hashed },
    });

    return Response.json({ ok: true });
}
