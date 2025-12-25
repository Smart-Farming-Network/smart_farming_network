import RoleSelector from './role-selector'
import PermissionSelector from './permission-selector'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export default async function AdminUserPage({ params }) {
    const { id } = await params

    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            permissions: {
                include: {
                    permission: {
                        select: { key: true },
                    },
                },
            },
        },
    })

    if (!user) {
        return <div>User not found</div>
    }

    const extraPermissions = user.permissions.map(
        p => p.permission.key
    )

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
                />
            </div>
        </div>
    )
}
