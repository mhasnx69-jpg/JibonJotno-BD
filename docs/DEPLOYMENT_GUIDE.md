# JibonJotno (জীবনযত্ন) — Production Deployment & Operations Guide

## 1. Pre-Deployment Readiness Gate
Deployment to production (Phase 8) begins ONLY after Phases 1 through 7 are verified locally:
- npm run typecheck, npm run lint, and npm run build pass with zero errors.
- All 32 Supabase tables have RLS enabled (rowsecurity = true).
- ENABLE_LIVE_PAYMENTS is set to false until explicit merchant and regulatory sign-off.

## 2. Production Supabase Configuration
1. Provision a dedicated Production Supabase project (separate from local/staging).
2. Run all SQL migration files (supabase/migrations/0001_*.sql through 0009_*.sql) in sequential order.
3. Create storage buckets media-public (public) and prescriptions-private (private) and apply storage RLS policies.
4. Enable Daily Automated Backups / Point-in-Time Recovery (PITR) and enforce SSL/TLS on database connections.

## 3. Web Hosting & Environment Variables
Configure the following environment variables on the production host:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY (Server-only secret)
- NEXT_PUBLIC_SITE_URL
- ENABLE_LIVE_PAYMENTS=false

## 4. Post-Deployment Smoke Test Checklist
- Verify HTTPS certificate and canonical domain redirect.
- Log into /admin as SUPER_ADMIN, publish a test record, verify immediate visibility on public site, and archive it.
- Verify unauthorized user receives HTTP 403/redirect when accessing /admin.
