import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { redirect } from "next/navigation";

/**
 * Protects a page for specific roles
 * @param {string[]} allowedRoles - array of allowed roles
 * @returns {Promise<Session>} - returns session if authorized, otherwise redirects
 */
export async function requireRole(allowedRoles = []) {
    const session = await getServerSession(authOptions);

    if (!session || !allowedRoles.includes(session.user.role)) {
        redirect("/login"); // redirect unauthorized users
    }

    return session;
}
