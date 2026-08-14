"use client";

import { useEffect, useState } from "react";
import ServiceForm from "@/components/service/ServiceForm";
import { useParams, useRouter } from "next/navigation";

export default function EditPage() {
    const { id } = useParams();
    const router = useRouter();
    const [service, setService] = useState(null);

    useEffect(() => {
        fetch(`/api/services/${id}`)
            .then(res => res.json())
            .then(setService);
    }, [id]);

    const submit = async (data) => {
        await fetch(`/api/services/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        router.push("/admin/services");
    };

    if (!service) return null;

    return <ServiceForm initialData={service} onSubmit={submit} />;
}
