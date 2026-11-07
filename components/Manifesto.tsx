"use client";

import { useState } from "react";
import { IM_Fell_English, IM_Fell_English_SC } from "next/font/google";

/**
 * The manifesto, nailed to an old oak door after the rain.
 * Closed: the rolled scroll hangs from a hand-hammered nail.
 * Click: the scroll unrolls down the door and the words appear.
 *
 * Images live in /public/manifesto/:
 *   door-closed.jpg     the door with the rolled, sealed scroll
 *   door-open.jpg       the same door, bare, behind the unrolled scroll
 *   parchment-top.webp  the torn top edge of the parchment, with its nail
 *   parchment-tile.jpg  seamless parchment texture for the body
 */

const fell = IM_Fell_English({ weight: "400", style: ["normal", "italic"], subsets: ["latin"] });
const fellSC = IM_Fell_English_SC({ weight: "400", subsets: ["latin"] });

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
    { t: "When 100,000 people add their name, we will bring Posh Pork to supermarkets, and to farmers ready to produce it.", k: "gold" },
  ],
  [
    {
      t: (
        <>
          <a href="/movie" className="mf-link">Watch <i>Which Food Is Killing You?</i></a>{" "}
          Deliver your verdict.{" "}
          <a href="/support" className="mf-link mf-strong">Sign up and join us.</a>
        </>
      ),
    },
  ],
  [
    { t: "Posh Pork: the world\u2019s first global brand for real food.", k: "lead" },
    { t: "Ready to take on the global artificial food brands.", k: "gold" },
  ],
];

/* Rain: fixed pseudo-random positions, identical on server and browser. */
function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const r = rng(20261107);
const BEADS = Array.from({ length: 46 }, () => ({
  x: +(r() * 100).toFixed(2), y: +(r() * 100).toFixed(2), s: +(3 + r() * 6).toFixed(1),
}));
const DRIPS = Array.from({ length: 9 }, () => ({
  x: +(4 + r() * 92).toFixed(2), y: +(r() * 70).toFixed(2), s: +(4 + r() * 4).toFixed(1),
  d: +(7 + r() * 9).toFixed(1), delay: +(r() * 10).toFixed(1),
}));

/* A hand-torn bottom edge for the unrolled scroll. */
const TORN = (() => {
  const t = rng(77);
  const pts = ["0 0", "100% 0"];
  for (let i = 0; i <= 40; i++) {
    const x = 100 - i * 2.5;
    pts.push(`${x.toFixed(1)}% calc(100% - ${(t() * 14).toFixed(1)}px)`);
  }
  return `polygon(${pts.join(", ")})`;
})();

export default function Manifesto() {
  const [open, setOpen] = useState(false);
  let i = 0;

  return (
    <section aria-label="The manifesto" className={`mf ${fell.className}${open ? " is-open" : ""}`}>
      <style>{CSS}</style>

      <h2 className={`mf-title ${fellSC.className}`}>The Manifesto</h2>

      <div className="mf-wrap">
        {/* The door */}
        <div
          className="mf-stage"
          onClick={() => !open && setOpen(true)}
          role={open ? undefined : "button"}
          tabIndex={open ? -1 : 0}
          aria-label={open ? undefined : "Unroll the manifesto"}
          onKeyDown={(e) => {
            if (!open && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); setOpen(true); }
          }}
        >
          <img className="mf-door mf-door-closed" src="/manifesto/door-closed.jpg" alt="An old oak door, wet with rain, with a rolled parchment scroll tied with red ribbon, hanging from a single hand-hammered nail" />
          <img className="mf-door mf-door-open" src="/manifesto/door-open.jpg" alt="" aria-hidden="true" />
          <div className="mf-light" aria-hidden="true" />
          <div className="mf-rain" aria-hidden="true">
            {BEADS.map((b, n) => (
              <span key={n} className="mf-bead" style={{ left: `${b.x}%`, top: `${b.y}%`, width: b.s, height: b.s * 1.15 }} />
            ))}
            {DRIPS.map((d, n) => (
              <span
                key={n}
                className="mf-drip"
                style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s * 1.3, animationDuration: `${d.d}s`, animationDelay: `${d.delay}s` }}
              />
            ))}
          </div>
        </div>

        {/* The unrolled scroll */}
        <div className="mf-unroll" id="manifesto-text" aria-hidden={!open}>
          <div className="mf-clip">
            <div className="mf-paper">
              <img className="mf-ptop" src="/manifesto/parchment-top.webp" alt="" aria-hidden="true" />
              <div className="mf-pbody" style={{ clipPath: TORN }}>
                {BLOCKS.map((block, b) => (
                  <div key={b} className="mf-block">
                    {block.map((line) => {
                      const n = i++;
                      return (
                        <p
                          key={n}
                          className={`mf-line mf-${line.k ?? "body"}${line.k === "lead" || line.k === "gold" || line.k === "hook" ? ` ${fellSC.className}` : ""}`}
                          style={{ transitionDelay: open ? `${1.2 + Math.min(n * 0.09, 2.6)}s` : "0s" }}
                        >
                          {line.t}
                        </p>
                      );
                    })}
                  </div>
                ))}
                <p className="mf-sign">&mdash; Colin</p>
              </div>
            </div>
          </div>
          <div className="mf-roller" aria-hidden="true" />
        </div>
      </div>

      <button
        type="button"
        className={`mf-button ${fellSC.className}`}
        aria-expanded={open}
        aria-controls="manifesto-text"
        onClick={() => {
          setOpen((o) => !o);
          if (open) document.querySelector(".mf-title")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      >
        {open ? "Roll it back up" : "Unroll the manifesto"}
      </button>
    </section>
  );
}

const CSS = `
.mf {
  --w: min(560px, calc(100vw - 32px));
  position: relative; overflow: hidden;
  padding: clamp(44px,7vw,80px) 0 clamp(48px,7vw,84px);
  text-align: center; color: #2b1a0b;
  background:
    radial-gradient(ellipse at 50% 30%, rgba(120,70,25,.35), transparent 60%),
    radial-gradient(ellipse at 50% 120%, #000, transparent 55%),
    #110a05;
}
.mf-title {
  margin: 0 auto 26px; font-weight: 400; letter-spacing: .04em;
  font-size: clamp(40px,7vw,68px); line-height: 1; color: #f0dfb8;
  text-shadow: 0 2px 0 #3a2410, 0 6px 22px rgba(0,0,0,.8), 0 0 40px rgba(214,150,60,.25);
}
.mf-wrap { position: relative; width: var(--w); margin: 0 auto; min-height: calc(var(--w) * 1.25); }
.mf.is-open .mf-wrap {
  background: url(/manifesto/door-open.jpg) center top / 100% auto repeat-y;
  box-shadow: 0 30px 60px rgba(0,0,0,.6);
}

.mf-stage {
  position: relative; width: 100%; aspect-ratio: 4 / 5; overflow: hidden;
  border-radius: 4px; cursor: pointer; box-shadow: 0 30px 60px rgba(0,0,0,.6), inset 0 0 0 1px rgba(0,0,0,.4);
}
.mf.is-open .mf-stage { cursor: default; box-shadow: none; }
.mf-stage:focus-visible { outline: 3px solid #f0dfb8; outline-offset: 4px; }
.mf-door { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity 1s ease; }
.mf-door-open { opacity: 0; }
.mf.is-open .mf-door-closed { opacity: 0; }
.mf.is-open .mf-door-open { opacity: 1; }
.mf-stage:not(:focus-visible):hover .mf-door-closed { filter: brightness(1.06); }
.mf-light {
  position: absolute; inset: 0; pointer-events: none; mix-blend-mode: soft-light;
  background: radial-gradient(ellipse at 10% 40%, rgba(255,190,110,.55), transparent 55%);
  animation: mfFlicker 6s ease-in-out infinite;
}
@keyframes mfFlicker { 0%,100% { opacity: .9; } 45% { opacity: 1; } 60% { opacity: .82; } }

.mf-rain { position: absolute; inset: 0; pointer-events: none; }
.mf-bead, .mf-drip {
  position: absolute; border-radius: 50% 50% 46% 46%;
  background: radial-gradient(circle at 35% 30%, rgba(255,255,255,.75) 0 18%, rgba(255,240,220,.15) 40%, rgba(0,0,0,.25) 75%, transparent 78%);
  box-shadow: 0 1px 1px rgba(0,0,0,.35);
}
.mf-bead { opacity: .7; }
.mf-drip { opacity: 0; animation-name: mfDrip; animation-iteration-count: infinite; animation-timing-function: cubic-bezier(.4,0,.8,.6); }
.mf-drip::after {
  content: ""; position: absolute; left: 50%; bottom: 60%; width: 2px; height: 0; transform: translateX(-50%);
  background: linear-gradient(rgba(255,255,255,0), rgba(255,240,220,.35)); animation: inherit; animation-name: mfTrail;
}
@keyframes mfDrip {
  0% { opacity: 0; transform: translateY(0); } 8% { opacity: .85; }
  70% { opacity: .85; transform: translateY(130px); } 100% { opacity: 0; transform: translateY(170px); }
}
@keyframes mfTrail { 0% { height: 0; } 70% { height: 120px; } 100% { height: 140px; } }

.mf-unroll {
  position: relative; display: grid; grid-template-rows: 0fr;
  margin-top: calc(var(--w) * -1.06);
  transition: grid-template-rows 2.2s cubic-bezier(.35,.7,.2,1);
  pointer-events: none;
}
.mf.is-open .mf-unroll { grid-template-rows: 1fr; pointer-events: auto; }
.mf-clip { overflow: hidden; min-height: 0; }
.mf-paper {
  width: 88%; margin: 0 auto; transform-origin: 50% 0;
  opacity: 0; transition: opacity .5s ease .2s;
  filter: drop-shadow(0 18px 22px rgba(0,0,0,.55));
}
.mf.is-open .mf-paper { opacity: 1; animation: mfSwing 2.6s ease-out .3s; }
@keyframes mfSwing { 0% { transform: rotate(2.2deg); } 35% { transform: rotate(-1.3deg); } 65% { transform: rotate(.6deg); } 100% { transform: rotate(0); } }
.mf-ptop { display: block; width: 100%; height: auto; position: relative; z-index: 1; }
.mf-pbody {
  position: relative; z-index: 2; margin-top: -30%;
  padding: 92px clamp(22px,6vw,48px) 54px; text-align: left;
  background: url(/manifesto/parchment-tile.jpg) 0 0 / 480px auto repeat;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 84px);
          mask-image: linear-gradient(to bottom, transparent 0, #000 84px);
  box-shadow: inset 0 -40px 50px -30px rgba(90,55,20,.45);
}
.mf-roller {
  position: absolute; left: 4%; right: 4%; bottom: -16px; height: 34px; border-radius: 17px;
  background: linear-gradient(180deg, #f1dfb1 0%, #d9b877 40%, #a8783f 85%, #7d5428 100%);
  box-shadow: 0 8px 14px rgba(0,0,0,.55);
  opacity: 0; transition: opacity .3s ease;
}
.mf.is-open .mf-roller { animation: mfRoller 2.6s ease forwards; }
@keyframes mfRoller { 0% { opacity: 1; } 80% { opacity: 1; } 100% { opacity: 0; } }

.mf-block { margin: 0 0 22px; }
.mf-line {
  margin: 0 0 6px; font-size: clamp(17px,2.3vw,20.5px); line-height: 1.55; color: #2b1a0b;
  opacity: 0; transform: translateY(5px); filter: blur(1.5px);
  transition: opacity .9s ease, transform .9s ease, filter .9s ease;
}
.mf.is-open .mf-line { opacity: 1; transform: none; filter: none; }
.mf.is-open .mf-quiet { opacity: .78; }
.mf-lead { font-size: clamp(27px,4.6vw,38px); line-height: 1.12; color: #1f1206; }
.mf-gold { font-size: clamp(20px,2.9vw,25px); line-height: 1.3; color: #6e2c0e; }
.mf-hook { font-size: clamp(22px,3.2vw,28px); color: #8a1f0c; }
.mf-quiet { font-style: italic; }
.mf-sign { font-size: 26px; font-style: italic; color: #4a2a10; margin: 10px 0 0; text-align: right; }
.mf-link { color: #8a1f0c; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px; }
.mf-strong { font-weight: bold; }

.mf-button {
  margin-top: 30px; padding: 14px 30px; cursor: pointer; font-size: 19px; letter-spacing: .04em;
  color: #f0dfb8; background: linear-gradient(180deg, #3a2412, #22140a);
  border: 1px solid rgba(240,223,184,.45); border-radius: 3px;
  box-shadow: 0 8px 22px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.08);
}
.mf-button:hover { border-color: rgba(240,223,184,.8); }
.mf-button:focus-visible { outline: 3px solid #f0dfb8; outline-offset: 3px; }

@media (prefers-reduced-motion: reduce) {
  .mf-drip, .mf-light, .mf.is-open .mf-paper, .mf.is-open .mf-roller { animation: none; }
  .mf-unroll, .mf-line, .mf-door, .mf-paper { transition: none; }
  .mf-drip { display: none; }
}
`;