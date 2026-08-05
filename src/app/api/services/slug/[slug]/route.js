import { prisma } from "@/libs/prisma";

export async function GET(req, { params }) {
    const { slug } = params;

    if (!slug) {
        return Response.json(
            { message: "service slug is required" },
            { status: 400 }
        );
    }

    const service = await prisma.service.findUnique({
        where: { slug },
    });

    if (!service) {
        return Response.json(
            { message: "service not found" },
            { status: 404 }
        );
    }

    return Response.json(service);
}
