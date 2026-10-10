"use client";

import { useEffect, useState } from "react";
import ProjectForm from "@/components/projects/ProjectForm";
import { useParams, useRouter } from "next/navigation";

export default function EditPage() {
    const { id } = useParams();
    const router = useRouter();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        const fetchProject = async () => {
            setLoading(true);
            setError("");

            try {
                const res = await fetch(`/api/admin/projects/${id}`);

                let result;

                try {
                    result = await res.json();
                } catch {
                    throw new Error("The server returned an invalid response.");
                }

                if (!res.ok) {
                    throw new Error(
                        result?.message ||
                        result?.error ||
                        (res.status === 404
                            ? "Project not found."
                            : "Failed to load project. Please try again.")
                    );
                }

                // Supports either a direct project object
                // or an API response shaped like { project: {...} }.
                const fetchedProject = result?.project || result;

                if (
                    !fetchedProject ||
                    typeof fetchedProject !== "object" ||
                    !fetchedProject.id
                ) {
                    throw new Error("The project data is invalid.");
                }

                setProject(fetchedProject);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong while loading the project."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    const submit = async (data) => {
        let res;

        try {
            res = await fetch(`/api/admin/projects/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        } catch {
            throw new Error(
                "Unable to connect to the server. Check your connection and try again."
            );
        }

        let result;

        try {
            result = await res.json();
        } catch {
            result = null;
        }

        if (!res.ok) {
            throw new Error(
                result?.message ||
                result?.error ||
                `Failed to update project (${res.status}). Please try again.`
            );
        }

        router.push("/admin/projects");
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted mt-3">Loading project...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5" style={{ maxWidth: "700px" }}>
                <div className="alert alert-danger" role="alert">
                    <h5 className="alert-heading">Unable to Load Project</h5>
                    <p className="mb-3">{error}</p>
                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => router.refresh()}
                    >
                        Try Again
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={() => router.push("/admin/projects")}
                    >
                        Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="container py-5">
                <div className="alert alert-warning" role="alert">
                    Project not found.
                </div>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => router.push("/admin/projects")}
                >
                    Back to Projects
                </button>
            </div>
        );
    }

    return <ProjectForm initialData={project} onSubmit={submit} />;
}