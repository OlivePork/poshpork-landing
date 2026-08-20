"use client";

import { useState } from "react";

export default function VenueBuy({
  slug,
  priceEuros,
  seatsPerTable,
}: {
  slug: string;
  priceEuros: number;
  seatsPerTable: number;
}) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const total = adults * priceEuros;

  const go = async () => {
    if (adults < 1) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/checkout-venue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, adults, children }),
      });
      const json = await res.json();
      if (json.url) window.location.href = json.url;
      else {
        setError("Something went wrong. Ask at the bar and we'll sort it out.");
        setBusy(false);
      }
    } catch {
      setError("Something went wrong. Ask at the bar and we'll sort it out.");
      setBusy(false);
    }
  };

  return (
    <div style={{
      border: "1px solid rgba(212,175,55,.4)",
      borderRadius: "10px",
      background: "linear-gradient(180deg, rgba(24,24,24,.9), rgba(14,14,14,.9))",
      padding: "24px 20px",
    }}>
      <Counter
        label="Adults"
        sub={`€${priceEuros.toFixed(0)} each`}
        value={adults}
        min={1}
        max={20}
        onChange={setAdults}
      />

      <Counter
        label="Under 18s"
        sub="Free"
        value={children}
        min={0}
        max={20}
        onChange={setChildren}
      />

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        borderTop: "1px solid rgba(212,175,55,.25)",
        paddingTop: "18px",
        marginTop: "6px",
      }}>
        <span style={{ fontSize: "13px", letterSpacing: ".16em", textTransform: "uppercase", opacity: .5 }}>
          Total
        </span>
        <span style={{
          fontFamily: "Cinzel, serif",
          fontSize: "34px",
          color: "#d4af37",
          lineHeight: 1,
        }}>
          &euro;{total.toFixed(0)}
        </span>
      </div>

      <button
        onClick={go}
        disabled={busy || adults < 1}
        style={{
          width: "100%",
          marginTop: "18px",
          padding: "19px",
          cursor: busy ? "default" : "pointer",
          fontFamily: "Cinzel, serif",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#0a0a0a",
          background: "linear-gradient(135deg,#a67c00,#d4af37 50%,#a67c00)",
          border: "none",
          borderRadius: "8px",
          opacity: busy ? .5 : 1,
        }}
      >
        {busy ? "Opening..." : "Take our seats"}
      </button>

      {adults + children > seatsPerTable && (
        <p style={{ margin: "14px 0 0", fontSize: "13px", lineHeight: 1.5, opacity: .6 }}>
          That is more than one table seats. You will be able to split across two tables
          in the next step.
        </p>
      )}

      {error && (
        <p style={{ margin: "14px 0 0", fontSize: "14px", color: "#e0a0a0" }}>{error}</p>
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
      padding: "14px 0",
    }}>
      <div style={{ textAlign: "left" }}>
        <p style={{ fontFamily: "Cinzel, serif", fontSize: "17px", margin: "0 0 3px" }}>{label}</p>
        <p style={{ fontSize: "13px", opacity: .5, margin: 0 }}>{sub}</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Fewer ${label}`}
          style={stepBtn(value <= min)}
        >
          &minus;
        </button>
        <span style={{
          fontFamily: "Cinzel, serif",
          fontSize: "24px",
          minWidth: "28px",
          textAlign: "center",
          fontVariantNumeric: "tabular-nums",
        }}>
          {value}
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`More ${label}`}
          style={stepBtn(value >= max)}
        >
          +
        </button>
      </div>
    </div>
  );
}

const stepBtn = (disabled: boolean): React.CSSProperties => ({
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  border: "1px solid rgba(212,175,55,.45)",
  background: "transparent",
  color: "#d4af37",
  fontSize: "22px",
  lineHeight: 1,
  cursor: disabled ? "default" : "pointer",
  opacity: disabled ? .25 : 1,
});
