import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif',
      color: '#1a1a1a'
    }}>
      
      {/* MINIMAL HEADER */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e5e5e5',
        zIndex: 1000,
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ 
          fontFamily: 'Cinzel, serif', 
          fontSize: '20px', 
          fontWeight: 'bold',
          color: '#1a1a1a'
        }}>
          POSH PORK
        </div>
        
        <Link 
          href="/book"
          style={{
            padding: '12px 32px',
            background: '#d4af37',
            color: '#1a1a1a',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px',
            transition: 'all 0.3s'
          }}
        >
          Book Now
        </Link>
      </header>

      {/* HERO SECTION */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        padding: '120px 40px 80px',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          width: '100%',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(48px, 8vw, 80px)',
            lineHeight: '1.1',
            fontWeight: 'bold',
            color: '#1a1a1a',
            marginBottom: '32px',
            letterSpacing: '-0.02em'
          }}>
            SOLVE A DELICIOUS<br/>
            CONSPIRACY
          </h1>

          <p style={{
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            lineHeight: '1.6',
            color: '#666666',
            maxWidth: '600px',
            margin: '0 auto 48px',
            fontWeight: '400'
          }}>
            An interactive murder mystery that questions<br/>
            everything you know about food.
          </p>

          <Link 
            href="/book"
            style={{
              display: 'inline-block',
              padding: '20px 48px',
              background: '#d4af37',
              color: '#1a1a1a',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '20px',
              transition: 'all 0.3s',
              boxShadow: '0 4px 24px rgba(212, 175, 55, 0.3)'
            }}
          >
            Book Your Table →
          </Link>

          {/* Hero Image */}
          <div style={{
            marginTop: '80px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80"
              alt="Elegant dinner setting"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>

      {/* THE EXPERIENCE */}
      <section style={{
        padding: '128px 40px',
        background: '#ffffff'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '80px',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(36px, 5vw, 56px)',
              lineHeight: '1.2',
              fontWeight: 'bold',
              color: '#1a1a1a',
              marginBottom: '32px'
            }}>
              MORE THAN<br/>
              DINNER.<br/>
              A REVELATION.
            </h2>

            <div style={{ fontSize: '20px', lineHeight: '1.8', color: '#1a1a1a' }}>
              <p style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
                <span style={{ color: '#d4af37', fontWeight: 'bold' }}>→</span>
                <span>Interactive storytelling over 90 minutes</span>
              </p>
              <p style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
                <span style={{ color: '#d4af37', fontWeight: 'bold' }}>→</span>
                <span>Question conventional food wisdom</span>
              </p>
              <p style={{ display: 'flex', gap: '12px' }}>
                <span style={{ color: '#d4af37', fontWeight: 'bold' }}>→</span>
                <span>Solve the crime while uncovering shocking truths</span>
              </p>
            </div>
          </div>

          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80"
              alt="People engaged in discussion"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>

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
            {[
              {
                number: '1',
                title: 'ARRIVE',
                description: 'Take your seat at one of four themed tables'
              },
              {
                number: '2',
                title: 'INVESTIGATE',
                description: 'Watch, discuss, and answer questions as a team'
              },
              {
                number: '3',
                title: 'DECIDE',
                description: 'Cast your final vote and discover the truth'
              }
            ].map((step) => (
              <div key={step.number} style={{ textAlign: 'center' }}>
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
                  {step.number}
                </div>
                <h3 style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#1a1a1a',
                  marginBottom: '16px'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#666666'
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section style={{
        padding: '128px 40px',
        background: '#2c1810',
        color: '#ffffff'
      }}>
        <div style={{ 
          maxWidth: '900px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <blockquote style={{
            fontSize: 'clamp(24px, 4vw, 36px)',
            lineHeight: '1.5',
            fontStyle: 'italic',
            marginBottom: '32px',
            fontWeight: '300'
          }}>
            "An unforgettable evening that completely changed how I think about nutrition. 
            Part entertainment, part education, entirely brilliant."
          </blockquote>
          <div style={{
            fontSize: '18px',
            color: '#d4af37',
            fontWeight: '600'
          }}>
            — Sarah M., Barcelona
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{
        padding: '128px 40px',
        background: '#ffffff'
      }}>
        <div style={{ 
          maxWidth: '600px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(36px, 5vw, 48px)',
            lineHeight: '1.2',
            fontWeight: 'bold',
            color: '#1a1a1a',
            marginBottom: '24px'
          }}>
            JOIN THE<br/>INVESTIGATION
          </h2>

          <p style={{
            fontSize: '56px',
            fontWeight: 'bold',
            color: '#1a1a1a',
            marginBottom: '16px',
            lineHeight: '1'
          }}>
            €17.50
          </p>

          <p style={{
            fontSize: '18px',
            color: '#666666',
            marginBottom: '48px'
          }}>
            per person · Tables of 2-4 guests · 90 minutes
          </p>

          <Link 
            href="/book"
            style={{
              display: 'inline-block',
              padding: '20px 48px',
              background: '#d4af37',
              color: '#1a1a1a',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '20px',
              transition: 'all 0.3s',
              boxShadow: '0 4px 24px rgba(212, 175, 55, 0.3)'
            }}
          >
            Book Now →
          </Link>
        </div>
      </section>

      {/* MINIMAL FOOTER */}
      <footer style={{
        padding: '64px 40px',
        background: '#fafafa',
        borderTop: '1px solid #e5e5e5',
        textAlign: 'center'
      }}>
        <div style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1a1a1a',
          marginBottom: '16px'
        }}>
          POSH PORK
        </div>
        <p style={{
          fontSize: '14px',
          color: '#666666',
          marginBottom: '24px'
        }}>
          Mallorca, Spain
        </p>
        <div style={{
          fontSize: '14px',
          color: '#666666'
        }}>
          <a 
            href="mailto:hello@poshpork.com" 
            style={{ 
              color: '#666666', 
              textDecoration: 'none',
              borderBottom: '1px solid transparent',
              transition: 'border-color 0.3s'
            }}
          >
            mystery@poshpork.com
          </a>
        </div>
      </footer>

    </main>
  );
}