"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* useRoomHost — creates a room and pushes questions to the phones      */
/* ------------------------------------------------------------------ */

export type RoomState = {
  players: number;
  answered: number;
  expected: number;
  tally: Record<string, number>;
  tableMode: boolean;
};

export type Standing = {
  table_id: string;
  table_name: string;
  colour: string | null;
  score: number;
  players: number;
};

export function useRoomHost(lang: string) {
  const [code, setCode] = useState<string | null>(null);
  const [state, setState] = useState<RoomState>({
    players: 0,
    answered: 0,
    expected: 0,
    tally: {},
    tableMode: true,
  });
  const [standings, setStandings] = useState<Standing[] | null>(null);
  const [creating, setCreating] = useState(false);
  const codeRef = useRef<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => void (codeRef.current = code), [code]);

  const create = useCallback(
    async (name: string, tables: number, answerMode: "table" | "individual") => {
      setCreating(true);
      try {
        const r = await fetch("/api/room/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, tables, lang, answer_mode: answerMode }),
        });
        const json = await r.json();
        if (r.ok && json.code) {
          setCode(json.code);
          codeRef.current = json.code;
        }
      } catch {
        /* the host can try again */
      }
      setCreating(false);
    },
    [lang],
  );

  useEffect(() => {
    if (!code) return;

    const tick = async () => {
      try {
        const r = await fetch(`/api/room/state?code=${encodeURIComponent(code)}`, {
          cache: "no-store",
        });
        if (!r.ok) return;
        const json = await r.json();
        setState({
          players: json.players ?? 0,
          answered: json.answered ?? 0,
          expected: json.expected ?? 0,
          tally: json.tally ?? {},
          tableMode: !!json.table_mode,
        });
      } catch {
        /* a missed poll simply succeeds on the next one */
      }
    };

    tick();
    pollRef.current = setInterval(tick, 1500);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [code]);

  const openQuestion = useCallback(async (questionId: string) => {
    const c = codeRef.current;
    if (!c) return;
    setState((s) => ({ ...s, answered: 0, tally: {} }));
    try {
      await fetch("/api/room/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: c, question_id: questionId, open: true, status: "playing" }),
      });
    } catch {
      /* the film carries on regardless */
    }
  }, []);

  const closeQuestion = useCallback(async () => {
    const c = codeRef.current;
    if (!c) return;
    try {
      await fetch("/api/room/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: c, question_id: null, open: false }),
      });
    } catch {
      /* nothing to do */
    }
  }, []);

  /** End the room and pull the final table standings. */
  const finish = useCallback(async () => {
    const c = codeRef.current;
    if (!c) return null;
    try {
      await fetch("/api/room/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: c, question_id: null, open: false, status: "finished" }),
      });
      const r = await fetch(`/api/room/standings?code=${encodeURIComponent(c)}`, {
        cache: "no-store",
      });
      if (r.ok) {
        const json = await r.json();
        setStandings(json.standings ?? []);
        return json.standings as Standing[];
      }
    } catch {
      /* nothing to do */
    }
    return null;
  }, []);

  return {
    code,
    state,
    standings,
    creating,
    create,
    openQuestion,
    closeQuestion,
    finish,
  };
}

/* ------------------------------------------------------------------ */
/* RoomSetup                                                           */
/* ------------------------------------------------------------------ */

export function RoomSetup({
  onCreate,
  creating,
  code,
}: {
  onCreate: (name: string, tables: number, answerMode: "table" | "individual") => void;
  creating: boolean;
  code: string | null;
}) {
  const [name, setName] = useState("");
  const [tables, setTables] = useState(4);
  const [answerMode, setAnswerMode] = useState<"table" | "individual">("table");

  if (code) {
    return (
      <div className="pp-room-live">
        <p className="pp-room-label">Room code</p>
        <p className="pp-room-code">{code}</p>
        <p className="pp-room-note">
          Everyone goes to <strong>poshpork.com/join</strong> and enters this.
        </p>
      </div>
    );
  }

  return (
    <div className="pp-room-setup">
      <p className="pp-room-label">Everyone on their own phone</p>

      <input
        className="pp-room-input"
        placeholder="Name this room (optional)"
        maxLength={120}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="pp-room-tables">
        Tables of four
        <input
          type="number"
          min={1}
          max={20}
          value={tables}
          onChange={(e) => setTables(Math.min(Math.max(Number(e.target.value) || 1, 1), 20))}
        />
      </label>

      <div className="pp-room-modes">
        <button
          className={answerMode === "table" ? "is-on" : ""}
          onClick={() => setAnswerMode("table")}
        >
          One answer per table
        </button>
        <button
          className={answerMode === "individual" ? "is-on" : ""}
          onClick={() => setAnswerMode("individual")}
        >
          Everyone answers
        </button>
      </div>

      <p className="pp-room-modenote">
        {answerMode === "table"
          ? "Tables talk it through and agree. Anyone can put the answer in, and change it. The closing verdict on each suspect is always individual."
          : "Every person answers every question on their own phone."}
      </p>

      <button
        className="pp-room-btn"
        disabled={creating}
        onClick={() => onCreate(name, tables, answerMode)}
      >
        {creating ? "Opening…" : "Open a room"}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* RoomBanner                                                          */
/* ------------------------------------------------------------------ */

export function RoomBanner({
  code,
  state,
  options,
}: {
  code: string;
  state: RoomState;
  options?: string[];
}) {
  const expected = state.expected || state.players;
  const pct = expected > 0 ? Math.round((state.answered / expected) * 100) : 0;
  const unit = state.tableMode ? "tables" : "people";

  return (
    <div className="pp-room-banner">
      <div className="pp-room-banner-top">
        <span className="pp-room-banner-code">{code}</span>
        <span className="pp-room-banner-count">
          {state.answered} of {expected} {unit}
        </span>
      </div>

      <div className="pp-room-banner-track">
        <div className="pp-room-banner-fill" style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>

      {options && options.length > 0 && state.answered > 0 && (
        <div className="pp-room-banner-split">
          {options.map((o) => (
            <span key={o}>
              {o} <strong>{state.tally[o] ?? 0}</strong>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* RoomStandings — the closing screen                                  */
/* ------------------------------------------------------------------ */

export function RoomStandings({
  standings,
  onDone,
}: {
  standings: Standing[];
  onDone: () => void;
}) {
  const top = standings[0]?.score ?? 0;
  const anyScore = standings.some((s) => s.score > 0);

  return (
    <div className="pp-standings">
      <p className="pp-eyebrow">The court rises</p>
      <h2 className="pp-title pp-title-lg">How the tables did</h2>

      {!anyScore && (
        <p className="pp-lede">
          No scored questions were answered — but the verdicts are all in.
        </p>
      )}

      <ol className="pp-stand-list">
        {standings.map((s, i) => {
          const width = top > 0 ? (s.score / top) * 100 : 0;
          return (
            <li key={s.table_id} className={`pp-stand ${i === 0 && anyScore ? "is-top" : ""}`}>
              <span className="pp-stand-rank">{i + 1}</span>
              <span className="pp-stand-dot" style={{ background: s.colour ?? "#d4af37" }} />
              <span className="pp-stand-body">
                <span className="pp-stand-name">
                  {s.table_name}
                  <span className="pp-stand-players">
                    {s.players} {s.players === 1 ? "player" : "players"}
                  </span>
                </span>
                <span className="pp-stand-track">
                  <span
                    className="pp-stand-fill"
                    style={{ width: `${width}%`, background: s.colour ?? "#d4af37" }}
                  />
                </span>
              </span>
              <span className="pp-stand-score">{s.score}</span>
            </li>
          );
        })}
      </ol>

      <button className="pp-deliver" onClick={onDone}>
        Close the room
      </button>
    </div>
  );
}

export const ROOM_CSS = `
.pp-room-setup { margin-top: 22px; padding-top: 20px; border-top: 1px solid rgba(212,175,55,.2); }
.pp-room-label { font-size: 11px; letter-spacing: .22em; text-transform: uppercase; color: #d4af37; opacity: .7; margin: 0 0 12px; }
.pp-room-input { width: 100%; padding: 12px 14px; margin-bottom: 10px; font: inherit; font-size: 15px; background: #000; color: #f2ece1; border: 1px solid rgba(212,175,55,.35); border-radius: 5px; }
.pp-room-input:focus { outline: none; border-color: #d4af37; }
.pp-room-tables { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 14px; opacity: .75; margin-bottom: 12px; }
.pp-room-tables input { width: 72px; padding: 8px; font: inherit; text-align: center; background: #000; color: #f2ece1; border: 1px solid rgba(212,175,55,.35); border-radius: 5px; }
.pp-room-modes { display: flex; border: 1px solid rgba(212,175,55,.3); border-radius: 5px; overflow: hidden; margin-bottom: 10px; }
.pp-room-modes button { flex: 1; padding: 10px 8px; font: inherit; font-size: 13px; background: none; border: none; border-right: 1px solid rgba(212,175,55,.2); color: #f2ece1; opacity: .55; cursor: pointer; }
.pp-room-modes button:last-child { border-right: none; }
.pp-room-modes button.is-on { background: rgba(212,175,55,.18); color: #d4af37; opacity: 1; }
.pp-room-modenote { font-size: 12.5px; line-height: 1.55; opacity: .55; margin: 0 0 16px; text-align: left; }
.pp-room-btn { width: 100%; padding: 14px; font-family: Cinzel, serif; font-size: 15px; cursor: pointer; color: #d4af37; background: transparent; border: 1px solid rgba(212,175,55,.5); border-radius: 6px; }
.pp-room-btn:hover:not(:disabled) { background: rgba(212,175,55,.12); }
.pp-room-btn:disabled { opacity: .4; cursor: default; }

.pp-room-live { margin-top: 22px; padding-top: 20px; border-top: 1px solid rgba(212,175,55,.2); }
.pp-room-code { font-family: Cinzel, serif; font-size: clamp(38px, 8vw, 56px); letter-spacing: .22em; color: #d4af37; margin: 0 0 10px; }
.pp-room-note { font-size: 14px; opacity: .7; margin: 0; }
.pp-room-note strong { color: #d4af37; }

.pp-room-banner { margin-top: 24px; padding-top: 18px; border-top: 1px solid rgba(212,175,55,.2); text-align: left; }
.pp-room-banner-top { display: flex; justify-content: space-between; align-items: baseline; font-size: 13px; margin-bottom: 8px; }
.pp-room-banner-code { font-family: Cinzel, serif; letter-spacing: .2em; color: #d4af37; }
.pp-room-banner-count { opacity: .6; font-variant-numeric: tabular-nums; }
.pp-room-banner-track { height: 6px; background: rgba(255,255,255,.1); border-radius: 3px; overflow: hidden; }
.pp-room-banner-fill { height: 100%; background: #d4af37; transition: width .4s ease; }
.pp-room-banner-split { display: flex; gap: 20px; margin-top: 10px; font-size: 13px; opacity: .7; }
.pp-room-banner-split strong { color: #d4af37; font-variant-numeric: tabular-nums; }

.pp-standings { text-align: center; }
.pp-stand-list { list-style: none; margin: 28px 0; padding: 0; text-align: left; }
.pp-stand { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,.08); }
.pp-stand-rank { width: 24px; flex: none; font-family: Cinzel, serif; font-size: 15px; opacity: .4; text-align: center; }
.pp-stand.is-top .pp-stand-rank { opacity: 1; color: #d4af37; }
.pp-stand-dot { width: 10px; height: 10px; border-radius: 50%; flex: none; }
.pp-stand-body { flex: 1; min-width: 0; }
.pp-stand-name { display: flex; align-items: baseline; gap: 10px; font-family: Cinzel, serif; font-size: 16px; margin-bottom: 6px; }
.pp-stand-players { font-family: Georgia, serif; font-size: 12px; opacity: .4; }
.pp-stand-track { display: block; height: 5px; background: rgba(255,255,255,.08); border-radius: 3px; overflow: hidden; }
.pp-stand-fill { display: block; height: 100%; border-radius: 3px; transition: width .8s cubic-bezier(.2,.8,.2,1); }
.pp-stand-score { flex: none; font-family: Cinzel, serif; font-size: 22px; color: #d4af37; font-variant-numeric: tabular-nums; min-width: 40px; text-align: right; }
`;
