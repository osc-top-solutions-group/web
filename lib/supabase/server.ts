import { createClient } from "@supabase/supabase-js";

// Uses service_role key — call only from Route Handlers or Server Actions.
// NEVER import this in client components or files prefixed with "use client".
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!, // service_role — never expose to browser
  );
}
