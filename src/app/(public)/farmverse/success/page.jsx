export default function FarmverseSuccessPage() {

    return (

        <main className="min-vh-100 d-flex align-items-center">

            <div className="container">

                <div
                    className="card shadow border-0 mx-auto text-center"
                    style={{ maxWidth: "800px" }}
                >

                    <div className="card-body p-5">

                        <div className="display-1 mb-4">
                            ✅
                        </div>

                        <h1 className="fw-bold mb-4">
                            Form Submitted Successfully
                        </h1>

                        <p className="lead">
                            Thank you for joining the waitlist for Farmverse.
                        </p>

                        <p className="text-muted">
                            A confirmation email has been sent
                            to your email address.
                        </p>

                        <hr />

                    </div>

                </div>

            </div>

        </main>

    );

}