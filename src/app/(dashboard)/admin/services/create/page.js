"use client";

import ServiceForm from "@/components/service/ServiceForm";
import { useRouter } from "next/navigation";

export default function CreatePage() {
    const router = useRouter();

    const submit = async (data) => {
        await fetch("/api/services", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        router.push("/admin/services");
    };

    return <ServiceForm onSubmit={submit} />;
}
