"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
    const params = useSearchParams();
    const router = useRouter();
    const token = params.get("token");

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        setError("");

        const res = await fetch("/api/auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.error || "Reset failed");
            setLoading(false);
            return;
        }

        router.push("/login?reset=success");
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <h4 className="mb-3">Reset Password</h4>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>
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
                            <label className="form-label">Confirm password</label>
                            <input
                                type="password"
                                className="form-control"
                                required
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                            />
                        </div>

                        <button
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? "Resetting..." : "Reset password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
