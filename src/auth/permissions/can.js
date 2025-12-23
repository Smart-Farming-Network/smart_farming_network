import { getRolePermissions } from './resolver';
import { resolveUserPermissions } from './resolve-user-permissions.js'

export function roleHasPermission(role, permission) {
    const permissions = getRolePermissions(role)

    if (permissions === '*') {
        return true
    }

    return permissions.has(permission)
}

export async function can(user, permission) {
    if (!user || !permission) return false

    const permissions = await resolveUserPermissions(user)

    if (permissions === '*') {
        return true
    }

    return permissions.has(permission)
}
