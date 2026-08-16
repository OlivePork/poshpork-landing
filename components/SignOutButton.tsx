"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * Signs the viewer out and returns them to the homepage.
 *
 * Small client component so the header itself can stay a server
 * component — sign-out has to happen in the browser, because that is
 * where the session cookie lives.
 */
export default function SignOutButton({ email }: { email?: string | null }) {
  const [busy, setBusy] = useState(false);

  const signOut = async () => {
    setBusy(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      /* fall through — the reload clears the client either way */
    }
    // Full reload rather than a router push, so every server component
    // re-renders without the session.
    window.location.href = "/";
  };

  return (
    <button
      onClick={signOut}
      disabled={busy}
      title={email ? `Signed in as ${email}` : undefined}
      style={{
        fontFamily: "Cinzel, serif",
        fontSize: "11px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#f2ece1",
        opacity: busy ? 0.3 : 0.45,
        background: "none",
        border: "none",
        padding: 0,
        cursor: busy ? "default" : "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {busy ? "Signing out…" : "Sign out"}
    </button>
  );
}
