import { prisma } from "@/libs/prisma";
import { generateSlug } from "@/libs/slugify";
import { uploadImage } from "@/libs/cloudinary";

export async function GET(req) {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const skip = (page - 1) * limit;

    const [services, total] = await Promise.all([
        prisma.service.findMany({
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        }),
        prisma.service.count(),
    ]);

    return Response.json({
        data: services,
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

    const service = await prisma.service.create({
        data: {
            title: body.title,
            slug: generateSlug(body.title),
            price: body.price,
            category: body.category,
            image,
            imageId,
        },
    });

    return Response.json(service, { status: 201 });
}
