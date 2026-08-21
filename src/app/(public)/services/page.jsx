"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import ServiceModern from "@/components/ServiceCard";
import ServicePaymentModal from "@/components/ServicePaymentModal";
import { div } from "framer-motion/client";


export default function ServicesPage() {

    const [selectedService, setSelectedService] =
        useState(null);

    const [showPaymentModal, setShowPaymentModal] =
        useState(false);

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchServices = async () => {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(data.data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchServices();
    }, []);


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

                        {loading ? (
                            <p className="text-muted text-center">
                                Loading services...
                            </p>
                        ) : services.length === 0 ? (
                            <p className="text-muted text-center">
                                No services found.
                            </p>
                        ) : (
                            <div className="row g-4 mt-3">
                                {services.map((service) => (
                                    <ServiceModern
                                        key={service.id}
                                        title={service.title}
                                        price={`₦${service.price.toLocaleString()}`}
                                        image={service.image}
                                        desc={service.description}
                                        features={
                                            Array.isArray(service.categories)
                                                ? service.categories
                                                : []
                                        }
                                        button="Pay Now"
                                        onClick={() =>
                                            handleServiceClick({
                                                ...service,
                                                amount: service.price,
                                            })
                                        }
                                    />
                                ))}
                            </div>
                        )}

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