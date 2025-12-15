import { prisma } from "@/libs/prisma";
import { generateSlug } from "@/libs/slugify";
import { uploadImage, deleteImage } from "@/libs/cloudinary";

/**
 * GET single product
 */
export async function GET(_, { params }) {
    const product = await prisma.product.findUnique({
        where: { id: params.id },
    });

    return Response.json(product);
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
        return Response.json({ error: "Product not found" }, { status: 404 });
    }

    let image = existingProduct.image;
    let imageId = existingProduct.imageId;

    // 🔥 Image changed (base64 sent)
    if (body.image && body.image.startsWith("data:image")) {
        // Delete old image
        if (imageId) {
            await deleteImage(imageId);
        }

        // Upload new image
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

    return Response.json(product);
}

/**
 * DELETE product + Cloudinary cleanup
 */
export async function DELETE(_, { params }) {
    const product = await prisma.product.findUnique({
        where: { id: params.id },
    });

    if (!product) {
        return Response.json({ error: "Product not found" }, { status: 404 });
    }

    // 🔥 Delete Cloudinary image first
    if (product.imageId) {
        await deleteImage(product.imageId);
    }

    await prisma.product.delete({
        where: { id: params.id },
    });

    return Response.json({ success: true });
}
