'use client';
import { useEffect, useState } from 'react';

export default function AuthLayout({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <div id="auth-layout">{children}</div>;
}
