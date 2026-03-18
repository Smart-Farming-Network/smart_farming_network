import Link from "next/link";

export default function ProjectFarm100Page() {
    return (
        <div>

            {/* ================= HERO ================= */}
            <section className="bg-dark text-white py-5">
                <div className="container text-center">
                    <h1 className="display-4 fw-bold mb-3">PROJECT FARM 100</h1>

                    <p className="lead fs-4">
                        100 Smart Farms. <br />
                        <span className="fw-semibold">One Intelligent Infrastructure.</span>
                    </p>

                    <div className="row justify-content-center mt-4">
                        {[
                            "Data-driven cultivation",
                            "Climate-controlled systems",
                            "Guaranteed traceability",
                            "Structured profitability",
                        ].map((item, i) => (
                            <div key={i} className="col-md-3 col-6 mb-3">
                                <div className="bg-secondary bg-opacity-25 p-3 rounded">
                                    {item}
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="mt-4 fst-italic fs-5">
                        This is not traditional farming.<br />
                        This is agricultural architecture.
                    </p>
                </div>
            </section>


            {/* ================= VISION ================= */}
            <section className="py-5 bg-white">
                <div className="container text-center">
                    <h2 className="fw-bold mb-4">THE VISION</h2>

                    <p className="fs-5">
                        Africa does not lack fertile land. <br />
                        Africa lacks coordinated systems.
                    </p>

                    <p className="mt-4">
                        Project Farm 100 is a fully structured smart-farming infrastructure
                        designed to eliminate chaos in agricultural production and replace it with:
                    </p>

                    <div className="row justify-content-center mt-4">
                        {[
                            "Controlled environments",
                            "Predictable yields",
                            "Real-time data monitoring",
                            "Secured aggregation",
                            "Structured market access",
                        ].map((item, i) => (
                            <div key={i} className="col-md-4 col-6 mb-3">
                                <div className="border rounded p-3 h-100">
                                    {item}
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="fw-semibold mt-4">
                        From soil to sale — everything is engineered.
                    </p>
                </div>
            </section>


            {/* ================= DIFFERENCE ================= */}
            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center fw-bold mb-5">
                        What Makes Farm 100 Different?
                    </h2>

                    <div className="row">

                        {/* Climate-Controlled */}
                        <div className="col-md-6 mb-4">
                            <div className="card h-100 shadow-sm border-0 p-4">
                                <h5 className="fw-bold mb-3">
                                    1. Climate-Controlled Production
                                </h5>
                                <p>
                                    Greenhouse-based cultivation removes weather dependency
                                    and increases yield per hectare by multiples — not margins.
                                </p>
                            </div>
                        </div>

                        {/* Data Driven */}
                        <div className="col-md-6 mb-4">
                            <div className="card h-100 shadow-sm border-0 p-4">
                                <h5 className="fw-bold mb-3">
                                    2. Data-Driven Operations
                                </h5>
                                <p>Every farm operates inside one intelligent system:</p>
                                <ul>
                                    <li>Soil analytics</li>
                                    <li>Yield forecasting</li>
                                    <li>Growth monitoring</li>
                                    <li>Market-linked pricing</li>
                                </ul>
                                <p className="fw-semibold mt-2">
                                    Data → Soil → Yield → Market → Profit.
                                </p>
                            </div>
                        </div>

                        {/* Aggregated Power */}
                        <div className="col-md-6 mb-4">
                            <div className="card h-100 shadow-sm border-0 p-4">
                                <h5 className="fw-bold mb-3">
                                    3. 100-Farm Aggregated Power
                                </h5>
                                <p>When 100 farms operate as one infrastructure:</p>
                                <ul>
                                    <li>Buyers don’t negotiate with individuals.</li>
                                    <li>Investors see structure, not risk.</li>
                                    <li>Markets receive consistency, not scarcity.</li>
                                </ul>
                                <p className="fw-semibold mt-2">
                                    Scale creates leverage. <br />
                                    Leverage creates power.
                                </p>
                            </div>
                        </div>

                        {/* Governance */}
                        <div className="col-md-6 mb-4">
                            <div className="card h-100 shadow-sm border-0 p-4">
                                <h5 className="fw-bold mb-3">
                                    4. Security & Structured Governance
                                </h5>
                                <p>Farm 100 reduces farmer vulnerability through:</p>
                                <ul>
                                    <li>Organized production clusters</li>
                                    <li>Coordinated logistics</li>
                                    <li>Centralized quality control</li>
                                    <li>Transparent reporting</li>
                                </ul>
                                <p className="fw-semibold mt-2">
                                    Agriculture becomes a portfolio asset — not survival labor.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* ================= SCALE ================= */}
            <section className="py-5 bg-white text-center">
                <div className="container">
                    <h2 className="fw-bold mb-4">Why 100 Farms?</h2>
                    <p className="fw-semibold mb-4">Because scale changes everything.</p>

                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="border rounded p-4">
                                <p>1 farm feeds a community.</p>
                                <h5 className="fw-bold">100 farms feed cities.</h5>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="border rounded p-4">
                                <p>1 farmer negotiates.</p>
                                <h5 className="fw-bold">100 farmers command.</h5>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="border rounded p-4">
                                <p>1 harvest fluctuates.</p>
                                <h5 className="fw-bold">
                                    100 harvests stabilize supply.
                                </h5>
                            </div>
                        </div>
                    </div>

                    <p className="mt-4 fw-semibold">
                        Farm 100 is about aggregated intelligence and collective strength.
                    </p>
                </div>
            </section>


            {/* ================= STAKEHOLDERS ================= */}
            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center fw-bold mb-5">Who It Serves</h2>

                    <div className="row">

                        {/* Investors */}
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 border-0 shadow-sm p-4">
                                <h5 className="fw-bold mb-3">FOR INVESTORS</h5>
                                <p>
                                    This is not a donation model. <br />
                                    This is structured agricultural real estate + production + distribution.
                                </p>
                                <ul>
                                    <li>Clear metrics</li>
                                    <li>Projected margins</li>
                                    <li>Transparent dashboards</li>
                                    <li>ROI-backed deployment</li>
                                </ul>
                                <p className="fw-semibold mt-2">
                                    Agriculture becomes predictable, measurable, and scalable.
                                </p>
                            </div>
                        </div>

                        {/* Farmers */}
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 border-0 shadow-sm p-4">
                                <h5 className="fw-bold mb-3">FOR FARMERS</h5>
                                <p>
                                    You don’t farm alone. <br />
                                    You farm inside a system.
                                </p>
                                <p className="fw-semibold">Access to:</p>
                                <ul>
                                    <li>Smart greenhouse infrastructure</li>
                                    <li>Market linkage</li>
                                    <li>Technical guidance</li>
                                    <li>Data-backed decisions</li>
                                    <li>Structured financing pathways</li>
                                </ul>
                                <p className="fw-semibold mt-2">
                                    This is empowerment through infrastructure.
                                </p>
                            </div>
                        </div>

                        {/* Markets */}
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 border-0 shadow-sm p-4">
                                <h5 className="fw-bold mb-3">
                                    FOR MARKETS & OFF-TAKERS
                                </h5>
                                <ul>
                                    <li>Consistent volume</li>
                                    <li>Standardized quality</li>
                                    <li>Reliable delivery cycles</li>
                                </ul>
                                <p className="mt-2">
                                    No volatility. <br />
                                    No fragmented sourcing. <br />
                                    Just organized agricultural supply.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* ================= CTA ================= */}
            <section className="py-5 bg-success text-white text-center">
                <div className="container">
                    <h3 className="fw-bold mb-3">
                        Project Farm 100 is not about planting more crops,
                        <br />
                        but redesigning how agriculture works in Africa.
                    </h3>

                    <p className="mb-4">
                        From uncertainty to intelligent output.
                    </p>

                    <Link href="/contact" className="btn btn-light btn-lg">
                        Get in Touch
                    </Link>

                    <p className="mt-4 small">
                        operations@smartfarmingnetwork.com <br />
                        WhatsApp: 09121881781
                    </p>
                </div>
            </section>

        </div>
    );
}