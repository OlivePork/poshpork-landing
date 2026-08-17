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
          margin: '18px auto 34px',
          opacity: 0.75
        }}>
          Inside the Greatest Fraud In Human History
        </p>

        {/* TRAILER — autoplays muted and loops. Browsers block autoplay with
            sound, so muted is the only way this starts on its own. Controls
            stay visible so the viewer can turn the sound on. */}
        <div style={{
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid rgba(212,175,55,.35)',
          background: '#000',
          marginBottom: '12px'
        }}>
          <iframe
            src="https://player.vimeo.com/video/1218849286?autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0&dnt=1&playsinline=1"
            title="Which Food Is Killing You? — trailer"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
          />
        </div>

        <p style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '12px',
          letterSpacing: '.18em',
          textTransform: 'uppercase',
          color: '#d4af37',
          opacity: .7,
          margin: '0 0 30px'
        }}>
          Playing silently — turn the sound on
        </p>

        <div style={{ maxWidth: '540px', margin: '0 auto 30px' }}>
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
            marginTop: '20px'
          }}>
            So which food is it?
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

        <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#888', marginTop: '20px' }}>
          A film in which you are the jury. 1 hour 27 minutes.<br />
          One payment. Permanent access. One purchase covers your household.
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
