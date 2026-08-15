export default function Article() {
  return (
    <section style={{background: '#f5f1e8', paddingTop: '80px', paddingBottom: '80px'}}>
      <div style={{width: '100%', maxWidth: '800px', margin: '0 auto', padding: '0 20px'}}>

        <article style={{fontFamily: 'Georgia, serif', color: '#2c1810', lineHeight: '1.8'}}>

          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginTop: '0',
            marginBottom: '25px',
            color: '#d4af37',
            fontFamily: 'Cinzel, serif'
          }}>
            The Mystery Within the Mystery
          </h2>

          <p style={{fontSize: '18px', marginBottom: '25px'}}>
            And then there is the question that gives the whole thing its name: what exactly <em>is</em> Posh Pork?
          </p>

          <p style={{fontSize: '18px', marginBottom: '25px'}}>
            The name is a clue. Somewhere in the evidence sits an explanation for why one of the most vilified foods on the list may be innocent — and why the thing that replaced it was never examined nearly as closely.
          </p>

          <p style={{fontSize: '18px', marginBottom: '40px'}}>
            The answer reveals itself through the evidence. Like everything else here, you will have to investigate.
          </p>

          <div style={{
            background: 'white',
            border: '2px solid #d4af37',
            borderRadius: '12px',
            padding: '30px',
            marginTop: '50px',
            marginBottom: '50px'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: '#d4af37',
              fontFamily: 'Cinzel, serif'
            }}>
              Practical Details
            </h3>

            <p style={{fontSize: '16px', marginBottom: '10px'}}>
              <strong>What:</strong> Which Food Is Killing You? — a feature film with interactive questions
            </p>
            <p style={{fontSize: '16px', marginBottom: '10px'}}>
              <strong>Where:</strong> Streamed here, on any device. Watch on a phone, laptop or television.
            </p>
            <p style={{fontSize: '16px', marginBottom: '10px'}}>
              <strong>When:</strong> Any time. Buy once, watch whenever suits you.
            </p>
            <p style={{fontSize: '16px', marginBottom: '10px'}}>
              <strong>Who:</strong> One purchase covers your household. Watch alone or gather everyone round.
            </p>
            <p style={{fontSize: '16px', marginBottom: '10px'}}>
              <strong>Duration:</strong> 1 hour 26 minutes
            </p>
            <p style={{fontSize: '16px', marginBottom: '20px'}}>
              <strong>Language:</strong> English
            </p>

            <p style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#d4af37'}}>
              Price:
            </p>
            <p style={{fontSize: '16px', marginBottom: '10px'}}>
              €15 — one payment, permanent access. One purchase covers your household. Rewatch as often as you like.
            </p>
            <p style={{fontSize: '16px', marginBottom: '20px'}}>
              Screening it for a school, workplace, clinic or community group?{' '}

            <p style={{fontSize: '16px', fontStyle: 'italic'}}>
              This film is about evidence and how it is made. It is not medical advice, and nothing in it should replace a conversation with your doctor.
            </p>
          </div>

          <div style={{textAlign: 'center', marginTop: '60px'}}>
            <a
              href="/movie"
              style={{
                display: 'inline-block',
                padding: '20px 40px',
                background: 'linear-gradient(135deg, #a67c00 0%, #d4af37 50%, #a67c00 100%)',
                color: '#0a0a0a',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '20px',
                fontFamily: 'Cinzel, serif',
                boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)',
                transition: 'transform 0.3s'
              }}
            >
              Watch the Film
            </a>
            <p style={{fontSize: '14px', marginTop: '20px', fontStyle: 'italic', color: '#666'}}>
              Join the jury. Weigh the evidence. Deliver your verdict.
            </p>
          </div>

        </article>

      </div>
    </section>
  );
}
