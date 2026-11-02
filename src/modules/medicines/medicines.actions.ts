"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { ActionResult } from "@/types/common.types";

/**
 * [ADMIN] নতুন ওষুধ রেফারেন্স ও ফার্মেসি প্রোডাক্ট তৈরি করার সার্ভার অ্যাকশন।
 */
export async function createMedicineAndProduct(formData: FormData): Promise<ActionResult<any>> {
  try {
    const supabase = await createClient();

    // ফর্ম ডাটা সংগ্রহ
    const nameEn = formData.get("name_en") as string;
    const nameBn = formData.get("name_bn") as string;
    const genericName = formData.get("generic_name") as string;
    const brandName = formData.get("brand_name") as string;
    const manufacturerName = formData.get("manufacturer_name") as string;
    const categoryName = formData.get("category_name") as string;
    const dosageForm = formData.get("dosage_form") as string;
    const strength = formData.get("strength") as string;
    const priceBdt = parseFloat(formData.get("price_bdt") as string) || 0;
    const stockQty = parseInt(formData.get("stock_qty") as string) || 0;
    const packUnit = (formData.get("pack_unit") as string) || "10s Strip";
    const rxRequired = formData.get("rx_required") === "true";
    const youtubeUrl = (formData.get("youtube_url") as string) || "";
    const imageUrl = (formData.get("image_url") as string) || "";

    if (!nameEn || !nameBn || priceBdt <= 0) {
      return {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message_en: "Please provide valid English/Bangla names and selling price.",
          message_bn: "দয়া করে সঠিক ইংরেজি/বাংলা নাম এবং বিক্রয়মূল্য প্রদান করুন।",
        },
      };
    }

    // ১. Manufacturer তৈরি বা ফেচ করা
    const manufacturerSlug = manufacturerName.toLowerCase().replace(/\s+/g, "-");
    let { data: manufacturer } = await supabase.from("manufacturers").select("id").eq("slug", manufacturerSlug).single();
    if (!manufacturer) {
      const { data: newMan, error: manErr } = await supabase.from("manufacturers").insert({
        name_en: manufacturerName,
        name_bn: manufacturerName,
        slug: manufacturerSlug,
        publication_status: "PUBLISHED",
      }).select("id").single();
      if (manErr) throw manErr;
      manufacturer = newMan;
    }

    // ২. Brand তৈরি বা ফেচ করা
    const brandSlug = brandName.toLowerCase().replace(/\s+/g, "-");
    let { data: brand } = await supabase.from("medicine_brands").select("id").eq("slug", brandSlug).single();
    if (!brand) {
      const { data: newBrand, error: brandErr } = await supabase.from("medicine_brands").insert({
        manufacturer_id: manufacturer.id,
        name_en: brandName,
        name_bn: brandName,
        slug: brandSlug,
        publication_status: "PUBLISHED",
      }).select("id").single();
      if (brandErr) throw brandErr;
      brand = newBrand;
    }

    // ৩. Generic তৈরি বা ফেচ করা
    const genericSlug = genericName.toLowerCase().replace(/\s+/g, "-");
    let { data: generic } = await supabase.from("medicine_generics").select("id").eq("slug", genericSlug).single();
    if (!generic) {
      const { data: newGen, error: genErr } = await supabase.from("medicine_generics").insert({
        name_en: genericName,
        name_bn: genericName,
        slug: genericSlug,
        publication_status: "PUBLISHED",
      }).select("id").single();
      if (genErr) throw genErr;
      generic = newGen;
    }

    // ৪. Category তৈরি বা ফেচ করা
    const catSlug = categoryName.toLowerCase().replace(/\s+/g, "-");
    let { data: category } = await supabase.from("medicine_categories").select("id").eq("slug", catSlug).single();
    if (!category) {
      const { data: newCat, error: catErr } = await supabase.from("medicine_categories").insert({
        name_en: categoryName,
        name_bn: categoryName,
        slug: catSlug,
        publication_status: "PUBLISHED",
      }).select("id").single();
      if (catErr) throw catErr;
      category = newCat;
    }

    // ৫. Dosage Form তৈরি বা ফেচ করা
    let { data: form } = await supabase.from("dosage_forms").select("id").eq("name_en", dosageForm).single();
    if (!form) {
      const { data: newForm, error: formErr } = await supabase.from("dosage_forms").insert({
        name_en: dosageForm,
        name_bn: dosageForm,
        route_of_administration: "Oral",
      }).select("id").single();
      if (formErr) throw formErr;
      form = newForm;
    }

    // ৬. Strength তৈরি বা ফেচ করা
    let { data: strengthRec } = await supabase.from("medicine_strengths").select("id").eq("strength_value", strength).single();
    if (!strengthRec) {
      const { data: newStr, error: strErr } = await supabase.from("medicine_strengths").insert({
        strength_value: strength,
        unit: "mg",
      }).select("id").single();
      if (strErr) throw strErr;
      strengthRec = newStr;
    }

    // ৭. মূল Medicine রেকর্ড তৈরি
    const medicineSlug = `${nameEn}-${strength}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const { data: medicine, error: medErr } = await supabase.from("medicines").insert({
      generic_id: generic.id,
      brand_id: brand.id,
      manufacturer_id: manufacturer.id,
      category_id: category.id,
      dosage_form_id: form.id,
      strength_id: strengthRec.id,
      name_en: nameEn,
      name_bn: nameBn,
      slug: medicineSlug,
      rx_classification: rxRequired ? "RX_REQUIRED" : "OTC",
      reference_mrp_bdt: priceBdt,
      youtube_video_id: youtubeUrl ? youtubeUrl.split("v=")?.[1]?.substring(0, 11) || null : null,
      publication_status: "PUBLISHED",
    }).select("id").single();

    if (medErr) throw medErr;

    // ৮. যদি ছবি থাকে, তবে medicine_images-এ যুক্ত করা
    if (imageUrl) {
      await supabase.from("medicine_images").insert({
        medicine_id: medicine.id,
        storage_path: imageUrl,
        is_primary: true,
      });
    }

    // ৯. Sellable Pharmacy Product SKU তৈরি করা
    const skuCode = `SKU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const { error: prodErr } = await supabase.from("pharmacy_products").insert({
      medicine_id: medicine.id,
      sku: skuCode,
      product_title_en: `${nameEn} ${strength}`,
      product_title_bn: `${nameBn} ${strength}`,
      pack_unit: packUnit,
      selling_price_bdt: priceBdt,
      reference_price_bdt: priceBdt,
      stock_available: stockQty,
      is_rx_required: rxRequired,
      publication_status: "PUBLISHED",
    });

    if (prodErr) throw prodErr;

    revalidatePath("/admin/medicines");
    revalidatePath("/medicines");
    revalidatePath("/pharmacy");

    return { success: true, data: { medicineId: medicine.id, sku: skuCode } };
  } catch (err: any) {
    return {
      success: false,
      error: {
        code: "SERVER_ERROR",
        message_en: err?.message || "Failed to create medicine.",
        message_bn: err?.message || "ওষুধ তৈরি করতে ব্যর্থ হয়েছে।",
      },
    };
  }
}
