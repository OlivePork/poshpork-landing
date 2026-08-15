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
            and how it was made. Free viewing access for press is below.
          </p>
        </div>
      </header>

      {/* TRAILER */}
      <section style={{ ...section, paddingBottom: 0 }}>
        <div style={wrap}>
          <div style={{
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid rgba(212,175,55,.3)",
            background: "#000",
          }}>
            <iframe
              src="https://player.vimeo.com/video/1218266606?title=0&byline=0&portrait=0&dnt=1"
              title="Which Food Is Killing You? — trailer"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: 0, display: "block" }}
            />
          </div>
          <p style={{ ...para, fontSize: "14px", opacity: .65, marginTop: "14px" }}>
            Trailer &mdash; free to embed. <a href="https://vimeo.com/1218266606" style={link}>vimeo.com/1218266606</a>
          </p>
        </div>
      </section>

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
            lifestyle, and for most of us the largest lifestyle factor is food. So which food
            is it? <em>Which Food Is Killing You?</em> puts four suspects on trial &mdash; and puts
            the viewer on the jury. Questions appear during the film; viewers commit to an
            answer before they learn whether they were right, and their verdicts join a running
            tally counted alongside every other viewer&apos;s. Animated, family-watchable, and
            built for the argument it starts in the room.
          </p>

          <h3 style={h3}>300 words</h3>
          <p style={para}>
            The court is in session. The defendant is your dinner.
          </p>
          <p style={para}>
            <em>Which Food Is Killing You?</em> opens on four suspects in the dock: refined
            carbohydrates, industrial seed oils, a syndicate of food engineers, and one animal
            fat that has carried the blame for sixty years and is now asking for a retrial.
          </p>
          <p style={para}>
            The witnesses are the scientists, the executives and the regulators who built the
            world we eat in. Their accounts contradict each other. Working out which is which
            is the viewer&apos;s job, because the viewer is on the jury.
          </p>
          <p style={para}>
            At points throughout the film, the evidence stops and a question appears. You commit
            to an answer before you learn whether you were right &mdash; and that turns out to
            matter more than it sounds. You remember what you got wrong. You notice the moment
            your mind changed and what changed it. At the end, you deliver a verdict on each
            suspect, and see how the rest of the jury voted.
          </p>
          <p style={para}>
            Three out of five people die from chronic inflammatory disease. Its drivers are
            lifestyle, and the largest lifestyle factor for most of us is food. Ask ten people
            which food and you get ten confident answers, each with studies attached. They cannot
            all be right. Why they cannot all be right is the actual subject of the film.
          </p>
          <p style={para}>
            It is animated, and deliberately so. The subject is heavy; the film is not. A
            fourteen-year-old follows every step and laughs at the pirates.
          </p>
          <p style={para}>
            Written and directed by Colin Marry, an Irish pig farmer with an MSc in Agricultural
            Economics and no filmmaking background, working alone for a year with AI animation
            tools and no budget. Sources cited on screen throughout.
          </p>
        </div>
      </section>

      {/* PRESS ACCESS */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={h2}>Watch the film</h2>
          <p style={{ ...para, maxWidth: "60ch" }}>
            Free, unrestricted access for press. No payment.
          </p>
          <div style={{
            border: "1px solid rgba(212,175,55,.35)",
            borderRadius: "8px",
            padding: "24px",
            background: "rgba(212,175,55,.06)",
            maxWidth: "60ch",
          }}>
            <p style={{ ...para, marginBottom: "16px" }}>
              Write to <a href="mailto:colin@poshpork.com?subject=Press%20access" style={link}>colin@poshpork.com</a> with
              the outlet you write for, and I&apos;ll set up access the same day. You will get a
              single link that signs you in and starts the film.
            </p>
            <p style={{ ...para, fontSize: "15px", marginBottom: 0, opacity: .8 }}>
              No conditions attached, and no embargo &mdash; write whenever suits you, or not at all.
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
            <strong>Every frame of the animation was generated using AI.</strong> There was no
            animation team, because there was no money to pay one &mdash; the alternative was
            not a hand-drawn version of this film, it was no film at all.
          </p>

          <h3 style={h3}>The tools</h3>
          <ul style={{ margin: "0 0 24px", padding: 0, listStyle: "none", maxWidth: "62ch" }}>
            <Tool name="Grok Imagine" use="Image and video generation &mdash; every frame of the animation." />
            <Tool name="Claude Code" use="Prompting, and building this website." />
            <Tool name="Gemini" use="The soundtrack." />
            <Tool name="CapCut" use="Editing." />
          </ul>

          <p style={{ ...para, maxWidth: "62ch" }}>
            <strong>The script was written word for word by Colin Marry.</strong> So were the
            research, the argument, the characters, the structure of the trial, the questions
            put to the jury, and every decision about what a piece of evidence means and where
            it sits. No part of the script was generated.
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
              Colin Marry was a pig farmer by trade, having taken over a family farm in Ireland.
              During that time he developed a belief that there was a need for a global meat
              brand. He created that brand, Olive Pork, but it was liquidated in 2023 after
              costs across the industry &mdash; feed among them &mdash; rose following Russia&apos;s
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
              He holds a Masters Degree in Agricultural Economics from the University of London.
            </p>
          </div>
        </div>
      </section>

      {/* DIRECTOR */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={h2}>Director</h2>
          <p style={{ ...para, maxWidth: "62ch" }}>
            <strong>Colin Marry has no film or directing experience of any kind.</strong> He had
            never made a film before this one, had no training in it, and has never worked in
            the industry.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            He is Irish, based in Mallorca, and was a pig farmer by trade. He spent his twenties
            trying to work out why the family farm had stopped paying for itself, and concluded
            the problem was not in the field but in the mind of whoever stood in the supermarket
            aisle deciding. He founded Olive Pork in 2018, feeding pigs on olive pomace &mdash;
            a waste product of oil pressing &mdash; and exported to six countries before the
            business failed in 2023.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            He holds a Masters Degree in Agricultural Economics from the University of London.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            <em>Which Food Is Killing You?</em> is his first film.
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
            <Asset label="The suspects — lineup" href="/press/posh-pork-suspects-lineup.jpg" note="[TO ADD]" />
            <Asset label="Lady Posh Pork" href="/press/posh-pork-lady-posh-pork.jpg" note="[TO ADD]" />
            <Asset label="Mr Carbohydrates" href="/press/posh-pork-mr-carbohydrates.jpg" note="[TO ADD]" />
            <Asset label="Mr Vegetable Oils" href="/press/posh-pork-mr-vegetable-oils.jpg" note="[TO ADD]" />
            <Asset label="The Bliss Brothers" href="/press/posh-pork-bliss-brothers.jpg" note="[TO ADD]" />
            <Asset label="The judge" href="/press/posh-pork-judge.jpg" note="[TO ADD]" />
            <Asset label="Key art / poster" href="/press/posh-pork-key-art.jpg" note="[TO ADD]" />
            <Asset label="Colin Marry" href="/press/colin-marry.jpg" note="[TO ADD]" />
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ ...section, paddingBottom: "clamp(72px,10vw,120px)" }}>
        <div style={wrap}>
          <h2 style={h2}>Contact</h2>
          <p style={{ ...para, maxWidth: "62ch" }}>
            All press enquiries go directly to the director. There is no publicist and no
            agency &mdash; you will be talking to the person who made it.
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

function Tool({ name, use }: { name: string; use: string }) {
  return (
    <li style={{
      display: "grid",
      gridTemplateColumns: "minmax(120px, 160px) 1fr",
      gap: "16px",
      padding: "12px 0",
      borderBottom: "1px solid rgba(232,226,213,.12)",
      alignItems: "baseline",
    }}>
      <span style={{ fontFamily: "Cinzel, serif", fontSize: "15px", color: "#d4af37" }}>{name}</span>
      <span style={{ fontSize: "15px", lineHeight: 1.6, opacity: .85 }}
        dangerouslySetInnerHTML={{ __html: use }} />
    </li>
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
