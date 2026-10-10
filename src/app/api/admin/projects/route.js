import { prisma } from "@/libs/prisma";
import { generateSlug } from "@/libs/slugify";
import { uploadImage } from "@/libs/cloudinary";
import { NextResponse } from "next/server";

export async function GET(req){
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const skip = (page - 1) * limit; 
    
    const [projects, total] = await Promise.all([
        prisma.project.findMany({
            orderBy: [
                { updatedAt: "desc" },
                { createdAt: "desc" },
            ],
            skip,
            take: limit,
        }),
        prisma.project.count(),
    ]);
    
    return NextResponse.json({ 
        data: projects,
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
    };

    const project = await prisma.$transaction(async (tx) => {
        const project = await tx.project.create({
            data: {
                title: body.title,
                slug: generateSlug(body.title),
                content: body.content,
                category: body.category,
                image,
                imageId,
            },
        });
        return project;
    });

    return NextResponse.json(project);
}
