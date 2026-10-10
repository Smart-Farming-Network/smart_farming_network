import { prisma } from "@/libs/prisma";
import { generateSlug } from "@/libs/slugify";
import { uploadImage, deleteImage } from "@/libs/cloudinary";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const project = await prisma.project.findUnique({
        where: { id: params.id },
    });

    if (!project) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
}

export async function PUT(req, { params }) {
    const body = await req.json();

    const existingProject = await prisma.project.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!existingProject) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    let image = existingProject.image;
    let imageId = existingProject.imageId;

    if (body.image && body.image.startsWith("data:image")) {
        if (imageId) {
            await deleteImage(imageId);
        }

        const uploaded = await uploadImage(body.image);
        image = uploaded.url;
        imageId = uploaded.publicId;
    }

    const project = await prisma.project.update({
        where: { id: params.id },
        data: {
            title: body.title,
            slug: generateSlug(body.title),
            content: body.content,
            category: body.category,
            image,
            imageId,
        },
    });

    return NextResponse.json(project);
}

export async function DELETE(req, { params }) {
    const existingProject = await prisma.project.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!existingProject) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (existingProject.imageId) {
        await deleteImage(existingProject.imageId);
    }

    const project = await prisma.project.delete({
        where: { id: params.id },
    });

    return NextResponse.json(project);
}
