"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";

export type Question = {
  id: string;
  order_number: number;
  timestamp_seconds: number;
  question_text: string;
  options: string[];
  hold_seconds: number | null;
  verdict_group: string | null;
};

type Mode = "interactive" | "group" | "off";

const MODE_KEY = "poshpork.answerMode";
const SIZE_KEY = "poshpork.groupSize";
const DEFAULT_HOLD = 10;
const FIRE_WINDOW = 4;

export default function InteractivePlayer({
  videoId,
  questions,
}: {
  videoId: string;
  questions: Question[];
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const firedRef = useRef<Set<string>>(new Set());
  const askedAtRef = useRef<number>(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  const [mode, setMode] = useState<Mode>("interactive");
  const [groupSize, setGroupSize] = useState(1);
  const [showSetup, setShowSetup] = useState(true);

  const [screen, setScreen] = useState<Question[] | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [held, setHeld] = useState(false);
  const [picks, setPicks] = useState<Record<string, string>>({});
  // Verdict counts: how many chose options[0]. The rest chose options[1].
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [sent, setSent] = useState(false);

  const modeRef = useRef(mode);
  const screenRef = useRef(screen);
  const picksRef = useRef(picks);
  const countsRef = useRef(counts);
  const groupSizeRef = useRef(groupSize);
  useEffect(() => void (modeRef.current = mode), [mode]);
  useEffect(() => void (screenRef.current = screen), [screen]);
  useEffect(() => void (picksRef.current = picks), [picks]);
  useEffect(() => void (countsRef.current = counts), [counts]);
  useEffect(() => void (groupSizeRef.current = groupSize), [groupSize]);

  useEffect(() => {
    const saved = window.localStorage.getItem(MODE_KEY) as Mode | null;
    if (saved === "interactive" || saved === "group" || saved === "off") setMode(saved);
    const size = Number(window.localStorage.getItem(SIZE_KEY));
    if (size > 0) setGroupSize(size);
  }, []);

  const persist = (m: Mode, size: number) => {
    window.localStorage.setItem(MODE_KEY, m);
    window.localStorage.setItem(SIZE_KEY, String(size));
  };

  const stopTick = useCallback(() => {
    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = null;
  }, []);

  const submit = useCallback(
    (questionId: string, answer: string | null, voteCount = 1) => {
      const sid = sessionIdRef.current;
      if (!sid) return;
      fetch("/api/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sid,
          question_id: questionId,
          answer,
          vote_count: voteCount,
          answer_mode: modeRef.current,
          group_size: groupSizeRef.current,
          seconds_to_answer: Number(((Date.now() - askedAtRef.current) / 1000).toFixed(1)),
        }),
        keepalive: true,
      }).catch(() => {});
    },
    [],
  );

  const closeScreen = useCallback(
    (record: boolean) => {
      const qs = screenRef.current;
      if (qs && record) {
        const size = groupSizeRef.current;
        const groupVote = qs.length > 1 && modeRef.current === "group" && size > 1;

        if (groupVote) {
          const c = countsRef.current;
          qs.forEach((q) => {
            const first = c[q.id];
            if (first === undefined) {
              submit(q.id, null, 1);
              return;
            }
            const second = size - first;
            if (first > 0) submit(q.id, q.options[0], first);
            if (second > 0) submit(q.id, q.options[1], second);
          });
        } else {
          const current = picksRef.current;
          qs.forEach((q) => submit(q.id, current[q.id] ?? null, 1));
        }
      }
      stopTick();
      setScreen(null);
      setPicks({});
      setCounts({});
      setHeld(false);
      setSent(false);
      playerRef.current?.play().catch(() => {});
    },
    [stopTick, submit],
  );

  const pick = useCallback((questionId: string, option: string) => {
    setPicks((prev) => ({ ...prev, [questionId]: option }));
  }, []);

  // Each tap adds a person. Cycles back to zero so nobody gets stuck.
  const tapVerdict = useCallback((q: Question, optIdx: number) => {
    const size = groupSizeRef.current;
    setCounts((prev) => {
      const cur = prev[q.id];
      if (optIdx === 0) {
        const next = cur === undefined ? 1 : (cur + 1) % (size + 1);
        return { ...prev, [q.id]: next };
      }
      const curSecond = cur === undefined ? undefined : size - cur;
      const nextSecond = curSecond === undefined ? 1 : (curSecond + 1) % (size + 1);
      return { ...prev, [q.id]: size - nextSecond };
    });
  }, []);

  const ask = useCallback(
    (group: Question[]) => {
      group.forEach((q) => firedRef.current.add(q.id));
      askedAtRef.current = Date.now();
      setScreen(group);
      setPicks({});
      setCounts({});
      setHeld(false);
      setSent(false);
      playerRef.current?.pause().catch(() => {});

      if (modeRef.current !== "group") return;

      const hold = group[0].hold_seconds ?? DEFAULT_HOLD;
      setRemaining(hold);
      stopTick();
      tickRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 0.1) {
            stopTick();
            closeScreen(true);
            return 0;
          }
          return Math.round((r - 0.1) * 10) / 10;
        });
      }, 100);
    },
    [stopTick, closeScreen],
  );

  // Kept in refs so the player effect never needs rebuilding.
  const questionsRef = useRef(questions);
  const askRef = useRef(ask);
  useEffect(() => void (questionsRef.current = questions), [questions]);
  useEffect(() => void (askRef.current = ask), [ask]);

  useEffect(() => {
    if (!mountRef.current || playerRef.current) return;

    const player = new Player(mountRef.current, {
      id: Number(videoId),
      responsive: true,
      dnt: true,
      title: false,
      byline: false,
      portrait: false,
    });
    playerRef.current = player;

    player.on("timeupdate", ({ seconds }: { seconds: number }) => {
      if (modeRef.current === "off" || screenRef.current) return;
      for (const q of questionsRef.current) {
        if (firedRef.current.has(q.id)) continue;

        // The verdict gets a wide window — it's the payoff, and people scrub.
        const win = q.verdict_group ? 30 : FIRE_WINDOW;

        if (seconds >= q.timestamp_seconds && seconds < q.timestamp_seconds + win) {
          const group = q.verdict_group
            ? questionsRef.current.filter((x) => x.verdict_group === q.verdict_group)
            : [q];
          askRef.current(group);
          break;
        }

        // Ordinary questions are retired once you're past them. The verdict never is.
        if (seconds >= q.timestamp_seconds + win && !q.verdict_group) {
          firedRef.current.add(q.id);
        }
      }
    });

    player.on("ended", () => {
      // Last chance: if they reached the credits without voting, ask now.
      const unvoted = questionsRef.current.filter(
        (q) => q.verdict_group && !firedRef.current.has(q.id),
      );
      if (unvoted.length && modeRef.current !== "off") {
        askRef.current(unvoted);
        return;
      }

      const sid = sessionIdRef.current;
      if (!sid) return;
      fetch("/api/answers/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sid }),
        keepalive: true,
      }).catch(() => {});
    });

    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
      player.destroy().catch(() => {});
      playerRef.current = null;
    };
  }, [videoId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const qs = screenRef.current;
      if (!qs) return;

      const size = groupSizeRef.current;
      const groupVote = qs.length > 1 && modeRef.current === "group" && size > 1;

      // Enter always resumes the film. On the verdict screen it delivers first.
      if (e.key === "Enter") {
        e.preventDefault();
        if (qs.length > 1) {
          setSent(true);
          window.setTimeout(() => closeScreen(true), 700);
        } else {
          closeScreen(true);
        }
        return;
      }

      const n = Number(e.key);
      if (n >= 1) {
        if (qs.length === 1) {
          if (n <= qs[0].options.length) {
            e.preventDefault();
            pick(qs[0].id, qs[0].options[n - 1]);
            if (modeRef.current !== "group") {
              window.setTimeout(() => closeScreen(true), 700);
            }
          }
        } else {
          const idx = Math.floor((n - 1) / 2);
          const optIdx = (n - 1) % 2;
          if (idx < qs.length) {
            e.preventDefault();
            if (groupVote) tapVerdict(qs[idx], optIdx);
            else pick(qs[idx].id, qs[idx].options[optIdx]);
          }
        }
        return;
      }

      if (e.key.toLowerCase() === "t") {
        e.preventDefault();
        stopTick();
        setHeld(true);
      } else if (e.key.toLowerCase() === "s") {
        e.preventDefault();
        closeScreen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pick, tapVerdict, closeScreen, stopTick]);

  const begin = async (chosen: Mode, size: number) => {
    setMode(chosen);
    modeRef.current = chosen;
    setGroupSize(size);
    groupSizeRef.current = size;
    persist(chosen, size);
    setShowSetup(false);

    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ video_id: videoId, mode: chosen, group_size: size }),
      });
      const json = await res.json();
      sessionIdRef.current = json.session_id ?? null;
    } catch {
      sessionIdRef.current = null;
    }

    playerRef.current?.play().catch(() => {});
  };

  const isVerdict = !!screen && screen.length > 1;
  const groupVote = isVerdict && mode === "group" && groupSize > 1;
  const hold = screen?.[0]?.hold_seconds ?? DEFAULT_HOLD;
  const answeredCount = screen
    ? groupVote
      ? screen.filter((q) => counts[q.id] !== undefined).length
      : screen.filter((q) => picks[q.id]).length
    : 0;

  const shareText = encodeURIComponent(
    "I've just delivered my verdict on Which Food Is Killing You? See if you agree — poshpork.com",
  );

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px 16px 64px" }}>
      <style>{CSS}</style>

      <div className="pp-frame">
        <div ref={mountRef} />

        {showSetup && (
          <div className="pp-veil">
            <div className="pp-card">
              <p className="pp-eyebrow">Before the film begins</p>
              <h2 className="pp-title">How is the jury sitting tonight?</h2>
              <p className="pp-lede">
                Questions appear during the film. Your verdicts are counted alongside every
                other viewer&apos;s.
              </p>

              <div className="pp-choices">
                <button className="pp-choice" onClick={() => begin("interactive", 1)}>
                  <span className="pp-choice-name">On my own</span>
                  <span className="pp-choice-note">
                    The film waits for your answer. Take as long as you like.
                  </span>
                </button>

                <button className="pp-choice" onClick={() => begin("group", Math.max(groupSize, 2))}>
                  <span className="pp-choice-name">Watching as a group</span>
                  <span className="pp-choice-note">
                    One answer per room during the film, then everyone votes at the end.
                    Number keys answer, T holds the clock, Enter continues.
                  </span>
                </button>

                <button className="pp-choice pp-choice-quiet" onClick={() => begin("off", 1)}>
                  <span className="pp-choice-name">Just play the film</span>
                  <span className="pp-choice-note">No questions, no interruptions.</span>
                </button>
              </div>

              <label className="pp-size">
                How many watching?
                <input
                  type="number"
                  min={1}
                  max={200}
                  value={groupSize}
                  onChange={(e) => setGroupSize(Math.max(1, Number(e.target.value) || 1))}
                />
              </label>
            </div>
          </div>
        )}

        {screen && !isVerdict && (
          <div className="pp-veil">
            <div className="pp-card">
              <p className="pp-eyebrow">
                Evidence {String(screen[0].order_number).padStart(2, "0")}
              </p>
              <h2 className="pp-title pp-title-lg">{screen[0].question_text}</h2>

              <div className="pp-options">
                {screen[0].options.map((opt, i) => (
                  <button
                    key={opt}
                    className={`pp-option ${picks[screen[0].id] === opt ? "is-picked" : ""}`}
                    onClick={() => {
                      pick(screen[0].id, opt);
                      if (mode !== "group") window.setTimeout(() => closeScreen(true), 700);
                    }}
                    disabled={!!picks[screen[0].id]}
                  >
                    <span className="pp-key">{i + 1}</span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>

              {mode === "group" && (
                <div className="pp-timer">
                  <div className="pp-timer-track">
                    <div className="pp-timer-fill" style={{ width: `${held ? 100 : (remaining / hold) * 100}%` }} />
                  </div>
                  <div className="pp-timer-row">
                    <span>
                      {held ? "Paused — continue when ready" : `${Math.ceil(remaining)}s`}
                    </span>
                    <span className="pp-timer-actions">
                      {!held && <button onClick={() => { stopTick(); setHeld(true); }}>More time</button>}
                      <button onClick={() => closeScreen(true)}>
                        {picks[screen[0].id] ? "Continue ⏎" : "Skip"}
                      </button>
                    </span>
                  </div>
                </div>
              )}

              {mode === "interactive" && !picks[screen[0].id] && (
                <div className="pp-timer-row" style={{ marginTop: "26px" }}>
                  <span>The film is paused.</span>
                  <button onClick={() => closeScreen(true)}>Skip this one</button>
                </div>
              )}
            </div>
          </div>
        )}

        {screen && isVerdict && (
          <div className="pp-veil">
            <div className="pp-card pp-card-wide">
              <p className="pp-eyebrow">The verdict</p>
              <h2 className="pp-title pp-title-lg">How do you find each of them?</h2>

              {groupVote && (
                <p className="pp-lede">
                  Tap once per person. All {groupSize} of you vote on every suspect.
                </p>
              )}

              <div className="pp-grid">
                {screen.map((q, idx) => {
                  const c = counts[q.id];
                  const decided = groupVote ? c !== undefined : !!picks[q.id];

                  return (
                    <div key={q.id} className={`pp-suspect ${decided ? "is-done" : ""}`}>
                      <p className="pp-suspect-name">{q.question_text}</p>
                      <div className="pp-verdict-row">
                        {q.options.map((opt, oi) => {
                          const shown =
                            c === undefined ? null : oi === 0 ? c : groupSize - c;
                          const active = groupVote
                            ? (shown ?? 0) > 0
                            : picks[q.id] === opt;

                          return (
                            <button
                              key={opt}
                              className={`pp-verdict ${active ? `is-${opt.toLowerCase()}` : ""}`}
                              onClick={() =>
                                groupVote ? tapVerdict(q, oi) : pick(q.id, opt)
                              }
                              disabled={sent}
                            >
                              <span className="pp-key-sm">{idx * 2 + oi + 1}</span>
                              {opt}
                              {groupVote && shown !== null && (
                                <span className="pp-count">{shown}</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {sent ? (
                <div className="pp-passiton">
                  <p className="pp-logged">Verdict delivered.</p>
                  <p className="pp-passiton-line">
                    Humans rose to the top by passing what they knew to the people around
                    them. Older, younger, and everyone in between.
                  </p>
                  <div className="pp-passiton-actions">
                    <a className="pp-passiton-primary" href="/movie?gift=1" target="_blank" rel="noopener noreferrer">Pass it on — €15</a>
                    <a className="pp-passiton-wa" href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noopener noreferrer">Tell someone</a>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    className="pp-deliver"
                    disabled={answeredCount === 0}
                    onClick={() => {
                      setSent(true);
                      window.setTimeout(() => closeScreen(true), 700);
                    }}
                  >
                    Deliver the verdict ({answeredCount}/{screen.length})
                  </button>

                  {mode === "group" && (
                    <div className="pp-timer">
                      <div className="pp-timer-track">
                        <div className="pp-timer-fill" style={{ width: `${held ? 100 : (remaining / hold) * 100}%` }} />
                      </div>
                      <div className="pp-timer-row">
                        <span>
                          {held ? "Paused — decide when ready" : `${Math.ceil(remaining)}s`}
                        </span>
                        <span className="pp-timer-actions">
                          {!held && <button onClick={() => { stopTick(); setHeld(true); }}>More time</button>}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {!showSetup && (
        <div className="pp-bar">
          <span className="pp-bar-label">Questions</span>
          <div className="pp-bar-modes">
            {(["interactive", "group", "off"] as Mode[]).map((m) => (
              <button
                key={m}
                className={mode === m ? "is-on" : ""}
                onClick={() => {
                  setMode(m);
                  modeRef.current = m;
                  persist(m, groupSize);
                  if (m === "off" && screenRef.current) closeScreen(false);
                }}
              >
                {m === "interactive" ? "Wait for me" : m === "group" ? "Timer" : "Off"}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const CSS = `
.pp-frame { position: relative; border: 1px solid #d4af37; border-radius: 10px; overflow: hidden; background: #000; }
.pp-veil { position: absolute; inset: 0; display: grid; place-items: center; background: rgba(10,10,10,.9); padding: 20px; z-index: 20; overflow-y: auto; }
.pp-card { width: min(760px, 100%); text-align: center; color: #f2ece1; border: 1px solid rgba(212,175,55,.45); border-radius: 8px; background: linear-gradient(180deg, rgba(24,24,24,.97), rgba(14,14,14,.97)); padding: clamp(20px, 4vw, 40px); }
.pp-card-wide { width: min(880px, 100%); }
.pp-eyebrow { font-size: 12px; letter-spacing: .28em; text-transform: uppercase; color: #d4af37; opacity: .75; margin: 0 0 14px; }
.pp-title { font-family: Cinzel, serif; font-size: clamp(22px, 3vw, 30px); margin: 0 0 12px; color: #d4af37; }
.pp-title-lg { font-size: clamp(24px, 3.6vw, 38px); line-height: 1.15; margin-bottom: 28px; color: #f2ece1; }
.pp-lede { margin: 0 0 24px; opacity: .75; font-size: 15px; }
.pp-choices { display: grid; gap: 10px; text-align: left; }
.pp-choice { display: grid; gap: 4px; padding: 16px 18px; cursor: pointer; border: 1px solid rgba(212,175,55,.35); border-radius: 6px; background: rgba(212,175,55,.06); color: inherit; }
.pp-choice:hover { border-color: #d4af37; background: rgba(212,175,55,.13); }
.pp-choice-quiet { background: transparent; border-color: rgba(255,255,255,.14); }
.pp-choice-name { font-family: Cinzel, serif; font-size: 17px; color: #d4af37; }
.pp-choice-note { font-size: 13px; opacity: .65; }
.pp-size { display: flex; gap: 10px; align-items: center; justify-content: center; margin-top: 22px; font-size: 13px; opacity: .7; }
.pp-size input { width: 64px; padding: 6px 8px; background: #000; color: inherit; border: 1px solid rgba(212,175,55,.4); border-radius: 4px; text-align: center; }
.pp-options { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
.pp-option { display: flex; align-items: center; gap: 14px; text-align: left; cursor: pointer; padding: 18px 20px; font-size: clamp(16px, 2vw, 21px); border: 1px solid rgba(212,175,55,.4); border-radius: 6px; background: rgba(255,255,255,.03); color: #f2ece1; }
.pp-option:hover:not(:disabled) { border-color: #d4af37; background: rgba(212,175,55,.14); }
.pp-option:disabled { cursor: default; opacity: .45; }
.pp-option.is-picked { opacity: 1; border-color: #d4af37; background: rgba(212,175,55,.24); }
.pp-key { flex: none; width: 34px; height: 34px; display: grid; place-items: center; font-family: Cinzel, serif; font-size: 15px; border: 1px solid rgba(212,175,55,.5); border-radius: 50%; color: #d4af37; }
.pp-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 28px; }
.pp-suspect { border: 1px solid rgba(212,175,55,.3); border-radius: 8px; padding: 18px 16px; background: rgba(255,255,255,.02); }
.pp-suspect.is-done { border-color: rgba(212,175,55,.7); }
.pp-suspect-name { font-family: Cinzel, serif; font-size: clamp(15px, 1.8vw, 19px); color: #d4af37; margin: 0 0 14px; }
.pp-verdict-row { display: flex; gap: 8px; }
.pp-verdict { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 13px 8px; cursor: pointer; font-size: 15px; font-family: Cinzel, serif; border: 1px solid rgba(212,175,55,.35); border-radius: 5px; background: rgba(255,255,255,.03); color: #f2ece1; }
.pp-verdict:hover:not(:disabled) { border-color: #d4af37; }
.pp-verdict.is-guilty { background: rgba(160,40,40,.45); border-color: #c05050; color: #fff; }
.pp-verdict.is-innocent { background: rgba(212,175,55,.28); border-color: #d4af37; color: #fff; }
.pp-key-sm { font-size: 11px; opacity: .5; border: 1px solid currentColor; border-radius: 50%; width: 18px; height: 18px; display: grid; place-items: center; }
.pp-count { min-width: 24px; padding: 2px 6px; border-radius: 999px; font-size: 13px; font-weight: bold; font-variant-numeric: tabular-nums; background: rgba(255,255,255,.14); }
.pp-verdict.is-guilty .pp-count, .pp-verdict.is-innocent .pp-count { background: rgba(0,0,0,.35); }
.pp-deliver { width: 100%; padding: 18px; cursor: pointer; font-family: Cinzel, serif; font-size: 18px; font-weight: bold; color: #0a0a0a; background: linear-gradient(135deg,#a67c00,#d4af37 50%,#a67c00); border: none; border-radius: 6px; }
.pp-deliver:disabled { opacity: .35; cursor: default; }
.pp-timer { margin-top: 22px; }
.pp-timer-track { height: 2px; background: rgba(255,255,255,.12); overflow: hidden; }
.pp-timer-fill { height: 100%; background: #d4af37; transition: width .1s linear; }
.pp-timer-row { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; font-size: 13px; opacity: .7; }
.pp-timer-actions { display: flex; gap: 16px; }
.pp-timer-row button { background: none; border: none; color: #d4af37; cursor: pointer; font: inherit; text-decoration: underline; text-underline-offset: 3px; }
.pp-logged { margin: 24px 0 0; font-size: 13px; letter-spacing: .2em; text-transform: uppercase; color: #d4af37; }
.pp-bar { display: flex; align-items: center; gap: 14px; justify-content: flex-end; padding: 12px 2px 0; font-size: 12px; color: #f2ece1; }
.pp-bar-label { letter-spacing: .22em; text-transform: uppercase; opacity: .5; }
.pp-bar-modes { display: flex; border: 1px solid rgba(212,175,55,.3); border-radius: 4px; overflow: hidden; }
.pp-bar-modes button { padding: 7px 14px; background: none; border: none; border-right: 1px solid rgba(212,175,55,.2); color: inherit; opacity: .6; cursor: pointer; font: inherit; }
.pp-bar-modes button:last-child { border-right: none; }
.pp-bar-modes button.is-on { background: rgba(212,175,55,.18); color: #d4af37; opacity: 1; }
.pp-passiton { padding-top: 6px; }
.pp-passiton-line { margin: 18px auto 24px; max-width: 460px; font-size: 15px; line-height: 1.6; opacity: .7; }
.pp-passiton-actions { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
.pp-passiton-primary { padding: 14px 30px; font-family: Cinzel, serif; font-size: 16px; font-weight: bold; color: #0a0a0a; background: linear-gradient(135deg,#a67c00,#d4af37 50%,#a67c00); border-radius: 6px; text-decoration: none; }
.pp-passiton-wa { padding: 14px 30px; font-family: Cinzel, serif; font-size: 16px; color: #f2ece1; border: 1px solid rgba(255,255,255,.25); border-radius: 6px; text-decoration: none; }
`;