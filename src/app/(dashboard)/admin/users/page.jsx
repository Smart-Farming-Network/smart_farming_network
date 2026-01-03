"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/AdminPageHeader";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
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
        if (confirm(`Delete "${user.email}"?`)) {
            await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
            setUsers((prev) => prev.filter((u) => u.id !== user.id));
        }
    };

    return (
        <div className="container py-4">
            <PageHeader title="System Users" backLink="/admin" backText="Back to Dashboard" />

            <div className="mt-4 mb-3 text-end">
                <Link href="/admin/users/create" className="btn btn-success fw-bold">
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
                                <th>Requested Role</th>
                                <th>Verification Status</th>
                                <th>Completion %</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.requestedRole || "-"}</td>
                                    <td>
                                        <span
                                            className={`badge ${user.verificationStatus === "PENDING"
                                                    ? "bg-warning"
                                                    : user.verificationStatus === "APPROVED"
                                                        ? "bg-success"
                                                        : "bg-danger"
                                                }`}
                                        >
                                            {user.verificationStatus}
                                        </span>
                                    </td>
                                    <td>{user.profileCompletionPct || 0}%</td>
                                    <td className="text-center d-md-flex justify-content-center gap-2">
                                        <Button onClick={() => handleEdit(user)} className="btn-sm btn-outline-success">
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDelete(user)} className="btn-sm btn-outline-danger">
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
