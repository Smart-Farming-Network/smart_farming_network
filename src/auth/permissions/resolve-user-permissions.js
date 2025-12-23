import { getRolePermissions } from './resolver.js'
import { getUserExtraPermissions } from './user-permissions.js'

export async function resolveUserPermissions(user) {
    if (!user) return new Set()

    const rolePermissions = getRolePermissions(user.role)

    // Admin wildcard → no DB call needed
    if (rolePermissions === '*') {
        return '*'
    }

    const userPermissions = await getUserExtraPermissions(user.id)

    return new Set([
        ...rolePermissions,
        ...userPermissions,
    ])
}
