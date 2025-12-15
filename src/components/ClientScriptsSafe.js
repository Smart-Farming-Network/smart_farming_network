'use client';
import { useEffect } from 'react';

export default function ClientScriptsSafe() {
  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = '/assets/js/jquery-3.6.0.min.js';
    jquery.async = false;
    document.body.appendChild(jquery);

    jquery.onload = () => {
      const scripts = [
        '/assets/js/bootstrap.bundle.min.js',
        '/assets/js/jquery.appear.js',
        '/assets/js/ScrollTrigger.min.js',
        '/assets/js/SplitText.min.js',
        '/assets/js/ScrollOnReveal.js',
        '/assets/js/swiper-bundle.min.js',
        '/assets/js/magnific-popup.min.js',
        '/assets/js/progress-bar.min.js',
        // '/assets/js/validnavs.js',
        '/assets/js/main.js',
      ];

      scripts.forEach((src) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.body.appendChild(script);
      });
    };
  }, []);

  return null; // renders nothing
}
