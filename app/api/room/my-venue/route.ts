import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { roomAdmin } from "@/lib/rooms";

/**
 * Which venues does this account run, and has any of them a room open?
 *
 * GET /api/room/my-venue
 *
 * One person can run several — a winery they manage themselves and a hotel
 * they set up for somebody else. So this returns a list, and the player
 * asks which one tonight is only when there is more than one.
 */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ venues: [] });

  const admin = roomAdmin();

  const { data: rows } = await admin
    .from("venues")
    .select("id, slug, name, town, seats_per_table, billing_mode")
    .eq("host_user_id", user.id)
    .eq("status", "active")
    .order("name");

  const venues = rows ?? [];

  if (venues.length === 0) return NextResponse.json({ venues: [] });

  // Which of them already has a room open, so it is adopted rather than
  // a second one being made alongside it.
  const withRooms = await Promise.all(
    venues.map(async (v) => {
      const { data: open } = await admin.rpc("venue_open_room", { v_slug: v.slug });
      const room = (open ?? [])[0] as { code: string } | undefined;
      return {
        slug: v.slug,
        name: v.name,
        town: v.town,
        seats: v.seats_per_table,
        free: v.billing_mode === "subscription",
        openRoom: room?.code ?? null,
      };
    }),
  );

  return NextResponse.json({ venues: withRooms });
}