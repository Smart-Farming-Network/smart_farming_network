'use client'

import { Role } from '@/generated/prisma'
import { useState } from 'react'

export default function RoleSelector({ user }) {
    const [role, setRole] = useState(user.role)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function handleUpdate() {
        setLoading(true)
        setMessage('')

        try {
            const res = await fetch(`/api/admin/users/${user.id}/role`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role }),
            })

            if (!res.ok) throw new Error('Failed to update role')

            setMessage('Role updated successfully!')
        } catch (err) {
            setMessage(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mb-3 form-group">
            <label className="form-label">User Role</label>
            <select
                className="form-control px-2 py-2"
                value={role}
                onChange={e => setRole(e.target.value)}
                disabled={loading}
            >
                {Object.values(Role).map(r => (
                    <option key={r} value={r}>
                        {r}
                    </option>
                ))}
            </select>

            <button
                className="btn btn-primary mt-2 col-12"
                onClick={handleUpdate}
                disabled={loading}
            >
                {loading ? 'Updating...' : 'Update Role'}
            </button>

            {message && <p className="mt-2 text-sm text-light bg-info col-12 mt-3 p-4">{message}</p>}
        </div>
    )
}
