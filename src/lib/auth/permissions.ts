import "server-only";
import { createClient } from "@/lib/supabase/server";
import { SystemRole } from "@/types/common.types";

/**
 * [SECURITY] নির্দিষ্ট ইউজারের সার্ভার-সাইড রোল ও পারমিশন যাচাই করার ফাংশন।
 * এটি নিশ্চিত করে যে unauthorised কেউ অ্যাডমিন API বা Server Actions কল করতে না পারে।
 */
export async function verifyUserPermission(requiredRole: SystemRole): Promise<boolean> {
  try {
    const supabase = await createClient();
    
    // বর্তমান অথেন্টিকেটেড ইউজারের সেশন ফেচ করা
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return false;
    }

    // ডাটাবেস থেকে ইউজারের রোল চেক করা (SUPER_ADMIN সব অনুমতি পায়)
    const { data: rolesData, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id);

    if (roleError || !rolesData || rolesData.length === 0) {
      return false;
    }

    const hasPermission = rolesData.some(
      (r) => r.role === "SUPER_ADMIN" || r.role === requiredRole
    );

    return hasPermission;
  } catch (err) {
    console.error("Permission verification exception:", err);
    return false;
  }
}
