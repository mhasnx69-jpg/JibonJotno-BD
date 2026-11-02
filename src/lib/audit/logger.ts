import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { SystemRole } from "@/types/common.types";

interface AuditLogPayload {
  readonly actorId: string;
  readonly actorRole: SystemRole;
  readonly actionType: "CREATE" | "UPDATE" | "DELETE" | "PUBLISH" | "ARCHIVE" | "VERIFY_RX";
  readonly entityTable: string;
  readonly entityId?: string;
  readonly previousData?: Record<string, any>;
  readonly newData?: Record<string, any>;
  readonly ipAddress?: string;
}

/**
 * [SECURITY] অ্যাডমিন প্যানেলের যেকোনো মিউটেশন রেকর্ড করার জন্য ইমিউটেবল অডিট লগার।
 * এটি Service Role ক্লায়েন্ট ব্যবহার করে সরাসরি admin_audit_logs টেবিলে রাইট করে।
 */
export async function recordAuditLog(payload: AuditLogPayload): Promise<void> {
  try {
    const supabase = createAdminClient();

    const { error } = await supabase.from("admin_audit_logs").insert({
      actor_id: payload.actorId,
      actor_role: payload.actorRole,
      action_type: payload.actionType,
      entity_table: payload.entityTable,
      entity_id: payload.entityId || null,
      previous_data: payload.previousData || null,
      new_data: payload.newData || null,
      ip_address: payload.ipAddress || null,
    });

    if (error) {
      console.error("Failed to record admin audit log:", error.message);
    }
  } catch (err) {
    console.error("Audit logger exception:", err);
  }
}
