import { prisma } from "@/libs/prisma";
import { generateSlug } from "@/libs/slugify";
import { uploadImage, deleteImage } from "@/libs/cloudinary";

/**
 * GET single product
 */
export async function GET(req, { params }) {
    const product = await prisma.product.findUnique({
        where: { id: params.id },
    });

    if (!product) {
        return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
}

/**
 * UPDATE product
 */
export async function PUT(req, { params }) {
    const body = await req.json();

    const existingProduct = await prisma.product.findUnique({
        where: { id: params.id },
    });

    if (!existingProduct) {
        return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }

    let image = existingProduct.image;
    let imageId = existingProduct.imageId;

    if (body.image && body.image.startsWith("data:image")) {
        if (imageId) await deleteImage(imageId);
        const uploaded = await uploadImage(body.image);
        image = uploaded.url;
        imageId = uploaded.publicId;
    }

    const product = await prisma.product.update({
        where: { id: params.id },
        data: {
            name: body.name,
            slug: generateSlug(body.name),
            price: body.price,
            category: body.category,
            image,
            imageId,
        },
    });

    return new Response(JSON.stringify(product), { status: 200 });
}

/**
 * DELETE product + Cloudinary cleanup
 */
export async function DELETE(req, { params }) {
    const product = await prisma.product.findUnique({
        where: { id: params.id },
    });

    if (!product) {
        return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }

    if (product.imageId) {
        await deleteImage(product.imageId);
    }

    await prisma.product.delete({
        where: { id: params.id },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}
