'use client';

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentVerifyPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const reference = searchParams.get("reference");

    useEffect(() => {
        if (!reference) {
            router.replace("/checkout/fail");
            return;
        }

        async function verifyPayment() {
            try {
                const res = await fetch(`/api/payment/verify?reference=${reference}`);
                const data = await res.json();

                if (data.success) {
                    router.replace(`/checkout/success?reference=${reference}`);
                } else {
                    router.replace(`/checkout/fail?reference=${reference}`);
                }
            } catch (err) {
                console.error(err);
                router.replace(`/checkout/fail?reference=${reference}`);
            }
        }

        verifyPayment();
    }, [reference, router]);

    return (
        <div className="container py-5 text-center">
            <div className="spinner-border text-success mb-3"></div>
            <h5>Verifying your payment…</h5>
            <p>Please do not close this page.</p>
        </div>
    );
}
