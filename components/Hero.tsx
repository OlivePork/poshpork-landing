'use client';

export default function Hero() {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{background: 'var(--charcoal)'}}>
      
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L35 25L60 30L35 35L30 60L25 35L0 30L25 25Z' fill='%23d4af37'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        
        {/* Logo */}
        <div className="mb-12">
          <img
            src="https://imgur.com/p4ryMaz"
            alt="The Posh Pork Murder Mystery Experience"
            style={{maxWidth: '900px', width: '100%', height: 'auto', filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.8))', margin: '0 auto', borderRadius: '8px'}}
          />
        </div>

        {/* Main headline */}
        <h1 className="text-5xl font-bold mb-8" style={{color: 'var(--gold)', fontFamily: 'var(--font-cinzel)'}}>
          Which Food Is Killing You?
        </h1>

        {/* All body text same size */}
        <p className="text-xl mb-6 max-w-2xl mx-auto" style={{color: 'var(--cream)', opacity: 0.85}}>
          Join the jury. Examine the evidence. Cast your verdict.
        </p>

        <p className="text-xl mb-10 max-w-2xl mx-auto" style={{color: 'var(--cream)', opacity: 0.75}}>
          A groundbreaking new tourism experience in Mallorca. Book now to be among the first to experience it, shape its evolution, and help create something truly original.
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToBooking}
          className="px-10 py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
          style={{
            fontSize: '20px',
            background: 'linear-gradient(135deg, #a67c00 0%, #d4af37 50%, #a67c00 100%)',
            color: 'var(--charcoal)',
            boxShadow: '0 10px 40px rgba(212, 175, 55, 0.4)',
            fontFamily: 'var(--font-cinzel)'
          }}
        >
          Book Your Seat — €15
        </button>

        {/* Small detail */}
        <p className="mt-8 text-sm uppercase tracking-widest" style={{color: 'var(--gold)', opacity: 0.6}}>
          Limited to 16 Guests • May 16 - June 1
        </p>

      </div>
    </section>
  );
}