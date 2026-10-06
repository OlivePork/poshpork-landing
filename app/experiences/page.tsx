import SessionPicker from "@/components/SessionPicker";
import VenueMap from "@/components/VenueMap";
import Image from "next/image";

/* ---------- the facts, in one place ----------
   Change these and the whole page follows.
   Keep them matching the poster. */

const DURATION_TITLE = "Ninety minutes";
const DURATION_TEXT = "Ten in the morning, or half past twelve at weekends.";
const SEATS_TITLE = "Twelve seats";
const SEATS_TEXT = "Three tables of four. It does not work with more.";
const INTRO_PRICE = "\u20AC5";   // €5 introductory price
const FULL_PRICE = "\u20AC15";   // €15 normal price
const VENUE_NAME = "El Gran Pati";
const VENUE_STREET = "10 Carrer de Santany\u00ED"; // Santanyí
const VENUE_TOWN = "Campos, Mallorca";
// What Google Maps searches for. Spanish order: street, number, postcode, town.
const MAP_ADDRESS = "Carrer de Santany\u00ED, 10, 07630 Campos, Illes Balears, Espa\u00F1a";
const MAPS_URL = "https://maps.google.com/?q=" + encodeURIComponent(MAP_ADDRESS);

export const metadata = {
  title: "The Posh Pork Murder Mystery Experience | Campos, Mallorca",
  description:
    `Ninety minutes of food, argument and a verdict. Four foods stand trial and your table is the jury. ${VENUE_NAME}, Campos, Mallorca. ${INTRO_PRICE} an adult at the introductory price (normally ${FULL_PRICE}), under 16s free.`,
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
        <div style={{
          ...wrap,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "clamp(32px,5vw,56px)",
          alignItems: "center",
        }}>
          <div>
            <p style={eyebrow}>In person &middot; Campos, Mallorca</p>
            <h1 style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(30px,4.6vw,46px)",
              color: "#d4af37",
              lineHeight: 1.15,
              margin: "0 0 22px",
            }}>
              The Posh Pork Murder Mystery Experience
            </h1>
            <p style={{ fontSize: "19px", lineHeight: 1.6, opacity: .85, maxWidth: "54ch", margin: "0 0 14px" }}>
              Poor diet now kills more people than smoking. The question is:
              which food is it?
            </p>
            <p style={{ fontSize: "17px", lineHeight: 1.6, opacity: .75, maxWidth: "54ch", margin: 0 }}>
              Four suspects. One verdict. Yours. Watch the film, talk each question
              through at your table, and decide which of the four is guilty.
            </p>
          </div>

          <a
            href="/posters/murder-mystery-poster.jpg"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", maxWidth: "380px", width: "100%", justifySelf: "center" }}
          >
            <Image
              src="/posters/murder-mystery-poster.jpg"
              alt="Poster for The Posh Pork Murder Mystery Experience: four food suspects, meat, carbohydrates, vegetable oils and food additives, with times, price and the venue in Campos."
              width={1100}
              height={1971}
              priority
              sizes="(max-width: 700px) 90vw, 380px"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                border: "1px solid rgba(212,175,55,.45)",
                boxShadow: "0 18px 40px rgba(0,0,0,.55)",
              }}
            />
          </a>
        </div>
      </header>

      {/* WHAT IT IS */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={h2}>What actually happens</h2>

          <p style={{ ...para, maxWidth: "58ch" }}>
            You sit at a table of four, with people you may not know. An animated
            film plays &mdash; a murder trial in which the suspects are foods, and
            the witnesses contradict each other.
          </p>

          <p style={{ ...para, maxWidth: "58ch" }}>
            Every few minutes it stops and asks your table a question. Not a quiz.
            There is usually no right answer. The four of you have to agree on one,
            which means somebody has to be talked round.
          </p>

          <p style={{ ...para, maxWidth: "58ch" }}>
            At the end everybody votes on each of the four suspects, and the tables
            are ranked. Most people are still arguing about it on the way out.
          </p>

          <div style={{
            display: "grid",
            gap: "26px",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            marginTop: "44px",
          }}>
            <Point t={DURATION_TITLE} d={DURATION_TEXT} />
            <Point t={SEATS_TITLE} d={SEATS_TEXT} />
            <Point t="All ages" d="A ten-year-old follows the story. The argument lands harder with everyone else." />
            <Point t="Your phone" d="No app, no sign-up. A code on the screen and you are in." />
          </div>
        </div>
      </section>

      {/* BOOK */}
      <section id="book" style={{ ...section, background: "#141414" }}>
        <div style={wrap}>
          <p style={eyebrow}>Book a place</p>
          <h2 style={h2}>Pick a morning</h2>

          <p style={{ ...para, maxWidth: "58ch" }}>
            <strong style={{ color: "#d4af37" }}>
              {INTRO_PRICE} an adult. Under 16s free.
            </strong>{" "}
            That is an introductory price while we are starting out; the normal
            price is {FULL_PRICE} an adult. You keep the film afterwards, to watch
            again at home with whoever you like.
          </p>

          <div style={{ maxWidth: "520px", marginTop: "34px" }}>
            <SessionPicker />
          </div>
        </div>
      </section>

      {/* WHERE */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={h2}>Where</h2>

          <p style={{ ...para, maxWidth: "58ch", fontSize: "18px" }}>
            <strong>{VENUE_NAME}</strong><br />
            {VENUE_STREET}<br />
            {VENUE_TOWN}
          </p>

          <div style={{ maxWidth: "720px", margin: "24px 0 16px" }}>
            <VenueMap
              query={MAP_ADDRESS}
              label={`Map showing ${VENUE_NAME} in Campos`}
            />
          </div>

          <p style={{ ...para, maxWidth: "58ch" }}>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={link}
            >
              Open in maps
            </a>
          </p>

          <p style={{ ...para, maxWidth: "58ch", opacity: .75, marginTop: "26px" }}>
            Coming with a group of eight or more, or want a morning to yourselves?
            Write to <a href="mailto:colin@poshpork.com" style={link}>colin@poshpork.com</a>{" "}
            and we will arrange one.
          </p>
        </div>
      </section>

      {/* HOSTING */}
      <section style={{ ...section, background: "#141414" }}>
        <div style={wrap}>
          <h2 style={h2}>Running one yourself</h2>
          <p style={{ ...para, maxWidth: "58ch" }}>
            If you have a room, a screen and people who eat in &mdash; a finca, a
            hotel, a restaurant with a quiet Tuesday &mdash; you can run these
            yourself, as often as you like.
          </p>
          <p style={{ ...para, maxWidth: "58ch" }}>
            You keep the food and drink. There is nothing to invoice between us, and
            nothing to set up on the night beyond putting a code on the screen.
          </p>
          <p style={{ ...para, maxWidth: "58ch" }}>
            <a href="/contact" style={link}>How it works for venues</a>
          </p>
        </div>
      </section>

      {/* FOOT */}
      <section style={{ ...section, paddingBottom: "clamp(72px,10vw,120px)" }}>
        <div style={wrap}>
          <div style={{
            borderLeft: "2px solid rgba(212,175,55,.4)",
            paddingLeft: "22px",
            maxWidth: "58ch",
          }}>
            <p style={{ ...para, fontSize: "15px", marginBottom: 0, opacity: .8 }}>
              The film is entertainment and education. It is not medical advice, and
              nothing in it should replace a conversation with a doctor. Every claim
              it makes is published with its source at{" "}
              <a href="/evidence" style={link}>poshpork.com/evidence</a>.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}

/* ---------- components ---------- */

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
  margin: "0 0 22px",
};

const para: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.7,
  margin: "0 0 16px",
};

const link: React.CSSProperties = {
  color: "#d4af37",
  textDecoration: "underline",
};