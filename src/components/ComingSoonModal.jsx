'use client';

export default function ComingSoonModal({ show, onClose }) {
    if (!show) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="modal-backdrop fade show"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content border-0 shadow">

                        <div className="modal-header">
                            <h5 className="modal-title">Coming Soon 🚧</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            />
                        </div>

                        <div className="modal-body text-center py-4">
                            <p className="mb-0 text-muted">
                                This feature is currently under development.
                                <br />
                                We’re rolling it out very soon.
                            </p>
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-success w-100"
                                onClick={onClose}
                            >
                                Got it
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
