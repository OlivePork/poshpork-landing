// Homepage - Updated April 2026
import Hero from '@/components/Hero';
import Video from '@/components/Video';
import BookingTabs from '@/components/BookingTabs';
import Article from '@/components/Article';
import CookieBanner from '@/components/CookieBanner';

export default function Home() {
  return (
    <>
      <CookieBanner />
      <Hero />
      <Video />
      <BookingTabs />
      <Article />
    </>
  );
}