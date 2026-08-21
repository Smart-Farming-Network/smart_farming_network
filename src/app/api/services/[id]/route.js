import { prisma } from "@/libs/prisma";
import { generateSlug } from "@/libs/slugify";
import { uploadImage, deleteImage } from "@/libs/cloudinary";

/**
 * GET single service
 */
export async function GET(req, { params }) {
    const service = await prisma.service.findUnique({
        where: { id: params.id },
    });

    if (!service) {
        return new Response(JSON.stringify({ error: "service not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(service), { status: 200 });
}

/**
 * UPDATE service
 */
export async function PUT(req, { params }) {
    try {
        const body = await req.json();

        const existingService = await prisma.service.findUnique({
            where: {
                id: params.id,
            },
        });

        if (!existingService) {
            return Response.json(
                {
                    success: false,
                    error: "Service not found",
                },
                { status: 404 }
            );
        }

        let image = existingService.image;
        let imageId = existingService.imageId;

        /**
         * Only upload a new image when
         * a new base64 image was submitted.
         */
        if (
            body.image &&
            typeof body.image === "string" &&
            body.image.startsWith("data:image")
        ) {
            // Delete old image
            if (imageId) {
                await deleteImage(imageId);
            }

            // Upload new image
            const uploaded = await uploadImage(body.image);

            image = uploaded.url;
            imageId = uploaded.publicId;
        }

        const service = await prisma.service.update({
            where: {
                id: params.id,
            },
            data: {
                title: body.title,
                price: Number(body.price),
                categories: body.categories || [],
                image,
                imageId,
            },
        });

        return Response.json(
            {
                success: true,
                data: service,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("UPDATE SERVICE ERROR:", error);

        return Response.json(
            {
                success: false,
                error: "Failed to update service",
            },
            { status: 500 }
        );
    }
}

/**
 * DELETE service + Cloudinary cleanup
 */
export async function DELETE(req, { params }) {
    const service = await prisma.service.findUnique({
        where: { id: params.id },
    });

    if (!service) {
        return new Response(JSON.stringify({ error: "service not found" }), { status: 404 });
    }

    if (service.imageId) {
        await deleteImage(service.imageId);
    }

    await prisma.service.delete({
        where: { id: params.id },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}
