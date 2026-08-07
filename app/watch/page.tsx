import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import InteractivePlayer from "@/components/InteractivePlayer";

const VIDEO_ID = process.env.NEXT_PUBLIC_VIMEO_VIDEO_ID!;

export const dynamic = "force-dynamic";

export default async function WatchPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/watch&purchased=1");

  const { data: purchase } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", user.id)
    .eq("product", "movie")
    .maybeSingle();

  if (!purchase) redirect("/movie");

  const { data: questions } = await supabase
    .from("questions")
    .select("id, order_number, timestamp_seconds, question_text, options, hold_seconds, verdict_group")
    .eq("video_id", VIDEO_ID)
    .eq("active", true)
    .order("timestamp_seconds", { ascending: true });

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh", paddingTop: "40px" }}>
      <InteractivePlayer videoId={VIDEO_ID} questions={questions ?? []} />
    </main>
  );
}