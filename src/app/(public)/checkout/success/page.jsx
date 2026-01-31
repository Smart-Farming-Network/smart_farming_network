'use client';

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccessPage() {
    const reference = useSearchParams().get("reference");

    return (
        <div className="container py-5 text-center">
            <h2 className="text-success mb-3">Payment Successful 🎉</h2>
            <p>Your order has been confirmed.</p>

            {reference && (
                <small className="text-muted">
                    Reference: <strong>{reference}</strong>
                </small>
            )}

            <div className="mt-4">
                <Link href="/market-place" className="btn btn-success">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}
