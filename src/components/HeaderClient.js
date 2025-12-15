'use client';

import Link from "next/link";
import { Logout } from "./Logout";

export default function HeaderClient({ session }) {
  return (
    <div className="attr-right">
      <div className="attr-nav">
        <ul>
          {session ? (
            <li>
              <Logout className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" />
            </li>
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
