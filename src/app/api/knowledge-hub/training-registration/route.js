import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";


const ALLOWED_GENDERS = [
    "male",
    "female",
];

const ALLOWED_AGE_BRACKETS = [
    "18-24",
    "25-34",
    "35-44",
    "45-54",
    "55+",
];

const ALLOWED_EXPERIENCE = [
    "less-than-1",
    "1-3",
    "4-6",
    "7-10",
    "10+",
];

const ALLOWED_AGRI_TECHNOLOGY = [
    "yes",
    "no",
];

const ALLOWED_SMARTPHONE_TYPES = [
    "android",
    "iphone",
    "other",
];

const ALLOWED_INTERESTS = [
    "Smart farming",
    "AI for agriculture",
    "Farm data",
    "Market access",
    "Digital extension",
    "IoT / precision farming",
    "Agricultural finance",
];

export async function POST(request) {
    try {
        const body = await request.json();

        const {
            fullName,
            phone,
            email,
            gender,
            ageBracket,
            lga,
            community,
            position,
            organization,
            experience,
            agriculturalArea,
            farmersReached,
            challenges,
            agriTechnology,
            smartphoneType,
            interestAreas,
            expectations,
            consent,
        } = body;

        /*
        |--------------------------------------------------------------------------
        | Required Fields
        |--------------------------------------------------------------------------
        */

        const requiredFields = {
            fullName,
            phone,
            email,
            gender,
            ageBracket,
            lga,
            community,
            position,
            experience,
            agriculturalArea,
            agriTechnology,
            smartphoneType,
            expectations,
        };

        const missingFields = Object.entries(requiredFields)
            .filter(
                ([, value]) =>
                    value === undefined ||
                    value === null ||
                    String(value).trim() === ""
            )
            .map(([field]) => field);

        if (missingFields.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please complete all required fields.",
                    fields: missingFields,
                },
                { status: 400 }
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Basic Validation
        |--------------------------------------------------------------------------
        */

        if (!Array.isArray(interestAreas)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Interest areas must be an array.",
                },
                { status: 400 }
            );
        }

        if (typeof consent !== "boolean") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Consent must be provided.",
                },
                { status: 400 }
            );
        }

        if (!consent) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "You must consent to receive GSFN/SFM updates to complete registration.",
                },
                { status: 400 }
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Allowed Values
        |--------------------------------------------------------------------------
        */

        if (!ALLOWED_GENDERS.includes(gender)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid gender selected.",
                },
                { status: 400 }
            );
        }

        if (!ALLOWED_AGE_BRACKETS.includes(ageBracket)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid age bracket selected.",
                },
                { status: 400 }
            );
        }

        if (!ALLOWED_EXPERIENCE.includes(experience)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid agricultural experience selected.",
                },
                { status: 400 }
            );
        }

        if (!ALLOWED_AGRI_TECHNOLOGY.includes(agriTechnology)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid agricultural technology option.",
                },
                { status: 400 }
            );
        }

        if (!ALLOWED_SMARTPHONE_TYPES.includes(smartphoneType)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid smartphone type.",
                },
                { status: 400 }
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Interest Validation
        |--------------------------------------------------------------------------
        */

        const invalidInterests = interestAreas.filter(
            (interest) => !ALLOWED_INTERESTS.includes(interest)
        );

        if (invalidInterests.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "One or more selected interest areas are invalid.",
                    fields: invalidInterests,
                },
                { status: 400 }
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Email Validation
        |--------------------------------------------------------------------------
        */

        const normalizedEmail = email.trim().toLowerCase();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(normalizedEmail)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please provide a valid email address.",
                },
                { status: 400 }
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Farmers Reached Validation
        |--------------------------------------------------------------------------
        */

        let normalizedFarmersReached = null;

        if (
            farmersReached !== undefined &&
            farmersReached !== null &&
            farmersReached !== ""
        ) {
            normalizedFarmersReached = Number(farmersReached);

            if (
                !Number.isInteger(normalizedFarmersReached) ||
                normalizedFarmersReached < 0
            ) {
                return NextResponse.json(
                    {
                        success: false,
                        message:
                            "Number of farmers reached must be a valid non-negative number.",
                    },
                    { status: 400 }
                );
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Create Registration
        |--------------------------------------------------------------------------
        */

        const registration = await prisma.trainingRegistration.create({
            data: {
                fullName: fullName.trim(),
                phone: phone.trim(),
                email: normalizedEmail,
                gender,
                ageBracket,

                lga: lga.trim(),
                community: community.trim(),

                position: position.trim(),
                organization: organization?.trim() || null,
                experience,
                agriculturalArea: agriculturalArea.trim(),
                farmersReached: normalizedFarmersReached,
                challenges: challenges?.trim() || null,

                agriTechnology,
                smartphoneType,

                interestAreas,

                expectations: expectations.trim(),

                consent,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message:
                    "Registration submitted successfully.",
                data: {
                    id: registration.id,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(
            "Training registration error:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Something went wrong while submitting your registration.",
            },
            { status: 500 }
        );
    }
}