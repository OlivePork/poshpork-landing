// Homepage - Updated April 2026
import Hero from '@/components/Hero';
import Video from '@/components/Video';
import Booking from '@/components/Booking';
import Waitlist from '@/components/Waitlist';
import Article from '@/components/Article';
import CookieBanner from '@/components/CookieBanner';

export default function Home() {
  return (
    <>
      <CookieBanner />
      <Hero />
      <Video />
      <Booking />
      <Waitlist />
      <Article />
    </>
  );
}