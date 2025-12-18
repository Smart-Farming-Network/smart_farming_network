'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Logout } from "./Logout";
import { getRedirectByRole } from "@/libs/roleRedirect";

export default function HeaderClient({ session }) {
  const [open, setOpen] = useState(false); // mobile nav state
  const [mounted, setMounted] = useState(false); // for hydration
  const role = session?.user?.role;

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const dashboardUrl = getRedirectByRole(role);

  return (
    <>
      <div className="container d-flex justify-content-between align-items-center">

        {/* Brand */}
        <div className="navbar-brand-left">
          <div className="navbar-header">
            {/* Mobile toggle button */}
            <button className="navbar-toggle" onClick={() => setOpen(true)}>
              <i className="fa fa-bars" />
            </button>

            <Link className="navbar-brand" href="/">
              <Image
                width={50}
                height={40}
                src="/assets/img/logo-mix.png"
                className="logo"
                alt="Logo"
              />
            </Link>
          </div>
        </div>

        {/* Desktop menu */}
        <ul className="nav d-none d-lg-flex">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="#">Services</Link></li>
          <li><Link href="#">Marketplace</Link></li>
        </ul>

        {/* Right side / desktop */}
        <div className="attr-right">
          <div className="attr-nav">
            <ul className="flex gap-2 items-center">
              {session && role && dashboardUrl !== "/" && (
                <li className="button"><Link href={dashboardUrl} >Dashboard</Link></li>
              )}
              {session ? (
                <>
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
      </div>

      {/* Mobile nav */}
      <div className={`mobile-nav ${open ? "show" : ""}`}>
        <div className="mobile-nav-content">
          <button className="close-btn" onClick={() => setOpen(false)}>
            <i className="fa fa-times"></i>
          </button>

          <Image src="/assets/img/logo.png" width={60} height={50} alt="Logo" />

          <ul>
            <li><Link href="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link href="/about" onClick={() => setOpen(false)}>About</Link></li>
            <li><Link href="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
            <li><Link href="#">Services</Link></li>
            <li><Link href="#">Marketplace</Link></li>
            {session && role && dashboardUrl !== "/" && (
              <li className="button"><Link href={dashboardUrl} onClick={() => setOpen(false)}>Dashboard</Link></li>
            )}
          </ul>

          {session ? (
            <Logout className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" />
          ) : (
            <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
          )}
        </div>
      </div>
    </>
  );
}
