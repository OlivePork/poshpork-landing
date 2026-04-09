export default function Footer() {
  return (
    <footer style={{background: 'var(--charcoal)', paddingTop: '60px', paddingBottom: '40px', borderTop: '1px solid var(--gold)'}}>
      <div style={{width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px'}}>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px'}}>
          
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{color: 'var(--gold)', fontFamily: 'var(--font-cinzel)'}}>
              Posh Pork
            </h3>
            <p style={{color: 'var(--cream)', opacity: 0.8, lineHeight: '1.6'}}>
              Join the jury. Solve the mystery. Eat better.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4" style={{color: 'var(--gold)', fontFamily: 'var(--font-cinzel)'}}>
              Quick Links
            </h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <a href="#booking" style={{color: 'var(--cream)', textDecoration: 'none', opacity: 0.8}}>
                Book Now
              </a>
              <a href="/blog" style={{color: 'var(--cream)', textDecoration: 'none', opacity: 0.8}}>
                Blog
              </a>
              <a href="/privacy" style={{color: 'var(--cream)', textDecoration: 'none', opacity: 0.8}}>
                Privacy Policy
              </a>
              <a href="/terms" style={{color: 'var(--cream)', textDecoration: 'none', opacity: 0.8}}>
                Terms & Conditions
              </a>
              <a href="/cookies" style={{color: 'var(--cream)', textDecoration: 'none', opacity: 0.8}}>
                Cookie Policy
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4" style={{color: 'var(--gold)', fontFamily: 'var(--font-cinzel)'}}>
              Contact
            </h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <a href="mailto:mystery@poshpork.com" style={{color: 'var(--cream)', textDecoration: 'none', opacity: 0.8}}>
                mystery@poshpork.com
              </a>
              <p style={{color: 'var(--cream)', opacity: 0.8}}>
                Mallorca, Spain
              </p>
            </div>
          </div>

        </div>

        <div style={{borderTop: '1px solid rgba(212, 175, 55, 0.2)', paddingTop: '30px', textAlign: 'center'}}>
          <p style={{color: 'var(--cream)', opacity: 0.6, fontSize: '14px'}}>
            © 2026 Posh Pork. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}