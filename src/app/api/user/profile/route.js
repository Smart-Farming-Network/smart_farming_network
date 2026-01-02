import { prisma } from '@/libs/prisma';
import { getSession } from "next-auth/react";

// GET: fetch current user profile
export async function GET(req) {
    const session = await getSession(req);
    if (!session) return new Response("Unauthorized", { status: 401 });

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { profile: true },
    });

    if (!user) return new Response("User not found", { status: 404 });

    return new Response(JSON.stringify(user), { status: 200 });
}

// PUT: update profile and/or role-specific info
export async function PUT(req) {
    const session = await getSession(req);
    if (!session) return new Response("Unauthorized", { status: 401 });

    const data = await req.json();
    const { firstName, lastName, phone, roleSpecific, documents } = data;

    const updatedProfile = await prisma.profile.upsert({
        where: { userId: session.user.id },
        update: { firstName, lastName, phone, roleSpecific, documents, updatedAt: new Date() },
        create: { userId: session.user.id, firstName, lastName, phone, roleSpecific, documents },
    });

    // Optional: Update profile completion percentage
    let completionPct = 0;
    if (firstName && lastName && phone) completionPct += 40;
    if (roleSpecific) completionPct += 40;
    if (documents) completionPct += 20;

    await prisma.user.update({
        where: { id: session.user.id },
        data: { profileStage: 4, profileCompletionPct: completionPct, updatedAt: new Date() },
    });

    return new Response(JSON.stringify(updatedProfile), { status: 200 });
}
