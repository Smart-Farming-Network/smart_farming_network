'use client';
import Link from "next/link";
import Image from "next/image";

export default function ServicesPage() {
    return (
        <>
            {/* HERO */}
            <section className="hero-modern d-flex align-items-center text-white">
                <div className="container text-center">
                    <h1 className="display-3 fw-bold mb-3 text-light">
                        Smart Farming Services for the Future
                    </h1>
                    <p className="lead mx-auto hero-text text-light">
                        We empower farmers, investors, and agribusinesses with digital tools,
                        automation, and intelligence to build profitable and sustainable farms.
                    </p>

                    <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
                        <Link href="#" className="btn btn-success btn-lg px-4">
                            Become a Smart Farmer
                        </Link>
                        <Link href="#" className="btn btn-outline-light btn-lg px-4">
                            Build a Smart Farm
                        </Link>
                        <Link href="#" className="btn btn-warning btn-lg px-4">
                            Invest in Farms
                        </Link>
                    </div>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="py-5 bg-light">
                <div className="container">

                    <SectionHeader
                        title="Our Services"
                        subtitle="A complete ecosystem powering modern agriculture"
                    />

                    <div className="row g-4 mt-3">

                        <ServiceModern
                            title="Smart Farm Development"
                            price="₦750K – ₦13M"
                            image="/assets/img/services/800x700.png"
                            desc="Technology-driven farm installations powered by automation and IoT."
                            features={[
                                "Smart irrigation",
                                "IoT sensors",
                                "Farm dashboard",
                                "Mobile monitoring"
                            ]}
                            button="Build My Smart Farm"
                        />

                        <ServiceModern
                            title="Smart Farmer Academy"
                            price="₦10K – ₦120K"
                            image="/assets/img/services/800x700.png"
                            desc="Hands-on training programs for modern agriculture."
                            features={[
                                "Precision farming",
                                "Profitability",
                                "Agri-tech tools",
                                "Market access"
                            ]}
                            button="Enroll Now"
                        />

                        <ServiceModern
                            title="Verification & Certification"
                            price="₦5K – ₦25K"
                            image="/assets/img/services/800x700.png"
                            desc="Build trust and attract investors with verified profiles."
                            features={[
                                "Verified badge",
                                "Higher visibility",
                                "Investor trust"
                            ]}
                            button="Get Verified"
                        />

                        <ServiceModern
                            title="Farm Marketplace"
                            price="₦5K – ₦30K /yr"
                            image="/assets/img/services/800x700.png"
                            desc="List farms and connect with buyers and investors."
                            features={[
                                "Farm visibility",
                                "Produce sales",
                                "Partnerships"
                            ]}
                            button="List My Farm"
                        />

                        <ServiceModern
                            title="Farm Management Tech"
                            price="₦2.5K – ₦10K /mo"
                            image="/assets/img/services/800x700.png"
                            desc="Smart dashboards for tracking and optimizing farm operations."
                            features={[
                                "Analytics",
                                "Expense tracking",
                                "Investor reports"
                            ]}
                            button="Use Dashboard"
                        />

                        <ServiceModern
                            title="IoT Monitoring"
                            price="₦250K + ₦5K/mo"
                            image="/assets/img/services/800x700.png"
                            desc="Monitor your farm remotely with real-time alerts."
                            features={[
                                "Soil sensors",
                                "Weather tracking",
                                "Smart alerts"
                            ]}
                            button="Monitor Farm"
                        />

                        <ServiceModern
                            title="Agricultural Consultancy"
                            price="₦50K – ₦250K+"
                            image="/assets/img/services/800x700.png"
                            desc="Expert advisory for large-scale farm planning."
                            features={[
                                "Planning",
                                "Execution strategy",
                                "Expert insights"
                            ]}
                            button="Book Consultation"
                        />

                        <ServiceModern
                            title="Investor Matchmaking"
                            price="15% Fee"
                            image="/assets/img/services/800x700.png"
                            desc="We connect investors with verified farmers."
                            features={[
                                "Matching",
                                "Structuring",
                                "Contracts"
                            ]}
                            button="Invest Now"
                        />

                        <ServiceModern
                            title="Corporate Training"
                            price="₦500K – ₦3M"
                            image="/assets/img/services/800x700.png"
                            desc="Agritech training programs for institutions."
                            features={[
                                "NGOs",
                                "Governments",
                                "Youth programs"
                            ]}
                            button="Partner With Us"
                        />

                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="cta-modern text-white text-center d-flex align-items-center">
                <div className="container">
                    <h2 className="fw-bold display-5 text-light">The Future of Farming Starts Here</h2>
                    <p className="mt-3 mx-auto cta-text text-light">
                        Smart Farming Network connects technology, trust, and agriculture into one powerful ecosystem.
                    </p>

                    <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
                        <Link href="#" className="btn btn-success btn-lg px-4">
                            Join the Network
                        </Link>
                        <Link href="#" className="btn btn-outline-light btn-lg px-4">
                            Partner With Us
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}


/* HEADER */
function SectionHeader({ title, subtitle }) {
    return (
        <div className="text-center mb-4">
            <h2 className="fw-bold">{title}</h2>
            <p className="text-muted">{subtitle}</p>
        </div>
    );
}


/* MODERN CARD */
function ServiceModern({ title, price, image, desc, features, button }) {
    return (
        <div className="col-md-6 col-lg-4">
            <div className="card modern-card h-100 border-0">

                <div className="card-img-wrapper">
                    <Image width={500} height={300} src={image} className="card-img-top" alt={title} />
                    <span className="price-badge">{price}</span>
                </div>

                <div className="card-body">
                    <h5 className="fw-bold">{title}</h5>
                    <p className="text-muted small">{desc}</p>

                    <ul className="list-unstyled small">
                        {features.map((f, i) => (
                            <li key={i}>• {f}</li>
                        ))}
                    </ul>

                    <Link href="#" className="btn btn-success w-100 mt-3">
                        {button}
                    </Link>
                </div>

            </div>
        </div>
    );
}