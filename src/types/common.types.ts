/**
 * JibonJotno (জীবনযত্ন) — Shared Core TypeScript Definitions
 * উদ্দেশ্য: পুরো প্রজেক্টে ডুপ্লিকেট টাইপ দূর করা এবং স্ট্রং টাইপিং নিশ্চিত করা।
 * এখানে কোনো 'any' টাইপ ব্যবহার করা সম্পূর্ণ নিষিদ্ধ।
 */

// ১. ভাষা সমর্থনের টাইপ (বাংলা ও ইংরেজি)
export type SupportedLocale = "bn" | "en";

// ২. দ্বিভাষিক টেক্সট ফিল্ডের স্ট্যান্ডার্ড ইন্টারফেস
export interface BilingualText {
  readonly en: string;
  readonly bn: string;
}

// ৩. অ্যাডমিন প্যানেলের স্ট্যান্ডার্ড পাবলিকেশন লাইফসাইকেল স্ট্যাটাস
export type PublicationStatus =
  | "DRAFT"
  | "PENDING_REVIEW"
  | "PUBLISHED"
  | "ARCHIVED";

// ৪. মেডিকেল ও ক্লিনিক্যাল তথ্যের ভেরিফিকেশন স্ট্যাটাস
export type MedicalReviewStatus =
  | "UNVERIFIED"
  | "UNDER_REVIEW"
  | "VERIFIED";

// ৫. ওষুধের প্রেসক্রিপশন শ্রেণিবিন্যাস
export type PrescriptionClassification =
  | "OTC"
  | "RX_REQUIRED"
  | "CONTROLLED";

// ৬. সিস্টেমের ৯টি নির্ধারিত ইউজার ও অ্যাডমিন রোল (Section 15 অনুযায়ী)
export type SystemRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "MEDICAL_REVIEWER"
  | "PHARMACIST"
  | "CONTENT_EDITOR"
  | "INVENTORY_MANAGER"
  | "ORDER_MANAGER"
  | "STAFF"
  | "REGULAR_USER";

// ৭. সার্ভার অ্যাকশন এবং এপিআই-এর স্ট্যান্ডার্ড এরর অবজেক্ট
export interface AppErrorDetail {
  readonly code: string;
  readonly message_en: string;
  readonly message_bn: string;
  readonly fieldErrors?: Readonly<Record<string, readonly string[]>>;
}

// ৮. সার্ভার অ্যাকশন এবং /api/v1/* এর জন্য অভিন্ন রেসপন্স টাইপ (Discriminated Union)
export type ActionResult<TData> =
  | {
      readonly success: true;
      readonly data: TData;
    }
  | {
      readonly success: false;
      readonly error: AppErrorDetail;
    };

// ৯. পেজিনেশন মেটাডাটা এবং রেসপন্স টাইপ (ডাটাবেস কুয়েরির জন্য)
export interface PaginationMeta {
  readonly page: number;
  readonly limit: number;
  readonly totalRecords: number;
  readonly totalPages: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}

export interface PaginatedData<TItem> {
  readonly items: readonly TItem[];
  readonly meta: PaginationMeta;
}
