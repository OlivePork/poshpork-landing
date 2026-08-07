'use client';

export default function Hero() {
  return (
    <section style={{
      background: 'var(--charcoal)', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative',
      paddingTop: '40px',
      paddingBottom: '40px'
    }}>
      
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.05,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L35 25L60 30L35 35L30 60L25 35L0 30L25 25Z\' fill=\'%23d4af37\'/%3E%3C/svg%3E")',
        backgroundSize: '60px 60px'
      }} />

      <div style={{position: 'relative', zIndex: 10, maxWidth: '1536px', margin: '0 auto', padding: '0 16px'}}>
        
        <div style={{textAlign: 'center', marginBottom: '48px'}}>
          <img
            src="/Poster.jpg"
            alt="Which Food Is Killing You? Inside the Greatest Fraud In Human History"
            style={{
              maxWidth: '900px', 
              width: '100%', 
              height: 'auto', 
              filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.8))', 
              margin: '0 auto', 
              borderRadius: '8px'
            }}
          />
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 56px)',
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'var(--gold)',
          fontFamily: 'var(--font-cinzel)',
          margin: 0,
          padding: 0,
          lineHeight: 1.1
        }}>
          Which Food Is Killing You?
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2.2vw, 22px)',
          textAlign: 'center',
          color: 'var(--cream, #f2ece1)',
          fontFamily: 'var(--font-cinzel)',
          letterSpacing: '0.06em',
          margin: '20px auto 0',
          maxWidth: '760px',
          opacity: 0.8
        }}>
          Inside the Greatest Fraud In Human History
        </p>

        <p style={{
          fontSize: '17px',
          textAlign: 'center',
          color: '#9a9a9a',
          margin: '36px auto 0',
          maxWidth: '620px',
          lineHeight: 1.6
        }}>
          A film in which you sit on the jury. Watch the evidence, answer as it lands,
          deliver your verdict.
        </p>

      </div>
    </section>
  );
}