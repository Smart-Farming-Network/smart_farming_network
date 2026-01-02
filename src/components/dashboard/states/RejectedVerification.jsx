import Link from 'next/link';

export default function RejectedVerification() {
    return (
        <div className="card p-4 text-center">
            <h4 className="text-danger">Verification Rejected</h4>
            <p>Please review your information and resubmit.</p>
            <Link href="/dashboard/profile" className="btn btn-danger">
                Update Profile
            </Link>
        </div>
    );
}
