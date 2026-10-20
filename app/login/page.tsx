"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * Sign in with a code, not a link.
 *
 * The email carries a short code instead of a clickable link. Email
 * security scanners (Hotmail/Outlook especially) open links to check them,
 * which used up one-time sign-in links before the customer could click.
 * A code cannot be used up that way, and it works on any device.
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [justPurchased, setJustPurchased] = useState(false);
  const [step, setStep] = useState<"email" | "code">("email");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("purchased")) setJustPurchased(true);
    if (params.get("error") === "link_expired") {
      setMessage("That link has expired or has already been used. Enter your email and we\u2019ll send you a code instead.");
    }
  }, []);

  const sendCode = async () => {
    if (!email.trim() || busy) return;
    setBusy(true);
    setMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        // Only used if someone opens an old-style link; the email now shows a code.
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setBusy(false);

    if (error) {
      const tooSoon = error.status === 429 || /rate|seconds/i.test(error.message);
      setMessage(
        tooSoon
          ? "We\u2019ve just sent you a code. Please wait a minute before asking for another, and check your spam folder."
          : "That didn\u2019t send. Check the address and try again."
      );
      return;
    }

    setCode("");
    setStep("code");
  };

  const verifyCode = async () => {
    const token = code.replace(/\D/g, "");
    if (token.length < 6 || busy) return;
    setBusy(true);
    setMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token,
      type: "email",
    });

    if (error) {
      setBusy(false);
      setMessage("That code didn\u2019t work. Check it against the email, or ask for a new one.");
      return;
    }

    // Full page load so the server sees the new session straight away.
    window.location.href = "/watch";
  };

  const goldButton = (disabled: boolean): React.CSSProperties => ({
    padding: "13px 20px", cursor: disabled ? "default" : "pointer", whiteSpace: "nowrap",
    fontFamily: "Cinzel, serif", fontSize: "14px",
    background: "linear-gradient(135deg,#a67c00,#d4af37 50%,#a67c00)",
    color: "#141414", border: "none", borderRadius: "5px",
    opacity: disabled ? .45 : 1,
  });

  const input: React.CSSProperties = {
    flex: 1, minWidth: 0, padding: "13px 14px", font: "inherit", fontSize: "16px",
    background: "#000", color: "#f2ece1",
    border: "1px solid rgba(212,175,55,.4)", borderRadius: "5px",
  };

  const eyebrow: React.CSSProperties = {
    fontSize: "11px", letterSpacing: ".3em", textTransform: "uppercase",
    color: "#d4af37", opacity: .75, margin: "0 0 14px",
  };

  const title: React.CSSProperties = {
    fontFamily: "Cinzel, serif", fontSize: "clamp(24px,4vw,32px)", color: "#d4af37", margin: "0 0 14px",
  };

  const lead: React.CSSProperties = { fontSize: "15px", lineHeight: 1.6, opacity: .75, margin: "0 0 26px" };

  const linkButton: React.CSSProperties = {
    background: "none", border: "none", color: "#d4af37", font: "inherit",
    fontSize: "13px", cursor: "pointer", textDecoration: "underline", padding: 0,
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
        {step === "code" ? (
          <>
            <p style={eyebrow}>Check your inbox</p>
            <h1 style={title}>Enter your code</h1>
            <p style={lead}>
              We&apos;ve sent a sign-in code to <strong>{email}</strong>. Type it in below.
              It can take a minute to arrive, so check your spam folder too.
            </p>

            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="123456"
                maxLength={10}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && verifyCode()}
                style={{ ...input, letterSpacing: ".3em", textAlign: "center", fontSize: "20px" }}
              />
              <button
                onClick={verifyCode}
                disabled={busy || code.replace(/\D/g, "").length < 6}
                style={goldButton(busy || code.replace(/\D/g, "").length < 6)}
              >
                {busy ? "Checking\u2026" : "Sign in"}
              </button>
            </div>

            {message && (
              <p style={{ margin: "14px 0 0", fontSize: "13px", color: "#e0a0a0" }}>{message}</p>
            )}

            <div style={{ display: "flex", justifyContent: "center", gap: "22px", marginTop: "24px" }}>
              <button onClick={sendCode} disabled={busy} style={linkButton}>
                Send a new code
              </button>
              <button
                onClick={() => { setStep("email"); setMessage(""); setCode(""); }}
                style={linkButton}
              >
                Use a different address
              </button>
            </div>
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
                Payment received, thank you. Enter the email you paid with and we&apos;ll send
                you a code that takes you straight to the film.
              </p>
            )}

            <p style={eyebrow}>Which Food Is Killing You?</p>
            <h1 style={title}>Sign in to watch</h1>
            <p style={lead}>
              No password. Enter the email you bought with and we&apos;ll send you a
              six-digit code.
            </p>

            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendCode()}
                style={input}
              />
              <button
                onClick={sendCode}
                disabled={busy || !email.trim()}
                style={goldButton(busy || !email.trim())}
              >
                {busy ? "Sending\u2026" : "Send code"}
              </button>
            </div>

            {message && (
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