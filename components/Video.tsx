'use client';

export default function Video() {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section style={{background: 'var(--charcoal)', padding: '0 0 60px 0'}}>
      
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Video */}
        <div className="relative rounded-lg overflow-hidden mb-12" style={{ paddingBottom: '37.5%', maxWidth: '900px', margin: '0 auto', border: '1px solid var(--gold)' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/sWlohn79hww"
            title="The Posh Pork Murder Mystery Experience"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Text content below video */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xl mb-6" style={{color: 'var(--cream)', opacity: 0.85}}>
            Join the jury. Examine the evidence. Cast your verdict.
          </p>

          <p className="text-xl mb-10" style={{color: 'var(--cream)', opacity: 0.75}}>
            A groundbreaking new tourism experience in Mallorca. Book now to be among the first to experience it, shape its evolution, and help create something truly original.
          </p>

          {/* Single CTA Button */}
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

          <p className="mt-8 text-sm uppercase tracking-widest" style={{color: 'var(--gold)', opacity: 0.6}}>
            Limited to 16 Guests • May 16 - June 1
          </p>
        </div>

      </div>
    </section>
  );
}