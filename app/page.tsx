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
      
      {/* HOW IT WORKS */}
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
            HOW IT WORKS
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '64px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
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
              }}>
                1
              </div>
              <h3 style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1a1a1a',
                marginBottom: '16px'
              }}>
                ARRIVE & SETTLE IN
              </h3>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.6',
                color: '#666666'
              }}>
                Claim your detective seat, sip some wine
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
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
              }}>
                2
              </div>
              <h3 style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1a1a1a',
                marginBottom: '16px'
              }}>
                FOLLOW THE CLUES
              </h3>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.6',
                color: '#666666'
              }}>
                Watch the fun unfold, share your opinion with your team
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
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
              }}>
                3
              </div>
              <h3 style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1a1a1a',
                marginBottom: '16px'
              }}>
                CRACK THE CASE
              </h3>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.6',
                color: '#666666'
              }}>
                Vote for your culprit, make friends along the way
              </p>
            </div>
          </div>
        </div>
      </section>

      <BookingTabs />
      <Article />
    </>
  );
}