import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[CampusConnect] VITE_SUPABASE_URL 또는 VITE_SUPABASE_ANON_KEY 가 없습니다. .env.example 을 참고해 .env 를 만드세요."
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");
