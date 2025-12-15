"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import PageHeader from "../ui/AdminPageHeader";

const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

export default function ProductForm({ initialData, onSubmit }) {
    const [form, setForm] = useState({
        name: initialData?.name || "",
        price: initialData?.price || "",
        category: initialData?.category || "",
        image: initialData?.image || null,
    });

    const submit = async (e) => {
        e.preventDefault();

        let image = form.image;
        if (form.image instanceof File) {
            image = await toBase64(form.image);
        }

        onSubmit({
            ...form,
            price: Number(form.price),
            image,
        });
    };

    return (
        <div className="container" style={{ maxWidth: "700px", margin: "0 auto" }}>
            {/* Page Header */}
            <PageHeader
                title={initialData ? "Edit Product" : "Product Management"}
                backLink="/admin/market-place"
                backText="Back to Products"
            />

            {/* Form */}
            <form onSubmit={submit} className="d-flex flex-column gap-3">
                <Input
                    label="Name"
                    value={form.name}
                    placeholder="Enter Product Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <Input
                    label="Price"
                    type="number"
                    value={form.price}
                    placeholder="Enter Product Price (NGN)"
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                />

                <Input
                    label="Category"
                    value={form.category}
                    placeholder="Enter Product Category"
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                />

                <div className="mb-3">
                    <label className="form-label small fw-bold">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                        className="form-control"
                    />
                </div>

                <Button>{initialData ? "Update Product" : "Save Product"}</Button>
            </form>
        </div>
    );
}
