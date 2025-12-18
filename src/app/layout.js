import '@/app/globals.css';
import Script from "next/script";
import Preloader from '@/components/Preloader';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Smart Farming Network',
  description: 'A smart agricultural application',
  icons: { icon: [{ url: '/img/favicon.png', type: 'image/png', sizes: '32x32' }] },
  openGraph: {
    title: 'Smart Farming Network 🌾',
    description:
      'Transforming agriculture through technology — monitor, analyze, and improve farm productivity effortlessly.',
    url: siteUrl,
    siteName: 'Smart Farming Network',
    images: [{ url: '/img/logo.png', width: 1200, height: 630, alt: 'Smart Farming Dashboard' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Farming Network',
    description: 'Empowering farmers with smart tools and analytics for better yield and sustainability.',
    site: '@your_twitter_handle',
    creator: '@your_twitter_handle',
    images: [`${siteUrl}/img/logo.png`],
  },
};

export const viewport = { width: 'device-width', initialScale: 1.0, maximumScale: 1.0 };


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <Preloader duration={3000} fadeDuration={500} />

        {/* REACT APP */}
        <div id="app-root">
          {children}
        </div>

        {/* SCRIPTS */}
        <Script src="/assets/js/jquery-3.6.0.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/bootstrap.bundle.min.js" strategy="afterInteractive" />


        {/* Plugins */}
        <Script src="/assets/js/jquery.appear.js" strategy="afterInteractive" />
        <Script src="/assets/js/swiper-bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/magnific-popup.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/progress-bar.min.js" strategy="afterInteractive" />

        {/* <Script src="/assets/js/validnavs.js" strategy="afterInteractive" /> */}
        <Script src="/assets/js/main.js" strategy="afterInteractive" />

      </body>
    </html>
  );
}
