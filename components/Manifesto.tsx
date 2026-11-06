import SupportList from "@/components/SupportList";

/**
 * The manifesto, first thing on the home page.
 * Lines fade in one after another; anyone who prefers reduced motion
 * sees the whole text at once.
 */

type Line = { t: React.ReactNode; k?: "lead" | "gold" | "hook" | "quiet" };

const BLOCKS: Line[][] = [
  [{ t: "People are sick. Let\u2019s take the pain away.", k: "lead" }],
  [
    { t: "Being healthy at 100 is normal." },
    { t: "Being sick at 80 is not." },
    { t: "Losing your mind, worrying about your heart, your lungs or your body in your 60s and 70s is not." },
    { t: "Gaining weight in middle age, or at any age, is not normal." },
  ],
  [
    { t: "The mental health of our youngest is directly affected by their diet." },
    { t: "Artificial foods have taken control of their food choices." },
    { t: "Find out how.", k: "hook" },
  ],
  [{ t: "What we see today is common. It is not normal.", k: "quiet" }],
  [{ t: "The culprit and the saviour is your food.", k: "gold" }],
  [
    { t: "Artificial food is engineered to be hard to stop eating." },
    { t: <>Every word of <i>Which Food Is Killing You?</i> is written by me, not by AI.</> },
    { t: "AI only animates it, so the story can reach the hearts and minds of the youngest audience possible, and show how real and artificial food help and harm the body." },
  ],
  [
    { t: "Artificial food has armies of marketers. Real food has no one.", k: "gold" },
    { t: "So Posh Pork is stepping forward to represent it, and to lead.", k: "gold" },
  ],
  [
    { t: "Pigs fed on olive pomace and omega-3, for tastier, healthier meat, with omega-3 levels above the EU\u2019s own threshold." },
    { t: "Feed made from what people don\u2019t eat, so nothing is wasted." },
    { t: "A brand that tells the real story of food, so people listen, and choose for themselves." },
  ],
  [
    { t: "When 100,000 people sign up, we will bring Posh Pork to supermarkets, and to farmers ready to produce it.", k: "gold" },
  ],
  [
    {
      t: (
        <>
          <a href="/movie" style={{ color: "#d4af37" }}>Watch <i>Which Food Is Killing You?</i></a>{" "}
          Deliver your verdict.{" "}
          <a href="#join" style={{ color: "#d4af37", fontWeight: "bold" }}>Sign up and join us.</a>
        </>
      ),
    },
  ],
  [
    { t: "Posh Pork: the world\u2019s first global brand for real food.", k: "lead" },
    { t: "Ready to take on the global artificial food brands.", k: "gold" },
  ],
];

export default function Manifesto() {
  let i = 0; // running line number, for the staggered fade-in

  return (
    <section
      aria-label="Our manifesto"
      style={{
        background: "radial-gradient(ellipse at top, #2a1d0f 0%, #120d08 55%, #0a0806 100%)",
        color: "#f2ece1",
        padding: "clamp(64px,10vw,120px) 20px clamp(64px,8vw,96px)",
      }}
    >
      <style>{CSS}</style>

      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <p className="mf-eyebrow">The manifesto</p>

        {BLOCKS.map((block, b) => (
          <div key={b} className="mf-block">
            {block.map((line) => {
              const n = i++;
              return (
                <p
                  key={n}
                  className={`mf-line mf-${line.k ?? "body"}`}
                  style={{ animationDelay: `${Math.min(n * 0.12, 3.2)}s` }}
                >
                  {line.t}
                </p>
              );
            })}
          </div>
        ))}

        <p className="mf-sign">&mdash; Colin</p>

                {/* The existing EUR 1 support list: the same list as on /watch */}
        <div id="join" className="mf-join">
          <SupportList />
        </div>
      </div>
    </section>
  );
}

const CSS = `
.mf-eyebrow { font-family: Cinzel, serif; font-size: 12px; letter-spacing: .3em;
  text-transform: uppercase; color: #d4af37; opacity: .8; margin: 0 0 28px; }
.mf-block { margin: 0 0 30px; }
.mf-line { margin: 0 0 8px; font-family: Georgia, "Domine", serif; font-size: clamp(18px,2.3vw,22px);
  line-height: 1.55; opacity: 0; animation: mfIn .7s ease forwards; }
.mf-lead { font-family: Cinzel, serif; font-weight: 700; font-size: clamp(30px,5vw,48px);
  line-height: 1.12; color: #f2ece1; margin-bottom: 6px; }
.mf-gold { font-family: Cinzel, serif; font-size: clamp(21px,2.9vw,28px); line-height: 1.3; color: #d4af37; }
.mf-hook { font-family: Cinzel, serif; font-weight: 700; font-size: clamp(22px,3vw,28px); color: #d4af37; }
.mf-quiet { font-style: italic; opacity: .8; }
.mf-sign { font-family: Cinzel, serif; font-size: 20px; color: #d4af37; margin: 8px 0 0; }
.mf-join { margin-top: 56px; padding-top: 44px; border-top: 1px solid rgba(212,175,55,.3); }
@keyframes mfIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
.mf-quiet.mf-line { animation-name: mfInQuiet; }
@keyframes mfInQuiet { from { opacity: 0; transform: translateY(8px); } to { opacity: .8; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .mf-line { animation: none; opacity: 1; transform: none; }
  .mf-quiet.mf-line { opacity: .8; }
}
`;