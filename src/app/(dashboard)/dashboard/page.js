import { getCurrentUser } from '@/libs/authGuard';
import StartProfile from '@/components/dashboard/states/StartProfile';
import ProfileInProgress from '@/components/dashboard/states/ProfileInProgress'
import PendingVerification from '@/components/dashboard/states/PendingVerification';
import RejectedVerification from '@/components/dashboard/states/RejectedVerification';

export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (user.profileStage === 0) {
        return <StartProfile />;
    }

    if (user.profileStage < 4) {
        return <ProfileInProgress user={user} />;
    }

    if (user.verificationStatus === 'PENDING') {
        return <PendingVerification />;
    }

    if (user.verificationStatus === 'REJECTED') {
        return <RejectedVerification />;
    }

    return null;
}
