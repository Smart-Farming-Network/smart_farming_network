import Image from "next/image";

export default function Contact() {
    return (
        <section className="py-2 bg-light">
            <div className="container">
                <div className="text-center mb-5">
                    <h6 className="text-success fw-bold text-uppercase">Get in Touch</h6>
                    <h1 className="fw-bold">We’d Love to Hear From You</h1>
                    <p className="text-muted">
                        Whether you have questions, feedback, or just want to say hello — our team is ready to help.
                    </p>
                </div>

                <div className="row g-5 align-items-center">
                    <div className="col-lg-6">
                        <div className="card shadow-lg border-0 p-4" style={{ boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)" }}>
                            <h3 className="fw-semibold mb-4">Send Us a Message</h3>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        className="form-control"
                                        placeholder="+1 234 567 890"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        className="form-control"
                                        placeholder="Tell us about your project..."
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    <i className="bi bi-send me-2"></i> Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="ps-lg-5">
                            <h3 className="fw-semibold mb-3">Contact Information</h3>
                            <p className="text-muted mb-4">
                                Reach out to us via phone, email, or visit our office — we’re always happy to connect.
                            </p>
                            <ul className="list-unstyled">
                                <li className="mb-3">
                                    <i className="bi bi-telephone-fill text-primary me-3"></i>
                                    <strong>Hotline:</strong> +234(0) 912 188 1781
                                </li>
                                <li className="mb-3">
                                    <i className="bi bi-geo-alt-fill text-primary me-3"></i>
                                    <strong>HeadQuarters Address:</strong> No.4 GSFN SUITE @ Atom Kpera Road, Beside Monatel Hotel, Makurdi, Benue State.
                                </li>
                                <li className="mb-3">
                                    <i className="bi bi-geo-alt-fill text-primary me-3"></i>
                                    <strong>Branch Address:</strong> Suite 002B, smafa plaza Wuse zone 5, Abuja.
                                </li>
                                <li>
                                    <i className="bi bi-envelope-fill text-primary me-3"></i>
                                    <strong>Email:</strong> smartfarmningetwork@gmail.com
                                </li>
                            </ul>

                            <div className="mt-4">
                                <Image
                                    src="/assets/img/illustration/10.png"
                                    alt="Contact Illustration"
                                    width={400}
                                    height={300}
                                    className="img-fluid rounded"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
