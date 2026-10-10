
"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import PageHeader from "../ui/AdminPageHeader";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(
      new Error("Unable to read the selected image.")
    );

    reader.readAsDataURL(file);
  });

export default function ProjectForm({ initialData, onSubmit }) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    category: initialData?.category || "",
    content: initialData?.content || "",
    image: initialData?.image || null,
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  const submit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const title = form.title.trim();
    const category = form.category.trim();
    const content = form.content.trim();

    if (!title || !category || !content) {
      setError("Please complete all required fields.");
      return;
    }

    if (!form.image) {
      setError("Please select a project image.");
      return;
    }

    if (form.image instanceof File) {
      if (!form.image.type.startsWith("image/")) {
        setError("Please select a valid image file.");
        return;
      }

      if (form.image.size > MAX_IMAGE_SIZE) {
        setError("Image size must not exceed 5 MB.");
        return;
      }
    }

    setError("");
    setIsSubmitting(true);

    try {
      let image = form.image;

      if (image instanceof File) {
        image = await toBase64(image);
      }

      await onSubmit({
        ...form,
        title,
        category,
        content,
        image,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "700px", margin: "0 auto" }}
    >
      <PageHeader
        title={initialData ? "Edit Project" : "Project Management"}
        backLink="/admin/projects"
        backText="Back to Projects"
      />

      <form onSubmit={submit} className="d-flex flex-column gap-3">
        {error && (
          <div className="alert alert-danger mb-0" role="alert">
            {error}
          </div>
        )}

        <Input
          label="Name"
          value={form.title}
          placeholder="Enter Project Name"
          onChange={(e) => updateField("title", e.target.value)}
          required
        />

        <Input
          label="Category"
          value={form.category}
          placeholder="Enter Project Category"
          onChange={(e) => updateField("category", e.target.value)}
          required
        />

        <div>
          <label className="form-label small fw-bold">
            Content
          </label>
          <textarea
            className="form-control"
            value={form.content}
            placeholder="Enter Project Content"
            rows={5}
            onChange={(e) => updateField("content", e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label small fw-bold">
            Project Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              updateField("image", e.target.files?.[0] || null)
            }
            className="form-control"
            required={!form.image}
          />

          {form.image instanceof File && (
            <small className="text-muted d-block mt-2">
              Selected: {form.image.name}
            </small>
          )}

          {initialData?.image && !(form.image instanceof File) && (
            <small className="text-muted d-block mt-2">
              An existing image is selected. Choose another to replace it.
            </small>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Update Project"
              : "Save Project"}
        </Button>
      </form>
    </div>
  );
}
