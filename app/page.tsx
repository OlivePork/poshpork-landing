// Homepage - Updated August 2026
import Hero from '@/components/Hero';
import Suspects from '@/components/Suspects';
import Stakes from '@/components/Stakes';
import BookingTabs from '@/components/BookingTabs';
import FilmSection from '@/components/FilmSection';
import GiftButton from '@/components/GiftButton';
import Article from '@/components/Article';
import CookieBanner from '@/components/CookieBanner';
import GroupScreenings from '@/components/GroupScreenings';

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
                Three out of five people die from chronic inflammatory
                disease — heart disease, stroke, cancer, diabetes and
                the rest. It arrives slowly enough that nobody calls
                it a cause of death.
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
              <h3 style={stepHeading}>AND NOBODY NAMED THE PATTERN</h3>
              <p style={stepBody}>
                The suspects have been examined one at a time for sixty years. They have never been examined together. That is where the case falls apart — and where this film begins.
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
              lineHeight: '1.7',
              marginTop: '18px',
              fontStyle: 'italic',
              color: '#888888'
            }}>
              €15 — one payment, permanent access. One purchase covers your household.<br />
              <a href="/press#evidence" style={{ color: '#a67c00' }}>
                Sources cited here
              </a>
            </p>

            <p style={{
              fontSize: '13px',
              lineHeight: '1.7',
              marginTop: '24px',
              color: '#999999',
              maxWidth: '560px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              This film is about evidence and how it is made. It is not medical advice,
              and nothing in it should replace a conversation with your doctor.
            </p>
          </div>
        </div>
      </section>

      {process.env.NEXT_PUBLIC_LIVE_EVENTS_ENABLED === 'true' ? <BookingTabs /> : <FilmSection />}

      <GroupScreenings />

      {/* HOW THIS FILM WAS MADE */}
      <section style={{
        padding: '128px 40px',
        background: '#111111'
      }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '13px',
            letterSpacing: '0.22em',
            color: '#d4af37',
            marginBottom: '24px'
          }}>
            HOW THIS FILM WAS MADE
          </p>

          <h2 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(30px, 4vw, 42px)',
            lineHeight: '1.2',
            fontWeight: 'bold',
            color: '#f5f5f5',
            marginBottom: '32px'
          }}>
            One person, one laptop, one year
          </h2>

          <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#bbbbbb', marginBottom: '20px' }}>
            Written and directed by Colin Marry, an Irish pig farmer with no filmmaking
            background. No studio, no crew, no budget. The animation was generated using
            AI tools that did not exist two years ago; the research, the script, the
            argument, the edit and every decision about what the evidence means are his.
          </p>

          <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#bbbbbb', marginBottom: '40px' }}>
            It took a year, seven hours a day, starting at half past four in the morning.
            He has written about why{' '}
            <a href="/about" style={{ color: '#d4af37' }}>here</a>.
          </p>

          <p style={{
            fontSize: '14px',
            lineHeight: '1.8',
            color: '#999999',
            borderLeft: '2px solid #d4af37',
            paddingLeft: '20px'
          }}>
            <strong style={{ color: '#cccccc' }}>Disclosure.</strong> Colin Marry is a pig
            farmer and intends in future to bring a pork product to market under the Posh
            Pork name. No such product currently exists or is for sale. The film was
            self-funded and received no industry, commercial or institutional backing.
            He is not a doctor and does not claim to be.
          </p>
        </div>
      </section>

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
