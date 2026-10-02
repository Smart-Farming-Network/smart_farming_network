"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/ui/AdminPageHeader";
import Input from "@/components/ui/Input";
import {router} from "next/router";
import { s } from "framer-motion/client";

export default function TrainingRegistrationDetail() {
    const router = useRouter();
    const { id } = useParams();
    const [registration, setRegistration] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/admin/knowledge-hub/training-registration/${id}`)
            .then(res => res.json())
            .then(setRegistration)
            .finally(() => setLoading(false));
    }, [id]);

    //delete function to handle delete registration
    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this registration?")) return;

        try {
            setLoading(true);
            const res = await fetch(`/api/admin/knowledge-hub/training-registration/${id}`, {
                method: "DELETE"
            });

            if (res.ok) {
                router.push("/admin/knowledge-hub/training-registration");
            } else {
                console.error("Failed to delete registration");
            }
        } catch (error) {
            console.error("Error deleting registration:", error);
        }
        finally {
            setLoading(false);
        }
    };

    if (!registration) return <p className="text-muted">Loading registration details...</p>;

    return (
        <div className="container py-4">
            <PageHeader
                title="Training Registration Details"
                backLink="/admin/knowledge-hub/training-registration"
                backText="Back to Registrations"
            />

            {/*form details read-only*/}
            <form className="row">
                <div className="col-md-6">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <Input type="text" className="form-control" value={registration.fullName} readOnly />
                </div>

                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <Input type="email" className="form-control" value={registration.email} readOnly />
                </div>

                <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <Input type="text" className="form-control" value={registration.phone} readOnly />
                </div>

                <div className="col-md-6">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <Input type="text" className="form-control" value={registration.gender} readOnly />
                </div>

                <div className="col-md-6">
                    <label htmlFor="ageBracket" className="form-label">Age Bracket</label>
                    <Input type="text" className="form-control" value={registration.ageBracket} readOnly />
                </div>

                <div className="col-md-6">
                    <label htmlFor="lga" className="form-label">LGA</label>
                    <Input type="text" className="form-control" value={registration.lga} readOnly />
                </div>

                <div className="col-md-6">
                    <label htmlFor="community" className="form-label">Community</label>
                    <Input type="text" className="form-control" value={registration.community} readOnly />
                </div>

                <div className="col-md-6">
                    <label htmlFor="position" className="form-label">Position</label>
                    <Input type="text" className="form-control" value={registration.position} readOnly />
                </div>

                <div className="col-md-6">
                    <label htmlFor="organization" className="form-label">Organization</label>
                    <Input type="text" className="form-control" value={registration.organization} readOnly />
                </div>

                <div className="col-md-6">
                    <label htmlFor="experience" className="form-label">Experience</label>
                    <Input type="text" className="form-control" value={registration.experience} readOnly />
                </div>

                <div className="col-md-6">
                    <label htmlFor="agriculturalArea" className="form-label">Agricultural Area</label>
                    <Input type="text" className="form-control" value={registration.agriculturalArea} readOnly />
                </div>

                <div className="col-md-6">
                    <label htmlFor="farmersReached" className="form-label">Farmers Reached</label>
                    <Input type="text" className="form-control" value={registration.farmersReached} readOnly />
                </div>

                <div className="col-md-6">
                    <label htmlFor="challenges" className="form-label">Challenges</label>
                    <Input type="text" className="form-control" value={registration.challenges} readOnly />
                </div>

                <div className="col-md-6">
                    <label htmlFor="agriTechnology" className="form-label">Agri Technology</label>
                    <Input type="text" className="form-control" value={registration.agriTechnology} readOnly />
                </div>

                <div className="col-md-6">
                    <label htmlFor="smartphoneType" className="form-label">Smartphone Type</label>
                    <Input type="text" className="form-control" value={registration.smartphoneType} readOnly />
                </div>

                <div className="col-md-6">
                    <label htmlFor="interestAreas" className="form-label">Interest Areas</label>
                    <Input type="text" className="form-control" value={registration.interestAreas.join(", ")} readOnly />
                </div>

                <div className="col-md-6">
                    <label htmlFor="expectations" className="form-label">Expectations</label>
                    <Input type="text" className="form-control" value={registration.expectations} readOnly />
                </div>

                <div className="col-md-6">
                    <label htmlFor="consent" className="form-label">Consent</label>
                    <Input type="text" className="form-control" value={registration.consent ? "Yes" : "No"} readOnly />
                </div>

                <div className="col-md-6">
                    <label htmlFor="createdAt" className="form-label">Created At</label>
                    <Input type="text" className="form-control" value={new Date(registration.createdAt).toLocaleString()} readOnly />
                </div>

                <div className="col-12 mt-3">
                    <button type="button" className="btn-danger w-100" onClick={handleDelete} disabled={loading}>
                        {loading ? "Deleting..." : "Delete Registration"}
                    </button>
                </div>
            </form>
        </div>
    );
};