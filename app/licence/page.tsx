export const metadata = {
  title: "Licence terms | Which Food Is Killing You?",
  description:
    "The terms of a screening licence for schools, organisations and venues. Plain English, one page.",
};

export default function LicencePage() {
  return (
    <main style={{ background: "#0f0f0f", color: "#e8e2d5", minHeight: "100vh" }}>

      <header style={{
        background: "#1a1a1a",
        padding: "clamp(56px,8vw,92px) 20px",
        borderBottom: "1px solid rgba(212,175,55,.25)",
      }}>
        <div style={wrap}>
          <p style={eyebrow}>Licence terms</p>
          <h1 style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(28px,4.6vw,44px)",
            color: "#d4af37",
            lineHeight: 1.15,
            margin: "0 0 20px",
          }}>
            What a licence lets you do
          </h1>
          <p style={{ fontSize: "17px", lineHeight: 1.65, opacity: .8, maxWidth: "58ch", margin: 0 }}>
            One page, plain English. Paying for a licence means accepting these terms &mdash;
            there is nothing to sign unless your procurement department needs it.
          </p>
        </div>
      </header>

      <section style={section}>
        <div style={{ ...wrap, maxWidth: "760px" }}>

          <Clause n="1" t="Who this is between">
            <p style={para}>
              These terms are between Colin Marry, trading as Posh Pork, Mallorca, Spain
              (&ldquo;we&rdquo;) and the school, organisation or venue named on the invoice
              (&ldquo;you&rdquo;).
            </p>
            <p style={para}>
              They apply from the day the licence is granted until it ends.
            </p>
          </Clause>

          <Clause n="2" t="What you may do">
            <p style={para}>
              For as long as your licence runs, you may screen{" "}
              <em>Which Food Is Killing You?</em> as often as you like, to your own students,
              staff, members or guests, at the site named on the invoice.
            </p>
            <p style={para}>
              That covers lessons, assemblies, after-school clubs, evening events, staff
              training and anything else within your own organisation. You do not need to ask
              us before each screening and you do not need to tell us afterwards, although we
              are always glad to hear how it went.
            </p>
            <p style={para}>
              You may use the interactive room feature, in which your audience answers on
              their own phones, and the show-of-hands alternative where phones are not
              permitted.
            </p>
          </Clause>

          <Clause n="3" t="What a licence covers">
            <p style={para}>
              <strong>A school licence</strong> covers one school site for one year, across
              every department, renewable.
            </p>
            <p style={para}>
              <strong>An organisation licence</strong> covers one event, priced per person.
            </p>
            <p style={para}>
              <strong>A single screening licence</strong> covers one event on one date.
            </p>
            <p style={para}>
              <strong>A venue licence</strong> covers repeated screenings at one premises,
              where your guests pay us directly for the film.
            </p>
            <p style={para}>
              A licence does not cover other sites, other campuses, or other organisations,
              even where they share a trust, a diocese or an owner. Ask and we will price it.
            </p>
          </Clause>

          <Clause n="4" t="What you may not do">
            <ul style={list}>
              <li style={li}>Copy, download, record or store the film</li>
              <li style={li}>Stream, broadcast or transmit it beyond the licensed site</li>
              <li style={li}>Share your access credentials outside your organisation</li>
              <li style={li}>Edit it, add to it, or remove its credits or disclaimers</li>
              <li style={li}>Charge separate admission for the film itself, unless your licence says otherwise</li>
              <li style={li}>Present it as medical, nutritional or dietary advice</li>
            </ul>
            <p style={para}>
              You are welcome to promote your own screenings using the film&apos;s title,
              artwork and trailer, provided nothing implies we endorse your own products or
              services.
            </p>
          </Clause>

          <Clause n="5" t="The film is not medical advice">
            <p style={para}>
              The film is education and entertainment. It argues a case, and parts of that
              case are contested or original. Every claim it makes is published with its
              source and its status at{" "}
              <a href="/evidence" style={link}>poshpork.com/evidence</a>.
            </p>
            <p style={para}>
              It must not be presented as medical advice, and you will not remove or obscure
              the disclaimer shown at the start. Nobody in your audience should change
              prescribed medication or treatment on the strength of a film.
            </p>
            <p style={para}>
              The director is a pig farmer who intends in future to bring a pork product to
              market. That is disclosed in the film and on the evidence page.
            </p>
          </Clause>

          <Clause n="6" t="What we provide">
            <ul style={list}>
              <li style={li}>Access to the film for the term of your licence</li>
              <li style={li}>The interactive room feature and the show-of-hands mode</li>
              <li style={li}>The facilitator guide and discussion materials</li>
              <li style={li}>Anything new we make during your licence year</li>
              <li style={li}>Support by email, including during a screening</li>
            </ul>
            <p style={para}>
              We will do our best to keep it available, but we cannot promise a service free
              of interruption. If a screening fails because of something at our end, tell us
              and we will put it right &mdash; usually by extending your licence.
            </p>
          </Clause>

          <Clause n="7" t="Payment">
            <p style={para}>
              Invoices are payable within thirty days. Access is granted when the invoice is
              issued, not when it clears, because a school that has timetabled a lesson should
              not be waiting on a bank transfer.
            </p>
            <p style={para}>
              Prices exclude VAT where it applies.
            </p>
          </Clause>

          <Clause n="8" t="Data">
            <p style={para}>
              Where your audience uses the interactive feature, we record their answers and a
              first name they choose themselves. We do not ask for anything else and we do not
              require accounts.
            </p>
            <p style={para}>
              We do not sell, share or market to anybody who takes part in your screening, and
              we will not contact them. Aggregate answers may be counted alongside every other
              viewer&apos;s; no individual answer is published or shown to anyone else.
            </p>
            <p style={para}>
              Our <a href="/privacy" style={link}>privacy policy</a> sets out the rest.
            </p>
          </Clause>

          <Clause n="9" t="Ending it">
            <p style={para}>
              Your licence runs for its term and simply stops unless you renew. We will remind
              you before it does.
            </p>
            <p style={para}>
              Either of us may end it early in writing. If you end it, we will refund the
              unused months. If we end it for any reason other than a breach of these terms,
              we will do the same.
            </p>
            <p style={para}>
              If a licence is used well beyond what was bought &mdash; a single-event licence
              run monthly, or one school&apos;s licence shared across a district &mdash; we
              will write and ask, not threaten. In almost every case that is a conversation
              about the right licence rather than a dispute.
            </p>
          </Clause>

          <Clause n="10" t="Liability">
            <p style={para}>
              Our total liability under a licence will not exceed what you paid for it.
              Nothing here limits liability that cannot lawfully be limited.
            </p>
            <p style={para}>
              You are responsible for your own premises, staff, equipment and audience.
            </p>
          </Clause>

          <Clause n="11" t="Law">
            <p style={para}>
              These terms are governed by the laws of Spain, and disputes are subject to the
              courts of Mallorca. If your procurement requires a different governing law, ask
              &mdash; we would rather agree it than lose the sale over it.
            </p>
          </Clause>

          <div style={{
            borderLeft: "2px solid #d4af37",
            paddingLeft: "22px",
            marginTop: "44px",
          }}>
            <p style={{ ...para, marginBottom: "12px" }}>
              <strong style={{ color: "#d4af37" }}>Need it signed?</strong> Some procurement
              departments do. Write to{" "}
              <a href="mailto:screening@poshpork.com" style={link}>screening@poshpork.com</a>{" "}
              and we will send a signable version of exactly this, on headed paper, the same
              day.
            </p>
            <p style={{ ...para, marginBottom: 0, fontSize: "15px", opacity: .7 }}>
              And if a clause here does not suit your institution, say which one. It is a
              one-page agreement, not a negotiating position.
            </p>
          </div>

          <p style={{ ...para, fontSize: "14px", opacity: .5, marginTop: "40px" }}>
            Last updated September 2026.
          </p>

        </div>
      </section>
    </main>
  );
}

/* ---------- components ---------- */

function Clause({ n, t, children }: { n: string; t: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "40px" }}>
      <h2 style={{
        display: "flex",
        alignItems: "baseline",
        gap: "14px",
        fontFamily: "Cinzel, serif",
        fontSize: "20px",
        color: "#d4af37",
        margin: "0 0 16px",
        lineHeight: 1.3,
      }}>
        <span style={{ fontSize: "14px", opacity: .5 }}>{n}</span>
        {t}
      </h2>
      {children}
    </section>
  );
}

/* ---------- styles ---------- */

const wrap: React.CSSProperties = { maxWidth: "900px", margin: "0 auto" };
const section: React.CSSProperties = { padding: "clamp(48px,6vw,76px) 20px clamp(72px,10vw,110px)" };

const eyebrow: React.CSSProperties = {
  fontFamily: "Cinzel, serif",
  fontSize: "12px",
  letterSpacing: ".28em",
  textTransform: "uppercase",
  color: "#d4af37",
  opacity: .8,
  margin: "0 0 16px",
};

const para: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.7,
  margin: "0 0 14px",
};

const list: React.CSSProperties = {
  margin: "0 0 14px",
  padding: 0,
  listStyle: "none",
};

const li: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.6,
  padding: "9px 0 9px 22px",
  position: "relative",
  borderTop: "1px solid rgba(232,226,213,.1)",
};

const link: React.CSSProperties = {
  color: "#d4af37",
  textDecoration: "underline",
};