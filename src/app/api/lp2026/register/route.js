import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/libs/prisma";
import { sendMail } from "@/libs/mail";

export async function POST(request) {

    try {

        const body = await request.json();

        const {
            fullName,
            company,
            email,
            accessLevel,
            financialCapacity,
            strategicVision,
            engagementTimeline,
            referralSource
        } = body;

        // =========================
        // VALIDATION
        // =========================

        if (
            !fullName ||
            !email ||
            !accessLevel ||
            !financialCapacity ||
            !strategicVision ||
            !engagementTimeline
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Please complete all required fields."
                },
                {
                    status: 400
                }
            );

        }

        // =========================
        // DUPLICATE CHECK
        // =========================

        const existingApplication =
            await prisma.lP2026Registration.findFirst({
                where: {
                    email
                }
            });

        if (existingApplication) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "An application already exists for this email address."
                },
                {
                    status: 409
                }
            );

        }

        // =========================
        // APPLICATION NUMBER
        // =========================

        const applicationNumber =
            `LP2026-${crypto.randomInt(100000, 999999)}`;

        // =========================
        // CREATE RECORD
        // =========================

        const registration =
            await prisma.lP2026Registration.create({
                data: {
                    applicationNumber,
                    fullName,
                    company,
                    email,
                    accessLevel,
                    financialCapacity,
                    strategicVision,
                    engagementTimeline,
                    referralSource
                }
            });

        // =========================
        // USER EMAIL
        // =========================

        await sendMail({
            to: email,
            subject:
                "Welcome to the Smart Farmers Movement VIP Waitlist",
            html: `
                <div style="font-family: Arial, sans-serif; line-height:1.7;">

                    <h2>
                        Welcome to the Smart Farmers Movement VIP Waitlist
                    </h2>

                    <p>
                        Dear ${fullName},
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
                        <strong>${applicationNumber}</strong>
                    </p>

                    <p>
                        GoodLife Smart Farming Network Ltd
                    </p>

                </div>
            `
        });

        // =========================
        // ADMIN NOTIFICATION
        // =========================

        await sendMail({
            to: process.env.ZOHO_SMTP_USER,
            subject:
                `New LP2026 Application - ${fullName}`,
            html: `
                <h2>
                    New Investors & Partners Soirée Application
                </h2>

                <table cellpadding="8">

                    <tr>
                        <td><strong>Application Number</strong></td>
                        <td>${applicationNumber}</td>
                    </tr>

                    <tr>
                        <td><strong>Name</strong></td>
                        <td>${fullName}</td>
                    </tr>

                    <tr>
                        <td><strong>Company</strong></td>
                        <td>${company || "-"}</td>
                    </tr>

                    <tr>
                        <td><strong>Email</strong></td>
                        <td>${email}</td>
                    </tr>

                    <tr>
                        <td><strong>Access Level</strong></td>
                        <td>${accessLevel}</td>
                    </tr>

                    <tr>
                        <td><strong>Financial Capacity</strong></td>
                        <td>${financialCapacity}</td>
                    </tr>

                    <tr>
                        <td><strong>Engagement Timeline</strong></td>
                        <td>${engagementTimeline}</td>
                    </tr>

                    <tr>
                        <td><strong>Referral Source</strong></td>
                        <td>${referralSource || "-"}</td>
                    </tr>

                </table>

                <hr />

                <h4>
                    Strategic Vision
                </h4>

                <p>
                    ${strategicVision}
                </p>
            `
        });

        // =========================
        // RESPONSE
        // =========================

        return NextResponse.json(
            {
                success: true,
                message:
                    "Application submitted successfully.",
                data: {
                    id: registration.id,
                    applicationNumber
                }
            },
            {
                status: 201
            }
        );

    } catch (error) {

        console.error(
            "LP2026 REGISTRATION ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Something went wrong. Please try again later."
            },
            {
                status: 500
            }
        );

    }

}