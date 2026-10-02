import {NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";

export async function GET(request) {
    try {
        const registrations = await prisma.trainingRegistration.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json(registrations);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch registrations." },
            { status: 500 }
        );
    }
};