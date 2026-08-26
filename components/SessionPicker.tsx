"use client";

import { useEffect, useState } from "react";

type Session = {
  id: string;
  title: string;
  venue_name: string | null;
  venue_town: string | null;
  starts_at: string;
  seats_left: number;
  adult_price_cents: number;
  extra_label: string | null;
  extra_cents: number | null;
};

export default function SessionPicker() {
  const [sessions, setSessions] = useState<Session[] | null>(null);
  const [chosen, setChosen] = useState<Session | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [extras, setExtras] = useState(0);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/sessions/upcoming", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => setSessions(json?.sessions ?? []))
      .catch(() => setSessions([]));
  }, []);

  const book = async () => {
    if (!chosen) return;
    if (!email.includes("@")) {
      setError("We need an email to send your tickets to.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: chosen.id,
          email,
          adults,
          children,
          extras,
        }),
      });
      const json = await r.json();
      if (json.url) window.location.href = json.url;
      else {
        setError(json.error ?? "Something went wrong. Try again.");
        setBusy(false);
      }
    } catch {
      setError("Something went wrong. Try again.");
      setBusy(false);
    }
  };

  if (sessions === null) {
    return <p style={muted}>Loading dates&hellip;</p>;
  }

  if (sessions.length === 0) {
    return (
      <p style={muted}>
        No dates open just now. Write to{" "}
        <a href="mailto:screening@poshpork.com" style={link}>screening@poshpork.com</a>{" "}
        and I&apos;ll tell you when the next ones go up.
      </p>
    );
  }

  const price = (chosen?.adult_price_cents ?? 2000) / 100;
  const extraPrice = (chosen?.extra_cents ?? 700) / 100;
  const total = adults * price + extras * extraPrice;

  return (
    <div>
      <p style={label}>Pick a date</p>

      <div style={{ display: "grid", gap: "8px", marginBottom: "26px" }}>
        {sessions.map((s) => {
          const on = chosen?.id === s.id;
          const gone = s.seats_left <= 0;
          const d = new Date(s.starts_at);

          return (
            <button
              key={s.id}
              disabled={gone}
              onClick={() => {
                setChosen(s);
                setExtras(0);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                width: "100%",
                padding: "15px 18px",
                textAlign: "left",
                cursor: gone ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                fontSize: "16px",
                color: "#e8e2d5",
                background: on ? "rgba(212,175,55,.14)" : "rgba(255,255,255,.02)",
                border: `1px solid ${on ? "#d4af37" : "rgba(232,226,213,.14)"}`,
                borderRadius: "6px",
                opacity: gone ? 0.35 : 1,
              }}
            >
              <span style={{ flex: 1 }}>
                {d.toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  timeZone: "Europe/Madrid",
                })}
                <span style={{ display: "block", fontSize: "13px", opacity: 0.55, marginTop: "3px" }}>
                  {d.toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Europe/Madrid",
                  })}
                  {s.venue_town ? ` · ${s.venue_town}` : ""}
                </span>
              </span>
              <span style={{
                fontSize: "12px",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                opacity: 0.55,
                whiteSpace: "nowrap",
              }}>
                {gone ? "full" : s.seats_left <= 6 ? `${s.seats_left} left` : ""}
              </span>
            </button>
          );
        })}
      </div>

      {chosen && (
        <div style={{
          border: "1px solid rgba(212,175,55,.35)",
          borderRadius: "8px",
          padding: "22px 20px",
          background: "rgba(212,175,55,.05)",
        }}>
          <Counter label="Adults" sub={`€${price.toFixed(0)} each`} value={adults} min={1} max={Math.max(chosen.seats_left, 1)} onChange={setAdults} />
          <Counter label="Under 18s" sub="Free" value={children} min={0} max={Math.max(chosen.seats_left - adults, 0)} onChange={setChildren} />

          {chosen.extra_cents ? (
            <Counter
              label={chosen.extra_label ?? "Extra"}
              sub={`€${extraPrice.toFixed(0)} a head — optional`}
              value={extras}
              min={0}
              max={adults + children}
              onChange={setExtras}
            />
          ) : null}

          <p style={{ ...label, marginTop: "20px" }}>Your email</p>
          <input
            type="email"
            inputMode="email"
            placeholder="For your tickets and the film"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 16px",
              fontSize: "16px",
              fontFamily: "inherit",
              background: "#000",
              color: "#e8e2d5",
              border: "1px solid rgba(212,175,55,.35)",
              borderRadius: "6px",
            }}
          />

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderTop: "1px solid rgba(212,175,55,.25)",
            paddingTop: "18px",
            marginTop: "22px",
          }}>
            <span style={{ fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", opacity: .5 }}>
              Total
            </span>
            <span style={{ fontFamily: "Cinzel, serif", fontSize: "32px", color: "#d4af37", lineHeight: 1 }}>
              &euro;{total.toFixed(0)}
            </span>
          </div>

          <button
            onClick={book}
            disabled={busy}
            style={{
              width: "100%",
              marginTop: "18px",
              padding: "18px",
              cursor: busy ? "default" : "pointer",
              fontFamily: "Cinzel, serif",
              fontSize: "17px",
              fontWeight: "bold",
              color: "#0a0a0a",
              background: "linear-gradient(135deg,#a67c00,#d4af37 50%,#a67c00)",
              border: "none",
              borderRadius: "8px",
              opacity: busy ? .5 : 1,
            }}
          >
            {busy ? "Opening…" : "Book these places"}
          </button>

          {error && <p style={{ margin: "14px 0 0", fontSize: "14px", color: "#e0a0a0" }}>{error}</p>}
        </div>
      )}
    </div>
  );
}

function Counter({
  label, sub, value, min, max, onChange,
}: {
  label: string; sub: string; value: number; min: number; max: number;
  onChange: (n: number) => void;
}) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "16px",
      padding: "12px 0",
    }}>
      <div>
        <p style={{ fontFamily: "Cinzel, serif", fontSize: "16px", margin: "0 0 3px" }}>{label}</p>
        <p style={{ fontSize: "13px", opacity: .5, margin: 0 }}>{sub}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <button onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}
          aria-label={`Fewer ${label}`} style={step(value <= min)}>&minus;</button>
        <span style={{
          fontFamily: "Cinzel, serif",
          fontSize: "22px",
          minWidth: "26px",
          textAlign: "center",
          fontVariantNumeric: "tabular-nums",
        }}>{value}</span>
        <button onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}
          aria-label={`More ${label}`} style={step(value >= max)}>+</button>
      </div>
    </div>
  );
}

const step = (disabled: boolean): React.CSSProperties => ({
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  border: "1px solid rgba(212,175,55,.45)",
  background: "transparent",
  color: "#d4af37",
  fontSize: "20px",
  lineHeight: 1,
  cursor: disabled ? "default" : "pointer",
  opacity: disabled ? .25 : 1,
});

const label: React.CSSProperties = {
  fontSize: "11px",
  letterSpacing: ".2em",
  textTransform: "uppercase",
  opacity: .5,
  margin: "0 0 10px",
};

const muted: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: 1.7,
  opacity: .7,
  margin: 0,
};

const link: React.CSSProperties = {
  color: "#d4af37",
  textDecoration: "underline",
};
