"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";
import PageHeader from "@/components/ui/AdminPageHeader";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleEdit = (product) => {
        window.location.href = `/admin/market-place/edit/${product.id}`;
    };

    const handleDelete = async (product) => {
        if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
            await fetch(`/api/products/${product.id}`, { method: "DELETE" });
            setProducts((prev) => prev.filter((p) => p.id !== product.id));
        }
    };

    return (
        <div className="container py-4">
            <PageHeader
                title="Marketplace Products"
                backLink="/admin"
                backText="Back to Dashboard"
            />

            {loading ? (
                <p className="text-muted">Loading products...</p>
            ) : products.length === 0 ? (
                <p className="text-muted">No products found.</p>
            ) : (
                products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))
            )}

            <div className="mt-4 text-end">
                <Link
                    href="/admin/market-place/create"
                    className="btn btn-success fw-bold"
                >
                    + Add New Product
                </Link>
            </div>
        </div>
    );
}
