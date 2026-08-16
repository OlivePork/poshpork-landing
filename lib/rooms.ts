import { createClient } from "@supabase/supabase-js";

/** Service-role client. Rooms have no public policies — every read and
 *  write passes through an API route holding this key. */
export function roomAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}

/** Six characters, no vowels (so no accidental words) and no 0/O/1/I. */
const ALPHABET = "BCDFGHJKLMNPQRSTVWXYZ23456789";

export function makeCode(length = 6) {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return out;
}

export const TABLE_COLOURS = [
  "#d4af37", "#c05050", "#7fa87f", "#6a8fb5",
  "#c98b5e", "#9b7fb5", "#5eb0a8", "#b5a15e",
];

export function normaliseCode(raw: unknown) {
  return String(raw ?? "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}
