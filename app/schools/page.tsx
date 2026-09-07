export const metadata = {
  title: "For schools | Which Food Is Killing You?",
  description:
    "A ninety-minute film that teaches how to weigh evidence, using food as the subject. Unlimited classroom use, one school, one year. $249.",
};

/* ============================================================
   Which part of the film suits which class.
   ============================================================ */

type Fit = { subject: string; where: string; what: string };

const FITS: Fit[] = [
  {
    subject: "Family & Consumer Sciences",
    where: "The whole film",
    what: "The core fit. Food, appetite, nutrition, and how the food supply is engineered — argued rather than instructed. One lesson block with the discussion, or two periods split at the halfway mark.",
  },
  {
    subject: "Health Education",
    where: "Opening, and the medical sections",
    what: "Chronic inflammatory disease, what drives it, and why dietary advice has reversed repeatedly. Pairs with units on lifestyle, prevention and health literacy.",
  },
  {
    subject: "Biology",
    where: "The mechanism, roughly the final third",
    what: "Cell turnover, lipid transport, mitochondrial energy production, insulin and lipolysis, ketone metabolism. Also protein digestion, essential amino acids and antinutritional factors.",
  },
  {
    subject: "Chemistry",
    where: "The mechanism",
    what: "Saturated and unsaturated bonds, why polyunsaturated fats oxidise and saturated ones cannot, free radical chemistry, aldehyde formation in heated oils, and glycation. Molecular structure with a consequence attached.",
  },
  {
    subject: "Statistics & Scientific Method",
    where: "Throughout, and the claims table",
    what: "The strongest fit after FCS. Correlation and causation, confounding — the breastfeeding IQ study is a worked example — dietary recall as unreliable data, and the difference between consensus and a contested finding. Students can audit the published claims table and decide whether each label is right.",
  },
  {
    subject: "Media Literacy",
    where: "The bliss point, roughly the second half",
    what: "How products are engineered for overconsumption, how children are marketed to, and how a commercial interest shapes a claim. The director's own conflict of interest is declared in the film, which makes a useful exercise in itself.",
  },
  {
    subject: "Psychology",
    where: "Appetite and the bliss point",
    what: "Taste physiology, the protein appetite, how preference is formed in childhood, and why sensory engineering defeats conscious intention.",
  },
  {
    subject: "World History",
    where: "The Ireland section",
    what: "Irish cattle and provisions exports to Britain, the Cattle Acts of 1663 and 1667, and the argument that nutrition shaped industrialisation. Presented as an original and unproven thesis, which makes it usable as a source-criticism exercise.",
  },
  {
    subject: "Anthropology & Prehistory",
    where: "The evolution section",
    what: "The cooking hypothesis, stable isotope analysis of early diets, and the skeletal record at the agricultural transition. Includes a claim the film marks as unsupported — cranial size and intelligence — which is deliberately left in and flagged.",
  },
  {
    subject: "Economics & Business",
    where: "The manipulation section",
    what: "Commodity substitution, industrial by-products becoming food, marketing to establish lifelong preference, and how an industry responds to a threat to its category.",
  },
  {
    subject: "Government & Civics",
    where: "The dietary guidelines section",
    what: "How public health policy is made, what happens when 180 scientists demand a retraction, and how an institution handles a challenge to its own advice.",
  },
  {
    subject: "English, Debate & Speech",
    where: "The structure itself",
    what: "The film is a trial. Prosecution, defence, cross-examination, unreliable witnesses and a closing argument. Students can be assigned a suspect to defend using only what the film presents.",
  },
  {
    subject: "Culinary Arts & ProStart",
    where: "Fats, oils and cooking",
    what: "Why frying oils degrade, what happens at temperature, which fats are stable, and why the same dish is different depending on what it is cooked in.",
  },
  {
    subject: "Environmental Science & Geography",
    where: "Soil and agriculture",
    what: "Soil fertility and micronutrient availability, the agricultural transition, and the argument connecting soil quality to population outcomes.",
  },
];

export default function SchoolsPage() {
  return (
    <main style={{ background: "#0f0f0f", color: "#e8e2d5", minHeight: "100vh" }}>

      {/* HEADER */}
      <header style={{
        background: "#1a1a1a",
        padding: "clamp(56px,8vw,100px) 20px",
        borderBottom: "1px solid rgba(212,175,55,.25)",
      }}>
        <div style={wrap}>
          <p style={eyebrow}>For schools</p>
          <h1 style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(30px,5vw,50px)",
            color: "#d4af37",
            lineHeight: 1.12,
            margin: "0 0 22px",
          }}>
            A lesson in evidence,<br />disguised as a murder trial
          </h1>
          <p style={{ fontSize: "18px", lineHeight: 1.65, opacity: .82, maxWidth: "58ch", margin: 0 }}>
            Four foods stand trial. The class sits on the jury. Questions appear during the
            film and each table has to agree an answer before the evidence continues.
          </p>
        </div>
      </header>

      {/* THE PITCH */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={h2}>Why it works in a classroom</h2>

          <p style={{ ...para, maxWidth: "62ch" }}>
            Food education usually arrives as rules to obey. Rules given without reasons do
            not survive contact with a vending machine.
          </p>

          <p style={{ ...para, maxWidth: "62ch" }}>
            This arrives as a mystery to solve. Students commit to an answer{" "}
            <strong>before</strong> they hear the rest of the evidence &mdash; and that order
            is the whole point. A student told the answer forgets it by Thursday. A student
            who argued for it in front of their friends, and then watched the evidence go the
            other way, remembers what changed their mind.
          </p>

          <p style={{ ...para, maxWidth: "62ch" }}>
            The subject is nutrition. The lesson is epistemics: how studies get funded, how a
            strong claim differs from a loud one, and how to tell consensus from controversy.
            Those skills outlast any particular dietary advice.
          </p>

          <div style={{ display: "grid", gap: "24px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginTop: "40px" }}>
            <Point t="90 minutes" d="Two periods, or one block. Natural stopping points at 26 and 64 minutes." />
            <Point t="All ages" d="A ten-year-old follows the story. The argument lands harder with older students." />
            <Point t="Tables of four" d="Each table answers once, so they have to talk it through and agree." />
            <Point t="No phones needed" d="A show-of-hands mode works where devices are not allowed." />
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" style={{ ...section, background: "#141414" }}>
        <div style={wrap}>
          <p style={eyebrow}>Where it fits</p>
          <h2 style={h2}>Which class, and which part</h2>

          <p style={{ ...para, maxWidth: "62ch" }}>
            It is not only a health film. Different sections do different work, and most
            departments will find something they can use on its own.
          </p>

          <div style={{ marginTop: "38px" }}>
            {FITS.map((f) => (
              <div key={f.subject} style={{
                display: "grid",
                gridTemplateColumns: "minmax(180px, 240px) 1fr",
                gap: "24px",
                padding: "22px 0",
                borderBottom: "1px solid rgba(232,226,213,.12)",
              }}>
                <div>
                  <p style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "16px",
                    color: "#d4af37",
                    margin: "0 0 6px",
                    lineHeight: 1.3,
                  }}>
                    {f.subject}
                  </p>
                  <p style={{
                    fontSize: "12px",
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    opacity: .45,
                    margin: 0,
                  }}>
                    {f.where}
                  </p>
                </div>
                <p style={{ fontSize: "15px", lineHeight: 1.65, opacity: .82, margin: 0 }}>
                  {f.what}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            borderLeft: "2px solid #d4af37",
            paddingLeft: "22px",
            marginTop: "38px",
            maxWidth: "62ch",
          }}>
            <p style={{ ...para, marginBottom: 0 }}>
              <strong style={{ color: "#d4af37" }}>The claims table is the sharpest exercise.</strong>{" "}
              Every claim in the film is published at{" "}
              <a href="/evidence" style={link}>poshpork.com/evidence</a>, marked as consensus,
              contested, or the director&apos;s own unproven argument. Give students a claim
              each and ask whether the label is right. Several are genuinely arguable, and two
              are hypotheses that have never been peer-reviewed &mdash; the film says so.
            </p>
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section id="price" style={section}>
        <div style={wrap}>
          <h2 style={h2}>What it costs</h2>

          <div style={{
            border: "1px solid rgba(212,175,55,.45)",
            borderRadius: "10px",
            padding: "clamp(28px,4vw,44px)",
            background: "rgba(212,175,55,.06)",
            maxWidth: "62ch",
          }}>
            <p style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(38px,6vw,54px)",
              color: "#d4af37",
              margin: "0 0 6px",
              lineHeight: 1,
            }}>
              $249
            </p>
            <p style={{
              fontSize: "13px",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              opacity: .6,
              margin: "0 0 26px",
            }}>
              One school, one year &middot; &euro;249 in Europe
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px" }}>
              <Inc t="Unlimited classroom use for a year, across every department" />
              <Inc t="The interactive room mode — students answer on their own phones" />
              <Inc t="Show-of-hands mode where devices are not permitted" />
              <Inc t="Facilitator guide, discussion questions and the claims table" />
              <Inc t="Anything new made during your licence year" />
            </ul>

            <a href="mailto:screening@poshpork.com?subject=School%20licence" style={btn}>
              Ask for a licence
            </a>

            <p style={{ ...para, fontSize: "14px", opacity: .65, margin: "20px 0 0" }}>
              Invoices and purchase orders are no trouble. Most schools need one and it will
              not slow anything down.
            </p>
          </div>

          <p style={{ ...para, maxWidth: "62ch", marginTop: "30px" }}>
            Three or more schools in a district, or a whole network &mdash; write and we will
            work something out. The same is true if you want it and cannot afford it. Say so.
          </p>
        </div>
      </section>

      {/* SEE IT FIRST */}
      <section style={{ ...section, background: "#141414" }}>
        <div style={wrap}>
          <h2 style={h2}>Watch it before you decide</h2>
          <p style={{ ...para, maxWidth: "62ch" }}>
            No teacher should have to buy a film they have not seen. Write from a school
            address and I will set up free access the same day, with no obligation and nobody
            following up to ask what you thought.
          </p>
          <p style={{ ...para, fontSize: "18px" }}>
            <a href="mailto:screening@poshpork.com?subject=Preview%20for%20a%20school" style={link}>
              screening@poshpork.com
            </a>
          </p>
          <p style={{ ...para, maxWidth: "62ch", fontSize: "15px", opacity: .7 }}>
            The full guide to running it with a class is at{" "}
            <a href="/facilitator" style={link}>poshpork.com/facilitator</a>.
          </p>
        </div>
      </section>

      {/* FOOT */}
      <section style={{ ...section, paddingBottom: "clamp(72px,10vw,120px)" }}>
        <div style={wrap}>
          <div style={{
            borderLeft: "2px solid rgba(212,175,55,.4)",
            paddingLeft: "22px",
            maxWidth: "62ch",
          }}>
            <p style={{ ...para, fontSize: "15px", marginBottom: "14px", opacity: .82 }}>
              The film is for education and entertainment. It is not medical advice, and
              nothing in it should replace a conversation with a doctor. No student should
              change anything about how they eat on the strength of a film.
            </p>
            <p style={{ ...para, fontSize: "15px", marginBottom: 0, opacity: .82 }}>
              The director is a pig farmer who intends in future to sell a pork product. That
              is declared in the film and on the{" "}
              <a href="/evidence" style={link}>evidence page</a>, and it is worth pointing out
              to a class.
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
    <div style={{ borderTop: "1px solid rgba(212,175,55,.3)", paddingTop: "16px" }}>
      <h3 style={{ fontFamily: "Cinzel, serif", fontSize: "17px", color: "#d4af37", margin: "0 0 8px" }}>{t}</h3>
      <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#a8a29a", margin: 0 }}>{d}</p>
    </div>
  );
}

function Inc({ t }: { t: string }) {
  return (
    <li style={{
      fontSize: "16px",
      lineHeight: 1.6,
      padding: "10px 0 10px 22px",
      position: "relative",
      borderTop: "1px solid rgba(232,226,213,.1)",
    }}>
      <span style={{ position: "absolute", left: 0, color: "#d4af37" }}>&middot;</span>
      {t}
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
  fontSize: "clamp(24px,3.4vw,36px)",
  color: "#d4af37",
  lineHeight: 1.2,
  margin: "0 0 24px",
};

const para: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.7,
  margin: "0 0 16px",
};

const btn: React.CSSProperties = {
  display: "inline-block",
  padding: "17px 40px",
  fontFamily: "Cinzel, serif",
  fontSize: "16px",
  fontWeight: "bold",
  color: "#0a0a0a",
  background: "linear-gradient(135deg,#a67c00,#d4af37 50%,#a67c00)",
  borderRadius: "8px",
  textDecoration: "none",
};

const link: React.CSSProperties = {
  color: "#d4af37",
  textDecoration: "underline",
};