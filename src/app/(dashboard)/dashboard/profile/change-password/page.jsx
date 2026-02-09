"use client";

import { useState } from "react";

export default function ChangePasswordPage() {
    const [current, setCurrent] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirm) {
            setMessage({ type: "danger", text: "Passwords do not match" });
            return;
        }

        setLoading(true);
        setMessage(null);

        const res = await fetch("/api/auth/change-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                currentPassword: current,
                newPassword: password,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            setMessage({ type: "danger", text: data.error });
            setLoading(false);
            return;
        }

        setMessage({ type: "success", text: "Password updated successfully" });
        setCurrent("");
        setPassword("");
        setConfirm("");
        setLoading(false);
    };

    return (
        <div className="container py-4">
            <div className="row">
                <div className="col-md-6">
                    <h5 className="mb-3">Change Password</h5>

                    {message && (
                        <div className={`alert alert-${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Current password</label>
                            <input
                                type="password"
                                className="form-control"
                                required
                                value={current}
                                onChange={(e) => setCurrent(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">New password</label>
                            <input
                                type="password"
                                className="form-control"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Confirm new password</label>
                            <input
                                type="password"
                                className="form-control"
                                required
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                            />
                        </div>

                        <button className="btn btn-primary" disabled={loading}>
                            {loading ? "Updating..." : "Update password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
