import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { roomAdmin } from "@/lib/rooms";

/**
 * Is the person watching a venue's staff account?
 *
 * GET /api/room/my-venue
 *
 * If they are, the player opens a room for them automatically. Two
 * similar-sounding actions — start the film, open a room — is one too
 * many for somebody running an evening in a hotel, and only one of them
 * matters to the guests standing in the lobby with their phones out.
 */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ venue: null });

  const admin = roomAdmin();

  const { data: venue } = await admin
    .from("venues")
    .select("id, slug, name, seats_per_table, billing_mode, status")
    .eq("host_user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  if (!venue) return NextResponse.json({ venue: null });

  // Already got one open? Hand that back rather than making another.
  const { data: rows } = await admin.rpc("venue_open_room", { v_slug: venue.slug });
  const open = (rows ?? [])[0] as { code: string; room_id: string } | undefined;

  return NextResponse.json({
    venue: {
      slug: venue.slug,
      name: venue.name,
      seats: venue.seats_per_table,
      free: venue.billing_mode === "subscription",
    },
    openRoom: open?.code ?? null,
  });
}