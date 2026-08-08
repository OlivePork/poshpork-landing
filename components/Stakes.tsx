import GiftButton from "@/components/GiftButton";

export default function Stakes() {
  return (
    <>
      <section style={{ background: '#f5f1e8', padding: '110px 24px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'Cinzel, serif', fontSize: '12px', letterSpacing: '.3em',
            textTransform: 'uppercase', color: '#a67c00', marginBottom: '26px'
          }}>
            What fifteen euros buys
          </p>

          <p style={{
            fontFamily: 'Cinzel, serif', fontSize: 'clamp(24px,3.6vw,34px)',
            color: '#2c1810', lineHeight: 1.3, margin: '0 0 32px'
          }}>
            Disease is never one person&apos;s.
          </p>

          <p style={body}>
            It arrives in a family and stays for years — the appointments, the waiting, the
            fear that sits at the edge of every ordinary day, the slow rearranging of
            everyone&apos;s life around it. Anyone who has watched a parent go through it knows
            the cost is not measured in one body.
          </p>

          <p style={body}>Fifteen euros is what a film costs.</p>

          <p style={body}>
            What it buys is ninety minutes of understanding what is actually on your plate,
            why it is there, and who decided. Watch it once, keep it forever, show it to
            whoever you like.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center', marginTop: '44px' }}>
            <a href="/movie" style={cta}>Buy the film — €15</a>
            <GiftButton />
          </div>
        </div>
      </section>

      <section style={{ background: '#1a1a1a', padding: '110px 24px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'Cinzel, serif', fontSize: '12px', letterSpacing: '.3em',
            textTransform: 'uppercase', color: '#d4af37', marginBottom: '26px'
          }}>
            For the whole table
          </p>

          <p style={{
            fontFamily: 'Cinzel, serif', fontSize: 'clamp(24px,3.6vw,34px)',
            color: '#ffffff', lineHeight: 1.3, margin: '0 0 32px'
          }}>
            It is animated, and that is not an accident.
          </p>

          <p style={bodyDark}>
            The subject is heavy. The film is not. A fourteen-year-old will follow every step
            of the argument and laugh at the pirates. So will their grandmother — and by the
            second question the two of them will be arguing.
          </p>

          <p style={{ ...bodyDark, color: '#d4af37', fontFamily: 'Cinzel, serif', fontSize: '21px', margin: '36px 0' }}>
            That argument is the point.
          </p>

          <p style={bodyDark}>
            Watch alone and the film waits for you, as long as you need. Put it on the
            television and the room gets ten seconds to decide before it moves on without you.
            Families split by generation. Dinner parties never agree.
          </p>

          <p style={bodyDark}>
            Or turn the questions off and just watch. Almost nobody does.
          </p>
        </div>
      </section>
    </>
  );
}

const body: React.CSSProperties = {
  fontFamily: 'Georgia, serif', fontSize: '18px', lineHeight: 1.85,
  color: '#2c1810', margin: '0 0 22px'
};

const bodyDark: React.CSSProperties = {
  fontFamily: 'Georgia, serif', fontSize: '18px', lineHeight: 1.85,
  color: '#b0b0b0', margin: '0 0 22px'
};

const cta: React.CSSProperties = {
  display: 'inline-block', padding: '20px 44px',
  fontFamily: 'Cinzel, serif', fontSize: '18px', fontWeight: 'bold',
  color: '#0a0a0a',
  background: 'linear-gradient(135deg, #a67c00 0%, #d4af37 50%, #a67c00 100%)',
  borderRadius: '8px', textDecoration: 'none',
  boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)'
};