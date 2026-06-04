'use client';

import { useState, useEffect } from "react";
import Image from "next/image";

export default function LP2026Page() {
    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        company: "",
        email: "",
        accessLevel: "",
        financialCapacity: "",
        strategicVision: "",
        engagementTimeline: "",
        referralSource: ""
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

    const openRegistration = (accessLevel = "") => {

        setForm((prev) => ({
            ...prev,
            accessLevel
        }));

        setShowModal(true);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await fetch(
                "/api/lp2026/register",
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
                "/L&P2026/success";

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

            {/* HERO SECTION */}
            <section
                className="text-white text-center d-flex align-items-center position-relative overflow-hidden"
                style={{
                    minHeight: "100vh",
                    background: `
                        linear-gradient(rgba(0,0,0,0.78), rgba(0,0,0,0.78)),
                        url('/assets/img/sm.jpeg') center/cover no-repeat
                    `
                }}
            >

                <div className="container position-relative" style={{ zIndex: 2 }}>

                    <span className="badge bg-warning text-dark px-4 py-2 mb-4">
                        🌍 SMART FARMER MOVEMENT 2026
                    </span>

                    <h1 className="display-3 fw-bold text-light mb-4">
                        Investors & Partners Soirée
                    </h1>

                    <h3 className="fw-semibold text-warning mb-4">
                        “Where Agriculture Meets Capital, Policy & Opportunity”
                    </h3>

                    <p
                        className="lead text-light mx-auto mb-4"
                        style={{ maxWidth: "950px" }}
                    >
                        The Future of Agriculture Will Not Be Built in Isolation.
                    </p>

                    <p
                        className="fs-5 text-light mx-auto"
                        style={{ maxWidth: "950px" }}
                    >
                        It will be built in rooms where farmers meet investors,
                        innovation meets structure, and ideas become scalable systems.
                    </p>

                    <p
                        className="text-light mx-auto mt-4"
                        style={{ maxWidth: "900px" }}
                    >
                        The SFM2026 Investors & Partners Soirée is a private convergence
                        designed for visionary stakeholders shaping the next chapter
                        of African agriculture.
                    </p>

                    <div className="mt-5">

                        <button
                            onClick={() => openRegistration("")}
                            className="btn btn-warning text-dark btn-lg rounded-pill px-5 fw-semibold"
                        >
                            Apply For Access
                        </button>

                    </div>

                </div>

            </section>

            {/* WHAT IS THE SOIRÉE */}
            <section className="py-5 bg-light">

                <div className="container">

                    <div className="text-center mb-5">

                        <span className="badge bg-dark px-3 py-2 mb-3">
                            WHAT IS THE INVESTORS & PARTNERS SOIRÉE?
                        </span>

                        <h2 className="fw-bold">
                            More Than A Networking Event
                        </h2>

                    </div>

                    <div
                        className="mx-auto text-center"
                        style={{ maxWidth: "950px" }}
                    >

                        <p className="lead text-muted">
                            The Investors & Partners Soirée is an exclusive networking
                            and strategic engagement experience hosted by GoodLife
                            Smart Farming Network Ltd under the Smart Farmer Movement 2026 initiative.
                        </p>

                        <p className="text-muted">
                            This is not just another networking event.
                        </p>

                        <p className="text-muted">
                            It is a curated environment where investors discover scalable
                            agricultural opportunities, founders connect with strategic partners,
                            institutions engage emerging innovation, and conversations move
                            beyond theory into collaboration.
                        </p>

                    </div>

                </div>

            </section>

            {/* WHO SHOULD ATTEND */}
            <section className="py-5 bg-white">

                <div className="container">

                    <div className="text-center mb-5">

                        <span className="badge bg-success px-3 py-2 mb-3">
                            WHO SHOULD ATTEND?
                        </span>

                        <h2 className="fw-bold">
                            Curated For Visionary Stakeholders
                        </h2>

                    </div>

                    <div className="row g-4">

                        <div className="col-md-4">
                            <div className="border rounded-4 shadow-sm p-4 h-100">

                                <div style={{ fontSize: "2.5rem" }}>

                                </div>

                                <h5 className="fw-bold mt-3">
                                    Agribusiness Founders
                                </h5>

                                <p className="text-muted mb-0">
                                    Connect with investors, policymakers,
                                    and ecosystem leaders.
                                </p>

                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="border rounded-4 shadow-sm p-4 h-100">

                                <div style={{ fontSize: "2.5rem" }}>

                                </div>

                                <h5 className="fw-bold mt-3">
                                    Investors & Venture Partners
                                </h5>

                                <p className="text-muted mb-0">
                                    Discover structured agricultural opportunities
                                    and emerging agritech systems.
                                </p>

                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="border rounded-4 shadow-sm p-4 h-100">

                                <div style={{ fontSize: "2.5rem" }}>

                                </div>

                                <h5 className="fw-bold mt-3">
                                    Government & Development Institutions
                                </h5>

                                <p className="text-muted mb-0">
                                    Engage innovators driving agricultural transformation
                                    and youth inclusion.
                                </p>

                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="border rounded-4 shadow-sm p-4 h-100">

                                <div style={{ fontSize: "2.5rem" }}>

                                </div>

                                <h5 className="fw-bold mt-3">
                                    Agricultural Service Providers
                                </h5>

                                <p className="text-muted mb-0">
                                    Showcase solutions, technologies,
                                    products, and systems.
                                </p>

                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="border rounded-4 shadow-sm p-4 h-100">

                                <div style={{ fontSize: "2.5rem" }}>

                                </div>

                                <h5 className="fw-bold mt-3">
                                    Corporate & Strategic Partners
                                </h5>

                                <p className="text-muted mb-0">
                                    Position your organization within Africa’s evolving
                                    food and agricultural economy.
                                </p>

                            </div>
                        </div>

                    </div>

                </div>

            </section>

            {/* WHAT TO EXPECT */}
            <section className="py-5 bg-dark text-white">

                <div className="container">

                    <div className="text-center mb-5">

                        <span className="badge bg-warning text-dark px-3 py-2 mb-3">
                            WHAT TO EXPECT
                        </span>

                        <h2 className="fw-bold">
                            Strategic Conversations & High-Level Access
                        </h2>

                    </div>

                    <div className="row g-4">

                        <div className="col-md-6">

                            <div className="bg-white text-dark rounded-4 p-4 h-100 shadow">

                                <h5 className="fw-bold mb-3">
                                    High-Level Networking
                                </h5>

                                <p className="mb-0">
                                    Meet decision-makers, founders,
                                    innovators, investors, and ecosystem builders
                                    in one environment.
                                </p>

                            </div>

                        </div>

                        <div className="col-md-6">

                            <div className="bg-white text-dark rounded-4 p-4 h-100 shadow">

                                <h5 className="fw-bold mb-3">
                                    Strategic Conversations
                                </h5>

                                <ul className="small ps-3 d-flex flex-column gap-2 mb-0">
                                    <li>Smart Farming</li>
                                    <li>Food Security</li>
                                    <li>Agricultural Investment</li>
                                    <li>Agritech & AI</li>
                                    <li>Export & Supply Chains</li>
                                    <li>Youth Inclusion in Agriculture</li>
                                </ul>

                            </div>

                        </div>

                        <div className="col-md-6">

                            <div className="bg-white text-dark rounded-4 p-4 h-100 shadow">

                                <h5 className="fw-bold mb-3">
                                    Investment & Partnership Opportunities
                                </h5>

                                <p className="mb-0">
                                    Explore collaboration opportunities across farming
                                    operations, agritech systems, supply chains,
                                    financing models, and scalable agricultural projects.
                                </p>

                            </div>

                        </div>

                        <div className="col-md-6">

                            <div className="bg-white text-dark rounded-4 p-4 h-100 shadow">

                                <h5 className="fw-bold mb-3">
                                    Executive Experience
                                </h5>

                                <p className="mb-0">
                                    A premium atmosphere designed for strategic networking,
                                    executive introductions, and meaningful conversations.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* FEATURED ACCESS */}
            <section className="py-5 bg-light">

                <div className="container">

                    <div className="text-center mb-5">

                        <span className="badge bg-success px-3 py-2 mb-3">
                            FEATURED ACCESS
                        </span>

                        <h2 className="fw-bold">
                            Exclusive Strategic Benefits
                        </h2>

                    </div>

                    <div className="row g-4 justify-content-center">

                        {[
                            "Investor Networking Lounge",
                            "Partnership Matching Opportunities",
                            "Private Founder Conversations",
                            "Agricultural Innovation Showcase",
                            "Strategic Ecosystem Introductions",
                            "Executive Refreshments & Experience"
                        ].map((item, index) => (

                            <div className="col-md-4" key={index}>

                                <div className="bg-white border rounded-4 shadow-sm p-4 h-100 text-center">

                                    <div style={{ fontSize: "2rem" }}>
                                        ✔️
                                    </div>

                                    <h6 className="fw-bold mt-3 mb-0">
                                        {item}
                                    </h6>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* VENUE EXPERIENCE */}
            <section className="py-5 bg-white">

                <div className="container text-center">

                    <span className="badge bg-danger px-3 py-2 mb-3">
                        EXCLUSIVE VENUE EXPERIENCE
                    </span>

                    <h2 className="fw-bold mb-4">
                        Curated Attendance. Premium Environment.
                    </h2>

                    <div
                        className="bg-light rounded-4 shadow-sm p-5 mx-auto"
                        style={{ maxWidth: "850px" }}
                    >

                        <h4 className="fw-bold mb-3">
                            Venue
                        </h4>

                        <p className="lead mb-3">
                            Undisclosed until after successful registration confirmation.
                        </p>

                        <p className="text-muted mb-0">
                            This ensures curated attendance, quality engagement,
                            and a premium networking atmosphere.
                        </p>

                    </div>

                </div>

            </section>

            {/* ACCESS LEVELS */}
            <section
                id="access-levels"
                className="py-5 bg-light"
            >

                <div className="container">

                    <div className="text-center mb-5">

                        <span className="badge bg-dark px-3 py-2 mb-3">
                            ACCESS LEVELS
                        </span>

                        <h2 className="fw-bold">
                            Choose Your Level Of Access
                        </h2>

                    </div>

                    <div className="row g-4">

                        {/* STANDARD */}
                        <div className="col-lg-4">

                            <div className="bg-white border rounded-4 shadow-sm p-4 h-100 d-flex flex-column">

                                <div className="mb-4">

                                    <h5 className="fw-bold">
                                        STANDARD ACCESS
                                    </h5>

                                    <h2 className="fw-bold text-success">
                                        FREE
                                    </h2>

                                    <p className="text-muted">
                                        “Enter the Room”
                                    </p>

                                </div>

                                <ul className="small ps-3 d-flex flex-column gap-2">

                                    <li>General Soirée Access</li>
                                    <li>Networking Opportunities</li>
                                    <li>Executive Refreshments</li>
                                    <li>Access to Selected Conversations</li>

                                </ul>

                                <div className="mt-auto pt-3">

                                    <button
                                        className="btn btn-warning text-dark w-100 rounded-pill fw-semibold"
                                        onClick={() => openRegistration("Standard")}
                                    >
                                        Apply Now
                                    </button>

                                </div>

                            </div>

                        </div>

                        {/* EXECUTIVE */}
                        <div className="col-lg-4">

                            <div className="bg-white border rounded-4 shadow position-relative overflow-hidden p-4 h-100 d-flex flex-column">

                                <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-3 px-3 py-2">
                                    MOST POPULAR
                                </span>

                                <div className="mb-4">

                                    <h5 className="fw-bold">
                                        EXECUTIVE ACCESS
                                    </h5>

                                    <h2 className="fw-bold">
                                        ₦75,000
                                    </h2>

                                    <p className="text-muted">
                                        “Position for Opportunity”
                                    </p>

                                </div>

                                <ul className="small ps-3 d-flex flex-column gap-2">

                                    <li>Everything in Standard PLUS</li>
                                    <li>Priority Networking Access</li>
                                    <li>Founder & Investor Mixer</li>
                                    <li>Premium Reserved Seating</li>
                                    <li>Partnership Matchmaking Support</li>
                                    <li>Branded Executive Souvenir Package</li>

                                </ul>

                                <div className="mt-auto pt-3">

                                    <button
                                        className="btn btn-warning text-dark w-100 rounded-pill fw-semibold"
                                        onClick={() => openRegistration("Executive")}
                                    >
                                        Apply Now
                                    </button>

                                </div>


                            </div>

                        </div>

                        {/* INNER CIRCLE */}
                        <div className="col-lg-4">

                            <div className="bg-white border rounded-4 shadow-sm p-4 h-100 d-flex flex-column">

                                <div className="mb-4">

                                    <h5 className="fw-bold">
                                        INNER CIRCLE ACCESS
                                    </h5>

                                    <h2 className="fw-bold text-warning">
                                        ₦200,000
                                    </h2>

                                    <p className="text-muted">
                                        “Access Beyond Networking”
                                    </p>

                                </div>

                                <ul className="small ps-3 d-flex flex-column gap-2">

                                    <li>Everything in Executive PLUS</li>
                                    <li>Closed-Door Investor Conversations</li>
                                    <li>Private Strategy Roundtable</li>
                                    <li>Direct Ecosystem Introductions</li>
                                    <li>Showcase/Pitch Opportunity</li>
                                    <li>VIP Executive Lounge Access</li>
                                    <li>Strategic Visibility within SFM2026 Ecosystem</li>

                                </ul>

                                <div className="mt-auto pt-3">

                                    <button
                                        className="btn btn-dark w-100 rounded-pill"
                                        onClick={() => openRegistration("Inner Circle")}
                                    >
                                        Apply Now
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* WHY THIS MATTERS */}
            <section className="py-5 bg-dark text-white">

                <div className="container text-center">

                    <span className="badge bg-success px-3 py-2 mb-3">
                        WHY THIS MATTERS
                    </span>

                    <h2 className="fw-bold display-5 mb-4">
                        Agriculture Is No Longer Just Production
                    </h2>

                    <p
                        className="lead mx-auto"
                        style={{ maxWidth: "900px" }}
                    >
                        It is technology, data, logistics, investment,
                        policy, and intelligent systems.
                    </p>

                    <p
                        className="fs-5 mx-auto text-light"
                        style={{ maxWidth: "850px" }}
                    >
                        The future belongs to those positioned early.
                        This soirée creates that positioning.
                    </p>

                </div>

            </section>

            {/* ABOUT */}
            <section className="py-5 bg-light">

                <div className="container text-center">

                    <span className="badge bg-dark px-3 py-2 mb-3">
                        ABOUT SFM2026
                    </span>

                    <h2 className="fw-bold mb-4">
                        A Movement Focused On Transformation
                    </h2>

                    <p
                        className="text-muted mx-auto"
                        style={{ maxWidth: "900px" }}
                    >
                        The Smart Farmer Movement 2026 is a movement focused on
                        transforming agriculture through intelligence,
                        technology, structure, collaboration,
                        and scalable opportunity.
                    </p>

                    <h5 className="fw-bold mt-4">
                        Powered by:
                    </h5>

                    <p className="lead mb-0">
                        GoodLife Smart Farming Network Ltd
                    </p>

                </div>

            </section>

            {/* LIMITED REGISTRATION */}
            <section className="py-5 bg-white">

                <div className="container text-center">

                    <span className="badge bg-danger px-3 py-2 mb-3">
                        LIMITED REGISTRATION
                    </span>

                    <h2 className="fw-bold mb-4">
                        Attendance Is Curated & Selective
                    </h2>

                    <p
                        className="lead text-muted mx-auto"
                        style={{ maxWidth: "850px" }}
                    >
                        Attendance is curated to preserve quality interactions,
                        strategic alignment, and meaningful engagement.
                    </p>

                    <p className="fw-semibold fs-5 mt-4">
                        Registration remains selective and limited.
                    </p>

                </div>

            </section>

            {/* FINAL CTA 
            <section
                className="py-5 text-white position-relative overflow-hidden"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.82), rgba(0,0,0,0.82)),
                        url('/assets/img/events/investors-soiree.jpg')
                    `,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >

                <div className="container text-center position-relative" style={{ zIndex: 2 }}>

                    <span className="badge bg-warning text-dark px-3 py-2 mb-3">
                        FINAL CALL TO ACTION
                    </span>

                    <h2 className="fw-bold display-5 mb-4 text-light">
                        The Future Of Agriculture Is Being Shaped
                        By The People In The Room.
                    </h2>

                    <p
                        className="lead mx-auto text-light mb-5"
                        style={{ maxWidth: "850px" }}
                    >
                        Will you be one of them?
                    </p>

                    <div className="mb-5">

                        <a
                            href="https://smartfarmingnetwork.com/I&P2026"
                            className="btn btn-warning text-dark btn-lg rounded-pill px-5 fw-bold"
                        >
                            REGISTER NOW
                        </a>

                    </div>

                    <div className="mb-5">

                        <p className="mb-2 fs-5">
                            📩 admin@smartfarmingnetwork.com
                        </p>

                        <p className="mb-0 fs-5">
                            📞 09121881781
                        </p>

                    </div>

                    <div
                        className="mx-auto"
                        style={{ maxWidth: "850px" }}
                    >

                        <p className="fs-4 fw-semibold text-light">
                            🌊 “Great industries are not built by ideas alone…
                        </p>

                        <p className="lead text-warning mb-0">
                            they are built by partnerships,
                            capital, and aligned vision.”
                        </p>

                    </div>

                </div>

            </section>*/}

            <section className="py-5 text-white position-relative overflow-hidden"
                style={{
                    backgroundImage: `
                        url('/assets/img/events/investors-soiree.jpg')
                    `,
                    height: "100vh",
                    width: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
            </section>

            {showModal && (

                <div className="modal fade show d-block">

                    <div className="modal-dialog modal-lg modal-dialog-centered">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5 className="modal-title">
                                    LP2026 Registration
                                </h5>

                                <button
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                />

                            </div>

                            <div className="modal-body">

                                <div className="alert alert-warning">

                                    Applications are reviewed manually.

                                    Approved applicants will receive
                                    payment instructions via email.

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
                                            Company
                                        </label>

                                        <input
                                            type="text"
                                            name="company"
                                            className="form-control"
                                            value={form.company}
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

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Investment Interest Level
                                        </label>

                                        <select
                                            className="form-select"
                                            name="accessLevel"
                                            required
                                            value={form.accessLevel}
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Select Option
                                            </option>

                                            <option value="Standard">
                                                Standard Access
                                            </option>

                                            <option value="Executive">
                                                Executive Access
                                            </option>

                                            <option value="Inner Circle">
                                                Inner Circle Access
                                            </option>

                                        </select>

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Financial Capacity Range
                                        </label>

                                        <select
                                            className="form-select"
                                            name="financialCapacity"
                                            required
                                            value={form.financialCapacity}
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Select Range
                                            </option>

                                            <option value="< $10k">
                                                Less than $10,000
                                            </option>

                                            <option value="$10k - $50k">
                                                $10,000 - $50,000
                                            </option>

                                            <option value="$50k+">
                                                $50,000+
                                            </option>

                                        </select>

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Strategic Vision
                                        </label>

                                        <textarea
                                            rows="4"
                                            name="strategicVision"
                                            className="form-control"
                                            required
                                            value={form.strategicVision}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Preferred Engagement Timeline
                                        </label>

                                        <input
                                            type="text"
                                            name="engagementTimeline"
                                            className="form-control"
                                            required
                                            placeholder="Immediately, 3 months, 6 months..."
                                            value={form.engagementTimeline}
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
