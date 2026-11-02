-- ==============================================================================
-- JibonJotno (জীবনযত্ন) — All-in-One Complete Database Schema & Setup Script
-- ==============================================================================

-- ১. পুরনো কনফ্লিক্টিং টেবিল ও টাইপ ক্লিনআপ (Clean Reset)
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.prescriptions CASCADE;
DROP TABLE IF EXISTS public.pharmacy_products CASCADE;
DROP TABLE IF EXISTS public.medicines CASCADE;
DROP TABLE IF EXISTS public.manufacturers CASCADE;
DROP TABLE IF EXISTS public.generics CASCADE;
DROP TABLE IF EXISTS public.medicine_categories CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

DROP TYPE IF EXISTS publication_status_enum CASCADE;
DROP TYPE IF EXISTS user_role_enum CASCADE;
DROP TYPE IF EXISTS order_status_enum CASCADE;
DROP TYPE IF EXISTS prescription_status_enum CASCADE;

-- ২. এক্সটেনশনসমূহ সক্রিয়করণ
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ৩. প্রোফাইল ও ভূমিকা (Profiles & Roles)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT UNIQUE,
    role TEXT DEFAULT 'patient' NOT NULL CHECK (
        role IN ('super_admin', 'admin', 'medical_reviewer', 'pharmacist', 
                 'inventory_manager', 'order_manager', 'content_editor', 'patient')
    ),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ৪. ওষুধের রেফারেন্স ডাটাবেস (Medicine Knowledge Base)
CREATE TABLE public.medicine_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_bn TEXT NOT NULL,
    name_en TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE public.generics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    description_bn TEXT,
    description_en TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE public.manufacturers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    origin TEXT DEFAULT 'Bangladesh',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE public.medicines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_bn TEXT NOT NULL,
    name_en TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    generic_id UUID REFERENCES public.generics(id) ON DELETE SET NULL,
    category_id UUID REFERENCES public.medicine_categories(id) ON DELETE SET NULL,
    manufacturer_id UUID REFERENCES public.manufacturers(id) ON DELETE SET NULL,
    dosage_form TEXT NOT NULL, -- Tablet, Syrup, Capsule, etc.
    strength TEXT NOT NULL,    -- 500mg, 20mg, etc.
    indications_bn TEXT,
    dosage_info_bn TEXT,
    side_effects_bn TEXT,
    contraindications_bn TEXT,
    is_prescription_required BOOLEAN DEFAULT false NOT NULL,
    youtube_video_id VARCHAR(15),
    publication_status TEXT DEFAULT 'draft' NOT NULL CHECK (
        publication_status IN ('draft', 'published', 'archived')
    ),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- সার্চের দ্রুত গতির জন্য Trigram ইনডেক্স
CREATE INDEX idx_medicines_name_bn_trgm ON public.medicines USING gin (name_bn gin_trgm_ops);
CREATE INDEX idx_medicines_name_en_trgm ON public.medicines USING gin (name_en gin_trgm_ops);
CREATE INDEX idx_medicines_slug ON public.medicines(slug);

-- ৫. ফার্মেসি পণ্য ও ইনভেন্টরি (Commerce)
CREATE TABLE public.pharmacy_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medicine_id UUID NOT NULL REFERENCES public.medicines(id) ON DELETE RESTRICT,
    sku TEXT UNIQUE NOT NULL,
    pack_unit TEXT NOT NULL, -- Pcs, Strip, Box, Bottle
    unit_mrp NUMERIC(10, 2) NOT NULL CHECK (unit_mrp >= 0),
    selling_price NUMERIC(10, 2) NOT NULL CHECK (selling_price >= 0),
    stock_quantity INT DEFAULT 0 NOT NULL CHECK (stock_quantity >= 0),
    is_sellable BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ৬. প্রেসক্রিপশন টেবিল (Private User Prescriptions)
CREATE TABLE public.prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    status TEXT DEFAULT 'pending_review' NOT NULL CHECK (
        status IN ('pending_review', 'approved', 'rejected')
    ),
    pharmacist_notes TEXT,
    reviewed_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ৭. অর্ডার ও অর্ডার আইটেমস (Orders & Items)
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    prescription_id UUID REFERENCES public.prescriptions(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    delivery_area TEXT NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL,
    delivery_fee NUMERIC(10, 2) DEFAULT 60.00 NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    payment_method TEXT DEFAULT 'COD' NOT NULL,
    order_status TEXT DEFAULT 'order_placed' NOT NULL CHECK (
        order_status IN ('pending_prescription_review', 'order_placed', 'processing', 
                         'out_for_delivery', 'delivered', 'cancelled')
    ),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.pharmacy_products(id) ON DELETE RESTRICT,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price_snapshot NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ৮. সিকিউরিটি পলিসি সক্রিয়করণ (Enable Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicine_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manufacturers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pharmacy_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- ৯. সিকিউরিটি পলিসিসমূহ (RLS Policies)
CREATE POLICY "Public read published medicines"
    ON public.medicines FOR SELECT
    USING (publication_status = 'published');

CREATE POLICY "Public read categories"
    ON public.medicine_categories FOR SELECT USING (true);

CREATE POLICY "Public read generics"
    ON public.generics FOR SELECT USING (true);

CREATE POLICY "Public read manufacturers"
    ON public.manufacturers FOR SELECT USING (true);

CREATE POLICY "Public read sellable products"
    ON public.pharmacy_products FOR SELECT
    USING (is_sellable = true);

CREATE POLICY "Users view own prescriptions"
    ON public.prescriptions FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users insert own prescriptions"
    ON public.prescriptions FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users view own orders"
    ON public.orders FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users manage own profile"
    ON public.profiles FOR ALL
    TO authenticated
    USING (auth.uid() = id);

-- ১০. প্রাথমিক ডেমো ক্যাটাগরি ডাটা (Seed Categories)
INSERT INTO public.medicine_categories (name_bn, name_en, slug, icon_name) VALUES
('পেইনকিলার ও জ্বর', 'Pain & Fever', 'pain-fever', 'pill'),
('গ্যাস্ট্রিক ও এসিডিটি', 'Gastric & Acidity', 'gastric-acidity', 'shield-plus'),
('অ্যান্টিবায়োটিক', 'Antibiotics', 'antibiotics', 'flask-conical'),
('ডায়াবেটিস যত্ন', 'Diabetes Care', 'diabetes-care', 'activity'),
('ভিটামিন ও সাপ্লিমেন্ট', 'Vitamins & Supplements', 'vitamins-supplements', 'heart-pulse')
ON CONFLICT (slug) DO NOTHING;

-- ১. Orders টেবিলে যেকোনো কাস্টমারের জন্য অর্ডার সাবমিট (INSERT) পলিসি চালু
DROP POLICY IF EXISTS "Anyone can insert orders" ON public.orders;
CREATE POLICY "Anyone can insert orders"
    ON public.orders FOR INSERT
    WITH CHECK (true);

-- ২. অর্ডার ট্র্যাকিং ও দেখার জন্য SELECT পলিসি
DROP POLICY IF EXISTS "Users view own orders" ON public.orders;
CREATE POLICY "Users view own orders"
    ON public.orders FOR SELECT
    USING (
        auth.uid() = user_id 
        OR user_id IS NULL
        OR true
    );

-- ৩. Order Items টেবিলে আইটেম ইনসার্ট ও দেখার পলিসি
DROP POLICY IF EXISTS "Anyone can insert order items" ON public.order_items;
CREATE POLICY "Anyone can insert order items"
    ON public.order_items FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view order items" ON public.order_items;
CREATE POLICY "Public can view order items"
    ON public.order_items FOR SELECT
    USING (true);