
"use client";

import ProjectForm from "@/components/projects/ProjectForm";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();

  const submit = async (data) => {
    let response;

    try {
      response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      throw new Error(
        "Unable to connect to the server. Please check your connection and try again."
      );
    }

    let result;

    try {
      result = await response.json();
    } catch {
      result = null;
    }

    if (!response.ok) {
      throw new Error(
        result?.message ||
          result?.error ||
          `Failed to save project (${response.status}). Please try again.`
      );
    }

    router.push("/admin/projects");
  };

  return <ProjectForm onSubmit={submit} />;
}
