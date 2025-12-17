import { prisma } from "@/libs/prisma";
import { generateSlug } from "@/libs/slugify";
import { uploadImage } from "@/libs/cloudinary";

export async function GET(req) {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
        prisma.product.findMany({
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        }),
        prisma.product.count(),
    ]);

    return Response.json({
        data: products,
        meta: {
            total,
            page,
            lastPage: Math.ceil(total / limit),
        },
    });
}

export async function POST(req) {
    const body = await req.json();

    let image = null;
    let imageId = null;

    if (body.image) {
        const uploaded = await uploadImage(body.image);
        image = uploaded.url;
        imageId = uploaded.publicId;
    }

    const product = await prisma.product.create({
        data: {
            name: body.name,
            slug: generateSlug(body.name),
            price: body.price,
            category: body.category,
            image,
            imageId,
        },
    });

    return Response.json(product, { status: 201 });
}
