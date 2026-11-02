# JibonJotno (জীবনযত্ন) — Role-Based Access Control (RBAC) Matrix

## 1. Supported System Roles (9 Roles)
1. SUPER_ADMIN — Full platform control, staff role assignments, system settings, and audit log inspection.
2. ADMIN — Full operational control across CMS, directories, pharmacy, and non-super-admin staff management.
3. MEDICAL_REVIEWER — Qualified clinician role authorized to review, verify, and approve clinical medicine data, child dose references, and health education articles/videos.
4. PHARMACIST — Authorized to manage medicine reference data, review/approve/reject patient prescriptions, and oversee pharmacy SKUs.
5. CONTENT_EDITOR — Creates and edits drafts across medicines, directories, articles, videos, banners, and FAQs.
6. INVENTORY_MANAGER — Manages pharmacy SKU stock levels, batch numbers, expiry dates, and low-stock alerts.
7. ORDER_MANAGER — Manages customer orders, delivery status transitions, delivery zones, and cancellation/refund records.
8. STAFF — Handles appointment scheduling requests, chamber updates, and customer support inquiries.
9. REGULAR_USER — Authenticated patient/customer accessing their own profile, addresses, prescriptions, orders, and appointments.

## 2. Granular Server Permission Keys
| Permission Key | Super Admin | Admin | Medical Reviewer | Pharmacist | Content Editor | Inventory Mgr | Order Mgr | Staff | Regular User |
|---|---|---|---|---|---|---|---|---|---|
| admin.panel.access | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | No |
| medicines.write_draft | Yes | Yes | Yes | Yes | Yes | No | No | No | No |
| medicines.verify_clinical | Yes | No | Yes | Yes | No | No | No | No | No |
| medicines.publish | Yes | Yes | Yes | Yes | No | No | No | No | No |
| directories.write_draft | Yes | Yes | No | No | Yes | No | No | Yes | No |
| directories.publish | Yes | Yes | No | No | No | No | No | No | No |
| content.verify_medical | Yes | No | Yes | No | No | No | No | No | No |
| content.publish | Yes | Yes | Yes | No | No | No | No | No | No |
| inventory.manage | Yes | Yes | No | Yes | No | Yes | No | No | No |
| prescriptions.verify | Yes | Yes | No | Yes | No | No | No | No | No |
| orders.manage | Yes | Yes | No | No | No | No | Yes | View | Own Only |
| appointments.manage | Yes | Yes | No | No | No | No | No | Yes | Own Only |
| users.manage_roles | Yes | Staff Only | No | No | No | No | No | No | No |
| audit_logs.read | Yes | Yes | No | No | No | No | No | No | No |
