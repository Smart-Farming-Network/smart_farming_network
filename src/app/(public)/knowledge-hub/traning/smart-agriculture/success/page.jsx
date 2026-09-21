import Link from "next/link";

export default function TrainingRegistrationSuccessPage() {
    return (
        <main className="training-success-page">

            <section className="success-section">
                <div className="container">

                    <div className="success-card">

                        <div className="success-icon">
                            <i className="bi bi-check-lg"></i>
                        </div>

                        <span className="success-label">
                            REGISTRATION SUCCESSFUL
                        </span>

                        <h1>
                            You're successfully registered!
                        </h1>

                        <p className="success-message">
                            Thank you for registering for the Smart Agriculture
                            &amp; Digital Extension Training by GoodLife Smart
                            Farming Network (GSFN), in collaboration with BNARDA.
                        </p>

                        <div className="email-notice">

                            <div className="email-icon">
                                <i className="bi bi-envelope-check-fill"></i>
                            </div>

                            <div>
                                <h5>Check your email</h5>

                                <p>
                                    A confirmation email has been sent to the
                                    email address you provided during registration.
                                </p>

                                <small>
                                    If you don't see the email in your inbox,
                                    please check your <strong>Spam</strong> or
                                    <strong> Junk</strong> folder.
                                </small>
                            </div>

                        </div>

                        <div className="success-actions">

                            <Link
                                href="/knowledge-hub/traning/smart-agriculture"
                                className="btn btn-register"
                            >
                                Back to Training Page
                            </Link>

                        </div>

                        <p className="success-footer">
                            GoodLife Smart Farming Network (GSFN)
                        </p>

                    </div>

                </div>
            </section>

        </main>
    );
}