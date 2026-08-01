import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { sendMail } from "@/libs/mail";
import { emailLayout } from "@/libs/emailLayout";


export async function GET(req) {

    try {

        // =========================
        // GET REFERENCE
        // =========================

        const { searchParams } =
            new URL(req.url);

        const reference =
            searchParams.get("reference");

        if (!reference) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Payment reference is required"
                },
                { status: 400 }
            );
        }

        // =========================
        // FIND REGISTRATION
        // =========================

        const registration =
            await prisma.sFMRegistration.findUnique({
                where: {
                    reference
                }
            });

        if (!registration) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Registration not found"
                },
                { status: 404 }
            );
        }

        // =========================
        // PREVENT DOUBLE VERIFY
        // =========================

        if (
            registration.paymentStatus === "PAID"
        ) {

            return NextResponse.json({

                success: true,

                message:
                    "Payment already verified",

                data: registration
            });
        }

        // =========================
        // VERIFY PAYSTACK
        // =========================

        const paystackResponse =
            await fetch(
                `https://api.paystack.co/transaction/verify/${reference}`,
                {
                    method: "GET",

                    headers: {
                        Authorization:
                            `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,

                        "Content-Type":
                            "application/json"
                    }
                }
            );

        const paystackData =
            await paystackResponse.json();

        // =========================
        // VALIDATE RESPONSE
        // =========================

        if (
            !paystackData.status ||
            paystackData.data.status !== "success"
        ) {

            await prisma.sFMRegistration.update({

                where: {
                    reference
                },

                data: {
                    paymentStatus: "FAILED"
                }
            });

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Payment not successful"
                },
                { status: 400 }
            );
        }

        // =========================
        // SECURITY CHECKS
        // =========================

        // CHECK AMOUNT

        const officialAmount =
            registration.amount * 100;

        if (
            paystackData.data.amount !==
            officialAmount
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid payment amount"
                },
                { status: 400 }
            );
        }

        // CHECK EMAIL

        if (
            paystackData.data.customer.email !==
            registration.email
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid payment email"
                },
                { status: 400 }
            );
        }

        // =========================
        // UPDATE REGISTRATION
        // =========================

        const updatedRegistration =
            await prisma.sFMRegistration.update({

                where: {
                    reference
                },

                data: {

                    paymentStatus: "PAID",

                    paidAt: new Date(),

                    transactionId:
                        String(paystackData.data.id),

                    gatewayResponse:
                        paystackData.data.gateway_response,

                    paymentChannel:
                        paystackData.data.channel,

                    metadata: paystackData.data
                }
            });


        // =========================
        // SEND EMAIL
        // =========================
        const email = emailLayout({
            title: "Welcome to the Smart Farmers Movement VIP Waitlist",
            content: `
                <div style="font-family: Arial, sans-serif; line-height:1.7;">
                    <h2>
                        Welcome to the Smart Farmers Movement VIP Waitlist
                    </h2>
                    <p>
                        Dear ${updatedRegistration.fullName},
                    </p>
                    <p>
                        We're beyond excited to have you on this journey.
                    </p>
                    <p>
                        Our team is already reviewing your vision and
                        application, and we will reach out within the
                        next 48 hours to align on the most suitable
                        opportunities and next steps.
                    </p>
                    <p>
                        The Investors & Partners Soirée is designed to bring together
                        visionary founders, investors, institutions,
                        and ecosystem leaders shaping the future of
                        African agriculture.
                    </p>
                    <p>
                        Get ready to unlock premium partnership opportunities.
                    </p>
                    <p>
                        <strong>Your impact starts now.</strong>
                    </p>
                    <hr />
                    <p>
                        Application Number:
                        <strong>${updatedRegistration.applicationNumber}</strong>
                    </p>
                    <p>
                        GoodLife Smart Farming Network Ltd
                    </p>
                </div>
            `
        });
        await sendMail({
            to: email,
            subject:
                "Welcome to the Smart Farmers Movement VIP Waitlist",
            html: email
        });

        // =========================
        // SUCCESS RESPONSE
        // =========================

        return NextResponse.json({

            success: true,

            message:
                "Payment verified successfully",

            // data: updatedRegistration

        });

    } catch (error) {

        console.error(
            "SFM PAYMENT VERIFY ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to verify payment"
            },
            { status: 500 }
        );
    }
}