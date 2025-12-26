import { PrismaClient } from '@/generated/prisma'
import { PERMISSIONS } from '@/auth/permissions/permission-keys'
import { ROLE_PERMISSIONS } from '@/auth/permissions/role-map'

const prisma = new PrismaClient()

export async function PATCH(req, { params }) {
    const { id: userId } = await params
    const { permissions } = await req.json() // array of permission KEYS

    // Fetch the user to get their role
    const user = await prisma.user.findUnique({
        where: { id: userId },
    })

    if (!user) {
        return Response.json({ error: 'User not found' }, { status: 404 })
    }

    // Compute immutable role-based permissions
    const rolePermissions =
        ROLE_PERMISSIONS[user.role] === '*'
            ? Object.values(PERMISSIONS)
            : ROLE_PERMISSIONS[user.role] || []

    // Validate keys
    const validKeys = Object.values(PERMISSIONS)
    const invalid = permissions.filter(p => !validKeys.includes(p))
    if (invalid.length) {
        return Response.json(
            { error: `Invalid permissions: ${invalid.join(', ')}` },
            { status: 400 }
        )
    }

    // Ensure role-based permissions are not modified
    const extraPermissions = permissions.filter(
        p => !rolePermissions.includes(p)
    )

    // Fetch permission IDs
    const permissionRecords = await prisma.permission.findMany({
        where: { key: { in: extraPermissions } },
        select: { id: true },
    })

    // Delete only extra permissions (do NOT touch role-based)
    await prisma.userPermission.deleteMany({
        where: {
            userId,
            permission: { key: { notIn: rolePermissions } },
        },
    })

    // Insert new extra permissions
    if (permissionRecords.length > 0) {
        await prisma.userPermission.createMany({
            data: permissionRecords.map(p => ({
                userId,
                permissionId: p.id,
            })),
        })
    }

    return Response.json({ success: true })
}
