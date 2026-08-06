"use client";

import { useState } from "react";

export default function BuyButton({ label = "Buy the film — €15" }: { label?: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const buy = async () => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const { url } = await res.json();
      if (url) {
        window.location.href = url;
        return;
      }
      throw new Error("no url");
    } catch {
      setBusy(false);
      setError("Checkout didn't open. Refresh and try again.");
    }
  };

  return (
    <>
      <button
        onClick={buy}
        disabled={busy}
        style={{
          display: "inline-block",
          padding: "20px 48px",
          fontFamily: "Cinzel, serif",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#0a0a0a",
          background: "linear-gradient(135deg, #a67c00 0%, #d4af37 50%, #a67c00 100%)",
          border: "none",
          borderRadius: "8px",
          cursor: busy ? "default" : "pointer",
          boxShadow: "0 8px 24px rgba(212, 175, 55, 0.3)",
          opacity: busy ? 0.6 : 1,
        }}
      >
        {busy ? "Opening checkout…" : label}
      </button>
      {error && <p style={{ marginTop: "14px", fontSize: "14px", color: "#e0a0a0" }}>{error}</p>}
    </>
  );
}