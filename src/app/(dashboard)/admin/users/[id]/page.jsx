import { PrismaClient } from "@/generated/prisma";
import UserDetailClient from "./UserDetailClient";

const prisma = new PrismaClient();

export default async function AdminUserPage({ params }) {
    const { id } = await params;

    const user = await prisma.user.findUnique({
        where: { id },
        include: { profile: true, permissions: { include: { permission: { select: { key: true } } } } },
    });

    if (!user) return <div>User not found</div>;

    return <UserDetailClient user={user} />;
}
