import RoleSelector from './role-selector'
import PermissionSelector from './permission-selector'
import { PrismaClient } from '@/generated/prisma'
import { ROLE_PERMISSIONS } from '@/auth/permissions/role-map'
import { PERMISSIONS } from '@/auth/permissions/permission-keys'

const prisma = new PrismaClient()

export default async function AdminUserPage({ params }) {
    const { id } = await params

    // Fetch user with extra permissions
    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            permissions: {
                include: { permission: { select: { key: true } } },
            },
        },
    })

    if (!user) return <div>User not found</div>

    // Extract extra permissions
    const extraPermissions = user.permissions.map(p => p.permission.key)

    // Compute role permissions
    const rolePermissions =
        ROLE_PERMISSIONS[user.role] === '*'
            ? Object.values(PERMISSIONS)
            : ROLE_PERMISSIONS[user.role] || []

    return (
        <div className="container py-4">
            <h2>User Details</h2>

            <div className="card p-3 mt-3">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Current Role:</strong> {user.role}</p>
                <p>
                    <strong>Current Permissions:</strong>{' '}
                    {extraPermissions.length ? extraPermissions.join(', ') : 'None'}
                </p>

                <RoleSelector user={user} />

                <PermissionSelector
                    userId={user.id}
                    currentPermissions={extraPermissions}
                    rolePermissions={rolePermissions}
                />
            </div>
        </div>
    )
}
