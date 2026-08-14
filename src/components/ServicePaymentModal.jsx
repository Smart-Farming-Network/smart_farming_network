"use client";

import { useEffect, useState } from "react";

export default function ServicePaymentModal({
    show,
    onClose,
    service
}) {

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: ""
    });

    const [step, setStep] = useState("details");

    const [payment, setPayment] = useState(null);

    const [loading, setLoading] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | RESET MODAL
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!show) {

            setStep("details");

            setPayment(null);

            setForm({
                fullName: "",
                email: "",
                phone: ""
            });

        }

        document.body.style.overflow =
            show ? "hidden" : "auto";


        return () => {

            document.body.style.overflow = "auto";

        };

    }, [show]);


    /*
    |--------------------------------------------------------------------------
    | HANDLE INPUT
    |--------------------------------------------------------------------------
    */

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setForm((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    /*
    |--------------------------------------------------------------------------
    | CREATE PAYMENT
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async (event) => {

        event.preventDefault();


        if (!service) {
            return;
        }


        try {

            setLoading(true);


            const response = await fetch(
                "/api/services/payment",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        service:
                            service.title,

                        serviceSlug:
                            service.slug || null,

                        customerName:
                            form.fullName.trim(),

                        customerEmail:
                            form.email.trim(),

                        customerPhone:
                            form.phone.trim(),

                        amount:
                            service.amount

                    })
                }
            );


            const data =
                await response.json();


            if (!response.ok || !data.success) {

                alert(
                    data.message ||
                    "Unable to initialize payment."
                );

                return;

            }


            /*
            |--------------------------------------------------------------------------
            | SAVE PAYMENT RESPONSE
            |--------------------------------------------------------------------------
            */

            setPayment(data.data);

            setStep("payment");


        } catch (error) {

            console.error(
                "PAYMENT_INITIALIZATION_ERROR:",
                error
            );


            alert(
                "Unable to initialize payment. Please try again."
            );


        } finally {

            setLoading(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | CUSTOMER CONFIRMED RECEIPT
    |--------------------------------------------------------------------------
    */

    const handleReceiptSubmitted = async () => {

        if (!payment?.id) {
            return;
        }


        try {

            setLoading(true);


            const response = await fetch(
                "/api/services/payment/receipt",
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        paymentId:
                            payment.id

                    })

                }
            );


            const data =
                await response.json();


            if (!response.ok || !data.success) {

                alert(
                    data.message ||
                    "Unable to submit receipt status."
                );

                return;

            }


            /*
            |--------------------------------------------------------------------------
            | UPDATE LOCAL PAYMENT STATE
            |--------------------------------------------------------------------------
            */

            setPayment((previous) => ({

                ...previous,

                status:
                    data.data.status

            }));


            setStep("submitted");


        } catch (error) {

            console.error(
                "RECEIPT_SUBMISSION_ERROR:",
                error
            );


            alert(
                "Unable to submit your payment status. Please try again."
            );


        } finally {

            setLoading(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | CLOSE MODAL
    |--------------------------------------------------------------------------
    */

    const handleClose = () => {

        if (loading) {
            return;
        }

        onClose();

    };


    /*
    |--------------------------------------------------------------------------
    | DO NOT RENDER
    |--------------------------------------------------------------------------
    */

    if (!show || !service) {
        return null;
    }


    return (

        <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
        >

            {/* BACKDROP */}

            <div
                className="modal-backdrop fade show"
                onClick={handleClose}
            />


            {/* MODAL */}

            <div
                className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                style={{
                    zIndex: 1056
                }}
            >

                <div className="modal-content border-0 rounded-4 shadow-lg">


                    {/* =====================================================
                        HEADER
                    ===================================================== */}

                    <div className="modal-header border-0 px-4 pt-4">

                        <div>

                            <span className="badge bg-success mb-2">
                                SERVICE REGISTRATION
                            </span>


                            <h5 className="modal-title fw-bold">
                                {service.title}
                            </h5>


                            <p className="text-muted small mb-0">

                                {step === "details" &&
                                    "Enter your details to continue with your registration."
                                }

                                {step === "payment" &&
                                    "Complete your bank transfer using the details below."
                                }

                                {step === "submitted" &&
                                    "Your payment has been submitted for verification."
                                }

                            </p>

                        </div>


                        <button
                            type="button"
                            className="btn-close"
                            onClick={handleClose}
                            disabled={loading}
                            aria-label="Close"
                        />

                    </div>


                    {/* =====================================================
                        BODY
                    ===================================================== */}

                    <div className="modal-body px-4 pb-4">


                        {/* =================================================
                            SERVICE SUMMARY
                        ================================================= */}

                        <div className="bg-light border rounded-4 p-3 mb-4">

                            <div className="d-flex justify-content-between align-items-center gap-3">

                                <div>

                                    <small className="text-muted d-block">
                                        Selected Service
                                    </small>

                                    <strong>
                                        {service.title}
                                    </strong>

                                </div>


                                <div className="text-success fw-bold text-end">

                                    {service.price}

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            DETAILS STEP
                        ================================================= */}

                        {step === "details" && (

                            <form onSubmit={handleSubmit}>


                                {/* FULL NAME */}

                                <div className="mb-3">

                                    <label
                                        htmlFor="service-full-name"
                                        className="form-label fw-semibold"
                                    >
                                        Full Name
                                    </label>


                                    <input
                                        id="service-full-name"
                                        type="text"
                                        name="fullName"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your full name"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        autoComplete="name"
                                        required
                                    />

                                </div>


                                {/* EMAIL */}

                                <div className="mb-3">

                                    <label
                                        htmlFor="service-email"
                                        className="form-label fw-semibold"
                                    >
                                        Email Address
                                    </label>


                                    <input
                                        id="service-email"
                                        type="email"
                                        name="email"
                                        className="form-control form-control-lg"
                                        placeholder="you@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        required
                                    />

                                </div>


                                {/* PHONE */}

                                <div className="mb-4">

                                    <label
                                        htmlFor="service-phone"
                                        className="form-label fw-semibold"
                                    >
                                        Phone Number
                                    </label>


                                    <input
                                        id="service-phone"
                                        type="tel"
                                        name="phone"
                                        className="form-control form-control-lg"
                                        placeholder="080XXXXXXXX"
                                        value={form.phone}
                                        onChange={handleChange}
                                        autoComplete="tel"
                                        required
                                    />

                                </div>


                                {/* INFORMATION */}

                                <div className="alert alert-info border-0 rounded-4 small">

                                    <strong>
                                        How this works
                                    </strong>

                                    <ol className="mb-0 mt-2 ps-3">

                                        <li>
                                            Submit your details.
                                        </li>

                                        <li>
                                            We generate your unique payment reference.
                                        </li>

                                        <li>
                                            Transfer the required amount to our official account.
                                        </li>

                                        <li>
                                            Send your receipt to our official WhatsApp.
                                        </li>

                                        <li>
                                            Confirm that you've sent the receipt.
                                        </li>

                                    </ol>

                                </div>


                                {/* SUBMIT */}

                                <button
                                    type="submit"
                                    className="btn btn-success btn-lg w-100 rounded-pill"
                                    disabled={loading}
                                >

                                    {loading ? (

                                        <>

                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            />

                                            Creating Payment...

                                        </>

                                    ) : (

                                        "Continue to Payment"

                                    )}

                                </button>

                            </form>

                        )}


                        {/* =================================================
                            PAYMENT STEP
                        ================================================= */}

                        {step === "payment" && payment && (

                            <div>


                                {/* PAYMENT CREATED */}

                                <div className="text-center mb-4">

                                    <div
                                        className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            fontSize: "1.5rem"
                                        }}
                                    >
                                        ✓
                                    </div>


                                    <h5 className="fw-bold mb-1">
                                        Payment Record Created
                                    </h5>


                                    <p className="text-muted small mb-0">
                                        Use the details below to complete your transfer.
                                    </p>

                                </div>


                                {/* PAYMENT REFERENCE */}

                                <div className="bg-light border rounded-4 p-3 mb-4">

                                    <div className="mb-3">

                                        <small className="text-muted d-block">
                                            Payment Reference
                                        </small>

                                        <strong className="text-success">
                                            {payment.reference}
                                        </strong>

                                    </div>


                                    <div>

                                        <small className="text-muted d-block">
                                            Transaction UUID
                                        </small>

                                        <small
                                            className="text-break"
                                            style={{
                                                fontFamily: "monospace"
                                            }}
                                        >
                                            {payment.id}
                                        </small>

                                    </div>

                                </div>


                                {/* AMOUNT */}

                                <div className="text-center mb-4">

                                    <small className="text-muted">
                                        Amount To Transfer
                                    </small>


                                    <h2 className="fw-bold text-success mb-0">

                                        ₦
                                        {Number(
                                            payment.amount
                                        ).toLocaleString()}

                                    </h2>

                                </div>


                                {/* BANK DETAILS */}

                                <div className="border rounded-4 p-4 mb-4">

                                    <div className="text-center mb-4">

                                        <span className="badge bg-warning text-dark mb-2">
                                            BANK TRANSFER
                                        </span>


                                        <h6 className="fw-bold mb-1">
                                            Transfer Payment
                                        </h6>


                                        <p className="text-muted small mb-0">
                                            Transfer the exact amount to the account below.
                                        </p>

                                    </div>


                                    {/* ACCOUNT NUMBER */}

                                    <div className="bg-light rounded-3 p-3 mb-3">

                                        <small className="text-muted d-block">
                                            Account Number
                                        </small>


                                        <strong className="fs-4">
                                            {payment.paymentDetails?.accountNumber}
                                        </strong>

                                    </div>


                                    <div className="row g-3">

                                        <div className="col-5">

                                            <small className="text-muted d-block">
                                                Bank
                                            </small>

                                            <strong>
                                                {payment.paymentDetails?.bank}
                                            </strong>

                                        </div>


                                        <div className="col-7">

                                            <small className="text-muted d-block">
                                                Account Name
                                            </small>

                                            <strong className="small">
                                                {payment.paymentDetails?.accountName}
                                            </strong>

                                        </div>

                                    </div>

                                </div>


                                {/* IMPORTANT */}

                                <div className="alert alert-warning border-0 rounded-4 small">

                                    <strong>
                                        Important
                                    </strong>

                                    <p className="mb-0 mt-1">

                                        Please transfer the exact amount and
                                        keep your payment receipt. Your payment
                                        will only be marked as verified after
                                        our team confirms the transfer.

                                    </p>

                                </div>


                                {/* WHATSAPP */}

                                <div className="alert alert-success border-0 rounded-4">

                                    <div className="d-flex gap-3">

                                        <div
                                            style={{
                                                fontSize: "1.5rem"
                                            }}
                                        >
                                            📱
                                        </div>


                                        <div className="flex-grow-1">

                                            <strong>
                                                Send Your Payment Receipt
                                            </strong>


                                            <p className="small mb-3 mt-1">

                                                After making your transfer,
                                                send the receipt to our official
                                                WhatsApp number. Your payment
                                                reference and UUID are already
                                                included in the message.

                                            </p>


                                            <a
                                                href={payment.whatsappUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-success btn-sm rounded-pill px-4"
                                            >
                                                Send Receipt on WhatsApp
                                            </a>

                                        </div>

                                    </div>

                                </div>


                                {/* RECEIPT CONFIRMATION */}

                                <button
                                    type="button"
                                    className="btn btn-dark btn-lg w-100 rounded-pill"
                                    onClick={handleReceiptSubmitted}
                                    disabled={loading}
                                >

                                    {loading ? (

                                        <>

                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            />

                                            Submitting...

                                        </>

                                    ) : (

                                        "I Have Sent My Receipt"

                                    )}

                                </button>


                                <button
                                    type="button"
                                    className="btn btn-link text-muted w-100 mt-2"
                                    onClick={() => setStep("details")}
                                    disabled={loading}
                                >
                                    ← Go Back
                                </button>

                            </div>

                        )}


                        {/* =================================================
                            SUBMITTED STEP
                        ================================================= */}

                        {step === "submitted" && payment && (

                            <div className="text-center py-4">


                                <div
                                    className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center mx-auto mb-4"
                                    style={{
                                        width: "75px",
                                        height: "75px",
                                        fontSize: "2rem"
                                    }}
                                >
                                    ✓
                                </div>


                                <h4 className="fw-bold">
                                    Payment Submitted
                                </h4>


                                <p className="text-muted">

                                    Your payment details have been recorded
                                    and your receipt has been submitted for
                                    verification.

                                </p>


                                <div className="bg-light border rounded-4 p-3 mb-4">

                                    <small className="text-muted d-block">
                                        Payment Reference
                                    </small>

                                    <strong className="text-success">
                                        {payment.reference}
                                    </strong>

                                </div>


                                <div className="alert alert-info border-0 rounded-4 small">

                                    Our team will verify your payment
                                    and update your payment status.

                                </div>


                                {/* OPEN WHATSAPP AGAIN */}

                                <a
                                    href={payment.whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-success rounded-pill px-4 me-2"
                                >
                                    Open WhatsApp
                                </a>


                                <button
                                    type="button"
                                    className="btn btn-outline-secondary rounded-pill px-4 mt-2 mt-sm-0"
                                    onClick={handleClose}
                                >
                                    Done
                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}