export default function ProgressTracker({ progress }) {
    return (
        <div className="progress mb-4" style={{ height: '8px' }}>
            <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
            ></div>
        </div>
    );
}
