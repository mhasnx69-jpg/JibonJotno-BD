# JibonJotno (জীবনযত্ন) — System Architecture & Engineering Standards
<!-- এই ডকুমেন্টটি ওয়েব এবং ভবিষ্যৎ মোবাইল অ্যাপের জন্য আমাদের রিফ্যাক্টরড মডুলার মনোলিথ আর্কিটেকচার সংজ্ঞায়িত করে -->

## 1. High-Level Modular Monolith Architecture
JibonJotno follows a strict 4-layer separation inside a single deployable repository so that UI components never contain raw database queries or duplicated validation logic:

1. **Presentation Layer (`src/app/*`, `src/components/*`):**
   - Server Components by default for fast initial page load and SEO.
   - Client Components strictly isolated to interactive widgets (search inputs, quantity selectors, modals, image uploaders).
2. **Boundary & Transport Layer (`src/app/api/v1/*`, `src/modules/*/*.actions.ts`):**
   - Parses incoming payloads with Zod schemas.
   - Verifies authentication and role permissions via centralized server guards.
   - Exposes JSON REST endpoints (`/api/v1/*`) for the future mobile app alongside Server Actions for the web app.
3. **Domain Service Layer (`src/modules/*/*.service.ts`):**
   - Contains 100% of business logic, query builders, pagination math, and cache revalidation triggers.
   - Reused across Admin Panel, Public Website, and Mobile API.
4. **Data & Storage Layer (`supabase/migrations/*`):**
   - Normalized PostgreSQL schema covering all 46 healthcare and commerce data types.
   - Row Level Security (RLS) on every table.
   - Atomic PL/pgSQL RPC functions for concurrency-safe inventory and order creation.

## 2. Strict TypeScript & Code Quality Guardrails
- **Zero `any` Policy:** All functions, props, API responses, and database rows must use explicit TypeScript types or Zod-inferred types (`z.infer<typeof Schema>`).
- **Standardized Action Response Contract:** Every Server Action and API route returns a predictable discriminated union:
  `type ActionResult<T> = { success: true; data: T } | { success: false; error: { code: string; message_en: string; message_bn: string; fieldErrors?: Record<string, string[]> } }`
- **No `SELECT *` Queries:** All Supabase queries must specify explicit column lists and pagination limits.

## 3. Performance & Caching Strategy
- **Public Content:** Served via Server Components with tagged caching (`unstable_cache` / `revalidateTag`).
- **Admin Updates:** Whenever an admin publishes, edits, or archives a record, the corresponding cache tag (e.g., `medicines`, `doctors`, `homepage`) is immediately invalidated so the public website reflects changes instantaneously.

## 4. Edge-Case & Reliability Safeguards
- **Idempotent Mutations:** Order placement and appointment requests require a client-generated UUID `idempotency_key` enforced by a database unique constraint to prevent duplicate records on double-clicks or unstable mobile networks.
- **Safe Media & Embeds:** YouTube URLs are parsed server-side into strict 11-character video IDs; raw HTML or arbitrary iframe strings are rejected.
- **Clinical Safety Disclaimers:** Unverified medicine fields display an explicit unverified badge, and all educational/dose reference pages render non-dismissible clinical disclaimers in Bangla and English.
