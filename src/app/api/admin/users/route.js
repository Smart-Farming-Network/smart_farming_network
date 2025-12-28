import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const where = search
        ? {
            OR: [
                { email: { contains: search, mode: "insensitive" } },
                { role: { contains: search, mode: "insensitive" } },
            ],
        }
        : {};

    const [users, total] = await Promise.all([
        prisma.user.findMany({
            where,
            skip,
            take,
            orderBy: { id: "asc" },
        }),
        prisma.user.count({ where }),
    ]);

    return NextResponse.json({
        data: users,
        meta: {
            page,
            pageSize,
            total,
            totalPages: Math.ceil(total / take),
        },
    });
}
