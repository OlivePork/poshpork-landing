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
      .limit(1);
    owned = !!data?.[0];
  }

  // Signed in and paid → back to the film.
  // Signed in, not paid → buy it.
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
      flexWrap: "wrap",
      gap: "10px 20px",
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

      <nav style={{
        display: "flex",
        alignItems: "center",
        gap: "clamp(14px, 3vw, 26px)",
        marginLeft: "auto",
      }}>
        <a href="/about" style={navLink}>THE BACK STORY</a>
        <a href="/press" style={navLink}>PRESS</a>
        <a href="/contact" style={navLink}>CONTACT</a>
      </nav>

      <a href={href} style={{
        fontFamily: "Cinzel, serif",
        fontSize: "13px",
        letterSpacing: "0.08em",
        padding: "9px 20px",
        borderRadius: "4px",
        textDecoration: "none",
        whiteSpace: "nowrap",
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

const navLink: React.CSSProperties = {
  fontFamily: "Cinzel, serif",
  fontSize: "12px",
  letterSpacing: "0.1em",
  color: "#f2ece1",
  opacity: 0.6,
  textDecoration: "none",
  whiteSpace: "nowrap",
};
