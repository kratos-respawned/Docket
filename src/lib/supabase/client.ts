import { Database } from "@/typings/supabase";
import { createBrowserClient } from "@supabase/ssr";
import { useMemo } from "react";

export const getSupabaseBrowserClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

export function useSupabaseClient() {
  return useMemo(getSupabaseBrowserClient, []);
}
