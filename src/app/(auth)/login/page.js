import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return <LoginForm />;
}
