# JibonJotno (জীবনযত্ন) — Normalized Database ERD & Schema Specification

## 1. Core Database Design Principles
1. Separation of Medicine Reference vs. Sellable SKU: Informational medicine records (medicines) exist independently of sellable pharmacy products (pharmacy_products).
2. Bilingual First-Class Columns: All public-facing entities include _en and _bn text columns for accurate Bangla and English medical representation.
3. Standard Publication Lifecycle: Public entities include publication_status (DRAFT, PENDING_REVIEW, PUBLISHED, ARCHIVED) and archived_at.
4. Medical Review Metadata: Clinical entities track review_status (UNVERIFIED, UNDER_REVIEW, VERIFIED), reviewed_by, and last_reviewed_at.

## 2. Normalized Table Inventory (32 Tables Covering 46+ Data Types)

### Domain A: Auth, RBAC & Audit
1. profiles — Extends auth.users (id, full_name_en, full_name_bn, phone, avatar_url, is_active, created_at, updated_at).
2. user_roles — Maps users to the 9 system roles.
3. admin_audit_logs — Immutable log of all admin mutations (id, actor_id, actor_role, action_type, entity_table, entity_id, previous_data, new_data, ip_address, created_at).

### Domain B: Medicine Reference & Clinical Knowledge (Data Types 1-20)
4. manufacturers — Pharmaceutical manufacturers (Type 5).
5. medicine_brands — Brand lines linked to manufacturer_id (Type 4).
6. active_ingredients — Chemical active ingredients in EN/BN (Type 3).
7. medicine_generics — Generic records & pregnancy/lactation summary (Types 2, 17).
8. medicine_generic_ingredients — Many-to-many join between generics and active ingredients with strength ratio.
9. medicine_categories — Self-referencing therapeutic and OTC categories (Type 6).
10. dosage_forms — Tablet, Capsule, Syrup, Injection, Suspension, Cream, Drops (Type 7).
11. medicine_strengths — Structured strength values such as 500 mg or 5 mg/5 ml (Type 8).
12. medicines — Core medicine reference entity with brand_id, generic_id, manufacturer_id, category_id, dosage_form_id, strength_id, rx_classification, reference_mrp_bdt (Type 10), youtube_video_id (Type 20), storage_info, review_status, and publication_status (Type 1).
13. medicine_images — Ordered product/reference images in media-public bucket (Type 11).
14. medicine_clinical_sections — Structured clinical tabs (INDICATIONS, DOSAGE_ADMINISTRATION, SIDE_EFFECTS, CONTRAINDICATIONS, PRECAUTIONS_WARNINGS, PREGNANCY_BREASTFEEDING) with per-section review verification (Types 12, 13, 14, 15, 17, 18).
15. medicine_drug_interactions — Severity-graded generic-to-generic drug interactions (Type 16).
16. medicine_faqs — Medicine-specific FAQs (Type 19).
17. related_medicines — Admin-curated related medicine pairings.

### Domain C: Online Pharmacy, Inventory & Orders (Data Type 9 & Commerce)
18. pharmacy_products — Sellable SKUs linked optionally to medicine_id, pack size/unit (Type 9), selling_price_bdt, reference_price_bdt, stock_available, low_stock_threshold, is_rx_required, publication_status.
19. inventory_batches — Batch number, expiry date, and batch stock quantity.
20. delivery_zones — Bangladesh districts/areas with delivery fee and SLA.
21. user_addresses — Saved customer shipping addresses.
22. carts & cart_items — Server-validated active shopping carts.
23. prescriptions — Private storage paths (prescriptions-private), pharmacist verification status (PENDING, APPROVED, REJECTED), reviewer notes.
24. orders, order_items & order_cancellations_refunds — Idempotent orders with immutable price snapshots, CASH_ON_DELIVERY mode, and Rx verification gate.

### Domain D: Healthcare Directories & Appointments (Data Types 21-34)
25. locations_districts & locations_areas — 64 districts and upazilas in EN/BN.
26. healthcare_service_categories & medical_specialties — Specialties and directory categories (Types 22, 34).
27. doctors & doctor_qualifications — BMDC verified doctors, specialties, qualifications, experience, profile images (Types 21, 23).
28. doctor_chambers & chamber_schedules — Chamber locations, consultation fees, and weekly slot capacities (Types 24, 25).
29. appointments — Patient appointment requests and confirmation workflow (REQUESTED, CONFIRMED, RESCHEDULED, CANCELLED, COMPLETED).
30. healthcare_facilities & facility_departments — Hospitals and Diagnostic Centers with departments, coordinates, and contacts (Types 26, 27, 28).
31. lab_tests & facility_lab_tests — Diagnostic test catalog and facility-specific test pricing (Type 29).
32. blood_donors & blood_banks — Consent-protected blood donors and licensed blood banks (Types 30, 31).
33. ambulance_providers & emergency_services — Verified ambulance directories and national emergency hotlines (Types 32, 33).

### Domain E: Health Education, Tools & Site CMS (Data Types 35-46)
34. health_contents — Articles, Health Guides, Symptom Info, and Refill Info with reviewer metadata (Types 35, 36).
35. health_videos — Curated health videos with safe YouTube ID validation (Type 37).
36. health_announcements — Health news and platform announcements (Type 38).
37. pediatric_dose_references — Clinician-reviewed child dose reference tables with mandatory safety disclaimers.
38. homepage_sections & promotional_banners — Dynamic homepage blocks and promotional banners (Types 39, 40).
39. cms_globals (platform_faqs, legal_documents, site_settings_contact, navigation_menus) — FAQs, Medical Disclaimer, Privacy Policy, Terms, Contact Info, Header/Footer menus (Types 41-46).
