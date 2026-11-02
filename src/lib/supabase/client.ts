import { createBrowserClient } from "@supabase/ssr";

/**
 * ব্রাউজার কম্পোনেন্টের জন্য Supabase ক্লায়েন্ট।
 * এটি শুধুমাত্র পাবলিক Anon Key ব্যবহার করে এবং Row Level Security (RLS) মেনে চলে।
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
