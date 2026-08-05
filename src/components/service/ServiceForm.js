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

export default function ServiceForm({ initialData, onSubmit }) {
    const [form, setForm] = useState({
        title: initialData?.title || "",
        price: initialData?.price || "",
        categories: initialData?.categories || "",
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
                title={initialData ? "Edit Service" : "Service Management"}
                backLink="/admin/services"
                backText="Back to Services"
            />

            {/* Form */}
            <form onSubmit={submit} className="d-flex flex-column gap-3">
                <Input
                    label="Title"
                    value={form.title}
                    placeholder="Enter Service Title"
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />

                <Input
                    label="Price"
                    type="number"
                    value={form.price}
                    placeholder="Enter Service Price (NGN)"
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                />

                <Input
                    label="Categories"
                    value={form.categories}
                    placeholder="Enter Service Categories"
                    onChange={(e) => setForm({ ...form, categories: e.target.value })}
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
