import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import InteractivePlayer from "@/components/InteractivePlayer";
import SupportList from "@/components/SupportList";

/* The film in three parts. Each part is its own Vimeo video, and each
   question in the database points at the part it belongs to (video_id). */
const PARTS = [
  { n: 1, id: "1241208884", title: "What food is" },
  { n: 2, id: "1241208885", title: "How we got here" },
  { n: 3, id: "1241208887", title: "The trial" },
] as const;

export const dynamic = "force-dynamic";

export default async function WatchPage({
  searchParams,
}: {
  searchParams: Promise<{ part?: string }>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/watch&purchased=1");

  const { data: purchases } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", user.id)
    .eq("product", "movie")
    .limit(1);

  const purchase = purchases?.[0] ?? null;

  if (!purchase) redirect("/movie");

  const params = await searchParams;
  const wanted = Number(params.part);
  const part = PARTS.find((p) => p.n === wanted) ?? PARTS[0];
  const next = PARTS.find((p) => p.n === part.n + 1) ?? null;

  const { data: questions } = await supabase
    .from("questions")
    .select("id, order_number, timestamp_seconds, question_text, options, hold_seconds, verdict_group")
    .eq("video_id", part.id)
    .eq("active", true)
    .order("timestamp_seconds", { ascending: true });

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh", paddingTop: "28px", paddingBottom: "80px" }}>
      {/* Part picker */}
      <nav
        aria-label="Parts of the film"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          padding: "0 16px",
          marginBottom: "22px",
        }}
      >
        {PARTS.map((p) => {
          const on = p.n === part.n;
          return (
            <a
              key={p.n}
              href={`/watch?part=${p.n}`}
              aria-current={on ? "page" : undefined}
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
                minWidth: "150px",
                padding: "10px 18px",
                borderRadius: "8px",
                textDecoration: "none",
                fontFamily: "Cinzel, serif",
                border: `1px solid ${on ? "#d4af37" : "rgba(212,175,55,.35)"}`,
                background: on ? "rgba(212,175,55,.16)" : "transparent",
                color: on ? "#f2ece1" : "#d4af37",
              }}
            >
              <span style={{ fontSize: "15px", fontWeight: "bold" }}>Part {p.n}</span>
              <span style={{ fontSize: "12px", opacity: 0.75, fontFamily: "Georgia, serif" }}>{p.title}</span>
            </a>
          );
        })}
      </nav>

      {/* key forces a fresh player when the part changes */}
      <InteractivePlayer key={part.id} videoId={part.id} questions={questions ?? []} />

      {/* On to the next part */}
      {next && (
        <div style={{ textAlign: "center", padding: "28px 16px 0" }}>
          <a
            href={`/watch?part=${next.n}`}
            style={{
              display: "inline-block",
              padding: "16px 34px",
              borderRadius: "8px",
              textDecoration: "none",
              fontFamily: "Cinzel, serif",
              fontSize: "17px",
              fontWeight: "bold",
              color: "#0a0a0a",
              background: "linear-gradient(135deg,#a67c00,#d4af37 50%,#a67c00)",
            }}
          >
            Watch Part {next.n}: {next.title} →
          </a>
        </div>
      )}

      <SupportList />
    </main>
  );
}