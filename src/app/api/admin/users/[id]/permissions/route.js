import { PrismaClient } from '@/generated/prisma'
import { PERMISSIONS } from '@/auth/permissions/permission-keys'

const prisma = new PrismaClient()

export async function PATCH(req, { params }) {
    const { id: userId } = await params
    const { permissions } = await req.json() // array of permission KEYS

    // validate keys
    const validKeys = Object.values(PERMISSIONS)
    const invalid = permissions.filter(p => !validKeys.includes(p))
    if (invalid.length) {
        return Response.json(
            { error: `Invalid permissions: ${invalid.join(', ')}` },
            { status: 400 }
        )
    }

    // fetch permission IDs
    const permissionRecords = await prisma.permission.findMany({
        where: { key: { in: permissions } },
        select: { id: true },
    })

    // reset user permissions
    await prisma.userPermission.deleteMany({
        where: { userId },
    })

    // insert new permissions
    await prisma.userPermission.createMany({
        data: permissionRecords.map(p => ({
            userId,
            permissionId: p.id,
        })),
    })

    return Response.json({ success: true })
}
