// app/api/payment/sfm2026/initialize/route.js

import { NextResponse } from "next/server";
import crypto from "crypto";

import { prisma } from "@/libs/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";

export async function POST(req) {

    try {

        // =========================
        // SESSION
        // =========================

        const session =
            await getServerSession(authOptions);

        // =========================
        // BODY
        // =========================

        const body =
            await req.json().catch(() => ({}));

        const {
            fullName,
            email,
            role,
            tier
        } = body;

        // =========================
        // RESOLVE EMAIL
        // =========================

        const finalEmail =
            session?.user?.email || email;

        // =========================
        // VALIDATIONS
        // =========================

        // if (!fullName) {

        //     return NextResponse.json(
        //         {
        //             success: false,
        //             message: "Full name is required"
        //         },
        //         { status: 400 }
        //     );
        // }

        if (!finalEmail) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Email is required"
                },
                { status: 400 }
            );
        }

        if (!role) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Category is required"
                },
                { status: 400 }
            );
        }

        // =========================
        // TIER CONFIG
        // =========================

        const tiers = {

            Starter: {
                amount: 15000,
                enum: "STARTER"
            },

            Professional: {
                amount: 30000,
                enum: "PROFESSIONAL"
            },

            Advanced: {
                amount: 100000,
                enum: "ADVANCED"
            }
        };

        const selectedTier = tiers[tier];

        if (!selectedTier) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid ticket tier selected"
                },
                { status: 400 }
            );
        }

        // =========================
        // GENERATE REFERENCE
        // =========================

        const reference =
            `SFM2026_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;

        // =========================
        // CREATE REGISTRATION
        // =========================

        const registration =
            await prisma.sFMRegistration.create({

                data: {

                    fullName,

                    email: finalEmail,

                    role,

                    tier: selectedTier.enum,

                    amount: selectedTier.amount,

                    reference,

                    paymentStatus: "PENDING",

                    userId:
                        session?.user?.id || null
                }
            });

        // =========================
        // RESPONSE
        // =========================

        return NextResponse.json({

            success: true,

            message:
                "Payment initialized successfully",

            data: {

                id: registration.id,

                reference,

                email: finalEmail,

                amount: selectedTier.amount
            }
        });

    } catch (error) {

        console.error(
            "SFM PAYMENT INIT ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to initialize payment"
            },
            { status: 500 }
        );
    }
}