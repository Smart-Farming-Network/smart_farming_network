"use client";

import { useEffect, useState } from "react";
import ProductForm from "@/components/products/ProductForm";
import { useParams, useRouter } from "next/navigation";

export default function EditPage() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(setProduct);
    }, [id]);

    const submit = async (data) => {
        await fetch(`/api/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        router.push("/admin/market-place");
    };

    if (!product) return null;

    return <ProductForm initialData={product} onSubmit={submit} />;
}
