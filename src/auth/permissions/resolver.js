import { ROLE_PERMISSIONS } from './role-map'

export function getRolePermissions(role) {
    const permissions = ROLE_PERMISSIONS[role]

    if (permissions === '*') {
        return '*'
    }

    return new Set(permissions || [])
}
