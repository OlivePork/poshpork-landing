import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Which Food Is Killing You? | Inside the Greatest Fraud In Human History",
  description:
    "A film that puts you on the jury. Weigh the evidence, answer as you watch, and deliver your verdict on which food is guilty.",
  verification: {
    google: 'google72a182ec07d32c38',
  },
  openGraph: {images: ["https://www.poshpork.com/og-image.jpg"],
    title: "Which Food Is Killing You?",
    description:
      "Inside the Greatest Fraud In Human History. A film that puts you on the jury — watch the evidence, deliver your verdict.",
    url: "https://www.poshpork.com",
    siteName: "Posh Pork",
    type: "video.movie",
  },
  twitter: {images: ["https://www.poshpork.com/og-image.jpg"],
    card: "summary_large_image",
    title: "Which Food Is Killing You?",
    description:
      "Inside the Greatest Fraud In Human History. Watch the evidence, deliver your verdict.",
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
      <body className={inter.className}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}