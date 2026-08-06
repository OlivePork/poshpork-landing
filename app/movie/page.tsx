import { createClient } from "@/lib/supabase/server";
import BuyButton from "@/components/BuyButton";

export const dynamic = "force-dynamic";

export default async function MoviePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let owned = false;
  if (user) {
    const { data } = await supabase
      .from("purchases")
      .select("id")
      .eq("user_id", user.id)
      .eq("product", "movie")
      .maybeSingle();
    owned = !!data;
  }

  return (
    <main style={{ background: "#1a1a1a", minHeight: "100vh", padding: "120px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <p style={{ fontFamily: "Cinzel, serif", fontSize: "13px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#d4af37", marginBottom: "24px" }}>
          Watch at home
        </p>

        <h1 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(32px, 5vw, 46px)", lineHeight: 1.15, color: "#d4af37", marginBottom: "20px" }}>
          Which Food Is Killing You?
        </h1>

        <p style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(15px, 2vw, 19px)", color: "#f2ece1", opacity: 0.75, letterSpacing: "0.05em", marginBottom: "36px" }}>
          Inside the Greatest Fraud In Human History
        </p>

        <p style={{ fontSize: "18px", lineHeight: 1.7, color: "#b0b0b0", marginBottom: "48px" }}>
          Sit on the jury. The evidence is laid out, the witnesses contradict each other,
          and at the end you deliver a verdict — counted alongside everyone else who has watched.
        </p>

        {owned ? (
          <a href="/watch" style={{
            display: "inline-block", padding: "20px 48px", fontFamily: "Cinzel, serif",
            fontSize: "20px", fontWeight: "bold", color: "#0a0a0a",
            background: "linear-gradient(135deg, #a67c00 0%, #d4af37 50%, #a67c00 100%)",
            borderRadius: "8px", textDecoration: "none",
          }}>
            Watch now
          </a>
        ) : (
          <BuyButton />
        )}

        <p style={{ fontSize: "15px", color: "#888888", marginTop: "32px", lineHeight: 1.6 }}>
          1 hour 26 minutes. One payment, permanent access.<br />
          Watch on your own, or put it on the big screen for a group.
        </p>

        {!owned && (
          <p style={{ fontSize: "14px", color: "#777777", marginTop: "40px" }}>
            Already bought it? <a href="/login" style={{ color: "#d4af37" }}>Sign in.</a>
          </p>
        )}
      </div>
    </main>
  );
}