import { prisma } from "@/libs/prisma";
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

