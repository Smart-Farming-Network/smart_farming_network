import {prisma} from "@/libs/prisma";
import {NextResponse} from "next/server"; 

export async function GET(request, {params}) {
    const {id} = await params;
    try {
        const registration = await prisma.trainingRegistration.findUnique({
            where: {id: id},
        });
        return NextResponse.json(registration);
    } catch (error) {
        return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }
}

export async function DELETE(request, {params}) {
    const {id} = await params;
    try {
        const registration = await prisma.trainingRegistration.delete({
            where: {id: id},
        });
        return NextResponse.json(registration);
    } catch (error) {
        return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }
};
