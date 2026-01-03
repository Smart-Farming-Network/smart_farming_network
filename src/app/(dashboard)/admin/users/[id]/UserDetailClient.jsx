"use client";

import { useState } from "react";
import RoleSelector from "./role-selector";
import PermissionSelector from "./permission-selector";
import Button from "@/components/ui/Button";
import { ROLE_PERMISSIONS } from "@/auth/permissions/role-map";
import { PERMISSIONS } from "@/auth/permissions/permission-keys";

export default function UserDetailClient({ user }) {
    const [verificationStatus, setVerificationStatus] = useState(user.verificationStatus);
    const [loading, setLoading] = useState(false);

    const extraPermissions = user.permissions.map((p) => p.permission.key);
    const rolePermissions =
        ROLE_PERMISSIONS[user.role] === "*"
            ? Object.values(PERMISSIONS)
            : ROLE_PERMISSIONS[user.role] || [];

    const handleVerification = async (action) => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/verification", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id, action }),
            });
            if (res.ok) setVerificationStatus(action === "APPROVE" ? "APPROVED" : "REJECTED");
            else alert("Action failed");
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-4">
            <h2>User Details</h2>
            <div className="card p-3 mt-3">

                {/* Read-only form */}
                <form className="row g-3 mb-4">
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={user.email} disabled />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Current Role</label>
                        <input type="text" className="form-control" value={user.role} disabled />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Requested Role</label>
                        <input type="text" className="form-control" value={user.requestedRole || "-"} disabled />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Verification Status</label>
                        <input type="text" className="form-control" value={verificationStatus} disabled />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Profile Completion</label>
                        <input type="text" className="form-control" value={`${user.profileCompletionPct || 0}%`} disabled />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Current Permissions</label>
                        <input
                            type="text"
                            className="form-control"
                            value={extraPermissions.length ? extraPermissions.join(", ") : "None"}
                            disabled
                        />
                    </div>
                </form>

                {verificationStatus === "PENDING" && (
                    <div className="mt-3 d-flex gap-2 mb-4 border-bottom pb-3">
                        <Button
                            className="btn-success me-2"
                            onClick={() => handleVerification("APPROVE")}
                            disabled={loading}
                        >
                            Approve
                        </Button>
                        <Button
                            className="btn-danger"
                            style={{ backgroundColor: "red" }}
                            onClick={() => handleVerification("REJECT")}
                            disabled={loading}
                        >
                            Reject
                        </Button>
                    </div>
                )}

                <h4 className="mt-4 mb-3 border-bottom">Role and Permissions</h4>

                <div className="row">
                    <div className="col-md-5">
                        <RoleSelector user={user} />
                    </div>
                    <div className="col-md-7">
                        <PermissionSelector
                            userId={user.id}
                            currentPermissions={extraPermissions}
                            rolePermissions={rolePermissions}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
