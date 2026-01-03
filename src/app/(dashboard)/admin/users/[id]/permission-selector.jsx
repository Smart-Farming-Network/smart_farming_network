'use client'

import { useState } from 'react'
import { PERMISSIONS } from '@/auth/permissions/permission-keys'

export default function PermissionSelector({
    userId,
    currentPermissions = [],
    rolePermissions = [],
}) {
    const [selected, setSelected] = useState(new Set(currentPermissions))
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    function togglePermission(key) {
        if (rolePermissions.includes(key)) return // cannot toggle role permissions
        const newSet = new Set(selected)
        if (newSet.has(key)) newSet.delete(key)
        else newSet.add(key)
        setSelected(newSet)
    }

    async function handleUpdate() {
        setLoading(true)
        setMessage('')

        try {
            // Exclude role-based permissions before sending to backend
            const extraOnly = Array.from(selected).filter(
                key => !rolePermissions.includes(key)
            )

            const res = await fetch(`/api/admin/users/${userId}/permissions`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ permissions: extraOnly }),
            })

            if (!res.ok) throw new Error('Failed to update permissions')

            setMessage('Permissions updated!')
        } catch (err) {
            setMessage(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mb-3 form-group">
            <label className="form-label fw-bold fs-4">Extra Permissions</label>
            <div className="d-flex flex-column mb-2 align-items-start">
                {Object.entries(PERMISSIONS).map(([key, value]) => {
                    const isRolePermission = rolePermissions.includes(value)
                    const isChecked = isRolePermission || selected.has(value)

                    return (
                        <label key={value} className="form-check mb-1 d-flex align-items-center">
                            <input
                                type="checkbox"
                                className="form-check-input mx-2 px-4"
                                checked={isChecked}
                                disabled={isRolePermission || loading}
                                onChange={() => togglePermission(value)}
                            />
                            <span className="form-check-label">
                                {key} {isRolePermission ? '(role)' : ''}
                            </span>
                        </label>
                    )
                })}
            </div>

            <button
                className="btn btn-primary mt-2 col-12"
                onClick={handleUpdate}
                disabled={loading}
            >
                {loading ? 'Updating...' : 'Update Permissions'}
            </button>

            {message && <p className="mt-2 text-sm text-light bg-info col-12 mt-3 p-4">{message}</p>}
        </div>
    )
}
