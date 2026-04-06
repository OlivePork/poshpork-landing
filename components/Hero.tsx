'use client';

export default function Hero() {
  return (
    <section style={{
      background: 'var(--charcoal)', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative'
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
            src="https://i.imgur.com/p4ryMaz.jpeg"
            alt="The Posh Pork Murder Mystery Experience"
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
          fontSize: '48px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'var(--gold)',
          fontFamily: 'var(--font-cinzel)',
          margin: 0,
          padding: 0
        }}>
          Which Food Is Killing You?
        </h1>

      </div>
    </section>
  );
}