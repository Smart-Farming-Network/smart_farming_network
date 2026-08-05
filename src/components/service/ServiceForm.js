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
        categories: Array.isArray(initialData?.categories)
            ? initialData.categories
            : [],
        image: initialData?.image || null,
    });

    const updateField = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const addCategory = () => {
        setForm((prev) => ({
            ...prev,
            categories: [...prev.categories, ""],
        }));
    };

    const updateCategory = (index, value) => {
        setForm((prev) => {
            const categories = [...prev.categories];

            categories[index] = value;

            return {
                ...prev,
                categories,
            };
        });
    };

    const removeCategory = (index) => {
        setForm((prev) => ({
            ...prev,
            categories: prev.categories.filter(
                (_, categoryIndex) => categoryIndex !== index
            ),
        }));
    };

    const submit = async (e) => {
        e.preventDefault();

        let image = form.image;
        if (form.image instanceof File) {
            image = await toBase64(form.image);
        }

        const categories = form.categories
            .map((category) => category.trim())
            .filter(Boolean);

        onSubmit({
            ...form,
            price: Number(form.price),
            categories,
            image,
        });
    };

    return (
        <div
            className="container"
            style={{
                maxWidth: "700px",
                margin: "0 auto",
            }}
        >
            {/* Page Header */}
            <PageHeader
                title={initialData ? "Edit Service" : "Service Management"}
                backLink="/admin/services"
                backText="Back to Services"
            />

            {/* Form */}
            <form onSubmit={submit} className="d-flex flex-column gap-3">

                {/* Title */}
                <Input
                    label="Title"
                    value={form.title}
                    placeholder="Enter Service Title"
                    onChange={(e) =>
                        updateField("title", e.target.value)
                    }
                />

                {/* Price */}
                <Input
                    label="Price"
                    type="number"
                    value={form.price}
                    placeholder="Enter Service Price (NGN)"
                    onChange={(e) =>
                        updateField("price", e.target.value)
                    }
                />

                {/* Categories */}
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label small fw-bold mb-0">
                            Categories
                        </label>

                        <button
                            type="button"
                            onClick={addCategory}
                            className="btn btn-sm btn-outline-primary"
                        >
                            <i className="bi bi-plus-lg me-1"></i>
                            Add Category
                        </button>
                    </div>

                    <div className="d-flex flex-column gap-2">
                        {form.categories.length === 0 ? (
                            <div className="border rounded p-3 text-center text-muted small">
                                No categories added yet.
                                <br />
                                Click <strong>Add Category</strong> to add one.
                            </div>
                        ) : (
                            form.categories.map((category, index) => (
                                <div
                                    key={index}
                                    className="d-flex align-items-center gap-2"
                                >
                                    <div className="flex-grow-1">
                                        <input
                                            type="text"
                                            value={category}
                                            placeholder={`Category ${index + 1}`}
                                            onChange={(e) =>
                                                updateCategory(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            className="form-control"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeCategory(index)
                                        }
                                        className="btn btn-outline-danger"
                                        title="Remove category"
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Image */}
                <div className="mb-3">
                    <label className="form-label small fw-bold">
                        Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            updateField(
                                "image",
                                e.target.files?.[0] || null
                            )
                        }
                        className="form-control"
                    />
                </div>

                {/* Submit */}
                <Button>
                    {initialData ? "Update Service" : "Save Service"}
                </Button>
            </form>
        </div>
    );
}
