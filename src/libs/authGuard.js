import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { redirect } from "next/navigation";

/**
 * Role-based access guard
 * - Not logged in  → redirect to login with message
 * - Logged in but forbidden → redirect to home with 403 context
 */
export async function requireRole(allowedRoles = []) {
    const session = await getServerSession(authOptions);

    // 1️⃣ User NOT logged in
    if (!session) {
        redirect("/login?error=AUTH_REQUIRED");
    }

    // 2️⃣ User logged in but NOT authorized
    if (!allowedRoles.includes(session.user.role)) {
        redirect("/403?error=FORBIDDEN"); // or /403
    }

    // 3️⃣ Authorized
    return session;
}
