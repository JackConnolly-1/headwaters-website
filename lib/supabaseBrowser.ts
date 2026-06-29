import { createClient } from "@supabase/supabase-js";

// Browser Supabase client (uses the public anon key — safe to expose).
// Used only to upload files via short-lived signed upload URLs.
export function getBrowserClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}

export const BUCKET = "applications";
