"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FarmVersePage() {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        referralSource: "",
    });

    /*
     * Update these paths when the final APK / investor resources
     * are available.
     */
    const APK_DOWNLOAD_URL = "https://drive.google.com/file/d/1h6ALXzfmM5lOWjaIEyR4FWKQxB57BQ7Q/view?usp=sharing";
    const INVESTOR_DECK_URL = "#";
    const SCHEDULE_CALL_URL = "#";

    useEffect(() => {
        document.body.style.overflow = showModal ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showModal]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const openRegistration = () => {
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await fetch("/api/farmverse/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!data.success) {
                alert(data.message);
                return;
            }

            window.location.href = "/farmverse/success";
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
            {/* =====================================================
                HERO
            ===================================================== */}
            <section
                className="text-white d-flex align-items-center"
                style={{
                    minHeight: "90vh",
                    backgroundImage: `
                        linear-gradient(
                            rgba(0, 0, 0, .72),
                            rgba(0, 0, 0, .72)
                        ),
                        url('/assets/img/55.jpeg')
                    `,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="container py-5">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-7">
                            <span className="badge bg-success px-3 py-2 mb-3">
                                FARMVERSE — NOW LIVE
                            </span>

                            <h1
                                className="display-3 fw-bold mb-4 text-light"
                                style={{ lineHeight: 1.1 }}
                            >
                                FarmVerse Is Here.
                                <br />
                                Africa&apos;s Agricultural
                                <br />
                                Operating System —
                                <br />
                                Now Live.
                            </h1>

                            <p
                                className="lead text-light mb-5"
                                style={{
                                    maxWidth: "720px",
                                    lineHeight: 1.7,
                                }}
                            >
                                The digital platform built for smallholder
                                farmers, aggregators, and agric-entrepreneurs.
                                Real buyers. Real prices. Real growth —
                                powered by AI.
                            </p>

                            <div className="d-flex flex-wrap gap-3">
                                <a
                                    href={APK_DOWNLOAD_URL}
                                    className="btn btn-success btn-lg px-5 rounded-pill"
                                    download
                                >
                                    Download the APK
                                </a>

                                <Link
                                    href="#community"
                                    className="btn btn-outline-light btn-lg px-5 rounded-pill"
                                >
                                    Join the Community Hub
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-5 text-center">
                            <video
                                src="/assets/img/farmverse/mockup.mp4"
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="img-fluid rounded-4 shadow-lg"
                                style={{
                                    maxHeight: "620px",
                                    width: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                THE PROBLEM
            ===================================================== */}
            <section className="py-5 bg-light">
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <div className="col-lg-9 text-center">
                            <span className="badge bg-warning text-dark px-3 py-2 mb-3">
                                THE PROBLEM
                            </span>

                            <h2 className="fw-bold mb-4">
                                Farming Shouldn&apos;t Be a Guessing Game.
                            </h2>

                            <p
                                className="lead text-muted"
                                style={{ lineHeight: 1.8 }}
                            >
                                Every season, farmers plant with hope —
                                but selling, pricing, and finding trustworthy
                                buyers remain the hardest parts of the journey.
                                <strong className="text-dark">
                                    {" "}FarmVerse closes that gap.
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                APP OVERVIEW
            ===================================================== */}
            <section id="about" className="py-5 bg-white">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <span className="badge bg-success px-3 py-2 mb-3">
                            APP OVERVIEW
                        </span>

                        <h2 className="fw-bold">
                            One App. Your Entire Farming Season.
                        </h2>
                    </div>

                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <Image
                                src="/assets/img/farmverse/dashboard.jpeg"
                                alt="FarmVerse app dashboard"
                                width={800}
                                height={900}
                                className="img-fluid rounded-4 shadow"
                            />
                        </div>

                        <div className="col-lg-6">
                            <div className="d-grid gap-4">
                                <Feature
                                    icon="📈"
                                    title="Real-Time Market Prices"
                                    text="Know what your harvest is worth before you sell, not after."
                                />

                                <Feature
                                    icon="🤝"
                                    title="Direct Buyer Access"
                                    text="Connect with verified buyers and aggregators, no middlemen taking your margin."
                                />

                                <Feature
                                    icon="🤖"
                                    title="Edna, Your AI Farming Assistant"
                                    text="Ask questions in your own language. Pidgin and local dialects are supported, anytime."
                                />

                                <Feature
                                    icon="🌱"
                                    title="Community Hub"
                                    text="Join 11,000+ farmers already growing together, sharing knowledge and opportunity."
                                />

                                <Feature
                                    icon="📊"
                                    title="Investor & Aggregator Tools"
                                    text="Track produce flow, farmer partnerships, and market data in one place."
                                />
                            </div>
                        </div>
                    </div>

                    {/* App Screens */}
                    <div className="row g-4 mt-5">
                        <div className="col-md-6">
                            <Image
                                src="/assets/img/farmverse/edna.jpeg"
                                alt="Edna AI farming assistant"
                                width={800}
                                height={800}
                                className="img-fluid rounded-4 shadow-sm"
                            />
                        </div>

                        <div className="col-md-6">
                            <Image
                                src="/assets/img/farmverse/marketplace.jpeg"
                                alt="FarmVerse marketplace"
                                width={800}
                                height={800}
                                className="img-fluid rounded-4 shadow-sm"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                WHY FARMVERSE
            ===================================================== */}
            <section className="py-5 bg-light">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <span className="badge bg-warning text-dark px-3 py-2 mb-3">
                            WHY FARMVERSE
                        </span>

                        <h2 className="fw-bold">
                            Built With Farmers. Built For the Future.
                        </h2>
                    </div>

                    <div className="row g-4">
                        {[
                            [
                                "📈",
                                "Turn your harvest into fair income, not guesswork",
                            ],
                            [
                                "🌍",
                                "Speak to Edna in the language you already speak",
                            ],
                            [
                                "🤝",
                                "Skip the middleman — sell directly to serious buyers",
                            ],
                            [
                                "🧑‍🌾",
                                "Join a growing network of 11,000+ farmers building wealth together",
                            ],
                            [
                                "📱",
                                "Everything in one app — no paperwork, no long queues",
                            ],
                        ].map(([icon, text], index) => (
                            <div
                                className="col-md-6 col-lg-4"
                                key={index}
                            >
                                <div className="bg-white border rounded-4 p-4 h-100 shadow-sm">
                                    <div className="fs-2 mb-3">
                                        {icon}
                                    </div>

                                    <p className="fw-semibold mb-0">
                                        {text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
                SUBSCRIPTION PLANS
            ===================================================== */}
            <section className="py-5 bg-white">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <span className="badge bg-success px-3 py-2 mb-3">
                            SUBSCRIPTION PLANS
                        </span>

                        <h2 className="fw-bold">
                            Choose the Plan That Grows With You
                        </h2>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>Plan</th>
                                    <th>Price</th>
                                    <th>Best For</th>
                                    <th>What&apos;s Included</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>
                                        <strong>Free / Starter</strong>
                                    </td>

                                    <td>
                                        <strong>₦0</strong>
                                    </td>

                                    <td>
                                        New farmers testing the platform
                                    </td>

                                    <td>
                                        Basic market price access,
                                        community hub, limited Edna queries
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <strong>Growth</strong>
                                    </td>

                                    <td>
                                        <strong>
                                            ₦[INSERT]/month
                                        </strong>
                                    </td>

                                    <td>
                                        Active smallholder farmers
                                    </td>

                                    <td>
                                        Full buyer access, unlimited Edna
                                        assistant, price alerts
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <strong>Aggregator / Pro</strong>
                                    </td>

                                    <td>
                                        <strong>
                                            ₦[INSERT]/month
                                        </strong>
                                    </td>

                                    <td>
                                        Aggregators & agric-entrepreneurs
                                    </td>

                                    <td>
                                        Bulk listing tools, buyer network
                                        access, priority support
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <strong>Enterprise</strong>
                                    </td>

                                    <td>
                                        <strong>Custom</strong>
                                    </td>

                                    <td>
                                        Cooperatives & large operations
                                    </td>

                                    <td>
                                        Dedicated account support, data
                                        insights, custom integrations
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="alert alert-success text-center mt-4">
                        <strong>
                            First 30 signups get 30 days free on any paid
                            plan — limited-time launch offer.
                        </strong>
                    </div>

                    {/* Pricing screenshot */}
                    <div className="row justify-content-center mt-5">
                        <div className="col-lg-8">
                            <Image
                                src="/assets/img/farmverse/pricing.jpeg"
                                alt="FarmVerse subscription plans"
                                width={1200}
                                height={800}
                                className="img-fluid rounded-4 shadow"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                INVESTORS
            ===================================================== */}
            <section className="py-5 bg-dark text-white">
                <div className="container py-5">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-7">
                            <span className="badge bg-success px-3 py-2 mb-3">
                                FOR INVESTORS
                            </span>

                            <h2 className="display-6 fw-bold mb-4">
                                Partner With Us to Scale Africa&apos;s
                                Agricultural Future
                            </h2>

                            <p className="lead text-light mb-4">
                                FarmVerse is more than an app — it&apos;s
                                infrastructure for a ~38 million-strong
                                smallholder farmer market in Nigeria alone.
                            </p>

                            <p className="text-light">
                                We&apos;re building the operating system that
                                turns subsistence farming into sustainable,
                                commercial wealth-building.
                            </p>

                            <h5 className="fw-bold mt-5 mb-3">
                                What we offer investors:
                            </h5>

                            <ul className="list-unstyled d-grid gap-3">
                                <li>
                                    ✓ A live, launched platform with an
                                    active 11,000+ farmer community
                                </li>

                                <li>
                                    ✓ A clear path from app engagement to
                                    data-driven agricultural commerce
                                </li>

                                <li>
                                    ✓ Positioning in one of Africa&apos;s
                                    largest underserved digital markets
                                </li>
                            </ul>

                            <div className="d-flex flex-wrap gap-3 mt-5">
                                <a
                                    href={INVESTOR_DECK_URL}
                                    className="btn btn-success btn-lg px-4 rounded-pill"
                                >
                                    Request Investor Deck
                                </a>

                                <a
                                    href={SCHEDULE_CALL_URL}
                                    className="btn btn-outline-light btn-lg px-4 rounded-pill"
                                >
                                    Schedule a Call
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <Image
                                src="/assets/img/farmverse/team.jpeg"
                                alt="FarmVerse team"
                                width={800}
                                height={700}
                                className="img-fluid rounded-4 shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                COMMUNITY / VERSE HUB
            ===================================================== */}
            <section
                id="community"
                className="py-5 bg-light"
            >
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <span className="badge bg-warning text-dark px-3 py-2 mb-3">
                            JOIN THE MOVEMENT
                        </span>

                        <h2 className="fw-bold">
                            Two Ways to Join the Movement
                        </h2>
                    </div>

                    <div className="row g-4">
                        <div className="col-lg-6">
                            <div className="bg-white border rounded-4 p-5 h-100 shadow-sm">
                                <div className="fs-1 mb-3">
                                    🤝
                                </div>

                                <h3 className="fw-bold mb-3">
                                    Community Hub
                                </h3>

                                <p className="text-muted">
                                    Connect with farmers, share knowledge,
                                    and access support.
                                </p>

                                <Link
                                    href="#"
                                    className="btn btn-success rounded-pill px-4"
                                >
                                    Join Community Hub
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="bg-success text-white rounded-4 p-5 h-100 shadow-sm">
                                <div className="fs-1 mb-3">
                                    📱
                                </div>

                                <h3 className="fw-bold mb-3">
                                    Verse Hub
                                </h3>

                                <p className="text-light">
                                    Access the full FarmVerse platform
                                    tools and marketplace.
                                </p>

                                <a
                                    href={APK_DOWNLOAD_URL}
                                    className="btn btn-light rounded-pill px-4"
                                    download
                                >
                                    Download FarmVerse
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-5">
                        <p className="text-muted mb-2">
                            Join either hub:
                        </p>

                        <strong>
                            smartfarmingnetwork.com/farmverse
                        </strong>
                    </div>
                </div>
            </section>

            {/* =====================================================
                FOOTER CTA
            ===================================================== */}
            <section className="py-5 bg-success text-white">
                <div className="container py-5 text-center">
                    <h2 className="display-6 fw-bold mb-4">
                        Every Farmer Deserves a Final.
                    </h2>

                    <p
                        className="lead mx-auto mb-5"
                        style={{ maxWidth: "750px" }}
                    >
                        FarmVerse launches opportunity into the hands of
                        every farmer — not just the lucky few.
                    </p>

                    <div className="d-flex justify-content-center flex-wrap gap-3 mb-5">
                        <a
                            href={APK_DOWNLOAD_URL}
                            className="btn btn-light btn-lg px-5 rounded-pill"
                            download
                        >
                            Download APK
                        </a>

                        <Link
                            href="#community"
                            className="btn btn-outline-light btn-lg px-5 rounded-pill"
                        >
                            Join Community
                        </Link>

                        <a
                            href="#investors"
                            className="btn btn-outline-light btn-lg px-5 rounded-pill"
                        >
                            Contact Investors
                        </a>
                    </div>

                    <div className="border-top border-light border-opacity-25 pt-4">
                        <p className="mb-2">
                            📞 +234 (0)912-188-7181
                        </p>

                        <p className="mb-0">
                            🌐 smartfarmingnetwork.com/farmverse
                        </p>
                    </div>
                </div>
            </section>

            {/* =====================================================
                REGISTRATION MODAL
            ===================================================== */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    FarmVerse Registration
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                />
                            </div>

                            <div className="modal-body">
                                <div className="alert alert-warning">
                                    <strong>
                                        Please Note: You will receive a
                                        confirmation email after submitting
                                        your application. If you do not
                                        receive it, please check your spam
                                        folder or contact us for assistance.
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
                                        type="submit"
                                        className="btn btn-success w-100 fw-semibold"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" />
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

/* =====================================================
   FEATURE COMPONENT
===================================================== */

function Feature({ icon, title, text }) {
    return (
        <div className="d-flex gap-3">
            <div
                className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0"
                style={{
                    width: "52px",
                    height: "52px",
                    fontSize: "1.4rem",
                }}
            >
                {icon}
            </div>

            <div>
                <h5 className="fw-bold mb-2">
                    {title}
                </h5>

                <p className="text-muted mb-0">
                    {text}
                </p>
            </div>
        </div>
    );
}