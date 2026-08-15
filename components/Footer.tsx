export default function Footer() {
  return (
    <footer style={{
      background: '#111111',
      borderTop: '1px solid rgba(212,175,55,.18)',
      padding: '40px 20px',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '14px 28px',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <p style={{
          margin: 0,
          fontFamily: 'Cinzel, serif',
          fontSize: '12px',
          letterSpacing: '.14em',
          color: '#8a8378',
        }}>
          © 2026 Posh Pork. All rights reserved.
        </p>

        <nav style={{ display: 'flex', gap: '24px' }}>
          <a href="/terms" style={linkStyle}>Terms &amp; Conditions</a>
          <a href="/privacy" style={linkStyle}>Privacy</a>
        </nav>
      </div>
    </footer>
  );
}

const linkStyle: React.CSSProperties = {
  fontFamily: 'Cinzel, serif',
  fontSize: '12px',
  letterSpacing: '.12em',
  color: '#8a8378',
  textDecoration: 'none',
};
