'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Preloader({ duration = 3000, fadeDuration = 500 }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Reset on every path change
    setVisible(true);
    setFade(false);

    const timer = setTimeout(() => setFade(true), duration);
    const removeTimer = setTimeout(() => setVisible(false), duration + fadeDuration);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [pathname, duration, fadeDuration]);

  if (!visible) return null;

  return (
    <div id="preloader" className={fade ? "fade-out" : ""}>
      <div id="agrica-preloader" className="agrica-preloader">
        <div className="animation-preloader">
          <div className="spinner"></div>
        </div>
        <div className="loader">
          <div className="row">
            <div className="col-3 loader-section section-left"><div className="bg"></div></div>
            <div className="col-3 loader-section section-left"><div className="bg"></div></div>
            <div className="col-3 loader-section section-right"><div className="bg"></div></div>
            <div className="col-3 loader-section section-right"><div className="bg"></div></div>
          </div>
        </div>
      </div>
      <div id="loading"></div>
    </div>
  );
}
