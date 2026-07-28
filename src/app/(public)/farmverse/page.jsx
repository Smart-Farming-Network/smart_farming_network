"use client";
import Image from "next/image"
import Link from "next/link"

export default function FarmVersePage() {
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

                            <div className="d-flex flex-wrap gap-3">

                                <Link
                                    href="/SFN2026"
                                    className="btn btn-success btn-lg px-5 rounded-pill"
                                >
                                    Join Waitlist
                                </Link>

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
                                        alt=""
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
                                alt=""
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

        </main>
    );
}