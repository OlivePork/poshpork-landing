import Hero from '@/components/Hero';
import Video from '@/components/Video';
import Booking from '@/components/Booking';

export default function Home() {
  return (
    <main className="min-h-screen" style={{background: 'var(--cream)'}}>
      <Hero />
      <Video />
      <Booking />
    </main>
  );
}