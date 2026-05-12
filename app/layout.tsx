import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Posh Pork Murder Mystery",
  description: "An immersive murder mystery dinner experience in Mallorca",
  verification: {
    google: 'google72a182ec07d32c38',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager - Analytics & Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GC1QGCDZ0Z"
          strategy="afterInteractive"
        />
        <Script id="google-tracking" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Google Analytics
            gtag('config', 'G-GC1QGCDZ0Z');
            
            // Google Ads Conversion Tracking
            gtag('config', 'AW-18073746528');
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}