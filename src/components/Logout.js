'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { ConfirmationModal } from './ConfirmationModal';

export function Logout({
    children = "Logout",
    className = "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600",
    showConfirm = true,
    callbackUrl = "/login",
    ...props
}) {
    const [showDialog, setShowDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await signOut({ callbackUrl });
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const triggerLogout = () => {
        if (showConfirm) {
            setShowDialog(true);
        } else {
            handleLogout();
        }
    };

    return (
        <>
            {/* Customizable Logout Button */}
            <button
                onClick={triggerLogout}
                className={className}
                {...props}
            >
                {children}
            </button>

            {/* Confirmation Dialog (unchanged) */}
            <ConfirmationModal
                isOpen={showDialog}
                title="Confirm Logout"
                message="Are you sure you want to sign out?..."
                confirmText="Sign Out"
                onConfirm={handleLogout}
                onCancel={() => setShowDialog(false)}
                isLoading={loading}
                confirmButtonVariant="danger"
            />
        </>
    );
}
