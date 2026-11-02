# JibonJotno (জীবনযত্ন) — Incremental Development Roadmap

## Phase 0 — Planning & Architectural Foundation (Completed)
- System architecture, normalized 32-table ERD for 46+ data types, API contract, RBAC matrix, and security design.

## Phase 1 — Environment, Foundation & Supabase Database Setup
- Step 1: Initialize Next.js (App Router, TypeScript Strict Mode, Tailwind CSS) & Git repository.
- Step 2: Install verified dependencies (@supabase/supabase-js, @supabase/ssr, zod, lucide-react) & configure .env.local / .env.example.
- Step 3: Create and execute Supabase SQL migrations (Core enums, Auth/RBAC, 32 normalized tables, indexes, RLS policies, and RPC functions).
- Step 4: Build shared bilingual (Bangla/English) layout shell, header, footer, initial homepage, and live Supabase connectivity check.

## Phase 2 — Admin Authentication, RBAC & Audit Log Engine
- Supabase Auth login/logout, session middleware, server-side requirePermission guards, and automatic admin_audit_logs recorder.

## Phase 3 — Complete Admin CMS & Database CRUD (35+ Data Types)
- Live Admin Dashboard (real database counts & low-stock alerts).
- Supabase Storage upload manager with preview and validation.
- Medicine & Pharmacy CMS (Medicines, Generics, Ingredients, Brands, Manufacturers, Categories, Dosage Forms, Strengths, Clinical Sections, Safe YouTube URLs, Related Medicines).
- Healthcare Directory CMS (Doctors, Specialties, Qualifications, Chambers, Schedules, Hospitals, Departments, Diagnostics, Lab Tests, Blood Donors/Banks, Ambulances, Emergency Info).
- Health Education & Global CMS (Articles, Guides, Videos, News, Homepage Sections, Banners, FAQs, Legal Pages, Navigation).

## Phase 4 — Public Healthcare Website
- Medicine search, category pages, and complete Medicine Product Details page (with embedded YouTube video, structured strength/dosage form, pack/price, stock badge, Rx badge, quantity selector, and related medicines).
- Public Doctor, Hospital, Diagnostic, Lab Test, Blood Donor, Ambulance, Health Education, and Health Tool pages.

## Phase 5 — User Accounts & Healthcare Workflows
- Patient registration, login, password reset, profile, saved addresses, doctor appointment booking, and appointment history.

## Phase 6 — Online Pharmacy & Order Management
- Cart, private prescription upload & pharmacist approval workflow, concurrency-safe COD checkout, user order tracking, and admin order fulfillment console.

## Phase 7 — Testing & Quality Assurance
- Unit, integration, RBAC security, responsive mobile viewport, accessibility, and production build (npm run build) verification.

## Phase 8 — Production Hosting & Deployment
- Production Supabase setup, domain, HTTPS, environment secrets, backup verification, and smoke tests.

## Phase 9 — Mobile Application (Post-Web Launch)
- Android & iOS mobile app consuming /api/v1/* and Supabase Auth.
