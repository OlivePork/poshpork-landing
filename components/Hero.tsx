'use client';

export default function Hero() {
  return (
    <section style={{
      background: 'var(--charcoal, #1a1a1a)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: '60px 20px'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.05,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L35 25L60 30L35 35L30 60L25 35L0 30L25 25Z\' fill=\'%23d4af37\'/%3E%3C/svg%3E")',
        backgroundSize: '60px 60px'
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>

        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 60px)',
          fontWeight: 'bold',
          color: 'var(--gold, #d4af37)',
          fontFamily: 'var(--font-cinzel), Cinzel, serif',
          margin: 0,
          lineHeight: 1.08
        }}>
          Which Food Is Killing You?
        </h1>

        <p style={{
          fontSize: 'clamp(15px, 2.2vw, 21px)',
          color: '#f2ece1',
          fontFamily: 'var(--font-cinzel), Cinzel, serif',
          letterSpacing: '0.06em',
          margin: '18px auto 48px',
          opacity: 0.75
        }}>
          Inside the Greatest Fraud In Human History
        </p>

        <div style={{ maxWidth: '540px', margin: '0 auto 48px' }}>
          <p style={heroLine}>
            Three out of five people die from chronic inflammatory disease.
          </p>
          <p style={heroLine}>
            Its drivers are lifestyle. The largest lifestyle factor, for most of us, is food.
          </p>
          <p style={{
            ...heroLine,
            color: '#d4af37',
            fontFamily: 'var(--font-cinzel), Cinzel, serif',
            fontSize: 'clamp(19px, 2.6vw, 25px)',
            marginTop: '26px'
          }}>
            So which food is it?
          </p>
        </div>

        {/* TRAILER — replace this block with the embed when it's cut */}
        <div style={{
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: '10px',
          border: '1px solid rgba(212,175,55,.35)',
          background: '#000',
          display: 'grid',
          placeItems: 'center',
          marginBottom: '40px'
        }}>
          <p style={{ color: '#666', fontSize: '15px', fontFamily: 'Cinzel, serif', letterSpacing: '.15em' }}>
            TRAILER
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
          <a href="/movie" style={{
            display: 'inline-block',
            padding: '20px 46px',
            fontFamily: 'Cinzel, serif',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#0a0a0a',
            background: 'linear-gradient(135deg, #a67c00 0%, #d4af37 50%, #a67c00 100%)',
            borderRadius: '8px',
            textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)'
          }}>
            Buy the film — €15
          </a>
        </div>

        <p style={{ fontSize: '14px', color: '#888', marginTop: '22px' }}>
          A film in which you are the jury. 1 hour 26 minutes.
        </p>

      </div>
    </section>
  );
}

const heroLine: React.CSSProperties = {
  fontSize: 'clamp(16px, 2.1vw, 19px)',
  lineHeight: 1.65,
  color: '#b0b0b0',
  margin: '0 0 10px'
};