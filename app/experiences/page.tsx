import SessionPicker from "@/components/SessionPicker";
export const metadata = {
  title: "In person | Which Food Is Killing You?",
  description:
    "Two evenings in Mallorca. The film, four suspects, and a room that has to reach a verdict. Wine bodega tastings and agrotourism dinners.",
};

export default function ExperiencesPage() {
  return (
    <main style={{ background: "#0f0f0f", color: "#e8e2d5", minHeight: "100vh" }}>

      {/* HEADER */}
      <header style={{
        background: "#1a1a1a",
        padding: "clamp(56px,8vw,104px) 20px",
        borderBottom: "1px solid rgba(212,175,55,.25)",
      }}>
        <div style={wrap}>
          <p style={eyebrow}>In person &middot; Mallorca</p>
          <h1 style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(32px,5.5vw,54px)",
            color: "#d4af37",
            lineHeight: 1.1,
            margin: "0 0 22px",
          }}>
            Four foods stand trial.<br />Your table is the jury.
          </h1>
          <p style={{ fontSize: "18px", lineHeight: 1.65, opacity: .82, maxWidth: "56ch", margin: 0 }}>
            The film, a room of people who disagree with each other, and a verdict
            nobody gets to deliver on their own. Two evenings, in two very different
            rooms.
          </p>
        </div>
      </header>

      {/* THE TWO */}
      <section style={section}>
        <div style={wrap}>

          {/* ---------------- ONE ---------------- */}
          <article style={card}>
            <div style={cardHead}>
              <p style={{ ...eyebrow, margin: "0 0 12px" }}>The experience</p>
              <h2 style={h2}>The Murder Mystery Experience</h2>
              <p style={{ ...para, opacity: .8, maxWidth: "56ch" }}>
                Two hours in a Llucmajor wine bodega. Six tables of four, the film,
                and a question every few minutes that your table has to agree on
                before it moves.
              </p>
            </div>

            <dl style={{ margin: "0 0 30px" }}>
              <Row k="Where" v="Wine bodega, Llucmajor" />
              <Row k="How long" v="Two hours" />
              <Row k="Room" v="Up to 24 — six tables of four" />
              <Row k="When" v="Tuesday, Friday, Saturday and Sunday at 10am. Saturday and Sunday also at 2pm." />
              <Row k="Price" v="€20 an adult. Under 18s free." />
              <Row k="Add wine" v="€7 a head for a tasting alongside" />
            </dl>

            <p style={{ ...para, maxWidth: "56ch" }}>
              You sit with three other people, some of whom you will not know. The
              evidence stops, a question appears, and the four of you have to reach
              one answer between you. That is where the evening actually happens
              &mdash; not on the screen, at the table.
            </p>

            <p style={{ ...para, maxWidth: "56ch", opacity: .75 }}>
              At the end, everyone votes on each of the four suspects individually,
              and the tables are ranked.
            </p>

            <p style={{ ...para, fontSize: "15px", opacity: .75, maxWidth: "56ch" }}>
              <a
                href="https://maps.google.com/?q=Possessi%C3%B3+Vernissa+Llucmajor"
                target="_blank"
                rel="noopener noreferrer"
                style={link}
              >
                TBC, Llucmajor
              </a>{" "}
              &mdash; twenty minutes from Palma.
            </p>

            <SessionPicker />
            <p style={{ ...para, fontSize: "14px", opacity: .6, marginTop: "16px", marginBottom: 0 }}>
              Two hours, and you keep the film afterwards to watch again at home.
            </p>
          </article>

          {/* ---------------- TWO ---------------- */}
          <article style={{ ...card, marginTop: "28px" }}>
            <div style={cardHead}>
              <p style={{ ...eyebrow, margin: "0 0 12px" }}>The long evening</p>
              <h2 style={h2}>The Murder Mystery Dinner</h2>
              <p style={{ ...para, opacity: .8, maxWidth: "56ch" }}>
                The whole film across a three-course dinner at an agrotourism finca.
                Orders taken before the court sits, then food arriving between the
                evidence.
              </p>
            </div>

            <dl style={{ margin: "0 0 30px" }}>
              <Row k="Where" v="Agrotourism finca, Mallorca" />
              <Row k="Starts" v="8pm" />
              <Row k="How long" v="The film runs 90 minutes. The evening runs longer." />
              <Row k="Room" v="Up to 24 — tables of four, six or twelve" />
              <Row k="Price" v="Around €80 a head all in — three courses, and the film to keep" />
            </dl>

            <h3 style={h3}>How the evening runs</h3>

            <ol style={{ margin: "0 0 30px", padding: 0, listStyle: "none", maxWidth: "58ch" }}>
              <Beat n="1" t="Orders first" d="Everyone chooses before the court sits, so no waiter has to interrupt the evidence." />
              <Beat n="2" t="Twenty minutes in" d="The first course arrives. You have just heard the charge, and your table already disagrees." />
              <Beat n="3" t="Fifty minutes in" d="The main. By now somebody at the table has changed their mind and is pretending they haven't." />
              <Beat n="4" t="Ninety minutes in" d="Dessert, and the verdict. Every person votes on each suspect. The tables are ranked." />
            </ol>

            <p style={{ ...para, maxWidth: "56ch", opacity: .75 }}>
              Order whatever you like. The film does the arguing; the kitchen just
              feeds you while it happens.
            </p>

            <div style={{
              border: "1px solid rgba(212,175,55,.28)",
              borderRadius: "8px",
              padding: "18px 20px",
              margin: "4px 0 26px",
              maxWidth: "56ch",
            }}>
              <p style={{ ...para, fontSize: "15px", marginBottom: 0, opacity: .8 }}>
                <strong style={{ color: "#d4af37" }}>First dates being arranged now.</strong>{" "}
                If you would like to know when one is running &mdash; or you have a
                finca and would like to host one &mdash; write and I will let you know.
              </p>
            </div>

            <a href="mailto:screening@poshpork.com?subject=Murder%20Mystery%20Dinner" style={btnPrimary}>
              Tell me when there is a date
            </a>
          </article>

        </div>
      </section>

      {/* WHAT ACTUALLY HAPPENS */}
      <section style={{ ...section, background: "#141414" }}>
        <div style={wrap}>
          <h2 style={h2}>What actually happens</h2>

          <div style={{
            display: "grid",
            gap: "26px",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            marginTop: "34px",
          }}>
            <Point
              t="You join on your phone"
              d="A code on the screen, no app, no sign-up. Takes about a minute."
            />
            <Point
              t="Your table answers once"
              d="Not each of you — the table. Which means you have to talk it through and agree."
            />
            <Point
              t="Nobody is told what to think"
              d="There is no right answer to most of it. That is rather the point."
            />
            <Point
              t="The verdict is yours alone"
              d="At the end, every person votes individually on each of the four suspects."
            />
          </div>

          <p style={{ ...para, maxWidth: "58ch", marginTop: "36px", opacity: .75 }}>
            It is animated, it is funny, and it suits all ages. A ten-year-old
            follows the story; the argument lands harder with everyone else.
          </p>
        </div>
      </section>

      {/* HOSTING ONE */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={h2}>Running one yourself</h2>
          <p style={{ ...para, maxWidth: "58ch" }}>
            If you have a room, a screen and people who eat in &mdash; a finca, a
            bodega, a restaurant with a quiet Tuesday &mdash; you can run these
            yourself, as often as you like.
          </p>
          <p style={{ ...para, maxWidth: "58ch" }}>
            You keep the food and drink. Guests pay us for the film. There is
            nothing to invoice between us and nothing to set up on the night beyond
            putting a code on the screen.
          </p>
          <p style={{ ...para, maxWidth: "58ch" }}>
            <a href="/contact" style={link}>Screening licences and how it works</a>
          </p>
        </div>
      </section>

      {/* FOOT */}
      <section style={{ ...section, background: "#141414", paddingBottom: "clamp(72px,10vw,120px)" }}>
        <div style={wrap}>
          <h2 style={h2}>Dates and bookings</h2>
          <p style={{ ...para, maxWidth: "58ch" }}>
            Both evenings run to a small number of dates. Write and I will tell you
            what is coming up, or arrange one for a group of your own.
          </p>
          <p style={{ ...para, fontSize: "18px" }}>
            <a href="mailto:screening@poshpork.com" style={link}>screening@poshpork.com</a>
          </p>

          <div style={{
            borderLeft: "2px solid #d4af37",
            paddingLeft: "22px",
            marginTop: "40px",
            maxWidth: "58ch",
          }}>
            <p style={{ ...para, fontSize: "15px", marginBottom: 0, opacity: .8 }}>
              The film is for entertainment and education only. It is not medical
              advice, and nothing in it should replace a conversation with a doctor.
              Every claim it makes is published with its source on the{" "}
              <a href="/press#evidence" style={link}>press page</a>.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}

/* ---------- components ---------- */

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "minmax(96px, 140px) 1fr",
      gap: "18px",
      padding: "13px 0",
      borderBottom: "1px solid rgba(232,226,213,.12)",
      alignItems: "baseline",
    }}>
      <dt style={{
        fontFamily: "Cinzel, serif",
        fontSize: "12px",
        letterSpacing: ".12em",
        textTransform: "uppercase",
        color: "#d4af37",
      }}>{k}</dt>
      <dd style={{ margin: 0, fontSize: "16px", lineHeight: 1.55 }}>{v}</dd>
    </div>
  );
}

function Beat({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <li style={{ display: "flex", gap: "18px", padding: "16px 0", borderBottom: "1px solid rgba(232,226,213,.1)" }}>
      <span style={{
        flexShrink: 0,
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        border: "1px solid rgba(212,175,55,.5)",
        color: "#d4af37",
        fontFamily: "Cinzel, serif",
        fontSize: "14px",
        display: "grid",
        placeItems: "center",
      }}>{n}</span>
      <span>
        <span style={{
          display: "block",
          fontFamily: "Cinzel, serif",
          fontSize: "16px",
          color: "#d4af37",
          marginBottom: "5px",
        }}>{t}</span>
        <span style={{ fontSize: "15px", lineHeight: 1.6, opacity: .82 }}>{d}</span>
      </span>
    </li>
  );
}

function Point({ t, d }: { t: string; d: string }) {
  return (
    <div style={{ borderTop: "1px solid rgba(212,175,55,.3)", paddingTop: "18px" }}>
      <h3 style={{
        fontFamily: "Cinzel, serif",
        fontSize: "17px",
        color: "#d4af37",
        margin: "0 0 10px",
        lineHeight: 1.3,
      }}>{t}</h3>
      <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#a8a29a", margin: 0 }}>{d}</p>
    </div>
  );
}

/* ---------- styles ---------- */

const wrap: React.CSSProperties = { maxWidth: "900px", margin: "0 auto" };
const section: React.CSSProperties = { padding: "clamp(56px,7vw,88px) 20px" };

const card: React.CSSProperties = {
  border: "1px solid rgba(212,175,55,.32)",
  borderRadius: "10px",
  padding: "clamp(26px,4vw,42px)",
  background: "rgba(212,175,55,.04)",
};

const cardHead: React.CSSProperties = { marginBottom: "28px" };

const eyebrow: React.CSSProperties = {
  fontFamily: "Cinzel, serif",
  fontSize: "12px",
  letterSpacing: ".28em",
  textTransform: "uppercase",
  color: "#d4af37",
  opacity: .8,
  margin: "0 0 16px",
};

const h2: React.CSSProperties = {
  fontFamily: "Cinzel, serif",
  fontSize: "clamp(24px,3.4vw,36px)",
  color: "#d4af37",
  lineHeight: 1.2,
  margin: "0 0 18px",
};

const h3: React.CSSProperties = {
  fontFamily: "Cinzel, serif",
  fontSize: "15px",
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "#d4af37",
  opacity: .75,
  margin: "32px 0 14px",
};

const para: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.7,
  margin: "0 0 16px",
};

const btnPrimary: React.CSSProperties = {
  display: "inline-block",
  padding: "17px 40px",
  fontFamily: "Cinzel, serif",
  fontSize: "16px",
  fontWeight: "bold",
  color: "#0a0a0a",
  background: "linear-gradient(135deg,#a67c00,#d4af37 50%,#a67c00)",
  borderRadius: "8px",
  textDecoration: "none",
  marginTop: "8px",
};

const link: React.CSSProperties = {
  color: "#d4af37",
  textDecoration: "underline",
};