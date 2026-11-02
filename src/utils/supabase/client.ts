import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://ezlcmwobkistnahsfmtl.supabase.co";

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_b_X4N09M0lnZg7usPe4Zeg_o2Wqu8ko";

export const createClient = () => createBrowserClient(supabaseUrl, supabaseKey);