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
    const body = await req.json();

    const existingservice = await prisma.service.findUnique({
        where: { id: params.id },
    });

    if (!existingservice) {
        return new Response(JSON.stringify({ error: "service not found" }), { status: 404 });
    }

    let image = existingservice.image;
    let imageId = existingservice.imageId;

    if (body.image && body.image.startsWith("data:image")) {
        if (imageId) await deleteImage(imageId);
        const uploaded = await uploadImage(body.image);
        image = uploaded.url;
        imageId = uploaded.publicId;
    }

    const service = await prisma.service.update({
        where: { id: params.id },
        data: {
            name: body.name,
            price: body.price,
            category: body.category,
            image,
            imageId,
        },
    });

    return new Response(JSON.stringify(service), { status: 200 });
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
