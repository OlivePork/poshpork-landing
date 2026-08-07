import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function SiteHeader() {
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

  // Signed in and paid → send them back to the film.
  // Signed in, not paid → send them to buy.
  // Not signed in → sign in.
  const href = owned ? "/watch" : user ? "/movie" : "/login";
  const label = owned ? "Watch the film" : user ? "Get the film" : "Sign in";

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 24px",
      background: "rgba(10,10,10,.86)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid rgba(212,175,55,.2)",
    }}>
      <a href="/" style={{
        fontFamily: "Cinzel, serif",
        fontSize: "15px",
        letterSpacing: "0.14em",
        color: "#d4af37",
        textDecoration: "none",
      }}>
        POSH PORK
      </a>

      <a href={href} style={{
        fontFamily: "Cinzel, serif",
        fontSize: "13px",
        letterSpacing: "0.08em",
        padding: "9px 20px",
        borderRadius: "4px",
        textDecoration: "none",
        color: owned ? "#0a0a0a" : "#d4af37",
        background: owned
          ? "linear-gradient(135deg,#a67c00,#d4af37 50%,#a67c00)"
          : "transparent",
        border: owned ? "none" : "1px solid rgba(212,175,55,.5)",
      }}>
        {label}
      </a>
    </header>
  );
}