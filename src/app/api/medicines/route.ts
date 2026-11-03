import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://ezlcmwobkistnahsfmtl.supabase.co";

const SUPABASE_SECRET_KEY =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "";

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const q = (searchParams.get("q") || "").trim();
    const category = (searchParams.get("category") || "all").trim();
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "36", 10)));
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    if (slug) {
      const { data: med, error } = await supabaseAdmin
        .from("medicines")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      if (!med) {
        return NextResponse.json({ medicine: null, alternatives: [] }, { status: 404 });
      }

      let alternatives: any[] = [];
      if (med.generic_name) {
        const { data: altData } = await supabaseAdmin
          .from("medicines")
          .select("id, slug, name_en, name_bn, generic_name, dosage_form, strength, unit_price, strip_price, pack_unit, manufacturer, image_url")
          .eq("generic_name", med.generic_name)
          .order("unit_price", { ascending: true })
          .limit(9);
        alternatives = altData || [];
      }

      return NextResponse.json({ medicine: med, alternatives });
    }

    let query = supabaseAdmin
      .from("medicines")
      .select("*", { count: "exact" });

    if (category && category !== "all") {
      if (category === "fever_pain" || category === "pain") {
        query = query.in("category_key", ["pain", "fever_pain"]);
      } else {
        query = query.eq("category_key", category);
      }
    }

    if (q) {
      query = query.or(
        `name_en.ilike.%${q}%,name_bn.ilike.%${q}%,generic_name.ilike.%${q}%,manufacturer.ilike.%${q}%`
      );
    }

    const { data, count, error } = await query
      .order("name_en", { ascending: true })
      .range(from, to);

    if (error) {
      return NextResponse.json({ error: error.message, data: [], count: 0 }, { status: 500 });
    }

    return NextResponse.json({
      data: data || [],
      count: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error", data: [], count: 0 }, { status: 500 });
  }
}