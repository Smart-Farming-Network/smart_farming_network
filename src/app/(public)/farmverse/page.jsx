"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function FarmVersePage() {

    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: ""
    });

    useEffect(() => {

        document.body.style.overflow =
            showModal ? "hidden" : "auto";

    }, [showModal]);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const openRegistration = () => {

        setForm((prev) => ({
            ...prev,
        }));

        setShowModal(true);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await fetch(
                "/api/farmverse/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                }
            );

            const data = await res.json();

            if (!data.success) {

                alert(data.message);

                return;
            }

            window.location.href =
                "/farmverse/success";

        } catch (error) {

            console.error(error);

            alert(
                "Unable to submit application. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <main>

            {/* ===========================================
                HERO
            =========================================== */}

            <section
                className="text-white d-flex align-items-center"
                style={{
                    minHeight: "90vh",
                    backgroundImage: `
                        linear-gradient(rgba(0,0,0,.72), rgba(0,0,0,.72)),
                        url('/assets/img/55.jpeg')
                    `,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <div className="container">

                    <div className="row align-items-center">

                        <div className="col-lg-7">

                            <span className="badge bg-success px-3 py-2 mb-3">
                                GOODLIFE SMART FARMING NETWORK
                            </span>

                            <h1
                                className="display-3 fw-bold mb-4 text-light"
                                style={{ lineHeight: 1.15 }}
                            >
                                FarmVerse
                            </h1>

                            <h3 className="fw-light text-light mb-4">
                                The Future of Smart Farming Begins Here
                            </h3>

                            <p
                                className="lead text-light mb-5"
                                style={{ maxWidth: "700px" }}
                            >
                                FarmVerse is Africa's intelligent digital farming
                                ecosystem connecting farmers, investors,
                                agribusinesses, buyers and technology into one
                                trusted platform.
                            </p>

                            <div className="alert alert-light alert-dismissible fade show" role="alert">
                                <strong>🚀 Now Available!</strong> Download FarmVerse on iOS & Android today.
                            </div>

                            <div className="d-flex flex-wrap gap-3">

                                <a
                                    href="https://apps.apple.com/app/farmverse"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-light btn-lg px-5 rounded-pill"
                                >
                                    📱 App Store
                                </a>

                                <a
                                    href="https://play.google.com/store/apps/details?id=com.gsfn.farmverse"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-success btn-lg px-5 rounded-pill"
                                >
                                    📱 Google Play
                                </a>

                                <Link
                                    href="#about"
                                    className="btn btn-outline-light btn-lg px-5 rounded-pill"
                                >
                                    Learn More
                                </Link>

                            </div>

                        </div>

                        <div className="col-lg-5 mt-5 mt-lg-0 text-center">

                            <video src="/assets/img/farmverse/mockup.mp4" autoPlay muted loop></video>

                        </div>

                    </div>

                </div>

            </section>

            {/* ===========================================
                TRUSTED BY
            =========================================== */}

            <section className="py-5 bg-white border-bottom">

                <div className="container">

                    <div className="text-center mb-5">

                        <small
                            className="text-uppercase text-muted fw-semibold"
                        >
                            Building Africa's Future Together
                        </small>

                        <h2 className="fw-bold mt-2">
                            Trusted By Our Ecosystem
                        </h2>

                    </div>

                    <div className="row g-4 justify-content-center align-items-center">

                        {[1, 2, 3, 4].map((logo) => (
                            <div
                                key={logo}
                                className="col-6 col-md-4 col-lg-2"
                            >

                                <div
                                    className="border rounded-4 shadow-sm bg-white p-4 text-center"
                                >

                                    <Image
                                        src={`/assets/img/partners/partner-${logo}.png`}
                                        className="img-fluid"
                                        alt="Partner"
                                        width={70}
                                        height={70}
                                        style={{
                                            maxHeight: "70px",
                                            filter: "grayscale(100%)",
                                            opacity: .75
                                        }}
                                    />

                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </section>

            {/* ===========================================
                ABOUT
            =========================================== */}

            <section
                id="about"
                className="py-5 bg-light"
            >

                <div className="container">

                    <div className="row align-items-center g-5">

                        <div className="col-lg-6">

                            <Image
                                src="/assets/img/farmverse/dashboard.jpeg"
                                className="img-fluid rounded-4 shadow"
                                alt="FarmVerse Dashboard"
                                width={400}
                                height={600}
                            />

                        </div>

                        <div className="col-lg-6">

                            <span className="badge bg-success mb-3">
                                ABOUT FARMVERSE
                            </span>

                            <h2 className="fw-bold mb-4">

                                One Intelligent Platform.
                                Endless Agricultural Opportunities.

                            </h2>

                            <p className="text-muted">

                                FarmVerse is the flagship digital platform of
                                GoodLife Smart Farming Network Ltd (GSFN),
                                built to transform the way farmers,
                                investors, agribusinesses and agricultural
                                stakeholders connect, grow and profit.

                            </p>

                            <p className="text-muted">

                                We believe farming should no longer depend
                                on guesswork. Through technology,
                                verified data and a trusted ecosystem,
                                FarmVerse empowers everyone from
                                smallholder farmers to commercial
                                enterprises with tools that improve
                                productivity, reduce risks and unlock
                                new opportunities.

                            </p>

                            <div className="row mt-4">

                                <div className="col-6">

                                    <div className="mb-4">

                                        <h3 className="fw-bold text-success">
                                            Smart
                                        </h3>

                                        <small className="text-muted">
                                            Data-driven farming
                                        </small>

                                    </div>

                                </div>

                                <div className="col-6">

                                    <div className="mb-4">

                                        <h3 className="fw-bold text-success">
                                            Trusted
                                        </h3>

                                        <small className="text-muted">
                                            Verified ecosystem
                                        </small>

                                    </div>

                                </div>

                                <div className="col-6">

                                    <div>

                                        <h3 className="fw-bold text-success">
                                            Secure
                                        </h3>

                                        <small className="text-muted">
                                            Protected records
                                        </small>

                                    </div>

                                </div>

                                <div className="col-6">

                                    <div>

                                        <h3 className="fw-bold text-success">
                                            Scalable
                                        </h3>

                                        <small className="text-muted">
                                            Grow without limits
                                        </small>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* ===========================================
                WHY FARMVERSE
            =========================================== */}

            <section className="py-5 bg-white">

                <div className="container">

                    <div className="text-center mb-5">

                        <span className="badge bg-warning text-dark mb-3">
                            WHY FARMVERSE?
                        </span>

                        <h2 className="fw-bold">

                            Agriculture Has Challenges.
                            FarmVerse Provides Solutions.

                        </h2>

                        <p
                            className="text-muted mx-auto"
                            style={{ maxWidth: "750px" }}
                        >
                            Millions of farmers struggle with limited
                            access to markets, financing, weather data,
                            technology and trusted buyers.
                            FarmVerse changes that.
                        </p>

                    </div>

                    <div className="row g-5">

                        <div className="col-lg-6">

                            <div className="border rounded-4 p-4 h-100 bg-light">

                                <h4 className="fw-bold text-danger mb-4">

                                    Current Challenges

                                </h4>

                                <ul
                                    className="list-unstyled d-grid gap-3"
                                >

                                    <li>❌ Poor Market Access</li>
                                    <li>❌ Limited Financing</li>
                                    <li>❌ Low Productivity</li>
                                    <li>❌ Poor Record Keeping</li>
                                    <li>❌ Unverified Buyers</li>
                                    <li>❌ High Post-Harvest Losses</li>
                                    <li>❌ Weather Uncertainty</li>

                                </ul>

                            </div>

                        </div>

                        <div className="col-lg-6">

                            <div
                                className="border rounded-4 p-4 h-100 bg-success text-white"
                            >

                                <h4 className="fw-bold mb-4">

                                    FarmVerse Solution

                                </h4>

                                <ul
                                    className="list-unstyled d-grid gap-3"
                                >

                                    <li>✅ Digital Farm Records</li>
                                    <li>✅ Smart Marketplace</li>
                                    <li>✅ Investor Connections</li>
                                    <li>✅ Weather Intelligence</li>
                                    <li>✅ Farm Analytics</li>
                                    <li>✅ Verified Farmer Identity</li>
                                    <li>✅ Business Growth Tools</li>

                                </ul>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* ===========================================
                DOWNLOAD & REVIEWS SECTION
            =========================================== */}

            <section id="download" className="py-5 bg-light">

                <div className="container">

                    <div className="row align-items-center g-5">

                        <div className="col-lg-6 text-center">

                            <Image
                                src="/assets/img/farmverse-mockup.png"
                                width={300}
                                height={500}
                                alt="FarmVerse App"
                                className="img-fluid"
                            />

                        </div>

                        <div className="col-lg-6">

                            <h2 className="fw-bold mb-4">Download FarmVerse Today</h2>

                            <p className="fs-5 mb-4">
                                Join thousands of farmers, investors, and agric-entrepreneurs already using FarmVerse to transform their farming operations.
                            </p>

                            <div className="mb-4">

                                <h5 className="fw-bold mb-3">Get the App:</h5>

                                <div className="d-flex gap-3 flex-wrap mb-4">

                                    <a
                                        href="https://apps.apple.com/app/farmverse"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline-dark btn-lg"
                                    >
                                        <i className="fab fa-apple me-2"></i> App Store
                                    </a>

                                    <a
                                        href="https://play.google.com/store/apps/details?id=com.gsfn.farmverse"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline-success btn-lg"
                                    >
                                        <i className="fab fa-google-play me-2"></i> Google Play
                                    </a>

                                </div>

                            </div>

                            <div className="bg-white border border-success rounded-4 p-4">

                                <h5 className="fw-bold mb-3">⭐ Love FarmVerse? Share Your Review!</h5>

                                <p className="mb-3">
                                    Your feedback helps us improve and reach more farmers. After downloading, please leave a 5-star review on your app store.
                                </p>

                                <div className="d-flex gap-2 flex-wrap">

                                    <a
                                        href="https://apps.apple.com/app/farmverse/reviews"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-sm btn-success text-white"
                                    >
                                        📝 Review on App Store
                                    </a>

                                    <a
                                        href="https://play.google.com/store/apps/details?id=com.gsfn.farmverse&reviewId=0"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-sm btn-success text-white"
                                    >
                                        📝 Review on Google Play
                                    </a>

                                </div>

                                <p className="mt-3 small text-muted mb-0">
                                    💡 Tip: Enable notifications to get real-time market alerts and weather updates.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* ===========================================
                FEATURES
            =========================================== */}

            <section className="py-5 bg-white">

                <div className="container">

                    <h3 className="fw-bold text-center mb-5">What You Get with FarmVerse</h3>

                    <div className="row g-4">

                        {[
                            {
                                icon: "📊",
                                title: "Real-Time Farm Dashboard",
                                description: "Monitor crop health, soil conditions, weather, and harvest readiness all in one place."
                            },
                            {
                                icon: "💰",
                                title: "Live Market Pricing",
                                description: "Track real-time prices for your produce and connect directly with verified buyers."
                            },
                            {
                                icon: "🌦️",
                                title: "Smart Weather Alerts",
                                description: "Get agricultural-specific weather forecasts and recommendations for your farm."
                            },
                            {
                                icon: "📚",
                                title: "Knowledge Center",
                                description: "Access farming guides, best practices, and expert tips tailored to your crops."
                            },
                            {
                                icon: "👥",
                                title: "Farmer Community",
                                description: "Share experiences, learn from peers, and build your professional network."
                            },
                            {
                                icon: "📋",
                                title: "Digital Record Keeping",
                                description: "Track all farm activities, expenses, and yields with automated reporting."
                            },
                        ].map((feature, index) => (
                            <div key={index} className="col-md-4 mb-4">
                                <div className="card h-100 border-0 shadow-sm p-4">
                                    <div className="fs-1 mb-3">{feature.icon}</div>
                                    <h5 className="fw-bold mb-3">{feature.title}</h5>
                                    <p className="text-muted">{feature.description}</p>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>

            </section>

            {/* ===========================================
                TESTIMONIALS
            =========================================== */}

            <section className="py-5 bg-light">

                <div className="container">

                    <h3 className="fw-bold text-center mb-5">What Our Users Say</h3>

                    <div className="row g-4">

                        {[
                            {
                                quote: "[Add real testimonial from farmer]",
                                author: "[Farmer Name]",
                                location: "[Town/LGA], Benue State",
                                rating: 5
                            },
                            {
                                quote: "[Add real testimonial from investor]",
                                author: "[Investor Name]",
                                location: "[Organization/City]",
                                rating: 5
                            },
                            {
                                quote: "[Add real testimonial from aggregator]",
                                author: "[Partner Name]",
                                location: "[Town/LGA], Nigeria",
                                rating: 5
                            },
                        ].map((testimonial, index) => (
                            <div key={index} className="col-md-4">

                                <div className="card h-100 border-0 shadow-sm p-4">

                                    <div className="mb-3">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <span key={i} className="text-warning">⭐</span>
                                        ))}
                                    </div>

                                    <p className="mb-3 fst-italic">"{testimonial.quote}"</p>

                                    <p className="fw-bold mb-1">{testimonial.author}</p>

                                    <p className="small text-muted">{testimonial.location}</p>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </section>

            {/* ===========================================
                CTA
            =========================================== */}

            <section className="py-5 bg-success text-white text-center">

                <div className="container">

                    <h2 className="fw-bold mb-4">Ready to Transform Your Farming?</h2>

                    <p className="fs-5 mb-4">
                        Download FarmVerse now and join the agricultural revolution in Africa.
                    </p>

                    <div className="d-flex gap-3 justify-content-center flex-wrap mb-4">

                        <a
                            href="https://apps.apple.com/app/farmverse"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-light btn-lg"
                        >
                            📱 App Store
                        </a>

                        <a
                            href="https://play.google.com/store/apps/details?id=com.gsfn.farmverse"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-light btn-lg"
                        >
                            📱 Google Play
                        </a>

                    </div>

                    <p className="small">
                        Questions? Email us at <strong>smartfarmingnetwork@gmail.com</strong> <br />
                        WhatsApp: <strong>+234 912 188 1781</strong>
                    </p>

                </div>

            </section>

            {showModal && (

                <div className="modal fade show d-block">

                    <div className="modal-dialog modal-lg modal-dialog-centered">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5 className="modal-title">
                                    Farmverse Registration
                                </h5>

                                <button
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                />

                            </div>

                            <div className="modal-body">

                                <div className="alert alert-warning">

                                    <strong>
                                        Please Note: You will receive a confirmation email after submitting your application. If you do not receive it, please check your spam folder or contact us.
                                    </strong>

                                </div>

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            name="fullName"
                                            className="form-control"
                                            required
                                            value={form.fullName}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            required
                                            value={form.email}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="mb-4">

                                        <label className="form-label">
                                            How did you hear about us?
                                        </label>

                                        <input
                                            type="text"
                                            name="referralSource"
                                            className="form-control"
                                            value={form.referralSource}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <button
                                        className="btn btn-warning text-dark w-100 fw-semibold"
                                        disabled={loading}
                                    >

                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Submitting...
                                            </>
                                        ) : (
                                            "Submit Application"
                                        )}

                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                    <div
                        className="modal-backdrop fade show"
                        style={{ zIndex: -1 }}
                        onClick={() => setShowModal(false)}
                    />

                </div>

            )}

        </main>
    );
}
