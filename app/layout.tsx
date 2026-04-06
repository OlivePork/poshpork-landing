import type { Metadata } from 'next';
import { Cinzel, Lora } from 'next/font/google';
import './globals.css';
import CookieBanner from '@/components/CookieBanner';

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Posh Pork Murder Mystery | Mallorca',
  description: 'Join the jury. Solve the mystery. 90 minutes that could change your life. Exclusive virtual experience in Mallorca.',
  keywords: 'murder mystery, Mallorca, luxury experience, food health, virtual experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${lora.variable}`}>
      <body className={lora.className}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}