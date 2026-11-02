import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * [CRITICAL SECURITY] অ্যাডমিন অপারেশন এবং ব্যাকএন্ড ট্রানজেকশনের জন্য Supabase Service Role ক্লায়েন্ট।
 * এটি সার্ভার ছাড়া অন্য কোথাও ব্যবহার করা সম্পূর্ণ নিষিদ্ধ (import 'server-only' দিয়ে সুরক্ষিত)।
 */
export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error(
      "CRITICAL: SUPABASE_SERVICE_ROLE_KEY is missing from server environment variables."
    );
  }

  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
