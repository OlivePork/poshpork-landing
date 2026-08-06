import { createClient } from "@supabase/supabase-js";

/**
 * SERVICE ROLE client — bypasses Row Level Security completely.
 * Server-side only. Never prefix this key with NEXT_PUBLIC_.
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } },
);