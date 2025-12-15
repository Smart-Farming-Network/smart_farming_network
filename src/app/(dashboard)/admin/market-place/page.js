"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/ui/AdminPageHeader";
import Button from "@/components/ui/Button";

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
        window.location.href = `/admin/market-place/${product.id}/edit`;
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

            <div className="mt-4 mb-3 text-end">
                <Link
                    href="/admin/market-place/create"
                    className="btn btn-success fw-bold"
                >
                    + Add New Product
                </Link>
            </div>

            {loading ? (
                <p className="text-muted">Loading products...</p>
            ) : products.length === 0 ? (
                <p className="text-muted">No products found.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered align-middle">
                        <thead className="table-success">
                            <tr>
                                <th>UUID</th>
                                <th>Name</th>
                                <th>Price (₦)</th>
                                <th>Category</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price.toLocaleString()}</td>
                                    <td>{product.category}</td>
                                    <td className="text-center d-md-flex justify-content-center gap-2">
                                        <Button
                                            type="button"
                                            onClick={() => handleEdit(product)}
                                            className="btn-sm btn-outline-success me-2 mb-1"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => handleDelete(product)}
                                            className="btn-sm btn-outline-danger mb-1"
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
