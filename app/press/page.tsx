export const metadata = {
  title: "Press | Which Food Is Killing You?",
  description:
    "Press materials, sources and screener access for Which Food Is Killing You? Inside the Greatest Fraud In Human History.",
};

export default function PressPage() {
  return (
    <main style={{ background: "#0f0f0f", color: "#e8e2d5", minHeight: "100vh" }}>
      {/* HEADER */}
      <header style={{ background: "#1a1a1a", padding: "clamp(56px,8vw,96px) 20px", borderBottom: "1px solid rgba(212,175,55,.25)" }}>
        <div style={wrap}>
          <p style={eyebrow}>Press &amp; Media</p>
          <h1 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(32px,5.5vw,52px)", color: "#d4af37", lineHeight: 1.1, margin: "0 0 20px" }}>
            Which Food Is Killing You?
          </h1>
          <p style={{ fontSize: "18px", lineHeight: 1.6, opacity: .8, maxWidth: "60ch", margin: 0 }}>
            Everything a writer needs: the film, the facts, the sources behind every claim,
            and how it was made. Free viewing access for press is below — no payment, no account.
          </p>
        </div>
      </header>

      {/* AT A GLANCE */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={h2}>At a glance</h2>
          <dl style={{ margin: 0 }}>
            <Row k="Title" v="Which Food Is Killing You? Inside the Greatest Fraud In Human History" />
            <Row k="Runtime" v="1 hour 27 minutes" />
            <Row k="Format" v="Animated feature documentary with interactive audience voting" />
            <Row k="Language" v="English" />
            <Row k="Director" v="Colin Marry" />
            <Row k="Release" v="Direct to consumer at poshpork.com" />
            <Row k="Price" v="€15 — one payment, permanent access" />
            <Row k="Production" v="One person. Animation generated using AI tools." />
            <Row k="Funding" v="Self-funded. No industry, commercial or institutional backing." />
          </dl>
        </div>
      </section>

      {/* SYNOPSES */}
      <section style={{ ...section, background: "#141414" }}>
        <div style={wrap}>
          <h2 style={h2}>Synopsis</h2>

          <h3 style={h3}>25 words</h3>
          <p style={para}>
            A murder trial in which the suspects are foods. The evidence is laid out,
            the witnesses contradict each other, and the audience delivers the verdict.
          </p>

          <h3 style={h3}>100 words</h3>
          <p style={para}>
            Three out of five people die from chronic inflammatory disease. Its drivers are
            lifestyle, and the largest lifestyle factor for most of us is food. So which food
            is it? <em>Which Food Is Killing You?</em> puts four suspects on trial — and puts
            the viewer on the jury. Questions appear during the film; viewers commit to an
            answer before they learn whether they were right, and their verdicts join a running
            tally counted alongside every other viewer&apos;s. Animated, family-watchable, and
            built for the argument it starts in the room.
          </p>

          <h3 style={h3}>300 words</h3>
          <p style={para}>
            [TO WRITE — expand the 100-word version. Cover: the four suspects and why each is
            accused; what the trial structure lets you do that a conventional documentary
            cannot; the interactive verdict mechanic and why committing to an answer before
            the reveal changes what a viewer remembers; who made it and under what conditions.
            Aim for 280–320 words. This is the version an editor will paste into a listing,
            so it should read as finished prose rather than a pitch.]
          </p>
        </div>
      </section>

      {/* PRESS ACCESS */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={h2}>Watch the film</h2>
          <p style={para}>
            Free, unrestricted access for press. No payment step, no account creation.
          </p>
          <div style={{
            border: "1px solid rgba(212,175,55,.35)",
            borderRadius: "8px",
            padding: "24px",
            background: "rgba(212,175,55,.06)",
            maxWidth: "60ch",
          }}>
            <p style={{ ...para, marginBottom: "16px" }}>
              <strong style={{ color: "#d4af37" }}>Press access code:</strong> [CODE]
            </p>
            <p style={{ ...para, fontSize: "15px", marginBottom: 0, opacity: .8 }}>
              Enter at <a href="/movie" style={link}>poshpork.com/movie</a>, or write to{" "}
              <a href="mailto:colin@poshpork.com" style={link}>colin@poshpork.com</a> and
              I&apos;ll send a direct link.
            </p>
          </div>
        </div>
      </section>

      {/* THE EVIDENCE — CLAIMS AND SOURCES */}
      <section style={{ ...section, background: "#141414" }}>
        <div style={wrap}>
          <p style={eyebrow}>The Evidence</p>
          <h2 style={h2}>Claims and sources</h2>
          <p style={{ ...para, maxWidth: "62ch" }}>
            Every substantive claim in the film, with its status stated plainly and its source
            given. Claims are marked <strong>Consensus</strong> where they reflect settled
            scientific agreement, <strong>Contested</strong> where the literature genuinely
            disagrees, and <strong>Synthesis</strong> where the inference is the director&apos;s
            own reading of the evidence rather than an established finding.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            That distinction is the point of the film. It is published here so that anyone can
            check it.
          </p>

          <div style={{ overflowX: "auto", marginTop: "36px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px", minWidth: "720px" }}>
              <thead>
                <tr>
                  <th style={th}>Timestamp</th>
                  <th style={th}>Claim</th>
                  <th style={th}>Status</th>
                  <th style={th}>Source</th>
                </tr>
              </thead>
              <tbody>
                <ClaimRow
                  time="—"
                  claim="Three out of five people die from chronic inflammatory disease."
                  status="Consensus"
                  source="Furman et al., Nature Medicine, 2019 — 'Chronic inflammation in the etiology of disease across the life span'"
                />
                <ClaimRow
                  time="[TO FILL]"
                  claim="[Claim as stated in the film — use the film's own wording, not a paraphrase]"
                  status="[Consensus / Contested / Synthesis]"
                  source="[Author, publication, year, with DOI or link]"
                />
                <ClaimRow
                  time="[TO FILL]"
                  claim="[Claim]"
                  status="[Status]"
                  source="[Source]"
                />
                <ClaimRow
                  time="[TO FILL]"
                  claim="[Claim]"
                  status="[Status]"
                  source="[Source]"
                />
              </tbody>
            </table>
          </div>

          <p style={{ ...para, fontSize: "14px", opacity: .65, marginTop: "28px", maxWidth: "62ch" }}>
            Corrections are welcome and will be published here. Write to{" "}
            <a href="mailto:colin@poshpork.com" style={link}>colin@poshpork.com</a>.
          </p>
        </div>
      </section>

      {/* HOW IT WAS MADE */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={h2}>How it was made</h2>
          <p style={{ ...para, maxWidth: "62ch" }}>
            The film was written and directed by one person over roughly a year, working seven
            hours a day starting at 4:30am. There was no studio, no crew and no budget.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            <strong>Every frame of the animation was generated using AI tools.</strong> There was
            no animation team, because there was no money to pay one — the alternative was not a
            hand-drawn version of this film, it was no film at all.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            The tools did not do the research, the reading, the script, the characters, the
            structure of the trial, the questions put to the jury, or any decision about what a
            piece of evidence means and where it sits. That is the part that took the year.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            <strong>Tools used:</strong> [TO FILL — name them specifically. Which model or
            product generated the animation, which was used for voice, which for editing.
            Being precise here is better than being vague.]
          </p>
          <p style={{ ...para, maxWidth: "62ch", opacity: .8 }}>
            It may be the first feature-length documentary animated this way. The director would
            rather be corrected on that than overstate it.
          </p>
        </div>
      </section>

      {/* DISCLOSURE */}
      <section style={{ ...section, background: "#141414" }}>
        <div style={wrap}>
          <h2 style={h2}>Disclosure</h2>
          <div style={{
            borderLeft: "2px solid #d4af37",
            paddingLeft: "24px",
            maxWidth: "62ch",
          }}>
            <p style={para}>
              Colin Marry is a pig farmer by trade. He previously ran Olive Pork, a pork
              business that was liquidated in [YEAR] after feed prices rose following the
              invasion of Ukraine. Creditors lost money. This is addressed directly in the film.
            </p>
            <p style={para}>
              He intends in future to bring a pork product to market under the Posh Pork name.
              No such product currently exists or is for sale.
            </p>
            <p style={para}>
              The film was self-funded. It received no industry, commercial, institutional or
              advocacy funding, and no company had any involvement in or sight of its contents.
            </p>
            <p style={{ ...para, marginBottom: 0 }}>
              He is not a doctor, a scientist or a nutritionist, and has never claimed to be.
            </p>
          </div>
        </div>
      </section>

      {/* DIRECTOR */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={h2}>Director</h2>
          <p style={{ ...para, maxWidth: "62ch" }}>
            <strong>Colin Marry.</strong> Irish, based in Mallorca. Spent his twenties trying to
            work out why the family pig farm had stopped paying for itself, and concluded the
            problem was not in the field but in the mind of whoever stood in the supermarket
            aisle deciding. Founded Olive Pork in 2018, feeding pigs on olive pomace — a waste
            product of oil pressing — and exported to six countries before the business failed.
            <em> Which Food Is Killing You?</em> is his first film.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            Longer version: <a href="/about" style={link}>The Back Story</a>.
          </p>
        </div>
      </section>

      {/* ASSETS */}
      <section style={{ ...section, background: "#141414" }}>
        <div style={wrap}>
          <h2 style={h2}>Downloads</h2>
          <p style={{ ...para, maxWidth: "62ch" }}>
            All images are high resolution and free to use in coverage of the film.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "28px 0 0", maxWidth: "60ch" }}>
            <Asset label="Press release (PDF)" href="/press/press-release.pdf" note="[TO ADD]" />
            <Asset label="Stills — full set (ZIP)" href="/press/stills.zip" note="[TO ADD — 6–10 images, 300dpi, horizontal, named sensibly]" />
            <Asset label="Poster / key art" href="/press/key-art.jpg" note="[TO ADD]" />
            <Asset label="Director headshot" href="/press/colin-marry.jpg" note="[TO ADD]" />
            <Asset label="The suspects" href="/press/suspects.jpg" note="[TO ADD]" />
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ ...section, paddingBottom: "clamp(72px,10vw,120px)" }}>
        <div style={wrap}>
          <h2 style={h2}>Contact</h2>
          <p style={{ ...para, maxWidth: "62ch" }}>
            All press enquiries go directly to the director. There is no publicist and no
            agency — you will be talking to the person who made it.
          </p>
          <p style={{ ...para, fontSize: "18px" }}>
            <a href="mailto:colin@poshpork.com" style={link}>colin@poshpork.com</a>
          </p>
          <p style={{ ...para, fontSize: "15px", opacity: .7 }}>
            Group and educational screening licences:{" "}
            <a href="mailto:screenings@poshpork.com" style={link}>screenings@poshpork.com</a>
          </p>
        </div>
      </section>
    </main>
  );
}

/* ---------- small components ---------- */

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "minmax(120px, 180px) 1fr",
      gap: "20px",
      padding: "14px 0",
      borderBottom: "1px solid rgba(232,226,213,.12)",
      alignItems: "baseline",
    }}>
      <dt style={{ fontFamily: "Cinzel, serif", fontSize: "13px", letterSpacing: ".12em", textTransform: "uppercase", color: "#d4af37" }}>{k}</dt>
      <dd style={{ margin: 0, fontSize: "16px", lineHeight: 1.6 }}>{v}</dd>
    </div>
  );
}

function ClaimRow({ time, claim, status, source }: { time: string; claim: string; status: string; source: string }) {
  return (
    <tr>
      <td style={{ ...td, whiteSpace: "nowrap", fontFamily: "monospace", fontSize: "14px", color: "#d4af37" }}>{time}</td>
      <td style={td}>{claim}</td>
      <td style={{ ...td, whiteSpace: "nowrap" }}>{status}</td>
      <td style={{ ...td, fontSize: "14px", opacity: .85 }}>{source}</td>
    </tr>
  );
}

function Asset({ label, href, note }: { label: string; href: string; note?: string }) {
  return (
    <li style={{ padding: "14px 0", borderBottom: "1px solid rgba(232,226,213,.12)" }}>
      <a href={href} style={{ ...link, fontSize: "16px" }}>{label}</a>
      {note && <span style={{ display: "block", fontSize: "13px", opacity: .55, marginTop: "4px" }}>{note}</span>}
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

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "12px 16px 12px 0",
  borderBottom: "1px solid rgba(212,175,55,.4)",
  fontFamily: "Cinzel, serif",
  fontSize: "12px",
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "#d4af37",
  verticalAlign: "bottom",
};

const td: React.CSSProperties = {
  padding: "16px 16px 16px 0",
  borderBottom: "1px solid rgba(232,226,213,.1)",
  verticalAlign: "top",
  lineHeight: 1.6,
};

const link: React.CSSProperties = {
  color: "#d4af37",
  textDecoration: "underline",
};
