export const metadata = {
  title: "Contact | Which Food Is Killing You?",
  description:
    "Get in touch about the film, or about screening licences for schools, workplaces, clinics and community groups.",
};

export default function ContactPage() {
  return (
    <main style={{ background: "#0f0f0f", color: "#e8e2d5", minHeight: "100vh" }}>
      {/* HEADER */}
      <header style={{ background: "#1a1a1a", padding: "clamp(56px,8vw,96px) 20px", borderBottom: "1px solid rgba(212,175,55,.25)" }}>
        <div style={wrap}>
          <p style={eyebrow}>Contact</p>
          <h1 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(30px,5vw,48px)", color: "#d4af37", lineHeight: 1.15, margin: "0 0 20px" }}>
            Write to me
          </h1>
          <p style={{ fontSize: "18px", lineHeight: 1.6, opacity: .82, maxWidth: "56ch", margin: 0 }}>
            There is no team and no agency. Everything here comes straight to me,
            and I answer it myself.
          </p>
        </div>
      </header>

      {/* DIRECT CONTACT */}
      <section style={section}>
        <div style={wrap}>
          <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <Box
              label="Anything at all"
              email="colin@poshpork.com"
              note="Questions, corrections, disagreements, problems watching the film. I read all of it."
            />
            <Box
              label="Screenings &amp; licences"
              email="screening@poshpork.com"
              note="Schools, workplaces, clinics and community groups. Details and prices below."
            />
          </div>
        </div>
      </section>

      {/* WHY IT SUITS A GROUP */}
      <section style={{ ...section, background: "#141414" }}>
        <div style={wrap}>
          <p style={eyebrow}>Group &amp; Educational Licences</p>
          <h2 style={h2}>Show it to a room</h2>
          <p style={{ ...para, maxWidth: "62ch" }}>
            The €15 purchase covers your household. Showing the film to a class, a workplace,
            a clinic or a community group needs a screening licence &mdash; and they are
            straightforward and inexpensive.
          </p>

          <h3 style={h3}>How it works in a room</h3>
          <p style={{ ...para, maxWidth: "62ch" }}>
            Split the room into tables of four. You open a room on the screen and everyone
            joins on their phone with a six-character code &mdash; no app, no accounts,
            no sign-up.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            Then you just play the film. When the evidence stops and a question appears,
            it appears on every phone at the same moment. <strong>Each table answers once.</strong>{" "}
            They have to talk it through and agree, and anyone at the table can put the
            answer in &mdash; or change it, if they think the table got it wrong. Everyone at
            that table sees who put what in, which is usually where the argument starts.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            You can see the answers arriving on your screen. When the room is in, you carry
            on. At the end, every person delivers their own verdict on each of the four
            suspects, and the tables are ranked on how they did.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            No phones in the room? There is a show-of-hands mode instead &mdash; take the
            count, type it in, carry on.
          </p>

          <h3 style={h3}>What it is for</h3>
          <p style={{ ...para, maxWidth: "62ch" }}>
            In a classroom, one answer per table turns a documentary into an argument about
            evidence &mdash; how studies get funded, how a strong claim differs from a loud
            one. In a workplace it starts the conversation that health programmes usually
            struggle to start at all, and the table format does the team-building work at
            the same time.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            It is animated, runs 1 hour 27 minutes, and suits a general audience from around
            fourteen upwards.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={h2}>Licences</h2>
          <p style={{ ...para, maxWidth: "62ch", marginBottom: "40px" }}>
            All prices in euros, excluding VAT where applicable. Invoices and purchase orders
            are no problem &mdash; most institutions need one, and it will not slow anything down.
          </p>

          <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            <Tier
              name="Single screening"
              price="€249"
              period="one event"
              who="Community groups, clubs, libraries, clinics, conferences, film societies."
              includes={[
                "One screening, one audience, one date",
                "Any size of room",
                "Discussion notes if you want them",
              ]}
            />
            <Tier
              name="School licence"
              price="€295"
              period="two years"
              who="Primary and secondary schools, sixth forms, teacher training."
              includes={[
                "Unlimited classroom use for two years",
                "One school site",
                "Teaching notes and question sheet",
                "Renewable",
              ]}
              featured
            />
            <Tier
              name="Organisation"
              price="€12"
              period="per person, per event"
              who="Workplaces, wellness programmes, team days, universities, health services."
              includes={[
                "€10 per person over 50",
                "Minimum charge €249",
                "One event, any format",
                "Facilitator notes and discussion sheet",
              ]}
            />
          </div>

          <p style={{ ...para, fontSize: "15px", opacity: .8, marginTop: "32px", maxWidth: "62ch" }}>
            Organisations pay per person, per event &mdash; the same way team days are normally
            priced, and fairer than a flat fee that charges a firm of forty the same as a firm
            of four hundred. Schools are a flat site licence instead; a school should not be
            charged by the pupil.
          </p>
          <p style={{ ...para, fontSize: "15px", opacity: .7, maxWidth: "62ch" }}>
            Multi-site organisations, school districts, national bodies or anything larger &mdash;
            write to me and we will work something out. The same is true if you want the film
            and cannot afford it; say so and we will find a way.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ ...section, background: "#141414" }}>
        <div style={wrap}>
          <h2 style={h2}>How a licence works</h2>
          <ol style={{ margin: 0, padding: 0, listStyle: "none", maxWidth: "60ch" }}>
            <Step n="1" text="Email screening@poshpork.com with your organisation, which licence you need, and a billing address." />
            <Step n="2" text="You get an invoice, usually the same day. Pay by bank transfer or card." />
            <Step n="3" text="You get a viewing link that works for the term of your licence, plus any teaching or discussion materials." />
          </ol>
          <p style={{ ...para, marginTop: "32px", maxWidth: "60ch", opacity: .8 }}>
            No account to create, no platform to learn. If you need a licence agreement in
            writing for your procurement process, ask and I will send one.
          </p>

          <div style={{
            borderLeft: "2px solid #d4af37",
            paddingLeft: "20px",
            marginTop: "40px",
            maxWidth: "60ch",
          }}>
            <p style={{ ...para, fontSize: "15px", marginBottom: 0, opacity: .8 }}>
              This film is for entertainment and education only. It is not medical advice, and
              nothing in it should replace a conversation with a doctor. Sources are cited on
              screen throughout, and every claim is published with its status and reference on
              the <a href="/press" style={link}>press page</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- components ---------- */

function Box({ label, email, note }: { label: string; email: string; note: string }) {
  return (
    <div style={{
      border: "1px solid rgba(212,175,55,.3)",
      borderRadius: "8px",
      padding: "28px 24px",
    }}>
      <p style={{
        fontFamily: "Cinzel, serif",
        fontSize: "13px",
        letterSpacing: ".16em",
        textTransform: "uppercase",
        color: "#d4af37",
        margin: "0 0 14px",
      }}
        dangerouslySetInnerHTML={{ __html: label }}
      />
      <p style={{ margin: "0 0 14px" }}>
        <a href={`mailto:${email}`} style={{ ...link, fontSize: "18px" }}>{email}</a>
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.6, opacity: .75, margin: 0 }}>{note}</p>
    </div>
  );
}

function Tier({
  name, price, period, who, includes, featured,
}: {
  name: string; price: string; period: string; who: string; includes: string[]; featured?: boolean;
}) {
  return (
    <div style={{
      border: featured ? "1px solid rgba(212,175,55,.55)" : "1px solid rgba(232,226,213,.16)",
      borderRadius: "8px",
      padding: "28px 24px",
      background: featured ? "rgba(212,175,55,.07)" : "transparent",
      display: "flex",
      flexDirection: "column",
    }}>
      <h3 style={{
        fontFamily: "Cinzel, serif",
        fontSize: "18px",
        color: "#d4af37",
        margin: "0 0 14px",
        lineHeight: 1.3,
      }}>
        {name}
      </h3>

      <p style={{ margin: "0 0 4px", fontSize: "34px", fontFamily: "Cinzel, serif", color: "#e8e2d5", lineHeight: 1 }}>
        {price}
      </p>
      <p style={{ margin: "0 0 20px", fontSize: "13px", letterSpacing: ".1em", textTransform: "uppercase", opacity: .6 }}>
        {period}
      </p>

      <p style={{ fontSize: "15px", lineHeight: 1.6, opacity: .8, margin: "0 0 20px" }}>{who}</p>

      <ul style={{ margin: "0 0 4px", padding: 0, listStyle: "none" }}>
        {includes.map((item) => (
          <li key={item} style={{
            fontSize: "15px",
            lineHeight: 1.6,
            padding: "8px 0 8px 20px",
            position: "relative",
            borderTop: "1px solid rgba(232,226,213,.1)",
          }}>
            <span style={{ position: "absolute", left: 0, color: "#d4af37" }}>·</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Step({ n, text }: { n: string; text: string }) {
  return (
    <li style={{ display: "flex", gap: "18px", padding: "16px 0", borderBottom: "1px solid rgba(232,226,213,.12)" }}>
      <span style={{
        flexShrink: 0,
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        border: "1px solid rgba(212,175,55,.5)",
        color: "#d4af37",
        fontFamily: "Cinzel, serif",
        fontSize: "15px",
        display: "grid",
        placeItems: "center",
      }}>
        {n}
      </span>
      <span style={{ fontSize: "16px", lineHeight: 1.65, paddingTop: "5px" }}>{text}</span>
    </li>
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
  fontSize: "clamp(24px,3.2vw,34px)",
  color: "#d4af37",
  lineHeight: 1.2,
  margin: "0 0 24px",
};

const h3: React.CSSProperties = {
  fontFamily: "Cinzel, serif",
  fontSize: "15px",
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "#d4af37",
  opacity: .75,
  margin: "32px 0 12px",
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
