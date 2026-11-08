"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * The host's games screen, shown on the TV.
 * Uses the same room as the film: open the film's room first, then come
 * here with its code (poshpork.com/host/games?code=ABC123), in the same
 * browser you are signed in with.
 */

type GameQ = {
  id: string;
  order_number: number;
  game_round: number;
  game_kind: "profile" | "quiz";
  question_text: string;
  options: string[];
  correct_answer: string | null;
  explanation: string | null;
  stamp: string | null;
};

type Profile = {
  table_id: string;
  table_name: string;
  colour: string | null;
  suspects: { key: string; name: string; line: string }[];
};

type RoomState = {
  question_open: boolean;
  revealed: boolean;
  question: { id: string } | null;
  tally: Record<string, number>;
  answered: number;
  expected: number;
  players: number;
  table_mode: boolean;
  profiles: Profile[] | null;
};

type Standing = { table_id: string; table_name: string; colour: string | null; score: number };

const ROUND_TITLES: Record<number, string> = {
  1: "Round 1 \u00b7 Who are you, and what does your body need?",
  2: "Round 2 \u00b7 How food changed",
  3: "Round 3 \u00b7 Under suspicion",
};

export default function HostGamesPage() {
  const [code, setCode] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [questions, setQuestions] = useState<GameQ[]>([]);
  const [idx, setIdx] = useState(0);
  const [state, setState] = useState<RoomState | null>(null);
  const [standings, setStandings] = useState<Standing[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("code");
    if (c) { setCode(c.toUpperCase()); setCodeInput(c.toUpperCase()); }
    fetch("/api/room/games")
      .then((r) => r.json())
      .then((j) => setQuestions(j.questions ?? []))
      .catch(() => setError("Could not load the game questions."));
  }, []);

  useEffect(() => {
    if (!code) return;
    const tick = async () => {
      try {
        const r = await fetch(`/api/room/state?code=${encodeURIComponent(code)}`, { cache: "no-store" });
        if (r.ok) setState(await r.json());
      } catch { /* next poll */ }
    };
    tick();
    const id = setInterval(tick, 1500);
    return () => clearInterval(id);
  }, [code]);

  const post = useCallback(async (body: Record<string, unknown>) => {
    setError("");
    const r = await fetch("/api/room/question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, ...body }),
    });
    if (!r.ok) {
      const j = await r.json().catch(() => ({}));
      setError(
        r.status === 401 || r.status === 403
          ? "Sign in as the room's host in this browser, then try again."
          : j.error ?? "Something went wrong.",
      );
    }
  }, [code]);

  const q = questions[idx] ?? null;
  const isCurrent = !!q && state?.question?.id === q.id;
  const isOpen = isCurrent && !!state?.question_open;
  const isRevealed = isCurrent && !!state?.revealed;
  const lastProfile = useMemo(
    () => questions.filter((x) => x.game_kind === "profile").slice(-1)[0]?.id,
    [questions],
  );

  const open = () => { setStandings(null); if (q) post({ question_id: q.id, open: true, status: "playing" }); };
  const close = () => post({ open: false });
  const reveal = () => post({ open: false, revealed: true });
  const next = () => {
    const n = Math.min(idx + 1, questions.length - 1);
    setIdx(n);
    setStandings(null);
    const nq = questions[n];
    if (nq && n !== idx) post({ question_id: nq.id, open: true, status: "playing" });
  };
  const clearScreen = () => { setStandings(null); post({ question_id: null, open: false }); };
  const showScores = async () => {
    const r = await fetch(`/api/room/standings?code=${encodeURIComponent(code)}`, { cache: "no-store" });
    if (r.ok) setStandings(((await r.json()).standings ?? []) as Standing[]);
  };

  /* ---------------- no room yet ---------------- */
  if (!code) {
    return (
      <main className="hg">
        <style>{CSS}</style>
        <div className="hg-card hg-narrow">
          <p className="hg-eyebrow">Host · Games</p>
          <h1 className="hg-h1">Which room?</h1>
          <p className="hg-note">Open the film&rsquo;s room first, then enter its code here.</p>
          <input className="hg-input" value={codeInput} maxLength={8} placeholder="ABC123"
            onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && setCode(codeInput.trim())} />
          <button className="hg-btn hg-gold" onClick={() => setCode(codeInput.trim())}>Continue</button>
        </div>
      </main>
    );
  }

  const rounds = [1, 2, 3];
  const expected = state?.expected || state?.players || 0;

  return (
    <main className="hg">
      <style>{CSS}</style>

      {/* Top bar: rounds and room */}
      <header className="hg-top">
        <div className="hg-rounds">
          {rounds.map((r) => {
            const first = questions.findIndex((x) => x.game_round === r);
            const on = q?.game_round === r;
            return (
              <button key={r} className={`hg-round${on ? " is-on" : ""}`} disabled={first < 0}
                onClick={() => { setIdx(first); setStandings(null); }}>
                Round {r}
              </button>
            );
          })}
        </div>
        <div className="hg-room">
          Room <strong>{code}</strong> · {state?.players ?? 0} players
        </div>
      </header>

      {/* The stage */}
      <section className="hg-stage">
        {standings ? (
          <div className="hg-card">
            <p className="hg-eyebrow">The scores</p>
            <h2 className="hg-h1">How the tables stand</h2>
            <ol className="hg-scores">
              {standings.map((s, i) => (
                <li key={s.table_id} className={i === 0 ? "is-top" : ""}>
                  <span className="hg-dot" style={{ background: s.colour ?? "#d4af37" }} />
                  <span className="hg-sname">{s.table_name}</span>
                  <span className="hg-sscore">{s.score}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : !q ? (
          <div className="hg-card"><p className="hg-note">Loading the questions&hellip;</p></div>
        ) : (
          <div className="hg-card">
            <p className="hg-eyebrow">
              {ROUND_TITLES[q.game_round]} · Question {questions.filter((x) => x.game_round === q.game_round).findIndex((x) => x.id === q.id) + 1}
            </p>
            {q.game_kind === "profile" && <p className="hg-tag">Which suspect is your table?</p>}
            <h2 className="hg-q">{q.question_text}</h2>

            {/* Suspect reveal */}
            {isRevealed && q.game_kind === "profile" && state?.profiles ? (
              <div className="hg-profiles">
                {state.profiles.map((p) => (
                  <div key={p.table_id} className="hg-prof">
                    <p className="hg-prof-table"><span className="hg-dot" style={{ background: p.colour ?? "#d4af37" }} />{p.table_name}</p>
                    <p className="hg-prof-name">
                      {p.suspects.length > 1
                        ? `Half ${p.suspects.map((s) => s.name).join(", half ")}`
                        : p.suspects[0]?.name}
                    </p>
                    <p className="hg-prof-line">{p.suspects.length === 1 ? p.suspects[0].line : "The court cannot decide."}</p>
                  </div>
                ))}
                {state.profiles.length === 0 && <p className="hg-note">No answers yet.</p>}
              </div>
            ) : (
              <div className="hg-opts">
                {q.options.map((o, k) => {
                  const right = isRevealed && q.correct_answer === o;
                  const votes = isCurrent ? state?.tally?.[o] ?? 0 : 0;
                  return (
                    <div key={o} className={`hg-opt${right ? " is-right" : ""}${isRevealed && !right && q.game_kind === "quiz" ? " is-dim" : ""}`}>
                      <span className="hg-letter">{"ABCD"[k]}</span>
                      <span className="hg-otext">{o}</span>
                      {isCurrent && (isRevealed || q.game_kind === "profile") && <span className="hg-votes">{votes}</span>}
                    </div>
                  );
                })}
              </div>
            )}

            {isRevealed && q.game_kind === "quiz" && (
              <div className="hg-explain">
                <p>{q.explanation}</p>
                {q.stamp && <span className="hg-stamp">{q.stamp.toUpperCase()}</span>}
              </div>
            )}

            {isCurrent && (
              <p className="hg-count">
                {isOpen ? "Answering\u2026 " : ""}
                {state?.answered ?? 0} of {expected} {state?.table_mode ? "tables" : "people"} answered
              </p>
            )}
          </div>
        )}
      </section>

      {/* Controls: on the laptop, at the bottom */}
      <footer className="hg-controls">
        <button className="hg-btn" onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0}>&larr; Back</button>

        {!isCurrent && <button className="hg-btn hg-gold" onClick={open} disabled={!q}>Open this question</button>}

        {isOpen && q?.game_kind === "quiz" && <button className="hg-btn hg-gold" onClick={reveal}>Close and reveal the answer</button>}
        {isOpen && q?.game_kind === "profile" && q.id !== lastProfile && <button className="hg-btn hg-gold" onClick={close}>Close</button>}
        {isOpen && q?.game_kind === "profile" && q.id === lastProfile && <button className="hg-btn hg-gold" onClick={reveal}>Close and reveal the suspects</button>}

        {isCurrent && !isOpen && idx < questions.length - 1 && questions[idx + 1]?.game_round === q?.game_round && (
          <button className="hg-btn hg-gold" onClick={next}>Next question &rarr;</button>
        )}
        {isCurrent && !isOpen && (idx === questions.length - 1 || questions[idx + 1]?.game_round !== q?.game_round) && (
          <span className="hg-end">End of round: play the next part of the film.</span>
        )}

        <span className="hg-spacer" />
        <button className="hg-btn" onClick={showScores}>Scores</button>
        <button className="hg-btn" onClick={clearScreen}>Clear phones</button>
      </footer>

      {error && <p className="hg-error">{error}</p>}
    </main>
  );
}

const CSS = `
.hg { min-height: 100dvh; background: radial-gradient(ellipse at top, #2a1d0f, #0a0806 70%); color: #f2ece1;
  font-family: Georgia, serif; display: flex; flex-direction: column; }
.hg-top { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 18px 28px; flex-wrap: wrap; }
.hg-rounds { display: flex; gap: 8px; }
.hg-round { font-family: Cinzel, serif; font-size: 15px; padding: 10px 18px; border-radius: 6px; cursor: pointer;
  background: transparent; color: #d4af37; border: 1px solid rgba(212,175,55,.4); }
.hg-round.is-on { background: rgba(212,175,55,.18); color: #f2ece1; border-color: #d4af37; }
.hg-room { font-size: 15px; opacity: .75; } .hg-room strong { color: #d4af37; letter-spacing: .15em; font-family: Cinzel, serif; }
.hg-stage { flex: 1; display: grid; place-items: center; padding: 10px 28px 24px; }
.hg-card { width: min(1200px, 100%); }
.hg-narrow { width: min(460px, 100%); margin: 12vh auto 0; text-align: center; }
.hg-eyebrow { font-family: Cinzel, serif; font-size: 15px; letter-spacing: .2em; text-transform: uppercase; color: #d4af37; opacity: .85; margin: 0 0 14px; }
.hg-tag { display: inline-block; font-family: Cinzel, serif; font-size: 18px; color: #1a1006; background: #d4af37; padding: 6px 14px; border-radius: 4px; margin: 0 0 16px; }
.hg-h1 { font-family: Cinzel, serif; font-size: clamp(32px,4vw,52px); color: #d4af37; margin: 0 0 18px; }
.hg-q { font-family: Cinzel, serif; font-size: clamp(34px,4.4vw,60px); line-height: 1.15; margin: 0 0 32px; }
.hg-opts { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; }
.hg-opt { display: flex; align-items: center; gap: 18px; padding: 22px 26px; border-radius: 12px;
  background: rgba(255,255,255,.05); border: 2px solid rgba(212,175,55,.35); font-size: clamp(24px,2.4vw,34px); transition: all .4s ease; }
.hg-opt.is-right { background: rgba(122,170,110,.22); border-color: #8fd19e; }
.hg-opt.is-dim { opacity: .4; }
.hg-letter { font-family: Cinzel, serif; color: #d4af37; font-size: .9em; }
.hg-otext { flex: 1; }
.hg-votes { font-family: Cinzel, serif; font-size: .9em; color: #d4af37; min-width: 40px; text-align: right; }
.hg-explain { margin-top: 26px; padding: 22px 26px; border-radius: 12px; background: rgba(212,175,55,.08); border: 1px solid rgba(212,175,55,.3); font-size: clamp(20px,1.9vw,26px); line-height: 1.5; }
.hg-explain p { margin: 0 0 10px; }
.hg-stamp { display: inline-block; font-family: Cinzel, serif; font-size: 14px; letter-spacing: .12em; color: #8fd19e; border: 2px solid #8fd19e; border-radius: 4px; padding: 3px 10px; }
.hg-count { margin: 22px 0 0; font-size: 20px; opacity: .7; }
.hg-profiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px; }
.hg-prof { padding: 22px 24px; border-radius: 12px; background: rgba(212,175,55,.08); border: 1px solid rgba(212,175,55,.4);
  animation: hgPop .6s ease both; }
.hg-prof:nth-child(2) { animation-delay: .5s; } .hg-prof:nth-child(3) { animation-delay: 1s; } .hg-prof:nth-child(4) { animation-delay: 1.5s; }
@keyframes hgPop { from { opacity: 0; transform: scale(.94); } to { opacity: 1; transform: none; } }
.hg-prof-table { display: flex; align-items: center; gap: 10px; font-size: 18px; opacity: .8; margin: 0 0 8px; }
.hg-prof-name { font-family: Cinzel, serif; font-size: clamp(26px,2.6vw,36px); color: #d4af37; margin: 0 0 8px; line-height: 1.15; }
.hg-prof-line { font-size: 19px; line-height: 1.45; margin: 0; opacity: .9; }
.hg-dot { width: 14px; height: 14px; border-radius: 50%; display: inline-block; flex: none; }
.hg-scores { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
.hg-scores li { display: flex; align-items: center; gap: 16px; padding: 18px 22px; border-radius: 10px; background: rgba(255,255,255,.05); font-size: 28px; }
.hg-scores li.is-top { border: 2px solid #d4af37; }
.hg-sname { flex: 1; font-family: Cinzel, serif; } .hg-sscore { font-family: Cinzel, serif; color: #d4af37; font-size: 36px; }
.hg-controls { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; padding: 14px 28px; border-top: 1px solid rgba(212,175,55,.25); background: rgba(0,0,0,.45); }
.hg-spacer { flex: 1; }
.hg-btn { font-family: Cinzel, serif; font-size: 15px; padding: 12px 18px; border-radius: 6px; cursor: pointer; color: #d4af37; background: transparent; border: 1px solid rgba(212,175,55,.45); }
.hg-btn:disabled { opacity: .35; cursor: default; }
.hg-gold { color: #1a1006; background: linear-gradient(135deg,#a67c00,#d4af37 50%,#a67c00); border: none; font-weight: bold; }
.hg-end { font-size: 15px; color: #d4af37; opacity: .85; }
.hg-input { width: 100%; padding: 16px; font-family: Cinzel, serif; font-size: 34px; letter-spacing: .3em; text-align: center; background: #000; color: #d4af37; border: 1px solid rgba(212,175,55,.45); border-radius: 8px; margin: 10px 0 14px; }
.hg-note { font-size: 16px; opacity: .7; }
.hg-error { margin: 0; padding: 10px 28px; color: #e0a0a0; background: rgba(0,0,0,.6); }
`;