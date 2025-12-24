import RoleSelector from './role-selector'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export default async function AdminUserPage({ params }) {
    const { id } = await params
    const user = await prisma.user.findUnique({
        where: { id },
    })

    if (!user) {
        return <div>User not found</div>
    }

    return (
        <div className="container py-4">
            <h2>User Details</h2>

            <div className="card p-3 mt-3">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Current Role:</strong> {user.role}</p>

                {/* 🔥 THIS IS WHERE IT SHOWS */}
                <RoleSelector
                    user={user}
                />
            </div>
        </div>
    )
}
