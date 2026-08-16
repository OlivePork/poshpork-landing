export default function GroupScreenings() {
  return (
    <section style={{
      padding: '128px 40px',
      background: '#141414',
      borderTop: '1px solid rgba(212,175,55,.18)',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <p style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '12px',
          letterSpacing: '.28em',
          textTransform: 'uppercase',
          color: '#d4af37',
          opacity: .8,
          margin: '0 0 18px',
        }}>
          For schools, workplaces and groups
        </p>

        <h2 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(30px, 4.5vw, 44px)',
          lineHeight: 1.15,
          color: '#d4af37',
          margin: '0 0 28px',
        }}>
          Put a room on the jury
        </h2>

        <p style={{ ...para, maxWidth: '62ch' }}>
          Split the room into tables of four. Everyone joins on their phone with a
          six-character code &mdash; no app, no accounts, no sign-up. Then you just
          play the film.
        </p>

        <p style={{ ...para, maxWidth: '62ch' }}>
          When the evidence stops and a question appears, it appears on every phone at
          the same moment. <strong style={{ color: '#e8e2d5' }}>Each table answers once.</strong>{' '}
          They have to talk it through and agree &mdash; and everyone at the table can see
          who put what in, which is usually where the argument starts.
        </p>

        <p style={{ ...para, maxWidth: '62ch' }}>
          At the end, every person delivers their own verdict on each of the four
          suspects, and the tables are ranked on how they did.
        </p>

        <div style={{
          display: 'grid',
          gap: '20px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          margin: '48px 0',
        }}>
          <Use
            who="Schools"
            what="One answer per table turns a documentary into an argument about evidence — how studies get funded, how a strong claim differs from a loud one."
          />
          <Use
            who="Workplaces"
            what="It starts the conversation health programmes usually struggle to start at all, and the table format does the team-building at the same time."
          />
          <Use
            who="Clinics &amp; community groups"
            what="Ninety minutes that leaves a room arguing about food, with every claim sourced and published so anyone can check it."
          />
        </div>

        <p style={{ ...para, maxWidth: '62ch', opacity: .7, fontSize: '15px' }}>
          Phones not allowed in the room? There is a show-of-hands mode instead &mdash;
          take the count, type it in, carry on.
        </p>

        <div style={{ marginTop: '40px' }}>
          <a href="/contact" style={{
            display: 'inline-block',
            padding: '18px 40px',
            fontFamily: 'Cinzel, serif',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#0a0a0a',
            background: 'linear-gradient(135deg, #a67c00 0%, #d4af37 50%, #a67c00 100%)',
            borderRadius: '8px',
            textDecoration: 'none',
          }}>
            Screening licences &amp; prices
          </a>
          <p style={{
            fontSize: '14px',
            opacity: .6,
            margin: '16px 0 0',
          }}>
            Single screenings from €249. School licences €295 for two years.
            Workplaces €12 per person, per event.
          </p>
        </div>

      </div>
    </section>
  );
}

function Use({ who, what }: { who: string; what: string }) {
  return (
    <div style={{
      borderTop: '1px solid rgba(212,175,55,.3)',
      paddingTop: '18px',
    }}>
      <h3
        style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '17px',
          color: '#d4af37',
          margin: '0 0 10px',
        }}
        dangerouslySetInnerHTML={{ __html: who }}
      />
      <p style={{
        fontSize: '15px',
        lineHeight: 1.6,
        color: '#a8a29a',
        margin: 0,
      }}>
        {what}
      </p>
    </div>
  );
}

const para: React.CSSProperties = {
  fontSize: '17px',
  lineHeight: 1.7,
  color: '#b0b0b0',
  margin: '0 0 18px',
};
