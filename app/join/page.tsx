"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type Table = {
  id: string;
  name: string;
  colour: string | null;
  max_seats: number;
  seats_taken: number;
};

type RoomInfo = { id: string; code: string; name: string | null; status: string };

type Question = {
  id: string;
  order_number: number;
  question_text: string;
  options: string[];
  verdict_group: string | null;
};

type State = {
  status: string;
  question_open: boolean;
  question: Question | null;
  tally: Record<string, number>;
  answered: number;
  players: number;
  mine: string | null;
  player_id: string | null;
};

const TOKEN_KEY = "poshpork.deviceToken";
const CODE_KEY = "poshpork.roomCode";
const POLL_MS = 1500;

function deviceToken() {
  let t = window.localStorage.getItem(TOKEN_KEY);
  if (!t) {
    t = crypto.randomUUID();
    window.localStorage.setItem(TOKEN_KEY, t);
  }
  return t;
}

/* ------------------------------------------------------------------ */

export default function JoinPage() {
  const [step, setStep] = useState<"code" | "seat" | "playing">("code");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [room, setRoom] = useState<RoomInfo | null>(null);
  const [tables, setTables] = useState<Table[]>([]);
  const [tableId, setTableId] = useState<string | null>(null);
  const [state, setState] = useState<State | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [lastAnswered, setLastAnswered] = useState<string | null>(null);

  const tokenRef = useRef<string>("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    tokenRef.current = deviceToken();
    // Rejoin automatically if this device was already in a room.
    const saved = window.localStorage.getItem(CODE_KEY);
    if (saved) {
      setCode(saved);
      lookUp(saved, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------- lookup ---------------- */

  const lookUp = useCallback(async (raw: string, silent = false) => {
    const c = raw.trim().toUpperCase();
    if (c.length < 4) {
      if (!silent) setError("Enter the room code.");
      return;
    }

    setBusy(true);
    setError("");

    try {
      const r = await fetch("/api/room/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: c }),
      });
      const json = await r.json();

      if (!r.ok) {
        if (!silent) setError(json.error ?? "Could not find that room.");
        window.localStorage.removeItem(CODE_KEY);
        setBusy(false);
        return;
      }

      setRoom(json.room);
      setTables(json.tables ?? []);
      setCode(c);
      setStep("seat");
    } catch {
      if (!silent) setError("Something went wrong. Try again.");
    }

    setBusy(false);
  }, []);

  /* ---------------- take a seat ---------------- */

  const takeSeat = useCallback(async () => {
    if (!name.trim()) {
      setError("Enter your name.");
      return;
    }

    setBusy(true);
    setError("");

    try {
      const r = await fetch("/api/room/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          name,
          device_token: tokenRef.current,
          table_id: tableId,
        }),
      });
      const json = await r.json();

      if (!r.ok) {
        setError(json.error ?? "Could not join.");
        setBusy(false);
        return;
      }

      window.localStorage.setItem(CODE_KEY, code);
      setStep("playing");
    } catch {
      setError("Something went wrong. Try again.");
    }

    setBusy(false);
  }, [code, name, tableId]);

  /* ---------------- polling ---------------- */

  useEffect(() => {
    if (step !== "playing") return;

    const tick = async () => {
      try {
        const r = await fetch(
          `/api/room/state?code=${encodeURIComponent(code)}&token=${encodeURIComponent(tokenRef.current)}`,
          { cache: "no-store" },
        );
        if (!r.ok) return;
        const json = (await r.json()) as State;
        setState(json);
      } catch {
        /* a missed poll simply succeeds on the next one */
      }
    };

    tick();
    pollRef.current = setInterval(tick, POLL_MS);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [step, code]);

  /* ---------------- answer ---------------- */

  const answer = useCallback(
    async (option: string) => {
      setLastAnswered(option);
      try {
        await fetch("/api/room/answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            device_token: tokenRef.current,
            answer: option,
          }),
        });
      } catch {
        setLastAnswered(null);
      }
    },
    [code],
  );

  const leave = () => {
    window.localStorage.removeItem(CODE_KEY);
    setStep("code");
    setRoom(null);
    setState(null);
    setName("");
    setTableId(null);
  };

  /* ---------------- render ---------------- */

  const chosen = state?.mine ?? lastAnswered;

  return (
    <main className="pj">
      <style>{CSS}</style>

      <div className="pj-inner">
        {/* -------- code -------- */}
        {step === "code" && (
          <div className="pj-card">
            <p className="pj-eyebrow">Which Food Is Killing You?</p>
            <h1 className="pj-title">Join the jury</h1>
            <p className="pj-lede">Enter the code on the screen.</p>

            <input
              className="pj-code"
              inputMode="text"
              autoCapitalize="characters"
              autoComplete="off"
              spellCheck={false}
              maxLength={8}
              placeholder="ABC123"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && lookUp(code)}
            />

            {error && <p className="pj-error">{error}</p>}

            <button className="pj-btn" disabled={busy} onClick={() => lookUp(code)}>
              {busy ? "Looking…" : "Continue"}
            </button>
          </div>
        )}

        {/* -------- seat -------- */}
        {step === "seat" && (
          <div className="pj-card">
            <p className="pj-eyebrow">{room?.name ?? `Room ${room?.code}`}</p>
            <h1 className="pj-title">Take your seat</h1>

            <label className="pj-label">Your name</label>
            <input
              className="pj-input"
              placeholder="First name"
              maxLength={40}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {tables.length > 0 && (
              <>
                <label className="pj-label">Your table</label>
                <div className="pj-tables">
                  {tables.map((t) => {
                    const full = t.seats_taken >= t.max_seats;
                    const on = tableId === t.id;
                    return (
                      <button
                        key={t.id}
                        className={`pj-table ${on ? "is-on" : ""}`}
                        style={on && t.colour ? { borderColor: t.colour, background: `${t.colour}22` } : undefined}
                        disabled={full && !on}
                        onClick={() => setTableId(on ? null : t.id)}
                      >
                        <span className="pj-table-dot" style={{ background: t.colour ?? "#d4af37" }} />
                        <span>{t.name}</span>
                        <span className="pj-table-seats">
                          {full ? "full" : `${t.seats_taken}/${t.max_seats}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {error && <p className="pj-error">{error}</p>}

            <button className="pj-btn" disabled={busy} onClick={takeSeat}>
              {busy ? "Joining…" : "I'm in"}
            </button>

            <button className="pj-quiet" onClick={() => setStep("code")}>
              Different room
            </button>
          </div>
        )}

        {/* -------- playing -------- */}
        {step === "playing" && (
          <div className="pj-play">
            {state?.question && state.question_open ? (
              <div className="pj-card">
                <p className="pj-eyebrow">
                  {state.question.verdict_group
                    ? "The verdict"
                    : `Evidence ${String(state.question.order_number).padStart(2, "0")}`}
                </p>
                <h1 className="pj-question">{state.question.question_text}</h1>

                <div className="pj-options">
                  {state.question.options.map((opt) => (
                    <button
                      key={opt}
                      className={`pj-option ${chosen === opt ? "is-chosen" : ""}`}
                      onClick={() => answer(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {chosen && (
                  <p className="pj-locked">
                    Answer in. Tap again to change while it&apos;s open.
                  </p>
                )}
              </div>
            ) : (
              <div className="pj-card pj-waiting">
                <div className="pj-pulse" />
                <p className="pj-eyebrow">You&apos;re in</p>
                <h1 className="pj-title">Watch the screen</h1>
                <p className="pj-lede">
                  The next question will appear here. Keep this open.
                </p>
                {state && (
                  <p className="pj-meta">
                    {state.players} {state.players === 1 ? "person" : "people"} in the room
                  </p>
                )}
              </div>
            )}

            <button className="pj-quiet" onClick={leave}>
              Leave the room
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */

const CSS = `
.pj { min-height: 100dvh; background: #0a0a0a; color: #f2ece1;
  font-family: Georgia, serif; display: grid; place-items: center;
  padding: 20px; }
.pj-inner { width: min(460px, 100%); }
.pj-card { border: 1px solid rgba(212,175,55,.4); border-radius: 10px;
  background: linear-gradient(180deg, rgba(24,24,24,.97), rgba(14,14,14,.97));
  padding: clamp(24px, 6vw, 36px); text-align: center; }
.pj-eyebrow { font-size: 11px; letter-spacing: .28em; text-transform: uppercase;
  color: #d4af37; opacity: .8; margin: 0 0 14px; }
.pj-title { font-family: Cinzel, serif; font-size: clamp(24px, 6vw, 32px);
  color: #d4af37; margin: 0 0 12px; line-height: 1.15; }
.pj-question { font-family: Cinzel, serif; font-size: clamp(21px, 5.5vw, 28px);
  color: #f2ece1; margin: 0 0 28px; line-height: 1.25; }
.pj-lede { font-size: 15px; line-height: 1.6; opacity: .7; margin: 0 0 24px; }
.pj-meta { font-size: 13px; opacity: .45; margin: 20px 0 0; }

.pj-code { width: 100%; padding: 18px 12px; margin: 0 0 16px;
  font-family: Cinzel, serif; font-size: clamp(28px, 9vw, 40px);
  letter-spacing: .3em; text-align: center; text-transform: uppercase;
  background: #000; color: #d4af37;
  border: 1px solid rgba(212,175,55,.45); border-radius: 8px; }
.pj-code:focus { outline: none; border-color: #d4af37; }

.pj-label { display: block; text-align: left; font-size: 11px;
  letter-spacing: .2em; text-transform: uppercase; opacity: .5;
  margin: 18px 0 8px; }
.pj-input { width: 100%; padding: 14px; font: inherit; font-size: 17px;
  background: #000; color: #f2ece1;
  border: 1px solid rgba(212,175,55,.4); border-radius: 6px; }
.pj-input:focus { outline: none; border-color: #d4af37; }

.pj-tables { display: grid; gap: 8px; }
.pj-table { display: flex; align-items: center; gap: 12px; width: 100%;
  padding: 14px 16px; font: inherit; font-size: 16px; text-align: left;
  cursor: pointer; color: #f2ece1; background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.14); border-radius: 6px; }
.pj-table.is-on { border-color: #d4af37; }
.pj-table:disabled { opacity: .3; cursor: not-allowed; }
.pj-table-dot { width: 12px; height: 12px; border-radius: 50%; flex: none; }
.pj-table-seats { margin-left: auto; font-size: 12px; opacity: .5;
  letter-spacing: .1em; text-transform: uppercase; }

.pj-options { display: grid; gap: 12px; }
.pj-option { width: 100%; padding: 22px 16px; font-family: Cinzel, serif;
  font-size: clamp(17px, 4.5vw, 21px); cursor: pointer; color: #f2ece1;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(212,175,55,.4); border-radius: 8px;
  transition: background .15s ease, border-color .15s ease; }
.pj-option:active { background: rgba(212,175,55,.2); }
.pj-option.is-chosen { background: rgba(212,175,55,.26);
  border-color: #d4af37; color: #fff; }
.pj-locked { font-size: 13px; opacity: .55; margin: 20px 0 0; }

.pj-btn { width: 100%; margin-top: 22px; padding: 17px;
  font-family: Cinzel, serif; font-size: 17px; font-weight: bold;
  cursor: pointer; color: #0a0a0a; border: none; border-radius: 8px;
  background: linear-gradient(135deg,#a67c00,#d4af37 50%,#a67c00); }
.pj-btn:disabled { opacity: .45; cursor: default; }

.pj-quiet { display: block; width: 100%; margin: 18px auto 0;
  background: none; border: none; color: #d4af37; opacity: .55;
  font: inherit; font-size: 13px; cursor: pointer;
  text-decoration: underline; text-underline-offset: 3px; }

.pj-error { margin: 12px 0 0; font-size: 14px; color: #e0a0a0; }

.pj-waiting { position: relative; }
.pj-pulse { width: 12px; height: 12px; border-radius: 50%; background: #d4af37;
  margin: 0 auto 20px; animation: pjPulse 2s ease-in-out infinite; }
@keyframes pjPulse {
  0%, 100% { opacity: .3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
}
@media (prefers-reduced-motion: reduce) {
  .pj-pulse { animation: none; opacity: .7; }
}
`;
