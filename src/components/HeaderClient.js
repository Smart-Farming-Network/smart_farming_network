'use client';
import { useEffect, useState } from 'react';
import Link from "next/link";
import { Logout } from "./Logout";
import { getRedirectByRole } from "@/libs/roleRedirect";

function DashboardNav({ role }) {
  const dashboardUrl = getRedirectByRole(role);
  if (!role || dashboardUrl === "/") return null;
  return <li className="button"><Link href={dashboardUrl}>Dashboard</Link></li>;
}

export default function HeaderClient({ session }) {
  const [mounted, setMounted] = useState(false);
  const role = session?.user?.role;

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // avoids hydration mismatch

  return (
    <div className="attr-right">
      <div className="attr-nav">
        <ul className="flex gap-2 items-center">
          {session ? (
            <>
              <DashboardNav role={role} />
              <li>
                <Logout className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" />
              </li>
            </>
          ) : (
            <li className="button">
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
