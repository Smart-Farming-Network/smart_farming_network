import ProfileCompletionForm from '@/components/profiles/ProfileCompletionForm';
import { requireRole } from '@/libs/authGuard';
import { prisma } from '@/libs/prisma';

export default async function ProfileCompletionPage() {
    // Ensure user is logged in and allowed
    const session = await requireRole(['USER', 'FARMER', 'INVESTOR']);

    // Fetch full user data including profile
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            profile: true,
        },
    });

    if (!user) {
        throw new Error('User not found');
    }

    return <ProfileCompletionForm user={user} />;
}
