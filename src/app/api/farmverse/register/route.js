import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/libs/prisma";
import { sendMail } from "@/libs/mail";

export async function POST(request) {

    try {

        const body = await request.json();

        const {
            fullName,
            email,
            referralSource
        } = body;

        // =========================
        // VALIDATION
        // =========================

        if (
            !fullName ||
            !email ||
            !referralSource
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
            await prisma.farmverseRegistration.findFirst({
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
        // CREATE RECORD
        // =========================

        const registration =
            await prisma.farmverseRegistration.create({
                data: {
                    fullName,
                    email,
                    referralSource
                }
            });

        // =========================
        // USER EMAIL
        // =========================

        await sendMail({
            to: email,
            subject:
                "Welcome to the Farmverse (GSFN) VIP Waitlist",
            html: `
                <div style="font-family: Arial, sans-serif; line-height:1.7;">

                    <h2>
                        Welcome to the Farmverse (GSFN) VIP Waitlist
                    </h2>

                    <p>
                        Dear ${fullName},
                    </p>

                    <p>
                        Thank you for joining the waitlist for Farmverse. We're exicted to have you join us on this journey towards a smarter and more sustainable future in agriculture.
                    </p>

                    <p>
                        <strong>Your impact starts now.</strong>
                    </p>

                    <hr />

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
                `New Farmverse Application - ${fullName}`,
            html: `
                <h2>
                    New Farmverse Application
                </h2>

                <table cellpadding="8">

                    <tr>
                        <td><strong>Name</strong></td>
                        <td>${fullName}</td>
                    </tr>

                    <tr>
                        <td><strong>Email</strong></td>
                        <td>${email}</td>
                    </tr>

                    <tr>
                        <td><strong>Referral Source</strong></td>
                        <td>${referralSource || "-"}</td>
                    </tr>

                </table>

                <hr />
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
                    email: registration.email,
                    createdAt: registration.createdAt
                }
            },
            {
                status: 201
            }
        );

    } catch (error) {

        console.error(
            "FARMVERSE REGISTRATION ERROR:",
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