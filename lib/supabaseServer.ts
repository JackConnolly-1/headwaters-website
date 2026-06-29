import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client (uses the secret service-role key).
// Never import this into a client component.
export function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase server environment variables are missing");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

export const BUCKET = "applications";
