"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/ui/AdminPageHeader";
import Button from "@/components/ui/Button";

export default function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        const res = await fetch("/api/admin/projects");
        const data = await res.json();
        setProjects(data.data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleEdit = (project) => {
        window.location.href = `/admin/projects/${project.id}/edit`;
    };

    const handleDelete = async (project) => {
        if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
            await fetch(`/api/admin/projects/${project.id}`, { method: "DELETE" });
            setProjects((prev) => prev.filter((p) => p.id !== project.id));
        }
    };

    return (
        <div className="container py-4">
            <PageHeader
                title="Projects"
                description="Manage your projects here."
                backLink="/admin"
                backText="Back to Dashboard"
            />

            <div className="mt-4 mb-3 text-end">
                <Link
                    href="/admin/projects/create"
                    className="btn btn-success fw-bold"
                >
                    + Add New Project
                </Link>
            </div>

            {loading ? (
                <p className="text-muted">Loading projects...</p>
            ) : projects.length === 0 ? (
                <p className="text-muted">No projects found.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered align-middle">
                        <thead className="table-success">
                            <tr>
                                <th>UUID</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.id}>
                                    <td>{project.id}</td>
                                    <td>{project.title}</td>
                                    <td>{project.category}</td>
                                    <td className="text-center d-md-flex justify-content-center gap-2">
                                        <Button
                                            type="button"
                                            onClick={() => handleEdit(project)}
                                            className="btn-sm btn-outline-success me-2 mb-1"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => handleDelete(project)}
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
