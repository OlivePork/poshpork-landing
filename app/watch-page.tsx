import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import InteractivePlayer from "@/components/InteractivePlayer";
import SupportList from "@/components/SupportList";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export const dynamic = "force-dynamic";

type Film = {
  lang: string;
  label: string;
  vimeo_id: string;
  title: string;
};

export default async function WatchPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const supabase = await createClient();
  const { lang: requested } = await searchParams;

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

  // Which language versions exist and are ready.
  const { data: films } = await supabase
    .from("films")
    .select("lang, label, vimeo_id, title")
    .eq("active", true)
    .order("is_default", { ascending: false })
    .order("label");

  const available: Film[] = films ?? [];

  // Requested language if it exists and is live, otherwise the default.
  const film =
    available.find((f) => f.lang === requested) ?? available[0] ?? null;

  if (!film) {
    // No active film at all — should not happen, but fail visibly rather than
    // rendering an empty player.
    return (
      <main style={{ background: "#0a0a0a", minHeight: "100vh", padding: "80px 20px", textAlign: "center", color: "#e8e2d5" }}>
        <p style={{ fontFamily: "Cinzel, serif", color: "#d4af37" }}>
          The film is temporarily unavailable. Please write to colin@poshpork.com.
        </p>
      </main>
    );
  }

  // Timestamps live on `questions` and are shared across every language.
  // Only the text comes from `question_translations`.
  const { data: rows } = await supabase
    .from("questions")
    .select(`
      id,
      order_number,
      timestamp_seconds,
      hold_seconds,
      verdict_group,
      question_translations!inner (
        question_text,
        options,
        lang
      )
    `)
    .eq("active", true)
    .eq("question_translations.lang", film.lang)
    .order("timestamp_seconds", { ascending: true });

  type Row = {
    id: string;
    order_number: number;
    timestamp_seconds: number;
    hold_seconds: number | null;
    verdict_group: string | null;
    question_translations: { question_text: string; options: string[] }[];
  };

  const questions = ((rows ?? []) as Row[]).map((r) => ({
    id: r.id,
    order_number: r.order_number,
    timestamp_seconds: r.timestamp_seconds,
    hold_seconds: r.hold_seconds,
    verdict_group: r.verdict_group,
    question_text: r.question_translations[0]?.question_text ?? "",
    options: r.question_translations[0]?.options ?? [],
  }));

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh", paddingTop: "40px", paddingBottom: "80px" }}>
      {available.length > 1 && (
        <LanguageSwitcher films={available} current={film.lang} />
      )}

      <InteractivePlayer
        videoId={film.vimeo_id}
        questions={questions}
        lang={film.lang}
      />

      <SupportList />
    </main>
  );
}
