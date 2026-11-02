# JibonJotno (জীবনযত্ন) — Shared Service & Mobile-Ready API Architecture

## 1. Dual-Consumer Design (Web + Future Mobile App)
All business logic resides in src/modules/*/*.service.ts. Both Next.js Server Components/Actions and the /api/v1/* REST Route Handlers call the exact same service functions.

## 2. Versioned REST Endpoints (/api/v1/*)
- GET /api/v1/medicines — Paginated, indexed bilingual search (q, category, generic, page, limit).
- GET /api/v1/medicines/[slug] — Complete medicine details, clinical sections, safe YouTube ID, sellable SKU price/stock, and related medicines.
- GET /api/v1/pharmacy/products — Sellable pharmacy catalog with stock status.
- POST /api/v1/cart/validate — Server-side cart validation against live database prices and stock.
- POST /api/v1/orders — Atomic COD order creation with idempotency_key and Rx verification gate.
- POST /api/v1/prescriptions/upload-url — Generates signed upload URL for prescriptions-private bucket.
- GET /api/v1/doctors & POST /api/v1/appointments — Doctor directory search and appointment request creation.
- GET /api/v1/directories/[type] — Hospitals, diagnostics, lab tests, blood donors, blood banks, ambulances, and emergency contacts.
- GET /api/v1/content/[type] — Health articles, guides, videos, FAQs, and legal disclaimers.

## 3. Standardized Response Envelope
Every API endpoint and Server Action returns a strict TypeScript contract:

    {
      "success": true,
      "data": {},
      "meta": {
        "page": 1,
        "limit": 20,
        "total": 145,
        "totalPages": 8
      }
    }

On validation or authorization failure:

    {
      "success": false,
      "error": {
        "code": "INSUFFICIENT_STOCK",
        "message_en": "Requested quantity exceeds available stock.",
        "message_bn": "অনুরোধকৃত পরিমাণ বর্তমান স্টকের চেয়ে বেশি।",
        "fieldErrors": {}
      }
    }
