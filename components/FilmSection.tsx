import GiftButton from "@/components/GiftButton";

export default function FilmSection() {
  return (
    <section style={{
      padding: '128px 40px',
      background: '#1a1a1a'
    }}>
      <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '13px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#d4af37',
          marginBottom: '24px'
        }}>
          Watch at home
        </p>

        <h2 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(36px, 5vw, 48px)',
          lineHeight: '1.2',
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: '28px'
        }}>
          SOLVE IT FROM YOUR SOFA
        </h2>

        {/* CHANGED: the "full Posh Pork Murder Mystery" line is removed; "in full"
            added so the surviving sentence still has a subject. */}
        <p style={{
          fontSize: '19px',
          lineHeight: '1.7',
          color: '#b0b0b0',
          marginBottom: '48px'
        }}>
          The evidence is laid out in full, the witnesses contradict each other,
          and you deliver the verdict — counted alongside every other viewer&apos;s.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '56px',
          textAlign: 'left'
        }}>
          <div>
            <h3 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '18px',
              color: '#d4af37',
              marginBottom: '10px'
            }}>
              Watch whenever
            </h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#999999' }}>
              No date to pick, no table to book. Buy once, watch when it suits you.
            </p>
          </div>

          <div>
            <h3 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '18px',
              color: '#d4af37',
              marginBottom: '10px'
            }}>
              Answer as you watch
            </h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#999999' }}>
              Questions appear during the film. Your verdicts join the running tally.
            </p>
          </div>

          <div>
            <h3 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '18px',
              color: '#d4af37',
              marginBottom: '10px'
            }}>
              Or gather everyone
            </h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#999999' }}>
              Put it on the big screen and let the whole room answer together.
            </p>
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '14px',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <a href="/movie" style={{
            display: 'inline-block',
            padding: '18px 48px',
            fontFamily: 'Cinzel, serif',
            fontSize: '17px',
            fontWeight: 'bold',
            color: '#1a1a1a',
            background: '#d4af37',
            borderRadius: '4px',
            textDecoration: 'none'
          }}>
            WATCH THE FILM
          </a>

          <GiftButton />
        </div>

        {/* CHANGED: access terms now match the wording used everywhere else. */}
        <p style={{
          fontSize: '14px',
          lineHeight: '1.7',
          color: '#777777',
          marginTop: '24px'
        }}>
          €15 — one payment, permanent access. One purchase covers your household.<br />
          1 hour 26 minutes.
        </p>
      </div>
    </section>
  );
}
