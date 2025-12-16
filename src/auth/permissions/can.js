import { getRolePermissions } from './resolver'

export function roleHasPermission(role, permission) {
    const permissions = getRolePermissions(role)

    if (permissions === '*') {
        return true
    }

    return permissions.has(permission)
}
