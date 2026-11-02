# JibonJotno (জীবনযত্ন) — Security & Data Protection Architecture

## 1. Zero-Trust Credential Management
- NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are used with strict Row Level Security (RLS) enabled on 100% of tables.
- SUPABASE_SERVICE_ROLE_KEY is restricted exclusively to server-only modules (import server-only) and is never exposed to client bundles.

## 2. Row Level Security (RLS) Policy Matrix
- Public Content Tables: Anonymous/Public SELECT is permitted ONLY when publication_status = PUBLISHED and archived_at IS NULL.
- Patient Private Tables (orders, prescriptions, appointments, user_addresses, carts): Patients can SELECT/INSERT only rows where auth.uid() = user_id.
- Admin Mutation Policies: Checked via helper function public.has_admin_permission(auth.uid(), required_permission) inside PostgreSQL and verified first in the Next.js Server Action/API layer.

## 3. Prescription & Media Storage Security
- media-public Bucket: Public read for approved product, doctor, hospital, and banner images. Only authenticated staff with media permissions may upload/delete. Allowed MIME types: image/jpeg, image/png, image/webp (Max 2 MB).
- prescriptions-private Bucket: Completely private (public = false). Allowed MIME types: image/jpeg, image/png, image/webp, application/pdf (Max 5 MB). Accessible only via server-generated 15-minute signed URLs after verifying ownership or Pharmacist/Order Manager role.

## 4. Safe YouTube Embed Pipeline
- Admin input for YouTube URLs is validated on the server using a strict parser that extracts the 11-character alphanumeric/dash/underscore video ID.
- Arbitrary HTML, script tags, or iframe strings are rejected by Zod validation.
- Public pages render embeds using https://www.youtube-nocookie.com/embed/{videoId} with strict sandbox attributes.

## 5. E-Commerce & Concurrency Security
- Browser-supplied prices, discounts, and totals are ignored.
- Order totals are calculated inside a PostgreSQL transaction using SELECT ... FOR UPDATE row locking on pharmacy_products to prevent race-condition overselling.
- Prescription-required items (is_rx_required = true) cannot transition to confirmed/dispatched status until a PHARMACIST marks the linked prescription APPROVED.
- Live payment gateways remain disabled (ENABLE_LIVE_PAYMENTS=false) until legal, merchant, and security sign-off.
