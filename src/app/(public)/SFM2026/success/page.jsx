'use client';

import { useEffect, useState } from "react";

export default function CheckoutSuccessPage() {

    const [loading, setLoading] = useState(true);

    const [success, setSuccess] = useState(false);

    const [message, setMessage] = useState("");

    useEffect(() => {

        async function verifyPayment() {

            try {

                const params =
                    new URLSearchParams(window.location.search);

                const reference =
                    params.get("reference");

                if (!reference) {

                    setMessage("Invalid payment reference");

                    return;
                }

                // VERIFY PAYMENT
                const res = await fetch(
                    `/api/payment/sfm2026/verify?reference=${reference}`
                );

                const data = await res.json();

                if (!data.success) {

                    setSuccess(false);

                    setMessage(
                        data.message ||
                        "Payment verification failed"
                    );

                    return;
                }

                // OPTIONAL:
                // CLEAR CART
                // SEND EMAIL
                // REFRESH USER STATE

                setSuccess(true);

                setMessage(
                    "Your payment has been verified successfully."
                );

            } catch (error) {

                console.error(error);

                setSuccess(false);

                setMessage(
                    "Something went wrong while verifying payment."
                );

            } finally {

                setLoading(false);
            }
        }

        verifyPayment();

    }, []);

    return (
        <div className="container py-5">

            <div
                className="card shadow-sm border-0 p-5 mx-auto text-center"
                style={{ maxWidth: "650px" }}
            >

                {loading ? (
                    <>
                        <div className="spinner-border text-success mb-4"></div>

                        <h3 className="fw-bold">
                            Verifying Payment...
                        </h3>

                        <p className="text-muted">
                            Please wait while we confirm your transaction.
                        </p>
                    </>
                ) : success ? (
                    <>
                        <div
                            className="mb-4"
                            style={{ fontSize: "5rem" }}
                        >
                            ✅
                        </div>

                        <h2 className="fw-bold text-success">
                            Payment Successful
                        </h2>

                        <p className="text-muted mt-3">
                            {message}
                        </p>

                        <a
                            href="/"
                            className="btn btn-success mt-4 px-4"
                        >
                            Continue
                        </a>
                    </>
                ) : (
                    <>
                        <div
                            className="mb-4"
                            style={{ fontSize: "5rem" }}
                        >
                            ❌
                        </div>

                        <h2 className="fw-bold text-danger">
                            Verification Failed
                        </h2>

                        <p className="text-muted mt-3">
                            {message}
                        </p>

                        <a
                            href="/sfm2026"
                            className="btn btn-dark mt-4 px-4"
                        >
                            Try Again
                        </a>
                    </>
                )}

            </div>

        </div>
    );
}