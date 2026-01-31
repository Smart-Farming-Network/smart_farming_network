'use client';

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentFailPage() {
    const reference = useSearchParams().get("reference");

    return (
        <div className="container py-5 text-center">
            <h2 className="text-danger mb-3">Payment Failed ❌</h2>
            <p>We couldn’t complete your payment.</p>

            {reference && (
                <small className="text-muted">
                    Reference: <strong>{reference}</strong>
                </small>
            )}

            <div className="mt-4 d-flex gap-2 justify-content-center">
                <Link href="/checkout" className="btn btn-outline-danger">
                    Try Again
                </Link>
                <Link href="/" className="btn btn-secondary">
                    Go Home
                </Link>
            </div>
        </div>
    );
}
