'use client';
import React from "react";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function ForbiddenPage() {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--bg-gray)",
                padding: "24px",
                fontFamily: "var(--font-default)",
            }}
        >
            <div
                style={{
                    maxWidth: "500px",
                    width: "100%",
                    background: "var(--white)",
                    borderRadius: "14px",
                    padding: "40px 32px",
                    boxShadow: "var(--box-shadow-regular)",
                    textAlign: "center",
                    borderTop: "6px solid var(--color-secondary)",
                }}
            >
                <h1
                    style={{
                        fontSize: "72px",
                        margin: "0",
                        fontWeight: "700",
                        color: "var(--dark)",
                    }}
                >
                    403
                </h1>

                <h2
                    style={{
                        marginTop: "8px",
                        fontSize: "22px",
                        color: "var(--color-heading)",
                    }}
                >
                    Access Restricted
                </h2>

                <p
                    style={{
                        marginTop: "14px",
                        color: "var(--color-paragraph)",
                        lineHeight: "1.6",
                    }}
                >
                    You’re logged in, but your account doesn’t have permission to access this
                    section of the platform.
                </p>

                <div
                    style={{
                        display: "flex",
                        gap: "14px",
                        marginTop: "32px",
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <Link
                        href="/"
                        style={{
                            padding: "12px 22px",
                            borderRadius: "8px",
                            background: "var(--color-secondary)",
                            color: "var(--white)",
                            textDecoration: "none",
                            fontWeight: "500",
                            boxShadow: "var(--box-shadow-primary)",
                        }}
                    >
                        Back to Home
                    </Link>

                    <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        style={{
                            padding: "12px 22px",
                            borderRadius: "8px",
                            background: "transparent",
                            color: "var(--dark)",
                            border: "2px solid var(--color-primary)",
                            cursor: "pointer",
                            fontWeight: "500",
                        }}
                    >
                        Switch Account
                    </button>
                </div>
            </div>
        </div>
    );
}
