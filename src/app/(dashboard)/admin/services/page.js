"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/ui/AdminPageHeader";
import Button from "@/components/ui/Button";

export default function ServiceList() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchServices = async () => {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(data.data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleEdit = (service) => {
        window.location.href = `/admin/services/${service.id}/edit`;
    };

    const handleDelete = async (service) => {
        if (confirm(`Are you sure you want to delete "${service.title}"?`)) {
            await fetch(`/api/services/${service.id}`, { method: "DELETE" });
            setServices((prev) => prev.filter((s) => s.id !== service.id));
        }
    };

    return (
        <div className="container py-4">
            <PageHeader
                title="Services"
                backLink="/admin"
                backText="Back to Dashboard"
            />

            <div className="mt-4 mb-3 text-end">
                <Link
                    href="/admin/services/create"
                    className="btn btn-success fw-bold"
                >
                    + Add New Service
                </Link>
            </div>

            {loading ? (
                <p className="text-muted">Loading services...</p>
            ) : services.length === 0 ? (
                <p className="text-muted">No services found.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered align-middle">
                        <thead className="table-success">
                            <tr>
                                <th>UUID</th>
                                <th>Title</th>
                                <th>Price (₦)</th>
                                <th>Categories</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr key={service.id}>
                                    <td>{service.id}</td>
                                    <td>{service.title}</td>
                                    <td>{service.price.toLocaleString()}</td>
                                    <td>{service.categories}</td>
                                    <td className="text-center d-md-flex justify-content-center gap-2">
                                        <Button
                                            type="button"
                                            onClick={() => handleEdit(service)}
                                            className="btn-sm btn-outline-success me-2 mb-1"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => handleDelete(service)}
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
