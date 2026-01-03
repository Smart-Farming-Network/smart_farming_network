import Link from 'next/link';

export default function ProfileInProgress({ user }) {
    return (
        <div className="card p-4">
            <h4>Profile in Progress</h4>
            <p>{user.profileCompletionPct}% completed</p>

            <div className="progress mb-3">
                <div
                    className="progress-bar"
                    style={{ width: `${user.profileCompletionPct}%` }}
                />
            </div>

            <Link href="/dashboard/profile-completion" className="btn btn-warning">
                Continue Profile
            </Link>
        </div>
    );
}
