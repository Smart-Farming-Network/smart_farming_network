import { prisma } from "@/libs/prisma";

export async function GET(req, { params }) {
    const { slug } = params;

    if (!slug) {
        return Response.json(
            { message: "Product slug is required" },
            { status: 400 }
        );
    }

    const product = await prisma.product.findUnique({
        where: { slug },
    });

    if (!product) {
        return Response.json(
            { message: "Product not found" },
            { status: 404 }
        );
    }

    return Response.json(product);
}
