import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * [SECURITY] Next.js মিডলওয়্যার যা প্রতিটি রিকোয়েস্টে Supabase Auth সেশন রিফ্রেশ করে 
 * এবং সুরক্ষিত রুটগুলোতে (যেমন /admin/* এবং /account/*) প্রবেশের অনুমতি যাচাই করে।
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
