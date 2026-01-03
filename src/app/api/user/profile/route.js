import { prisma } from '@/libs/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth';
import { NextResponse } from 'next/server';

/**
 * GET – Fetch current user with profile
 */
export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { profile: true },
    });

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
}

/**
 * PATCH – Update profile progressively (multi-step)
 */
export async function PATCH(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
        firstName,
        lastName,
        phone,
        roleSpecific,
        documents,
        profileStage,
    } = await req.json();

    // Upsert profile
    await prisma.profile.upsert({
        where: { userId: session.user.id },
        update: {
            ...(firstName !== undefined && { firstName }),
            ...(lastName !== undefined && { lastName }),
            ...(phone !== undefined && { phone }),
            ...(roleSpecific !== undefined && { roleSpecific }),
            ...(documents !== undefined && { documents }),
        },
        create: {
            userId: session.user.id,
            firstName,
            lastName,
            phone,
            roleSpecific,
            documents,
        },
    });

    // --- Calculate completion percentage safely ---
    let completionPct = 0;

    if (firstName && lastName) completionPct += 30;
    if (phone) completionPct += 10;

    if (roleSpecific && Object.keys(roleSpecific).length > 0) {
        completionPct += 40;
    }

    if (documents && Array.isArray(documents) && documents.length > 0) {
        completionPct += 20;
    }

    // Update user onboarding progress
    await prisma.user.update({
        where: { id: session.user.id },
        data: {
            ...(profileStage !== undefined && { profileStage }),
            profileCompletionPct: completionPct,
        },
    });

    return NextResponse.json({
        success: true,
        profileStage,
        profileCompletionPct: completionPct,
    });
}
