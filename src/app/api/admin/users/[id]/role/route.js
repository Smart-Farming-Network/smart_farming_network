import { PrismaClient, Role } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function PATCH(req, { params }) {
    const { id } = await params
    const { role } = await req.json()

    if (!Object.values(Role).includes(role)) {
        return Response.json(
            { error: 'Invalid role' },
            { status: 400 }
        )
    }

    await prisma.user.update({
        where: { id },
        data: { role },
    })

    return Response.json({ success: true })
}
