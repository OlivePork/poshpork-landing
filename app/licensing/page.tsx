export const metadata = {
  title: "Group & Educational Licences | Which Food Is Killing You?",
  description:
    "Screening licences for schools, workplaces, clinics and community groups. Published pricing, invoices available.",
};

export default function LicensingPage() {
  return (
    <main style={{ background: "#0f0f0f", color: "#e8e2d5", minHeight: "100vh" }}>
      {/* HEADER */}
      <header style={{ background: "#1a1a1a", padding: "clamp(56px,8vw,96px) 20px", borderBottom: "1px solid rgba(212,175,55,.25)" }}>
        <div style={wrap}>
          <p style={eyebrow}>Group &amp; Educational Licences</p>
          <h1 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(30px,5vw,48px)", color: "#d4af37", lineHeight: 1.15, margin: "0 0 20px" }}>
            Show it to a room
          </h1>
          <p style={{ fontSize: "18px", lineHeight: 1.6, opacity: .82, maxWidth: "58ch", margin: 0 }}>
            The €15 purchase covers your household. Showing the film to a class, a workplace,
            a clinic or a community group needs a screening licence — and they are
            straightforward and inexpensive.
          </p>
        </div>
      </header>

      {/* WHY IT SUITS A GROUP */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={h2}>Why it works with an audience</h2>
          <p style={{ ...para, maxWidth: "62ch" }}>
            The film is built to be argued with. At points throughout, the evidence stops and a
            question appears on screen. Everyone watching answers, and the room finds out how it
            voted before the film moves on.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            In a classroom that turns a documentary into a lesson in how evidence works — how
            studies get funded, how a strong claim differs from a loud one, and how to notice
            the moment your own mind changes. In a workplace it starts the conversation that
            health programmes usually struggle to start at all.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            It is animated, runs 1 hour 27 minutes, and is suitable for a general audience from
            around fourteen upwards.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ ...section, background: "#141414" }}>
        <div style={wrap}>
          <h2 style={h2}>Licences</h2>
          <p style={{ ...para, maxWidth: "62ch", marginBottom: "40px" }}>
            All prices in euros, excluding VAT where applicable. Invoices and purchase orders
            are no problem — most institutions need one, and it will not slow anything down.
          </p>

          <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            <Tier
              name="Single screening"
              price="€95"
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
              period="in perpetuity"
              who="Primary and secondary schools, sixth forms, teacher training."
              includes={[
                "Unlimited classroom use, no expiry",
                "One school site",
                "Teaching notes and question sheet",
                "Repeat use year after year",
              ]}
              featured
            />
            <Tier
              name="Organisation licence"
              price="€595"
              period="per year"
              who="Workplaces, wellness programmes, universities, health services."
              includes={[
                "Unlimited internal viewing for 12 months",
                "One site or organisation",
                "Screening events included",
                "Renewable annually",
              ]}
            />
          </div>

          <p style={{ ...para, fontSize: "15px", opacity: .7, marginTop: "32px", maxWidth: "62ch" }}>
            Multi-site organisations, school districts, national bodies or anything larger —
            write to me and we will work something out. The same is true if you want the film
            and cannot afford it; say so and we will find a way.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={h2}>How it works</h2>
          <ol style={{ margin: 0, padding: 0, listStyle: "none", maxWidth: "60ch" }}>
            <Step n="1" text="Email screenings@poshpork.com with your organisation, which licence you need, and a billing address." />
            <Step n="2" text="You get an invoice, usually the same day. Pay by bank transfer or card." />
            <Step n="3" text="You get a viewing link that works for the term of your licence, plus any teaching or discussion materials." />
          </ol>
          <p style={{ ...para, marginTop: "32px", maxWidth: "60ch", opacity: .8 }}>
            No account to create, no platform to learn. If you need a licence agreement in
            writing for your procurement process, ask and I will send one.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ ...section, background: "#141414", paddingBottom: "clamp(72px,10vw,110px)" }}>
        <div style={wrap}>
          <h2 style={h2}>Get in touch</h2>
          <p style={{ ...para, maxWidth: "60ch" }}>
            Enquiries come straight to me — there is no sales team and no agency.
          </p>
          <p style={{ ...para, fontSize: "20px" }}>
            <a href="mailto:screenings@poshpork.com?subject=Screening%20licence%20enquiry" style={link}>
              screenings@poshpork.com
            </a>
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

const para: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.7,
  margin: "0 0 16px",
};

const link: React.CSSProperties = {
  color: "#d4af37",
  textDecoration: "underline",
};
