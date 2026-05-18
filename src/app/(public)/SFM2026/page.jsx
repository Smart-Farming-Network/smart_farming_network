'use client';

import { useEffect, useState } from "react";
import Script from "next/script";

export default function SFM2026Tickets() {

    const [selectedTier, setSelectedTier] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(false);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        role: "Farmer"
    });

    // =========================
    // FETCH LOGGED-IN USER
    // =========================

    useEffect(() => {

        async function fetchUser() {

            try {

                const res = await fetch("/api/user/profile");

                if (!res.ok) return;

                const data = await res.json();

                const userEmail =
                    data.profile?.email ||
                    data.email ||
                    "";

                if (userEmail) {

                    setIsAuthenticated(true);

                    setForm((prev) => ({
                        ...prev,
                        email: userEmail
                    }));
                }

            } catch (error) {

                console.error("Failed to fetch user:", error);

            }
        }

        fetchUser();

    }, []);

    // =========================
    // PREVENT BODY SCROLL
    // =========================

    useEffect(() => {

        document.body.style.overflow =
            showModal ? "hidden" : "auto";

    }, [showModal]);

    // =========================
    // OPEN MODAL
    // =========================

    const openModal = (tier) => {

        setSelectedTier(tier);

        setShowModal(true);

    };

    // =========================
    // FORM CHANGE
    // =========================

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    // =========================
    // PAYMENT SUBMIT
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const payload = {
                ...form,
                tier: selectedTier.name
            };

            const res = await fetch(
                "/api/payment/sfm2026/initialize",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );

            const data = await res.json();

            if (!data.success) {

                alert(data.message);

                return;
            }

            const handler = window.PaystackPop.setup({

                key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,

                email: data.data.email,

                amount: data.data.amount * 100,

                ref: data.data.reference,

                metadata: {
                    custom_fields: [
                        {
                            display_name: "Full Name",
                            variable_name: "full_name",
                            value: form.fullName
                        },
                        {
                            display_name: "Category",
                            variable_name: "category",
                            value: form.role
                        },
                        {
                            display_name: "Ticket Tier",
                            variable_name: "ticket_tier",
                            value: selectedTier.name
                        }
                    ]
                },

                callback: function (response) {

                    window.location.href =
                        `/SFM2026/success?reference=${response.reference}`;

                },

                onClose: function () {

                    alert("Payment cancelled");

                }
            });

            handler.openIframe();

        } catch (error) {

            console.error(error);

            alert("Failed to initialize payment");

        } finally {

            setLoading(false);

        }
    };

    return (
        <main>

            {/* PAYSTACK */}
            <Script
                src="https://js.paystack.co/v1/inline.js"
                strategy="afterInteractive"
            />

            {/* HERO */}
            <section className="text-white text-center d-flex align-items-center"
                style={{
                    height: "90vh",
                    background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/assets/img/sm.jpeg') center/cover no-repeat"
                }}>
                <div className="container">
                    <h1 className="display-4 fw-bold text-light">
                        Choose Your Level. Enter the Future of Farming.
                    </h1>

                    <p className="lead mt-3 w-75 mx-auto text-light">
                        This is not just an event—it is a gateway into intelligence, structure,
                        and opportunity in agriculture. Your access determines your exposure.
                        Your exposure determines your outcomes.
                    </p>

                    <a href="#tickets" className="btn btn-success btn-lg mt-4 px-5">
                        Secure Your Seat Now
                    </a>
                </div>
            </section>

            {/* WHY THIS MATTERS */}
            <section className="py-5 bg-light text-center">
                <div className="container">
                    <h2 className="fw-bold mb-3">Why This Matters</h2>
                    <p className="text-muted w-75 mx-auto">
                        In today’s agricultural economy, information is everywhere… but access is rare.
                        At SFM2026, we’ve designed tiers of access—so whether you’re just starting
                        or already scaling, there’s a level that meets you where you are… and pushes you forward.
                    </p>
                </div>
            </section>

            {/* HOSTS, SPEAKERS & GUESTS */}
            <section className="py-5 bg-white overflow-hidden">

                <div className="container">

                    <div className="text-center mb-5">

                        <span className="badge bg-success px-3 py-2 mb-3">
                            FEATURED PERSONALITIES
                        </span>

                        <h2 className="fw-bold">
                            Hosts, Keynote Speakers & Special Guests
                        </h2>

                        <p
                            className="text-muted mx-auto"
                            style={{ maxWidth: "800px" }}
                        >
                            Learn directly from visionary leaders, innovators,
                            investors, policymakers, and ecosystem builders shaping
                            the future of agriculture and smart farming across Africa.
                        </p>

                    </div>

                    <div className="row g-4 justify-content-center">

                        {/* SPEAKER 1 */}
                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm rounded-4 h-100 text-center p-4">

                                <div className="d-flex justify-content-center mb-4">

                                    <div
                                        className="rounded-circle overflow-hidden shadow"
                                        style={{
                                            width: "220px",
                                            height: "220px"
                                        }}
                                    >
                                        <img
                                            src="/assets/img/speakers/speaker-1.jpeg"
                                            alt="Speaker"
                                            className="w-100 h-100"
                                            style={{
                                                objectFit: "cover",
                                                objectPosition: "top"
                                            }}
                                        />
                                    </div>

                                </div>

                                <div className="card-body pt-0">

                                    <span className="badge bg-success mb-3">
                                        HOST
                                    </span>

                                    <h5 className="fw-bold mb-1">
                                        Edward Terungwa Ordams
                                    </h5>

                                    <p className="text-muted small mb-0">
                                        Founder, Smart Farmers Network
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* SPEAKER 2 */}
                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm rounded-4 h-100 text-center p-4">

                                <div className="d-flex justify-content-center mb-4">

                                    <div
                                        className="rounded-circle overflow-hidden shadow"
                                        style={{
                                            width: "220px",
                                            height: "220px"
                                        }}
                                    >
                                        <img
                                            src="/assets/img/speakers/speaker-2.jpeg"
                                            alt="Speaker"
                                            className="w-100 h-100"
                                            style={{
                                                objectFit: "cover",
                                                objectPosition: "top"
                                            }}
                                        />
                                    </div>

                                </div>

                                <div className="card-body pt-0">

                                    <span className="badge bg-dark mb-3">
                                        KEYNOTE SPEAKER
                                    </span>

                                    <h5 className="fw-bold mb-1">
                                        Emmanuel Ordams
                                    </h5>

                                    <p className="text-muted small mb-0">
                                        Manager Sterling Bank Plc, Makurdi Branch
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* SPEAKER 3 */}
                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm rounded-4 h-100 text-center p-4">

                                <div className="d-flex justify-content-center mb-4">

                                    <div
                                        className="rounded-circle overflow-hidden shadow"
                                        style={{
                                            width: "220px",
                                            height: "220px"
                                        }}
                                    >
                                        <img
                                            src="/assets/img/speakers/speaker-3.jpeg"
                                            alt="Speaker"
                                            className="w-100 h-100"
                                            style={{
                                                objectFit: "cover",
                                                objectPosition: "top"
                                            }}
                                        />
                                    </div>

                                </div>

                                <div className="card-body pt-0">

                                    <span className="badge bg-warning text-dark mb-3">
                                        SPECIAL GUEST
                                    </span>

                                    <h5 className="fw-bold mb-1">
                                        Shidoo Tarkaa
                                    </h5>

                                    <p className="text-muted small mb-0">
                                        Manager Victoria Travels
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* TICKETS */}
            <section id="tickets" className="py-5 bg-light">
                <div className="container">

                    <div className="text-center mb-5">
                        <h2 className="fw-bold">Access Levels</h2>
                        <p className="text-muted mb-0">
                            Choose your level of access and position yourself for the future of smart farming.
                        </p>
                    </div>

                    <div className="row g-4 ticket">

                        {/* STARTER */}
                        <div className="col-lg-4">
                            <div className="p-4 border rounded-4 shadow-sm h-100 bg-white d-flex flex-column">

                                <div className="mb-3">
                                    <h5 className="fw-bold">🌱 STARTER PASS</h5>
                                    <h3 className="text-success fw-bold">₦15,000</h3>
                                    <p className="text-muted mb-0">
                                        <em>“Step Into the Movement”</em>
                                    </p>
                                </div>

                                <div className="mb-3">
                                    <small className="text-uppercase fw-semibold text-secondary">
                                        Best for:
                                    </small>
                                    <p className="mb-0">
                                        Beginners, students, aspiring farmers
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <h6 className="fw-bold mb-3">🎯 What You Get</h6>

                                    <ul className="small ps-3 d-flex flex-column gap-2" style={{ listStyleType: "circle" }}>
                                        <li>Full access to Main Event (All General Sessions)</li>
                                        <li>Entry into Smart Farming Bootcamps</li>
                                        <li>Access to Main Stage Teachings & Panels</li>
                                        <li>Official Event Souvenirs</li>
                                        <li>SFN Dashboard Onboarding (Get introduced to the system)</li>
                                        <li>Access to Post-Event Community Network</li>
                                    </ul>
                                </div>

                                <div className="mt-auto">
                                    <p className="small">
                                        <strong>💡 What This Unlocks:</strong><br />
                                        You gain clarity, direction, and a new way of thinking about farming.
                                    </p>

                                    <button
                                        onClick={() => openModal({ name: "Starter", price: 15000 })}
                                        className="btn btn-outline-success w-100 mt-3 rounded-pill">
                                        👉 Start Your Journey
                                    </button>
                                </div>

                            </div>
                        </div>

                        {/* PROFESSIONAL */}
                        <div className="col-lg-4">
                            <div className="p-4 border rounded-4 shadow h-100 d-flex flex-column position-relative overflow-hidden">

                                <span
                                    className="badge bg-warning text-dark position-absolute top-0 end-0 m-3 px-3 py-2">
                                    MOST POPULAR
                                </span>

                                <div className="mb-3">
                                    <h5 className="fw-bold">PROFESSIONAL PASS</h5>
                                    <h3 className="fw-bold">₦30,000</h3>
                                    <p className="mb-0 text-muted">
                                        <em>“Position Yourself for Growth”</em>
                                    </p>
                                </div>

                                <div className="mb-3">
                                    <small className="text-uppercase fw-semibold">
                                        Best for:
                                    </small>
                                    <p className="mb-0">
                                        Active farmers, agripreneurs, early-stage investors
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <h6 className="fw-bold mb-3">🎯 Everything in Starter PLUS</h6>

                                    <ul className="small ps-3 d-flex flex-column gap-2" style={{ listStyleType: "circle" }}>
                                        <li>Access to Exclusive Dinner & Networking Hall</li>
                                        <li>Premium Branded Merchandise (T-shirt / Hoodie / Cap)</li>
                                        <li>Access to Curated Investment Opportunities</li>
                                        <li>Entry into Private Mentorship & Strategy Conversations</li>
                                        <li>Access to Breakout Sessions (Focused Learning Rooms)</li>
                                        <li>Priority Networking with Speakers & Ecosystem Players</li>
                                    </ul>
                                </div>

                                <div className="mt-auto">
                                    <p className="small">
                                        <strong>💡 What This Unlocks:</strong><br />
                                        You move from learning… to connecting and positioning for real opportunities.
                                    </p>

                                    <button
                                        onClick={() => openModal({ name: "Professional", price: 30000 })}
                                        className="btn btn-primary text-light fw-semibold w-100 mt-3 rounded-pill">
                                        Upgrade Your Access
                                    </button>
                                </div>

                            </div>
                        </div>

                        {/* ADVANCED */}
                        <div className="col-lg-4">
                            <div className="p-4 border rounded-4 shadow-sm h-100 d-flex flex-column">

                                <div className="mb-3">
                                    <h5 className="fw-bold">🚀 ADVANCED PASS</h5>
                                    <h3 className="fw-bold text-warning">₦100,000</h3>
                                    <p className="text-muted mb-0">
                                        <em>“Enter the Rooms Where Decisions Are Made”</em>
                                    </p>
                                </div>

                                <div className="mb-3">
                                    <small className="text-uppercase fw-semibold text-secondary">
                                        Best for:
                                    </small>
                                    <p className="mb-0">
                                        Serious agribusiness players, investors, decision-makers
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <h6 className="fw-bold mb-3">🎯 Everything in Professional PLUS</h6>

                                    <ul className="small ps-3 d-flex flex-column gap-2" style={{ listStyleType: "circle" }}>
                                        <li>Direct Access to Government Officials & Policy Leaders</li>
                                        <li>Entry into the Deal Room (Investor–Farmer Matching Space)</li>
                                        <li>Access to Closed-Door Investor Soirée</li>
                                        <li>Opportunity for Product Showcasing / Business Pitching</li>
                                        <li>VIP Executive Lounge & Priority Seating</li>
                                        <li>Fast-track pathway into SFN Elite Circle (SmartFarm100)</li>
                                    </ul>
                                </div>

                                <div className="mt-auto">
                                    <p className="small">
                                        <strong>💡 What This Unlocks:</strong><br />
                                        You gain proximity to capital, partnerships, and high-level opportunities.
                                    </p>

                                    <button
                                        onClick={() => openModal({ name: "Advanced", price: 100000 })}
                                        className="btn btn-warning text-light fw-semibold w-100 mt-3 rounded-pill">
                                        Access Power & Opportunity
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* QUICK COMPARISON TABLE */}
                    <div className="mt-5">

                        <div className="text-center mb-4">
                            <h3 className="fw-bold">Quick Comparison</h3>
                            <p className="text-muted mb-0">
                                Compare access levels at a glance.
                            </p>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-bordered align-middle text-center bg-white shadow-sm">

                                <thead className="table-dark">
                                    <tr>
                                        <th>Features</th>
                                        <th>Starter <br /> ₦15K</th>
                                        <th>Professional <br /> ₦30K</th>
                                        <th>Advanced <br /> ₦100K</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    <tr>
                                        <td className="text-start fw-semibold">Main Event Access</td>
                                        <td>✅</td>
                                        <td>✅</td>
                                        <td>✅</td>
                                    </tr>

                                    <tr>
                                        <td className="text-start fw-semibold">Bootcamps</td>
                                        <td>✅</td>
                                        <td>✅</td>
                                        <td>✅</td>
                                    </tr>

                                    <tr>
                                        <td className="text-start fw-semibold">Souvenirs</td>
                                        <td>✅</td>
                                        <td><div className="d-grid justify-content-center"><span>✅</span> <span>Premium</span></div></td>
                                        <td><div className="d-grid justify-content-center"><span>✅</span> <span>Premium</span></div></td>
                                    </tr>

                                    <tr>
                                        <td className="text-start fw-semibold">Dashboard Onboarding</td>
                                        <td>✅</td>
                                        <td>✅</td>
                                        <td>✅</td>
                                    </tr>

                                    <tr>
                                        <td className="text-start fw-semibold">Networking Hall</td>
                                        <td>❌</td>
                                        <td>✅</td>
                                        <td>✅</td>
                                    </tr>

                                    <tr>
                                        <td className="text-start fw-semibold">Mentorship Access</td>
                                        <td>❌</td>
                                        <td>✅</td>
                                        <td>✅</td>
                                    </tr>

                                    <tr>
                                        <td className="text-start fw-semibold">Investment Opportunities</td>
                                        <td>❌</td>
                                        <td>✅</td>
                                        <td>✅</td>
                                    </tr>

                                    <tr>
                                        <td className="text-start fw-semibold">Deal Room Access</td>
                                        <td>❌</td>
                                        <td>❌</td>
                                        <td>✅</td>
                                    </tr>

                                    <tr>
                                        <td className="text-start fw-semibold">Investor Soirée</td>
                                        <td>❌</td>
                                        <td>❌</td>
                                        <td>✅</td>
                                    </tr>

                                    <tr>
                                        <td className="text-start fw-semibold">Government/Investor Access</td>
                                        <td>❌</td>
                                        <td>❌</td>
                                        <td>✅</td>
                                    </tr>

                                    <tr>
                                        <td className="text-start fw-semibold">Product Showcase</td>
                                        <td>❌</td>
                                        <td>❌</td>
                                        <td>✅</td>
                                    </tr>

                                </tbody>

                            </table>
                        </div>

                    </div>

                </div>
            </section>

            {/* INVESTMENT POSITIONING */}
            <section className="py-5 bg-dark text-white position-relative overflow-hidden">

                <div className="container text-center position-relative" style={{ zIndex: 2 }}>

                    <span className="badge bg-success px-3 py-2 mb-3">
                        💰 INVESTMENT POSITIONING
                    </span>

                    <h2 className="fw-bold display-5 mb-3">
                        Every Ticket Is Not a Cost…
                    </h2>

                    <p className="lead text-light mb-5">
                        It is an investment into your next level.
                    </p>

                    <div className="row g-4 justify-content-center">

                        <div className="col-md-4">
                            <div className="bg-white text-dark rounded-4 p-4 shadow h-100">
                                <h2 className="fw-bold text-success">₦15,000</h2>
                                <h5 className="fw-bold mt-3">Clarity & Direction</h5>
                                <p className="small text-muted mb-0">
                                    Build understanding, gain vision, and discover the future of smart farming.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="bg-success text-white rounded-4 p-4 shadow h-100">
                                <h2 className="fw-bold">₦30,000</h2>
                                <h5 className="fw-bold mt-3">Connection & Positioning</h5>
                                <p className="small mb-0">
                                    Connect with serious players and position yourself for opportunities.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="bg-warning text-dark rounded-4 p-4 shadow h-100">
                                <h2 className="fw-bold">₦100,000</h2>
                                <h5 className="fw-bold mt-3">Access & Opportunity</h5>
                                <p className="small mb-0">
                                    Gain access to capital, partnerships, influence, and high-level rooms.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </section>

            {/* URGENCY SECTION */}
            <section className="py-5 bg-light position-relative overflow-hidden">

                <div className="container text-center">

                    <span className="badge bg-danger px-3 py-2 mb-3">
                        LIMITED ACCESS
                    </span>

                    <h2 className="fw-bold mb-3">
                        We Are Onboarding A Limited Number Of Participants
                    </h2>

                    <p className="lead text-muted mx-auto" style={{ maxWidth: "850px" }}>
                        The earlier you move, the better your position.
                    </p>

                    <div className="row g-4 mt-4 justify-content-center">

                        <div className="col-md-4">
                            <div className="bg-white rounded-4 shadow-sm p-4 h-100">
                                <div style={{ fontSize: "2rem" }}>🤝</div>
                                <h5 className="fw-bold mt-3">Better Connections</h5>
                                <p className="text-muted small mb-0">
                                    Meet ecosystem players, mentors, and investors early.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="bg-white rounded-4 shadow-sm p-4 h-100">
                                <div style={{ fontSize: "2rem" }}>🚀</div>
                                <h5 className="fw-bold mt-3">Better Exposure</h5>
                                <p className="text-muted small mb-0">
                                    Position yourself ahead of others in the ecosystem.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="bg-white rounded-4 shadow-sm p-4 h-100">
                                <div style={{ fontSize: "2rem" }}>🎯</div>
                                <h5 className="fw-bold mt-3">Better Outcomes</h5>
                                <p className="text-muted small mb-0">
                                    Early movers gain stronger access to opportunities and growth.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </section>

            {/* BONUS SECTION */}
            <section className="py-5 bg-white">

                <div className="container">

                    <div className="text-center mb-5">
                        <span className="badge bg-success px-3 py-2 mb-3">
                            BONUS (LIMITED)
                        </span>

                        <h2 className="fw-bold">
                            Additional Benefits You Receive
                        </h2>
                    </div>

                    <div className="row g-4 justify-content-center">

                        <div className="col-md-4">
                            <div className="border rounded-4 p-4 h-100 shadow-sm text-center">
                                <div style={{ fontSize: "2rem" }}>📘</div>
                                <h5 className="fw-bold mt-3">
                                    Smart Farming Starter Pack
                                </h5>
                                <p className="text-muted small mb-0">
                                    Free PDF resources and training materials to help you begin properly.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="border rounded-4 p-4 h-100 shadow-sm text-center">
                                <div style={{ fontSize: "2rem" }}>💬</div>
                                <h5 className="fw-bold mt-3">
                                    Private WhatsApp Community
                                </h5>
                                <p className="text-muted small mb-0">
                                    Stay connected with participants, mentors, and ecosystem players.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="border rounded-4 p-4 h-100 shadow-sm text-center">
                                <div style={{ fontSize: "2rem" }}>📢</div>
                                <h5 className="fw-bold mt-3">
                                    Priority SFN Updates
                                </h5>
                                <p className="text-muted small mb-0">
                                    Get early notifications about SFN programs and opportunities.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </section>

            {/* PARTNERS & COLLABORATORS */}
            <section className="py-5 bg-light border-top">

                <div className="container">

                    <div className="text-center mb-5">

                        <span className="badge bg-dark px-3 py-2 mb-3">
                            TRUSTED COLLABORATORS
                        </span>

                        <h2 className="fw-bold">
                            Our Collaborators & Partners
                        </h2>

                        <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
                            SFM2026 is supported by visionary organizations, ecosystem leaders,
                            innovators, and institutions committed to transforming the future
                            of agriculture and smart farming across Africa.
                        </p>

                    </div>

                    <div className="row g-4 justify-content-center align-items-center">

                        {/* PARTNER 1 */}
                        <div className="col-6 col-md-4 col-lg-2">
                            <div className="bg-white border rounded-4 shadow-sm p-4 text-center h-100 d-flex align-items-center justify-content-center">

                                <img
                                    src="/assets/img/partners/partner-1.png"
                                    alt="Partner 1"
                                    className="img-fluid"
                                    style={{
                                        maxHeight: "100px",
                                        objectFit: "contain",
                                    }}
                                />

                            </div>
                        </div>

                        {/* PARTNER 2 */}
                        <div className="col-6 col-md-4 col-lg-2">
                            <div className="bg-white border rounded-4 shadow-sm p-4 text-center h-100 d-flex align-items-center justify-content-center">

                                <img
                                    src="/assets/img/partners/partner-2.png"
                                    alt="Partner 2"
                                    className="img-fluid"
                                    style={{
                                        maxHeight: "100px",
                                        objectFit: "contain",
                                    }}
                                />

                            </div>
                        </div>

                        {/* PARTNER 3 */}
                        <div className="col-6 col-md-4 col-lg-2">
                            <div className="bg-white border rounded-4 shadow-sm p-4 text-center h-100 d-flex align-items-center justify-content-center">

                                <img
                                    src="/assets/img/partners/partner-3.png"
                                    alt="Partner 3"
                                    className="img-fluid"
                                    style={{
                                        maxHeight: "100px",
                                        objectFit: "contain",
                                    }}
                                />

                            </div>
                        </div>

                        {/* PARTNER 4 */}
                        <div className="col-6 col-md-4 col-lg-2">
                            <div className="bg-white border rounded-4 shadow-sm p-4 text-center h-100 d-flex align-items-center justify-content-center">

                                <img
                                    src="/assets/img/partners/partner-4.png"
                                    alt="Partner 4"
                                    className="img-fluid"
                                    style={{
                                        maxHeight: "100px",
                                        objectFit: "contain",
                                    }}
                                />

                            </div>
                        </div>

                    </div>

                </div>

            </section>

            {/* FINAL CTA */}
            <section
                className="py-5 text-white position-relative overflow-hidden"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
            url('/assets/img/sm-2.jpeg')
        `,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >

                <div className="container text-center position-relative" style={{ zIndex: 2 }}>

                    <span className="badge bg-warning text-dark px-3 py-2 mb-3">
                        FINAL CALL
                    </span>

                    <h2 className="fw-bold display-5 mb-4 text-light">
                        Africa doesn’t need more farmers…
                    </h2>

                    <p
                        className="lead mx-auto mb-5 text-light"
                        style={{ maxWidth: "850px" }}
                    >
                        It needs intelligent producers who understand systems,
                        scale, and opportunity.
                    </p>

                    <h4 className="fw-bold mb-4 text-light">
                        Where will you stand?
                    </h4>

                    <div className="d-flex justify-content-center gap-3 flex-wrap mb-5">

                        <button
                            onClick={() => openModal({ name: "Starter", price: 15000 })}
                            className="btn btn-success btn-lg rounded-pill px-4">
                            👉 Secure Starter Pass
                        </button>

                        <button
                            onClick={() => openModal({ name: "Professional", price: 30000 })}
                            className="btn btn-outline-light btn-lg rounded-pill px-4">
                            👉 Go Professional
                        </button>

                        <button
                            onClick={() => openModal({ name: "Advanced", price: 100000 })}
                            className="btn btn-warning text-dark btn-lg rounded-pill px-4 fw-semibold">
                            👉 Enter Advanced Level
                        </button>

                    </div>

                    <div
                        className="mx-auto"
                        style={{ maxWidth: "900px" }}
                    >
                        <p className="fs-5 fw-semibold mb-3">
                            🌊 This is not just an event.
                        </p>

                        <p className="lead text-light mb-2">
                            This is a movement, a system, and a doorway.
                        </p>

                        <p className="fw-bold fs-5 text-warning">
                            And every doorway has levels.
                        </p>

                        <h3 className="fw-bold mt-4 text-light">
                            Choose yours. Step in.
                        </h3>
                    </div>

                </div>

            </section>

            {/* MODAL */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="1">

                    <div className="modal-dialog modal-dialog-centered">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5 className="modal-title">
                                    Complete Registration
                                </h5>

                                <button
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>

                            </div>

                            <div className="modal-body">

                                <div className="mb-3 p-3 border rounded bg-light">

                                    <strong>
                                        {selectedTier?.name} Pass
                                    </strong>

                                    <div className="text-success">
                                        ₦{selectedTier?.price?.toLocaleString()}
                                    </div>

                                    <small className="text-muted">
                                        Secure your access. Limited slots available.
                                    </small>

                                </div>

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3" hidden={isAuthenticated}>

                                        <label className="form-label">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            name="fullName"
                                            className="form-control"
                                            required={!isAuthenticated}
                                            value={form.fullName}
                                            onChange={handleChange}
                                            hidden={isAuthenticated}
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
                                            readOnly={isAuthenticated}
                                        />

                                        {isAuthenticated && (
                                            <small className="text-muted">
                                                Using your logged-in account email.
                                            </small>
                                        )}

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Category
                                        </label>

                                        <select
                                            name="role"
                                            className="form-select"
                                            value={form.role}
                                            onChange={handleChange}
                                        >
                                            <option>Farmer</option>
                                            <option>Agribusiness</option>
                                            <option>Investor</option>
                                            <option>Agri-Tech</option>
                                            <option>Organization</option>
                                        </select>

                                    </div>

                                    <button
                                        className="btn btn-success w-100"
                                        disabled={loading}
                                    >

                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            "Proceed to Payment"
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
                    ></div>

                </div>
            )}

        </main>
    );
}
