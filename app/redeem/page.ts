"use client";

import { useEffect, useState } from "react";

export default function RedeemPage() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("code");
    if (c) setCode(c.toUpperCase());
  }, []);

  const redeem = async () => {
    if (!code.trim()) return;
    setStatus("working");
    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim().toUpperCase() }),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(json.error || "That code didn't work.");
        return;
      }
      setStatus("done");
      window.location.href = "/watch";
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <main style={{ minHeight: "80vh", display: "grid", placeItems: "center", padding: "60px 20px", background: "#1a1a1a" }}>
      <div style={{
        width: "min(520px, 100%)", textAlign: "center", color: "#f2ece1",
        border: "1px solid rgba(212,175,55,.4)", borderRadius: "8px",
        background: "linear-gradient(180deg, rgba(24,24,24,.96), rgba(14,14,14,.96))",
        padding: "clamp(28px, 5vw, 44px)",
      }}>
        <p style={{ fontSize: "11px", letterSpacing: ".3em", textTransform: "uppercase", color: "#d4af37", opacity: .75, margin: "0 0 14px" }}>
          Someone sent you this
        </p>
        <h1 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(24px,4vw,32px)", color: "#d4af37", margin: "0 0 14px" }}>
          Which Food Is Killing You?
        </h1>
        <p style={{ fontSize: "15px", lineHeight: 1.6, opacity: .75, margin: "0 0 28px" }}>
          Enter your gift code below. You&apos;ll need to sign in with your email so we can
          keep your access — it&apos;s permanent, and there&apos;s no password to remember.
        </p>

        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="POSH-XXXX-XXXX"
          style={{
            width: "100%", padding: "16px", fontSize: "20px", fontFamily: "monospace",
            letterSpacing: "2px", textAlign: "center", background: "#000", color: "#f2ece1",
            border: "1px solid rgba(212,175,55,.4)", borderRadius: "6px", marginBottom: "16px",
          }}
        />

        <button
          onClick={redeem}
          disabled={status === "working" || !code.trim()}
          style={{
            width: "100%", padding: "16px", cursor: "pointer",
            fontFamily: "Cinzel, serif", fontSize: "17px", fontWeight: "bold",
            background: "linear-gradient(135deg,#a67c00,#d4af37 50%,#a67c00)",
            color: "#141414", border: "none", borderRadius: "6px",
            opacity: status === "working" || !code.trim() ? .45 : 1,
          }}
        >
          {status === "working" ? "Checking…" : "Redeem"}
        </button>

        {status === "error" && (
          <p style={{ margin: "16px 0 0", fontSize: "14px", color: "#e0a0a0" }}>{message}</p>
        )}

        <p style={{ margin: "26px 0 0", fontSize: "13px", opacity: .55 }}>
          Not signed in? <a href="/login?next=/redeem" style={{ color: "#d4af37" }}>Sign in first</a>, then come back.
        </p>
      </div>
    </main>
  );
}