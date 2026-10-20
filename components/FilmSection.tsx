import GiftButton from "@/components/GiftButton";

// The free clip shown in this section. Change the number to swap the clip.
const CLIP_VIMEO_ID = "1237520558";

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
          FAMILY MOVIE NIGHT
        </h2>

        <p style={{
          fontSize: '19px',
          lineHeight: '1.7',
          color: '#b0b0b0',
          marginBottom: '40px'
        }}>
          Made to be watched together. The evidence is laid out in full, the witnesses
          contradict each other, and every person in the room delivers their own verdict.
          Animated, funny, and the argument afterwards is the point.
        </p>

        {/* FREE CLIP */}
        <div style={{ marginBottom: '56px' }}>
          <p style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '13px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#d4af37',
            marginBottom: '16px'
          }}>
            Free to watch: a scene from the film
          </p>

          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            background: '#000',
            border: '1px solid rgba(212,175,55,.35)'
          }}>
            <iframe
              src={`https://player.vimeo.com/video/${CLIP_VIMEO_ID}?dnt=1&title=0&byline=0&portrait=0&color=d4af37`}
              title="A free scene from Which Food Is Killing You?"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 0
              }}
            />
          </div>
        </div>

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
              Everyone answers
            </h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#999999' }}>
              Questions appear during the film. Nobody is told what to think.
            </p>
          </div>

          <div>
            <h3 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '18px',
              color: '#d4af37',
              marginBottom: '10px'
            }}>
              Three generations
            </h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#999999' }}>
              A fourteen-year-old follows every step. So does their grandmother.
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

        <p style={{
          fontSize: '14px',
          lineHeight: '1.7',
          color: '#777777',
          marginTop: '24px'
        }}>
          €15 — one payment, permanent access. One purchase covers your household.<br />
          1 hour 23 minutes.
        </p>
      </div>
    </section>
  );
}