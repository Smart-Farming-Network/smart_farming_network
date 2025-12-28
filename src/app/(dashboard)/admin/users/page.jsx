"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/ui/AdminPageHeader";
import Button from "@/components/ui/Button";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        setUsers(data.data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        window.location.href = `/admin/users/${user.id}`;
    };

    const handleDelete = async (user) => {
        if (confirm(`Are you sure you want to delete "${user.email}"?`)) {
            await fetch(`/api/admin/users/${user.id}`, {
                method: "DELETE",
            });

            setUsers((prev) => prev.filter((u) => u.id !== user.id));
        }
    };

    return (
        <div className="container py-4">
            <PageHeader
                title="System Users"
                backLink="/admin"
                backText="Back to Dashboard"
            />

            <div className="mt-4 mb-3 text-end">
                <Link
                    href="/admin/users/create"
                    className="btn btn-success fw-bold"
                >
                    + Add New User
                </Link>
            </div>

            {loading ? (
                <p className="text-muted">Loading users...</p>
            ) : users.length === 0 ? (
                <p className="text-muted">No users found.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered align-middle">
                        <thead className="table-success">
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className="badge bg-secondary">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="text-center d-md-flex justify-content-center gap-2">
                                        <Button
                                            type="button"
                                            onClick={() => handleEdit(user)}
                                            className="btn-sm btn-outline-success me-2 mb-1"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => handleDelete(user)}
                                            className="btn-sm btn-outline-danger mb-1"
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
