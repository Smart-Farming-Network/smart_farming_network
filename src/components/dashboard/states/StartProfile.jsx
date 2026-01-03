import Link from 'next/link';

export default function StartProfile() {
    return (
        <div className="card p-4">
            <h4>Welcome 👋</h4>
            <p>To continue, please complete your profile.</p>
            <Link href="/dashboard/profile-completion" className="btn btn-primary">
                Start Profile
            </Link>
        </div>
    );
}
