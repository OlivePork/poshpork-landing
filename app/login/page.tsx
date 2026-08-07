"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [next, setNext] = useState("/watch");
  const [justPurchased, setJustPurchased] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const param = params.get("next");
    if (param && param.startsWith("/")) setNext(param);
    if (params.get("purchased")) setJustPurchased(true);
  }, []);

  const send = async () => {
    if (!email.trim()) return;
    setStatus("sending");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (error) {
      setStatus("error");
      setMessage("That didn't send. Check the address and try again.");
      return;
    }

    setStatus("sent");
  };

  return (
    <main style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: "40px 20px", background: "#1a1a1a" }}>
      <div style={{
        width: "min(480px, 100%)",
        textAlign: "center",
        color: "#f2ece1",
        border: "1px solid rgba(212,175,55,.4)",
        borderRadius: "8px",
        background: "linear-gradient(180deg, rgba(24,24,24,.96), rgba(14,14,14,.96))",
        padding: "clamp(28px, 5vw, 44px)",
      }}>
        {status === "sent" ? (
          <>
            <p style={{ fontSize: "11px", letterSpacing: ".3em", textTransform: "uppercase", color: "#d4af37", opacity: .75, margin: "0 0 14px" }}>
              Check your inbox
            </p>
            <h1 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(24px,4vw,32px)", color: "#d4af37", margin: "0 0 14px" }}>
              A link is on its way
            </h1>
            <p style={{ fontSize: "15px", lineHeight: 1.6, opacity: .75, margin: "0 0 26px" }}>
              We&apos;ve sent a sign-in link to <strong>{email}</strong>. Open it on the device
              you want to watch on — it signs you in and takes you straight to the film.
            </p>
            <button
              onClick={() => setStatus("idle")}
              style={{ background: "none", border: "none", color: "#d4af37", font: "inherit", fontSize: "13px", cursor: "pointer", textDecoration: "underline" }}
            >
              Use a different address
            </button>
          </>
        ) : (
          <>
            {justPurchased && (
              <p style={{
                background: "rgba(212,175,55,.12)",
                border: "1px solid rgba(212,175,55,.35)",
                borderRadius: "6px",
                padding: "14px 16px",
                fontSize: "14px",
                lineHeight: 1.55,
                margin: "0 0 24px",
                textAlign: "left",
              }}>
                Payment received — thank you. We&apos;ve emailed you a link that takes you
                straight to the film. Check your inbox, or sign in below.
              </p>
            )}

            <p style={{ fontSize: "11px", letterSpacing: ".3em", textTransform: "uppercase", color: "#d4af37", opacity: .75, margin: "0 0 14px" }}>
              Which Food Is Killing You?
            </p>
            <h1 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(24px,4vw,32px)", color: "#d4af37", margin: "0 0 14px" }}>
              Sign in to watch
            </h1>
            <p style={{ fontSize: "15px", lineHeight: 1.6, opacity: .75, margin: "0 0 26px" }}>
              No password. Enter the email you bought with and we&apos;ll send a link that
              signs you in.
            </p>

            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                style={{
                  flex: 1, minWidth: 0, padding: "13px 14px", font: "inherit", fontSize: "15px",
                  background: "#000", color: "#f2ece1",
                  border: "1px solid rgba(212,175,55,.4)", borderRadius: "5px",
                }}
              />
              <button
                onClick={send}
                disabled={status === "sending" || !email.trim()}
                style={{
                  padding: "13px 20px", cursor: "pointer", whiteSpace: "nowrap",
                  fontFamily: "Cinzel, serif", fontSize: "14px",
                  background: "linear-gradient(135deg,#a67c00,#d4af37 50%,#a67c00)",
                  color: "#141414", border: "none", borderRadius: "5px",
                  opacity: status === "sending" || !email.trim() ? .45 : 1,
                }}
              >
                {status === "sending" ? "Sending…" : "Send link"}
              </button>
            </div>

            {status === "error" && (
              <p style={{ margin: "14px 0 0", fontSize: "13px", color: "#e0a0a0" }}>{message}</p>
            )}

            <p style={{ margin: "26px 0 0", fontSize: "13px", opacity: .55 }}>
              Haven&apos;t bought it yet? <a href="/movie" style={{ color: "#d4af37" }}>Start here.</a>
            </p>
          </>
        )}
      </div>
    </main>
  );
}