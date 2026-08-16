"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* useRoomHost — creates a room and pushes questions to the phones      */
/* ------------------------------------------------------------------ */

export type RoomState = {
  players: number;
  answered: number;
  tally: Record<string, number>;
};

export function useRoomHost(lang: string) {
  const [code, setCode] = useState<string | null>(null);
  const [state, setState] = useState<RoomState>({ players: 0, answered: 0, tally: {} });
  const [creating, setCreating] = useState(false);
  const codeRef = useRef<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => void (codeRef.current = code), [code]);

  const create = useCallback(
    async (name: string, tables: number) => {
      setCreating(true);
      try {
        const r = await fetch("/api/room/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, tables, lang }),
        });
        const json = await r.json();
        if (r.ok && json.code) {
          setCode(json.code);
          codeRef.current = json.code;
          window.localStorage.setItem("poshpork.hostCode", json.code);
        }
      } catch {
        /* the host can try again */
      }
      setCreating(false);
    },
    [lang],
  );

  // Poll for the live count while a room is running.
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
          tally: json.tally ?? {},
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

  /** Push a question to every phone in the room. */
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

  /** Close it again — phones return to the waiting screen. */
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

  const finish = useCallback(async () => {
    const c = codeRef.current;
    if (!c) return;
    try {
      await fetch("/api/room/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: c, question_id: null, open: false, status: "finished" }),
      });
    } catch {
      /* nothing to do */
    }
  }, []);

  return { code, state, creating, create, openQuestion, closeQuestion, finish };
}

/* ------------------------------------------------------------------ */
/* RoomSetup — shown alongside the mode chooser                         */
/* ------------------------------------------------------------------ */

export function RoomSetup({
  onCreate,
  creating,
  code,
}: {
  onCreate: (name: string, tables: number) => void;
  creating: boolean;
  code: string | null;
}) {
  const [name, setName] = useState("");
  const [tables, setTables] = useState(4);

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
        Tables
        <input
          type="number"
          min={1}
          max={20}
          value={tables}
          onChange={(e) => setTables(Math.min(Math.max(Number(e.target.value) || 1, 1), 20))}
        />
      </label>

      <button
        className="pp-room-btn"
        disabled={creating}
        onClick={() => onCreate(name, tables)}
      >
        {creating ? "Opening…" : "Open a room"}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* RoomBanner — the live count while a question is on screen            */
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
  const pct = state.players > 0 ? Math.round((state.answered / state.players) * 100) : 0;

  return (
    <div className="pp-room-banner">
      <div className="pp-room-banner-top">
        <span className="pp-room-banner-code">{code}</span>
        <span className="pp-room-banner-count">
          {state.answered} of {state.players} answered
        </span>
      </div>

      <div className="pp-room-banner-track">
        <div className="pp-room-banner-fill" style={{ width: `${pct}%` }} />
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

export const ROOM_CSS = `
.pp-room-setup { margin-top: 22px; padding-top: 20px; border-top: 1px solid rgba(212,175,55,.2); }
.pp-room-label { font-size: 11px; letter-spacing: .22em; text-transform: uppercase; color: #d4af37; opacity: .7; margin: 0 0 12px; }
.pp-room-input { width: 100%; padding: 12px 14px; margin-bottom: 10px; font: inherit; font-size: 15px; background: #000; color: #f2ece1; border: 1px solid rgba(212,175,55,.35); border-radius: 5px; }
.pp-room-input:focus { outline: none; border-color: #d4af37; }
.pp-room-tables { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 14px; opacity: .75; margin-bottom: 14px; }
.pp-room-tables input { width: 72px; padding: 8px; font: inherit; text-align: center; background: #000; color: #f2ece1; border: 1px solid rgba(212,175,55,.35); border-radius: 5px; }
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
`;