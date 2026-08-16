"use client";

import { useState } from "react";

const COUNTRIES = [
  "Ireland", "United Kingdom", "Spain", "France", "Germany", "Italy",
  "Netherlands", "Belgium", "Portugal", "Poland", "Sweden", "Denmark",
  "Norway", "Finland", "Austria", "Switzerland", "United States", "Canada",
  "Australia", "New Zealand", "Other",
];

export default function SupportList() {
  const [supermarket, setSupermarket] = useState("");
  const [country, setCountry] = useState("");
  const [busy, setBusy] = useState(false);

  const ready = Boolean(supermarket.trim() && country);

  const go = async () => {
    if (!ready) return;
    setBusy(true);
    try {
      const res = await fetch("/api/checkout-support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ supermarket, country }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
      else setBusy(false);
    } catch {
      setBusy(false);
    }
  };

  return (
    <section style={{
      maxWidth: "760px",
      margin: "64px auto 0",
      padding: "40px 28px",
      border: "1px solid rgba(212,175,55,.3)",
      borderRadius: "10px",
      background: "rgba(255,255,255,.02)",
      color: "#f2ece1",
    }}>
      <p style={{
        fontFamily: "Cinzel, serif", fontSize: "12px", letterSpacing: ".3em",
        textTransform: "uppercase", color: "#d4af37", margin: "0 0 16px",
      }}>
        Put it on the shelf
      </p>

      <h2 style={{
        fontFamily: "Cinzel, serif", fontSize: "clamp(24px,3.4vw,32px)",
        color: "#f2ece1", margin: "0 0 20px", lineHeight: 1.2,
      }}>
        Posh Pork isn&apos;t in a single shop. Not yet.
      </h2>

      <p style={{ fontSize: "16px", lineHeight: 1.7, opacity: .75, margin: "0 0 16px" }}>
        It failed once, for the reason the supermarkets gave plainly: nobody was asking
        for it. This is how that changes.
      </p>

      <p style={{ fontSize: "16px", lineHeight: 1.7, opacity: .75, margin: "0 0 16px" }}>
        Add your name and the shop you actually use. When enough names sit behind one
        chain, that becomes something a buyer has to answer.
      </p>

      <p style={{ fontSize: "16px", lineHeight: 1.7, opacity: .75, margin: "0 0 28px" }}>
        It costs <strong>&euro;1</strong>. Not because a euro is worth having, but because
        a free list means nothing and everyone knows it. A euro is the difference between
        a name and someone who meant it.
      </p>

      <div style={{ display: "grid", gap: "10px", marginBottom: "14px" }}>
        <input
          value={supermarket}
          onChange={(e) => setSupermarket(e.target.value)}
          placeholder="Which supermarket?"
          style={fieldStyle}
        />
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={{ ...fieldStyle, color: country ? "#f2ece1" : "rgba(242,236,225,.4)" }}
        >
          <option value="">Which country?</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c} style={{ color: "#000" }}>{c}</option>
          ))}
        </select>
      </div>

      {/* Say why the button is inactive rather than leaving it faded and unexplained. */}
      {!ready && !busy && (
        <p style={{
          fontSize: "13px",
          letterSpacing: ".1em",
          textTransform: "uppercase",
          opacity: .45,
          margin: "0 0 14px",
        }}>
          {!supermarket.trim() && !country
            ? "Name your shop and country to continue"
            : !supermarket.trim()
              ? "Name your shop to continue"
              : "Choose your country to continue"}
        </p>
      )}

      <button
        onClick={go}
        disabled={busy || !ready}
        style={{
          width: "100%",
          padding: "16px",
          cursor: busy || !ready ? "not-allowed" : "pointer",
          fontFamily: "Cinzel, serif",
          fontSize: "17px",
          fontWeight: "bold",
          background: ready
            ? "linear-gradient(135deg,#a67c00,#d4af37 50%,#a67c00)"
            : "transparent",
          color: ready ? "#141414" : "rgba(242,236,225,.4)",
          border: ready ? "none" : "1px solid rgba(212,175,55,.3)",
          borderRadius: "6px",
          opacity: busy ? .5 : 1,
          transition: "background .2s ease, color .2s ease",
        }}
      >
        {busy ? "Opening..." : "Add my name for \u20AC1"}
      </button>

      <p style={{ fontSize: "13px", lineHeight: 1.6, opacity: .5, margin: "18px 0 0" }}>
        This is a show of hands, not a pre-order. It buys you nothing and promises
        nothing. You&apos;ll hear from us when milestones are reached, and not otherwise.
      </p>
    </section>
  );
}

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  fontSize: "16px",
  background: "#000",
  color: "#f2ece1",
  border: "1px solid rgba(212,175,55,.35)",
  borderRadius: "6px",
};