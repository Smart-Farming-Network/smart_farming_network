export default function PendingVerification() {
    return (
        <div className="card p-4 text-center">
            <h4 className="text-info">Verification Pending</h4>
            <p>Your profile has been submitted and is awaiting admin review.</p>
            <span className="badge bg-info">Pending</span>
        </div>
    );
}
