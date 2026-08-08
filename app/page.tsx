// Homepage - Updated April 2026
import Hero from '@/components/Hero';
import Suspects from '@/components/Suspects';
import Stakes from '@/components/Stakes';
import BookingTabs from '@/components/BookingTabs';
import FilmSection from '@/components/FilmSection';
import GiftButton from '@/components/GiftButton';
import Article from '@/components/Article';
import CookieBanner from '@/components/CookieBanner';

export default function Home() {
  return (
    <>
      <CookieBanner />
      <Hero />
      <Suspects />
      <Stakes />

      {/* WHY IS THIS THE GREATEST FRAUD? */}
      <section style={{
        padding: '128px 40px',
        background: '#fafafa'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(36px, 5vw, 48px)',
            lineHeight: '1.2',
            fontWeight: 'bold',
            color: '#1a1a1a',
            marginBottom: '80px',
            textAlign: 'center'
          }}>
            WHY IS THIS THE GREATEST FRAUD?
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '64px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={numberCircle}>1</div>
              <h3 style={stepHeading}>IT KILLS QUIETLY</h3>
              <p style={stepBody}>
                Three out of five people die from chronic inflammatory disease. Nine of the ten leading causes of death are inflammation-related.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={numberCircle}>2</div>
              <h3 style={stepHeading}>IT STARTS ON YOUR PLATE</h3>
              <p style={stepBody}>
                Diet sits among the leading drivers of chronic inflammation — alongside factors most of us were never told to watch for.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={numberCircle}>3</div>
              <h3 style={stepHeading}>AND NOBODY NAMED IT</h3>
              <p style={stepBody}>
                One food on your plate is doing more damage than the rest. You have not been told which. The evidence has been there all along.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <a href="/movie" style={{
                display: 'inline-block',
                padding: '20px 48px',
                fontFamily: 'Cinzel, serif',
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#0a0a0a',
                background: 'linear-gradient(135deg, #a67c00 0%, #d4af37 50%, #a67c00 100%)',
                borderRadius: '8px',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)'
              }}>
                WATCH NOW
              </a>

              <GiftButton />
            </div>

            <p style={{
              fontSize: '14px',
              marginTop: '18px',
              fontStyle: 'italic',
              color: '#888888'
            }}>
              €15 — one payment, permanent access. Sources cited on screen throughout the film.
            </p>
          </div>
        </div>
      </section>

      {process.env.NEXT_PUBLIC_LIVE_EVENTS_ENABLED === 'true' ? <BookingTabs /> : <FilmSection />}
      <Article />
    </>
  );
}

const numberCircle: React.CSSProperties = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: '#d4af37',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px',
  fontFamily: 'Cinzel, serif',
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#1a1a1a'
};

const stepHeading: React.CSSProperties = {
  fontFamily: 'Cinzel, serif',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#1a1a1a',
  marginBottom: '16px'
};

const stepBody: React.CSSProperties = {
  fontSize: '18px',
  lineHeight: '1.6',
  color: '#666666'
};