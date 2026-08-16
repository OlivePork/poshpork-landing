export const metadata = {
  title: "Facilitator guide | Which Food Is Killing You?",
  description:
    "How to run Which Food Is Killing You? with a class, a workplace or a group. Setup, the questions, and what to do with them.",
};

export default function FacilitatorPage() {
  return (
    <main style={{ background: "#0f0f0f", color: "#e8e2d5", minHeight: "100vh" }}>
      {/* HEADER */}
      <header style={{ background: "#1a1a1a", padding: "clamp(56px,8vw,96px) 20px", borderBottom: "1px solid rgba(212,175,55,.25)" }}>
        <div style={wrap}>
          <p style={eyebrow}>Facilitator guide</p>
          <h1 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(30px,5vw,48px)", color: "#d4af37", lineHeight: 1.15, margin: "0 0 20px" }}>
            Running it with a room
          </h1>
          <p style={{ fontSize: "18px", lineHeight: 1.6, opacity: .82, maxWidth: "58ch", margin: 0 }}>
            One page. If you read nothing else, read the six steps &mdash; everything after
            them is optional.
          </p>
        </div>
      </header>

      {/* THE SIX STEPS */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={h2}>Before you press play</h2>

          <ol style={{ margin: 0, padding: 0, listStyle: "none", maxWidth: "62ch" }}>
            <Step
              n="1"
              title="Sit them in fours"
              text="Tables of four argue. Tables of six have a quiet person in them. If numbers are awkward, make one table of three rather than one of six."
            />
            <Step
              n="2"
              title="Open a room"
              text="On the film's opening screen, choose Open a room. Set how many tables you have. A six-character code appears — put it on the screen, or write it on the board."
            />
            <Step
              n="3"
              title="Everyone joins"
              text="They go to poshpork.com/join on their phone and type the code. No app, no account, no sign-up. They pick a name and a table. Give it two minutes."
            />
            <Step
              n="4"
              title="Play the film"
              text="When a question comes up it appears on every phone at the same moment, and the film pauses. Each table answers once, so they have to agree. Anyone at the table can put the answer in — or change it — and everyone at that table sees who did."
            />
            <Step
              n="5"
              title="Watch the bar"
              text="Your screen shows the answers arriving: four of six tables, five of six. When the room is in, press continue. That is the only button you need to touch all session."
            />
            <Step
              n="6"
              title="The verdict"
              text="At the end, every person votes individually on each of the four suspects. Then the tables are ranked. Leave that on the screen — it is where the argument usually starts."
            />
          </ol>

          <div style={callout}>
            <p style={{ ...para, marginBottom: 0 }}>
              <strong style={{ color: "#d4af37" }}>No phones allowed?</strong> Choose{" "}
              <em>Watching as a group</em> instead. Take a show of hands, type the number
              in, carry on. Works with any size of room and needs nothing but your own
              screen.
            </p>
          </div>
        </div>
      </section>

      {/* PRACTICALITIES */}
      <section style={{ ...section, background: "#141414" }}>
        <div style={wrap}>
          <h2 style={h2}>Practicalities</h2>

          <dl style={{ margin: 0 }}>
            <Row k="Length" v="1 hour 27 minutes, plus roughly 10 minutes of pauses for the questions. Allow two hours with discussion." />
            <Row k="Age" v="Suits a general audience from around fourteen. Younger groups follow the story; the argument lands better with older ones." />
            <Row k="Room" v="One screen, and a device you control it from. Sound matters more than screen size — the film is dialogue-led." />
            <Row k="Wifi" v="Phones need a connection. If it drops mid-question the phone reconnects on its own; nothing is lost. If the venue wifi is bad, use the show-of-hands mode." />
            <Row k="Breaking it up" v="It works across two sessions. Stop at 45 minutes, before the prosecution's case begins. Note the time so you can resume." />
          </dl>
        </div>
      </section>

      {/* THE QUESTIONS */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={h2}>What the questions are for</h2>

          <p style={{ ...para, maxWidth: "62ch" }}>
            The questions are not a quiz. Most have no right answer, and the ones that do
            are less interesting than the disagreement they cause.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            The point is that people commit before they know. Once a table has said
            &quot;spreadable&quot; out loud, they are invested &mdash; and when the evidence
            goes the other way twenty minutes later, they notice their own mind changing.
            That is what a group remembers afterwards, not the facts.
          </p>

          <h3 style={h3}>Three ways to use them</h3>

          <p style={{ ...para, maxWidth: "62ch" }}>
            <strong>Hold the pause.</strong> The film waits. If a table is still arguing,
            let them. The best sessions run long.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            <strong>Ask the outliers.</strong> When one table goes against the room, ask
            them why before you continue. They usually have a reason, and it is usually the
            most interesting thirty seconds of the session.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            <strong>Come back to it.</strong> At the verdict, remind them what they said at
            the start. Ask who changed their mind, and at which piece of evidence.
          </p>
        </div>
      </section>

      {/* DISCUSSION */}
      <section style={{ ...section, background: "#141414" }}>
        <div style={wrap}>
          <h2 style={h2}>Afterwards</h2>
          <p style={{ ...para, maxWidth: "62ch" }}>
            Questions that work with any group, in roughly increasing difficulty.
          </p>

          <ul style={{ ...listStyle, maxWidth: "62ch" }}>
            <Q text="Which suspect did you find guilty, and what convinced you?" />
            <Q text="Did anyone change their mind during the film? At what point?" />
            <Q text="The film says the suspects have only ever been examined one at a time. Is that a fair criticism, or a convenient one?" />
            <Q text="Who benefits from the confusion about what is healthy?" />
            <Q text="The director is a pig farmer who wants to sell pork. Does that change how you weigh the argument? Should it?" />
            <Q text="What would it take to prove the film's central claim wrong?" />
          </ul>

          <div style={callout}>
            <p style={{ ...para, marginBottom: 0 }}>
              That last one is worth twenty minutes on its own. A claim that nothing could
              disprove is not a scientific claim, and asking a group to design the
              experiment teaches more about evidence than the film does.
            </p>
          </div>

          <h3 style={h3}>Checking the film</h3>
          <p style={{ ...para, maxWidth: "62ch" }}>
            Every substantive claim in the film is published at{" "}
            <a href="/press#evidence" style={link}>poshpork.com/press</a>, marked as
            consensus, contested, or the director&apos;s own synthesis, with a source for
            each.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            For an older group, that table is the lesson. Give them a claim each and ask
            them to decide whether the label is right. Several are genuinely arguable, and
            two are the director&apos;s own arguments that have never been peer-reviewed &mdash;
            he says so.
          </p>
        </div>
      </section>

      {/* HELP */}
      <section style={{ ...section, paddingBottom: "clamp(72px,10vw,120px)" }}>
        <div style={wrap}>
          <h2 style={h2}>If something goes wrong</h2>

          <dl style={{ margin: 0 }}>
            <Row k="A phone won't join" v="Check the code — the alphabet has no vowels and no O, 0, I or 1, so nothing can be misread as a word. If it still fails, they can share a table-mate's phone; only one answer per table counts anyway." />
            <Row k="A phone drops out" v="It rejoins by itself. The same seat, the same table. They may need to reload the page." />
            <Row k="The questions don't appear" v="Reload the film page. If they still don't, switch to show-of-hands mode and carry on — do not lose the room to a technical problem." />
            <Row k="Casting to a TV" v="Use an HDMI cable rather than casting. Casting sends the video to the television but leaves the questions on the laptop, where nobody can see them." />
          </dl>

          <p style={{ ...para, maxWidth: "62ch", marginTop: "36px" }}>
            Anything else &mdash; including on the day, mid-session &mdash; write to{" "}
            <a href="mailto:screening@poshpork.com" style={link}>screening@poshpork.com</a>{" "}
            or <a href="mailto:colin@poshpork.com" style={link}>colin@poshpork.com</a>. It
            comes straight to the person who made it.
          </p>

          <div style={{ ...callout, marginTop: "40px" }}>
            <p style={{ ...para, fontSize: "15px", marginBottom: 0, opacity: .85 }}>
              This film is for entertainment and education only. It is not medical advice.
              If anyone in the room takes prescribed medication, nothing here should change
              that without their doctor.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- components ---------- */

function Step({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <li style={{ display: "flex", gap: "20px", padding: "20px 0", borderBottom: "1px solid rgba(232,226,213,.12)" }}>
      <span style={{
        flexShrink: 0,
        width: "38px",
        height: "38px",
        borderRadius: "50%",
        border: "1px solid rgba(212,175,55,.5)",
        color: "#d4af37",
        fontFamily: "Cinzel, serif",
        fontSize: "16px",
        display: "grid",
        placeItems: "center",
      }}>
        {n}
      </span>
      <span>
        <span style={{
          display: "block",
          fontFamily: "Cinzel, serif",
          fontSize: "17px",
          color: "#d4af37",
          marginBottom: "6px",
        }}>
          {title}
        </span>
        <span style={{ fontSize: "16px", lineHeight: 1.65 }}>{text}</span>
      </span>
    </li>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "minmax(120px, 180px) 1fr",
      gap: "20px",
      padding: "16px 0",
      borderBottom: "1px solid rgba(232,226,213,.12)",
      alignItems: "baseline",
    }}>
      <dt style={{ fontFamily: "Cinzel, serif", fontSize: "13px", letterSpacing: ".12em", textTransform: "uppercase", color: "#d4af37" }}>{k}</dt>
      <dd style={{ margin: 0, fontSize: "16px", lineHeight: 1.65 }}>{v}</dd>
    </div>
  );
}

function Q({ text }: { text: string }) {
  return (
    <li style={{
      fontSize: "16px",
      lineHeight: 1.65,
      padding: "12px 0 12px 24px",
      position: "relative",
      borderBottom: "1px solid rgba(232,226,213,.1)",
    }}>
      <span style={{ position: "absolute", left: 0, color: "#d4af37" }}>&rarr;</span>
      {text}
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
  margin: "0 0 28px",
};

const h3: React.CSSProperties = {
  fontFamily: "Cinzel, serif",
  fontSize: "15px",
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "#d4af37",
  opacity: .75,
  margin: "36px 0 16px",
};

const para: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.7,
  margin: "0 0 16px",
};

const listStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: "0 0 8px",
};

const callout: React.CSSProperties = {
  borderLeft: "2px solid #d4af37",
  paddingLeft: "22px",
  margin: "36px 0 0",
  maxWidth: "62ch",
};

const link: React.CSSProperties = {
  color: "#d4af37",
  textDecoration: "underline",
};
