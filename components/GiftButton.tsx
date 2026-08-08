"use client";

import { useState } from "react";

export default function GiftButton({ label = "Gift it to someone — €15" }: { label?: string }) {
  const [busy, setBusy] = useState(false);

  const buy = async () => {
    setBusy(true);
    try {
      const res = await fetch("/api/checkout-gift", { method: "POST" });
      const { url } = await res.json();
      if (url) window.location.href = url;
      else setBusy(false);
    } catch {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={buy}
      disabled={busy}
      style={{
        display: "inline-block", padding: "16px 36px",
        fontFamily: "Cinzel, serif", fontSize: "17px",
        color: "#d4af37", background: "transparent",
        border: "1px solid rgba(212,175,55,.6)", borderRadius: "6px",
        cursor: busy ? "default" : "pointer", opacity: busy ? .6 : 1,
      }}
    >
      {busy ? "Opening…" : label}
    </button>
  );
}