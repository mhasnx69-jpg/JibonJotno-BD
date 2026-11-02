# JibonJotno (জীবনযত্ন) — Testing & Quality Assurance Guide

## 1. Feature Definition of Done (DoD)
No feature is marked complete until all 10 criteria are verified:
1. UI renders cleanly in Bangla and English without horizontal overflow (320px to 1920px).
2. Server-side Zod validation rejects invalid payloads with clear bilingual error messages.
3. Data persists accurately in Supabase PostgreSQL.
4. Data is retrieved using indexed, explicit-column queries.
5. Publication status (DRAFT -> PUBLISHED -> ARCHIVED) controls public visibility immediately.
6. Server-side RBAC permissions block unauthorized roles.
7. Sensitive mutations record an entry in admin_audit_logs.
8. Loading skeletons, empty states, and error boundaries work gracefully.
9. Edge cases (double-click submission, out-of-stock concurrency, invalid YouTube URLs) are handled safely.
10. Documentation (PROJECT_STATE.md) is updated.

## 2. Automated & Manual Verification Suites
- Static & Type Safety: tsc --noEmit (Strict TypeScript check with zero any).
- Unit Tests: Safe YouTube URL parser, price/pack calculator, Zod schema validators, and permission helpers.
- Integration & E2E Workflows:
  - Admin creates Medicine -> Uploads image -> Adds YouTube URL -> Publishes -> Public Medicine Detail Page renders all 10 required product features -> Admin archives -> Public page hides record.
  - Patient uploads prescription for Rx medicine -> Places COD order -> Pharmacist verifies Rx -> Order status updates.
