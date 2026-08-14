"use client";

import Link from "next/link";
import { useState } from "react";

import ServiceModern from "@/components/ServiceCard";
import ServicePaymentModal from "@/components/ServicePaymentModal";


export default function ServicesPage() {

    const [selectedService, setSelectedService] =
        useState(null);

    const [showPaymentModal, setShowPaymentModal] =
        useState(false);


    /*
    |--------------------------------------------------------------------------
    | OPEN PAYMENT MODAL
    |--------------------------------------------------------------------------
    */

    const handleServiceClick = (service) => {

        setSelectedService(service);

        setShowPaymentModal(true);

    };


    /*
    |--------------------------------------------------------------------------
    | CLOSE PAYMENT MODAL
    |--------------------------------------------------------------------------
    */

    const handleClosePaymentModal = () => {

        setShowPaymentModal(false);

        setSelectedService(null);

    };


    return (

        <main>


            {/* =========================================================
                HERO
            ========================================================= */}

            <section className="hero-modern d-flex align-items-center text-white">

                <div className="container text-center">

                    <h1 className="display-3 fw-bold mb-3 text-light">
                        Smart Farming Services for the Future
                    </h1>


                    <p className="lead mx-auto hero-text text-light">

                        We empower farmers, investors, and agribusinesses
                        with digital tools, automation, and intelligence
                        to build profitable and sustainable farms.

                    </p>


                    <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">

                        <Link
                            href="#services"
                            className="btn btn-success btn-lg px-4"
                        >
                            Become a Smart Farmer
                        </Link>


                        <Link
                            href="#services"
                            className="btn btn-outline-light btn-lg px-4"
                        >
                            Build a Smart Farm
                        </Link>


                        <Link
                            href="#services"
                            className="btn btn-warning btn-lg px-4"
                        >
                            Invest in Farms
                        </Link>

                    </div>

                </div>

            </section>


            {/* =========================================================
                SERVICES
            ========================================================= */}

            <section
                id="services"
                className="py-5 bg-light"
            >

                <div className="container">


                    <div className="text-center mb-4">

                        <span className="badge bg-success px-3 py-2 mb-3">
                            WHAT WE OFFER
                        </span>


                        <h2 className="fw-bold">
                            Our Services
                        </h2>


                        <p className="text-muted">

                            A complete ecosystem powering modern agriculture.

                        </p>

                    </div>


                    <div className="row g-4 mt-3">


                        {/* =================================================
                            SMART FARM DEVELOPMENT
                        ================================================= */}

                        <ServiceModern

                            title="Smart Farm Development"

                            price="₦750K – ₦13M"

                            image="/assets/img/services/1.jpeg"

                            desc="Technology-driven farm installations powered by automation and IoT."

                            features={[
                                "Smart irrigation",
                                "IoT sensors",
                                "Farm dashboard",
                                "Mobile monitoring"
                            ]}

                            button="Build My Smart Farm"

                            onClick={() =>
                                handleServiceClick({

                                    title:
                                        "Smart Farm Development",

                                    slug:
                                        "smart-farm-development",

                                    price:
                                        "₦750K – ₦13M",

                                    /*
                                    | IMPORTANT:
                                    | This is the amount that will be
                                    | registered as the payment amount.
                                    |
                                    | Change this when you determine
                                    | the customer's exact package.
                                    */

                                    amount:
                                        750000

                                })
                            }

                        />


                        {/* =================================================
                            SMART FARMER ACADEMY
                        ================================================= */}

                        <ServiceModern

                            title="Smart Farmer Academy"

                            price="₦10K – ₦120K"

                            image="/assets/img/services/2.jpeg"

                            desc="Hands-on training programs for modern agriculture."

                            features={[
                                "Precision farming",
                                "Profitability",
                                "Agri-tech tools",
                                "Market access"
                            ]}

                            button="Enroll Now"

                            onClick={() =>
                                handleServiceClick({

                                    title:
                                        "Smart Farmer Academy",

                                    slug:
                                        "smart-farmer-academy",

                                    price:
                                        "₦10K – ₦120K",

                                    amount:
                                        10000

                                })
                            }

                        />


                        {/* =================================================
                            VERIFICATION
                        ================================================= */}

                        <ServiceModern

                            title="Verification & Certification"

                            price="₦5K – ₦25K"

                            image="/assets/img/services/3.jpeg"

                            desc="Build trust and attract investors with verified profiles."

                            features={[
                                "Verified badge",
                                "Higher visibility",
                                "Investor trust"
                            ]}

                            button="Get Verified"

                            onClick={() =>
                                handleServiceClick({

                                    title:
                                        "Verification & Certification",

                                    slug:
                                        "verification-certification",

                                    price:
                                        "₦5K – ₦25K",

                                    amount:
                                        5000

                                })
                            }

                        />


                        {/* =================================================
                            FARM MARKETPLACE
                        ================================================= */}

                        <ServiceModern

                            title="Farm Marketplace"

                            price="₦5K – ₦30K /yr"

                            image="/assets/img/services/5.jpeg"

                            desc="List farms and connect with buyers and investors."

                            features={[
                                "Farm visibility",
                                "Produce sales",
                                "Partnerships"
                            ]}

                            button="List My Farm"

                            onClick={() =>
                                handleServiceClick({

                                    title:
                                        "Farm Marketplace",

                                    slug:
                                        "farm-marketplace",

                                    price:
                                        "₦5K – ₦30K /yr",

                                    amount:
                                        5000

                                })
                            }

                        />


                        {/* =================================================
                            FARM MANAGEMENT TECH
                        ================================================= */}

                        <ServiceModern

                            title="Farm Management Tech"

                            price="₦2.5K – ₦10K /mo"

                            image="/assets/img/services/2.jpeg"

                            desc="Smart dashboards for tracking and optimizing farm operations."

                            features={[
                                "Analytics",
                                "Expense tracking",
                                "Investor reports"
                            ]}

                            button="Use Dashboard"

                            onClick={() =>
                                handleServiceClick({

                                    title:
                                        "Farm Management Tech",

                                    slug:
                                        "farm-management-tech",

                                    price:
                                        "₦2.5K – ₦10K /mo",

                                    amount:
                                        2500

                                })
                            }

                        />


                        {/* =================================================
                            IOT MONITORING
                        ================================================= */}

                        <ServiceModern

                            title="IoT Monitoring"

                            price="₦250K + ₦5K/mo"

                            image="/assets/img/services/6.jpeg"

                            desc="Monitor your farm remotely with real-time alerts."

                            features={[
                                "Soil sensors",
                                "Weather tracking",
                                "Smart alerts"
                            ]}

                            button="Monitor Farm"

                            onClick={() =>
                                handleServiceClick({

                                    title:
                                        "IoT Monitoring",

                                    slug:
                                        "iot-monitoring",

                                    price:
                                        "₦250K + ₦5K/mo",

                                    amount:
                                        250000

                                })
                            }

                        />


                        {/* =================================================
                            AGRICULTURAL CONSULTANCY
                        ================================================= */}

                        <ServiceModern

                            title="Agricultural Consultancy"

                            price="₦50K – ₦250K+"

                            image="/assets/img/services/7.jpeg"

                            desc="Expert advisory for large-scale farm planning."

                            features={[
                                "Planning",
                                "Execution strategy",
                                "Expert insights"
                            ]}

                            button="Book Consultation"

                            onClick={() =>
                                handleServiceClick({

                                    title:
                                        "Agricultural Consultancy",

                                    slug:
                                        "agricultural-consultancy",

                                    price:
                                        "₦50K – ₦250K+",

                                    amount:
                                        50000

                                })
                            }

                        />


                        {/* =================================================
                            INVESTOR MATCHMAKING
                        ================================================= */}

                        <ServiceModern

                            title="Investor Matchmaking"

                            price="15% Fee"

                            image="/assets/img/services/8.jpeg"

                            desc="We connect investors with verified farmers."

                            features={[
                                "Matching",
                                "Structuring",
                                "Contracts"
                            ]}

                            button="Invest Now"

                            onClick={() =>
                                handleServiceClick({

                                    title:
                                        "Investor Matchmaking",

                                    slug:
                                        "investor-matchmaking",

                                    price:
                                        "15% Fee",

                                    amount:
                                        0

                                })
                            }

                        />


                        {/* =================================================
                            CORPORATE TRAINING
                        ================================================= */}

                        <ServiceModern

                            title="Corporate Training"

                            price="₦500K – ₦3M"

                            image="/assets/img/services/9.jpeg"

                            desc="Agritech training programs for institutions."

                            features={[
                                "NGOs",
                                "Governments",
                                "Youth programs"
                            ]}

                            button="Partner With Us"

                            onClick={() =>
                                handleServiceClick({

                                    title:
                                        "Corporate Training",

                                    slug:
                                        "corporate-training",

                                    price:
                                        "₦500K – ₦3M",

                                    amount:
                                        500000

                                })
                            }

                        />


                    </div>

                </div>

            </section>


            {/* =========================================================
                FINAL CTA
            ========================================================= */}

            <section className="cta-modern text-white text-center d-flex align-items-center">

                <div className="container">

                    <h2 className="fw-bold display-5 text-light">
                        The Future of Farming Starts Here
                    </h2>


                    <p className="mt-3 mx-auto cta-text text-light">

                        Smart Farming Network connects technology,
                        trust, and agriculture into one powerful ecosystem.

                    </p>


                    <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">

                        <Link
                            href="#services"
                            className="btn btn-success btn-lg px-4"
                        >
                            Join the Network
                        </Link>


                        <Link
                            href="#services"
                            className="btn btn-outline-light btn-lg px-4"
                        >
                            Partner With Us
                        </Link>

                    </div>

                </div>

            </section>


            {/* =========================================================
                PAYMENT MODAL
            ========================================================= */}

            <ServicePaymentModal

                show={
                    showPaymentModal
                }

                onClose={
                    handleClosePaymentModal
                }

                service={
                    selectedService
                }

            />

        </main>

    );

}