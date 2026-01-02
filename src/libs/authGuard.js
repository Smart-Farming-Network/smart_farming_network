import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { ROLE_PERMISSIONS } from "@/auth/permissions/role-map";
import { redirect } from "next/navigation";
import { prisma } from "@/libs/prisma";

/**
 * Role-based access guard
 * @param {string[]} allowedRoles - Roles allowed to access the page
 */
export async function requireRole(allowedRoles = []) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login?error=AUTH_REQUIRED");
    }

    if (!allowedRoles.includes(session.user.role)) {
        redirect("/403?error=FORBIDDEN");
    }

    return session;
}

/**
 * Permission-based access guard
 * @param {string[]} requiredPermissions - Permissions required to access the page
 */
export async function requirePermission(requiredPermissions = []) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login?error=AUTH_REQUIRED");
    }

    const userRole = session.user.role;
    const userExtraPermissions = session.user.permissions || [];

    const rolePerms = ROLE_PERMISSIONS[userRole] === "*" ? ["*"] : ROLE_PERMISSIONS[userRole] || [];
    const effectivePerms = new Set([...rolePerms, ...userExtraPermissions]);

    const allowed = effectivePerms.has("*") || requiredPermissions.some(p => effectivePerms.has(p));
    if (!allowed) {
        redirect("/403?error=FORBIDDEN");
    }

    return session;
}


export async function requireAuth() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login?error=AUTH_REQUIRED");
    }

    return session;
}


export async function getCurrentUser() {
    const session = await getServerSession(authOptions);

    if (!session) return null;

    return prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            profile: true,
            permissions: {
                include: { permission: true }
            }
        }
    });
}

