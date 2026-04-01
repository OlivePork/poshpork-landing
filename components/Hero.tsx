'use client';

export default function Hero() {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-16" style={{background: 'var(--charcoal)'}}>
      
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L35 25L60 30L35 35L30 60L25 35L0 30L25 25Z' fill='%23d4af37'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        
        {/* Logo */}
        <div className="mb-12 text-center">
          <img
            src="https://i.imgur.com/p4ryMaz.jpeg"
            alt="The Posh Pork Murder Mystery Experience"
            style={{maxWidth: '900px', width: '100%', height: 'auto', filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.8))', margin: '0 auto', borderRadius: '8px'}}
          />
        </div>

        {/* Main headline */}
        <h1 className="text-5xl font-bold mb-12 text-center" style={{color: 'var(--gold)', fontFamily: 'var(--font-cinzel)'}}>
          Which Food Is Killing You?
        </h1>

      </div>
    </section>
  );
}