'use client';

import { useEffect, useState } from "react";
import PageHeader from "@/components/ui/AdminPageHeader";
import Button from "@/components/ui/Button";

export default function TrainingRegistrationList() {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRegistrations = async () => {
        const res = await fetch("/api/admin/knowledge-hub/training-registration");
        const data = await res.json();
        setRegistrations(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const handleView = (registration) => {
        window.location.href = `/admin/knowledge-hub/training-registration/${registration.id}`;
    };


    return (
        <div className="container py-4">
            <PageHeader
                title="Training Registrations"
                backLink="/admin"
                backText="Back to Dashboard"
            />

            {loading ? (
                <p className="text-muted">Loading registrations...</p>
            ) : registrations.length === 0 ? (
                <p className="text-muted">No registrations found.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered align-middle">
                        <thead className="table-success">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map((registration) => (
                                <tr key={registration.id}>
                                    <td>{registration.fullName}</td>
                                    <td>{registration.email}</td>
                                    <td>
                                        <Button onClick={() => handleView(registration)}>View</Button>
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