import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Experience from '@/components/Experience';
import Suspects from '@/components/Suspects';
import Booking from '@/components/Booking';
import Waitlist from '@/components/Waitlist';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

export default function Home() {
  return (
    <>
      <CookieBanner />
      <Hero />
      <Problem />
      <Experience />
      <Suspects />
      <Booking />
      <Waitlist />
      <FAQ />
      <Footer />
    </>
  );
}