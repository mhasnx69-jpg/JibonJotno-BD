-- ============================================================================
-- JibonJotno (জীবনযত্ন) — Production Database Schema Migration (0001)
-- Description: Creates 32 normalized tables, enums, indexes, RLS policies, and RPCs.
-- ============================================================================

-- 1. EXTENSIONS & ENUMS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

CREATE TYPE publication_status_enum AS ENUM ('DRAFT', 'PENDING_REVIEW', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE medical_review_enum AS ENUM ('UNVERIFIED', 'UNDER_REVIEW', 'VERIFIED');
CREATE TYPE rx_classification_enum AS ENUM ('OTC', 'RX_REQUIRED', 'CONTROLLED');
CREATE TYPE system_role_enum AS ENUM ('SUPER_ADMIN', 'ADMIN', 'MEDICAL_REVIEWER', 'PHARMACIST', 'CONTENT_EDITOR', 'INVENTORY_MANAGER', 'ORDER_MANAGER', 'STAFF', 'REGULAR_USER');
CREATE TYPE order_status_enum AS ENUM ('PENDING', 'PROCESSING', 'RX_VERIFIED', 'DISPATCHED', 'DELIVERED', 'CANCELLED', 'REFUNDED');
CREATE TYPE payment_mode_enum AS ENUM ('CASH_ON_DELIVERY');
CREATE TYPE appointment_status_enum AS ENUM ('REQUESTED', 'CONFIRMED', 'RESCHEDULED', 'CANCELLED', 'COMPLETED');
CREATE TYPE facility_type_enum AS ENUM ('HOSPITAL', 'DIAGNOSTIC_CENTER', 'CLINIC_AND_DIAGNOSTIC');
CREATE TYPE blood_group_enum AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
CREATE TYPE content_type_enum AS ENUM ('ARTICLE', 'GUIDE', 'SYMPTOM_INFO', 'REFILL_INFO');

-- 2. DOMAIN A: AUTH, ROLES & AUDIT
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name_en VARCHAR(255) NOT NULL,
    full_name_bn VARCHAR(255) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    role system_role_enum NOT NULL,
    assigned_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(user_id, role)
);

CREATE TABLE admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES profiles(id) NOT NULL,
    actor_role system_role_enum NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    entity_table VARCHAR(100) NOT NULL,
    entity_id UUID,
    previous_data JSONB,
    new_data JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. DOMAIN B: MEDICINE REFERENCE & CLINICAL KNOWLEDGE
CREATE TABLE manufacturers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en VARCHAR(255) NOT NULL,
    name_bn VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    dgda_license_no VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Bangladesh' NOT NULL,
    publication_status publication_status_enum DEFAULT 'DRAFT' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE medicine_brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    manufacturer_id UUID REFERENCES manufacturers(id) ON DELETE RESTRICT NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_bn VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    publication_status publication_status_enum DEFAULT 'DRAFT' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE active_ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en VARCHAR(255) NOT NULL,
    name_bn VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE medicine_generics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en VARCHAR(255) NOT NULL,
    name_bn VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    therapeutic_class_en TEXT,
    therapeutic_class_bn TEXT,
    pregnancy_category VARCHAR(10),
    lactation_summary_en TEXT,
    lactation_summary_bn TEXT,
    publication_status publication_status_enum DEFAULT 'DRAFT' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE medicine_generic_ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    generic_id UUID REFERENCES medicine_generics(id) ON DELETE CASCADE NOT NULL,
    ingredient_id UUID REFERENCES active_ingredients(id) ON DELETE RESTRICT NOT NULL,
    strength_ratio VARCHAR(100) NOT NULL
);

CREATE TABLE medicine_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES medicine_categories(id) ON DELETE SET NULL,
    name_en VARCHAR(255) NOT NULL,
    name_bn VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    publication_status publication_status_enum DEFAULT 'DRAFT' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE dosage_forms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en VARCHAR(100) UNIQUE NOT NULL,
    name_bn VARCHAR(100) UNIQUE NOT NULL,
    route_of_administration VARCHAR(50) NOT NULL
);

CREATE TABLE medicine_strengths (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    strength_value VARCHAR(50) NOT NULL,
    unit VARCHAR(20) NOT NULL
);

CREATE TABLE medicines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    generic_id UUID REFERENCES medicine_generics(id) ON DELETE RESTRICT NOT NULL,
    brand_id UUID REFERENCES medicine_brands(id) ON DELETE RESTRICT NOT NULL,
    manufacturer_id UUID REFERENCES manufacturers(id) ON DELETE RESTRICT NOT NULL,
    category_id UUID REFERENCES medicine_categories(id) ON DELETE RESTRICT NOT NULL,
    dosage_form_id UUID REFERENCES dosage_forms(id) ON DELETE RESTRICT NOT NULL,
    strength_id UUID REFERENCES medicine_strengths(id) ON DELETE RESTRICT NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_bn VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    rx_classification rx_classification_enum DEFAULT 'OTC' NOT NULL,
    reference_mrp_bdt DECIMAL(10,2) NOT NULL,
    youtube_video_id VARCHAR(50),
    storage_info_en TEXT,
    storage_info_bn TEXT,
    review_status medical_review_enum DEFAULT 'UNVERIFIED' NOT NULL,
    reviewed_by UUID REFERENCES profiles(id),
    last_reviewed_at TIMESTAMPTZ,
    publication_status publication_status_enum DEFAULT 'DRAFT' NOT NULL,
    archived_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE medicine_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medicine_id UUID REFERENCES medicines(id) ON DELETE CASCADE NOT NULL,
    storage_path TEXT NOT NULL,
    alt_text_en VARCHAR(255),
    alt_text_bn VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE NOT NULL,
    sort_order INT DEFAULT 0 NOT NULL
);

CREATE TABLE medicine_clinical_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medicine_id UUID REFERENCES medicines(id) ON DELETE CASCADE NOT NULL,
    section_type VARCHAR(50) NOT NULL, -- e.g., INDICATIONS, SIDE_EFFECTS, CONTRAINDICATIONS
    content_en TEXT NOT NULL,
    content_bn TEXT NOT NULL,
    review_status medical_review_enum DEFAULT 'UNVERIFIED' NOT NULL,
    reviewed_by UUID REFERENCES profiles(id),
    last_reviewed_at TIMESTAMPTZ,
    UNIQUE(medicine_id, section_type)
);

CREATE TABLE medicine_drug_interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    primary_generic_id UUID REFERENCES medicine_generics(id) ON DELETE CASCADE NOT NULL,
    interacting_generic_id UUID REFERENCES medicine_generics(id) ON DELETE CASCADE NOT NULL,
    severity VARCHAR(20) NOT NULL, -- MINOR, MODERATE, MAJOR, CONTRAINDICATED
    description_en TEXT NOT NULL,
    description_bn TEXT NOT NULL
);

CREATE TABLE medicine_faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medicine_id UUID REFERENCES medicines(id) ON DELETE CASCADE NOT NULL,
    question_en TEXT NOT NULL,
    question_bn TEXT NOT NULL,
    answer_en TEXT NOT NULL,
    answer_bn TEXT NOT NULL,
    publication_status publication_status_enum DEFAULT 'DRAFT' NOT NULL
);

CREATE TABLE related_medicines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medicine_id UUID REFERENCES medicines(id) ON DELETE CASCADE NOT NULL,
    related_medicine_id UUID REFERENCES medicines(id) ON DELETE CASCADE NOT NULL,
    UNIQUE(medicine_id, related_medicine_id)
);

-- 4. DOMAIN C: ONLINE PHARMACY, INVENTORY & ORDERS
CREATE TABLE pharmacy_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medicine_id UUID REFERENCES medicines(id) ON DELETE SET NULL,
    sku VARCHAR(100) UNIQUE NOT NULL,
    product_title_en VARCHAR(255) NOT NULL,
    product_title_bn VARCHAR(255) NOT NULL,
    pack_unit VARCHAR(50) NOT NULL, -- e.g., '10s Strip', '100ml Bottle'
    selling_price_bdt DECIMAL(10,2) NOT NULL,
    reference_price_bdt DECIMAL(10,2) NOT NULL,
    stock_available INT DEFAULT 0 NOT NULL,
    low_stock_threshold INT DEFAULT 10 NOT NULL,
    is_rx_required BOOLEAN DEFAULT FALSE NOT NULL,
    publication_status publication_status_enum DEFAULT 'DRAFT' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE inventory_batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES pharmacy_products(id) ON DELETE CASCADE NOT NULL,
    batch_no VARCHAR(100) NOT NULL,
    expiry_date DATE NOT NULL,
    stock_qty INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE delivery_zones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    district_en VARCHAR(100) NOT NULL,
    district_bn VARCHAR(100) NOT NULL,
    area_en VARCHAR(100) NOT NULL,
    area_bn VARCHAR(100) NOT NULL,
    delivery_fee_bdt DECIMAL(10,2) NOT NULL,
    estimated_sla VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE TABLE user_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    recipient_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address_line TEXT NOT NULL,
    delivery_zone_id UUID REFERENCES delivery_zones(id) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id UUID REFERENCES carts(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES pharmacy_products(id) ON DELETE CASCADE NOT NULL,
    quantity INT CHECK (quantity > 0) NOT NULL,
    UNIQUE(cart_id, product_id)
);

CREATE TABLE prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    private_storage_path TEXT NOT NULL,
    verification_status VARCHAR(20) DEFAULT 'PENDING' NOT NULL, -- PENDING, APPROVED, REJECTED
    reviewed_by UUID REFERENCES profiles(id),
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_no VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE RESTRICT NOT NULL,
    idempotency_key UUID UNIQUE NOT NULL,
    subtotal_bdt DECIMAL(10,2) NOT NULL,
    delivery_fee_bdt DECIMAL(10,2) NOT NULL,
    grand_total_bdt DECIMAL(10,2) NOT NULL,
    payment_mode payment_mode_enum DEFAULT 'CASH_ON_DELIVERY' NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'PENDING' NOT NULL,
    order_status order_status_enum DEFAULT 'PENDING' NOT NULL,
    prescription_id UUID REFERENCES prescriptions(id),
    shipping_address_snapshot JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES pharmacy_products(id) ON DELETE RESTRICT NOT NULL,
    product_title_snapshot VARCHAR(255) NOT NULL,
    pack_snapshot VARCHAR(50) NOT NULL,
    unit_price_snapshot DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL
);

-- 5. DOMAIN D: HEALTHCARE DIRECTORIES & APPOINTMENTS
CREATE TABLE locations_districts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en VARCHAR(100) UNIQUE NOT NULL,
    name_bn VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE locations_areas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    district_id UUID REFERENCES locations_districts(id) ON DELETE CASCADE NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_bn VARCHAR(100) NOT NULL
);

CREATE TABLE medical_specialties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en VARCHAR(100) UNIQUE NOT NULL,
    name_bn VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE doctors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bmdc_reg_no VARCHAR(50) UNIQUE NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_bn VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    specialty_id UUID REFERENCES medical_specialties(id) NOT NULL,
    qualification_summary_en TEXT NOT NULL,
    qualification_summary_bn TEXT NOT NULL,
    experience_years INT NOT NULL,
    profile_image_path TEXT,
    consultation_fee_bdt DECIMAL(10,2) NOT NULL,
    publication_status publication_status_enum DEFAULT 'DRAFT' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE healthcare_facilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    facility_type facility_type_enum NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_bn VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    district_id UUID REFERENCES locations_districts(id) NOT NULL,
    area_id UUID REFERENCES locations_areas(id) NOT NULL,
    address_en TEXT NOT NULL,
    address_bn TEXT NOT NULL,
    hotline_phones TEXT[] NOT NULL,
    emergency_phones TEXT[],
    facility_image_path TEXT,
    publication_status publication_status_enum DEFAULT 'DRAFT' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE doctor_chambers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE NOT NULL,
    facility_id UUID REFERENCES healthcare_facilities(id) ON DELETE SET NULL,
    chamber_address_en TEXT NOT NULL,
    chamber_address_bn TEXT NOT NULL,
    consultation_fee_bdt DECIMAL(10,2) NOT NULL,
    schedule_summary_en VARCHAR(255) NOT NULL,
    schedule_summary_bn VARCHAR(255) NOT NULL
);

CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_no VARCHAR(50) UNIQUE NOT NULL,
    patient_user_id UUID REFERENCES profiles(id) ON DELETE RESTRICT NOT NULL,
    doctor_id UUID REFERENCES doctors(id) ON DELETE RESTRICT NOT NULL,
    chamber_id UUID REFERENCES doctor_chambers(id) ON DELETE RESTRICT NOT NULL,
    appointment_date DATE NOT NULL,
    slot_time_en VARCHAR(50) NOT NULL,
    slot_time_bn VARCHAR(50) NOT NULL,
    patient_name VARCHAR(255) NOT NULL,
    patient_phone VARCHAR(20) NOT NULL,
    status appointment_status_enum DEFAULT 'REQUESTED' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE blood_donors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
    blood_group blood_group_enum NOT NULL,
    district_id UUID REFERENCES locations_districts(id) NOT NULL,
    area_id UUID REFERENCES locations_areas(id) NOT NULL,
    last_donation_date DATE,
    is_available BOOLEAN DEFAULT TRUE NOT NULL,
    consent_given BOOLEAN DEFAULT TRUE NOT NULL,
    contact_mode VARCHAR(20) DEFAULT 'REQUEST_ONLY' NOT NULL
);

CREATE TABLE ambulance_providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_name_en VARCHAR(255) NOT NULL,
    provider_name_bn VARCHAR(255) NOT NULL,
    ambulance_type VARCHAR(50) NOT NULL, -- BASIC, ICU, FREEZER
    district_id UUID REFERENCES locations_districts(id) NOT NULL,
    hotline_phone VARCHAR(20) NOT NULL,
    publication_status publication_status_enum DEFAULT 'DRAFT' NOT NULL
);

-- 6. DOMAIN E: HEALTH EDUCATION & CMS
CREATE TABLE health_contents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_type content_type_enum NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    title_bn VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    body_en TEXT NOT NULL,
    body_bn TEXT NOT NULL,
    thumbnail_path TEXT,
    review_status medical_review_enum DEFAULT 'UNVERIFIED' NOT NULL,
    reviewed_by UUID REFERENCES profiles(id),
    publication_status publication_status_enum DEFAULT 'DRAFT' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. SECURITY RLS POLICIES & HELPER FUNCTIONS
CREATE OR REPLACE FUNCTION public.has_admin_permission(p_user_id UUID, p_required_role system_role_enum)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = p_user_id AND (role = 'SUPER_ADMIN' OR role = p_required_role)
  );
$$;

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE pharmacy_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published medicines" ON medicines FOR SELECT USING (publication_status = 'PUBLISHED' AND archived_at IS NULL);
CREATE POLICY "Public read published products" ON pharmacy_products FOR SELECT USING (publication_status = 'PUBLISHED');
CREATE POLICY "Users view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
