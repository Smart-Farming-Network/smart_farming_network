"use client";

import ProductForm from "@/components/products/ProductForm";
import { useRouter } from "next/navigation";

export default function CreatePage() {
    const router = useRouter();

    const submit = async (data) => {
        await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        router.push("/admin/market-place");
    };

    return <ProductForm onSubmit={submit} />;
}
