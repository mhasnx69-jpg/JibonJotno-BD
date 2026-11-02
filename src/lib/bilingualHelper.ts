// Comprehensive English to Bengali Clinical Vocabulary Map

export const DOSAGE_FORM_MAP: Record<string, string> = {
  "Tablet": "ট্যাবলেট",
  "Capsule": "ক্যাপসুল",
  "Syrup": "সিরাপ",
  "Suspension": "সাসপেনশন",
  "Powder for Suspension": "পাউডার ফর সাসপেনশন",
  "Oral Suspension": "ওরাল সাসপেনশন",
  "Injection": "ইনজেকশন",
  "IM/IV Injection": "আইএম / আইভি ইনজেকশন",
  "IV Infusion": "আইভি ইনফিউশন",
  "IV Injection": "আইভি ইনজেকশন",
  "Drops": "ড্রপ",
  "Eye Drops": "চোখের ড্রপ",
  "Ear Drops": "কানের ড্রপ",
  "Ophthalmic Solution": "চোখের ড্রপ / সলিউশন",
  "Ointment": "মলম (অয়েন্টমেন্ট)",
  "Cream": "ক্রিম",
  "Gel": "জেল",
  "Lotion": "লোশন",
  "Inhaler": "ইনহেলার",
  "Nebuliser Solution": "নেবুলাইজার সলিউশন",
  "Suppository": "সাপোজিটরি",
  "Oral Solution": "ওরাল সলিউশন",
  "Sachet": "স্যাশেট",
  "Pellets": "পেলেটস",
  "Liquid": "তরল",
  "Skin Care": "স্কিন কেয়ার",
  "Personal Care": "পার্সোনাল কেয়ার",
  "Not Reported": "সাধারণ ওষুধ",
};

export const GENERIC_BANGLA_MAP: Record<string, string> = {
  "Paracetamol": "প্যারাসিটামল",
  "Omeprazole": "ওমিপ্রাজল",
  "Esomeprazole": "ইসোমিপ্রাজল",
  "Pantoprazole": "প্যান্টোপ্রাজল",
  "Rabeprazole": "রেবিপ্রাজল",
  "Cefixime": "সেফিক্সিম",
  "Cefixime Trihydrate": "সেফিক্সিম ট্রাইহাইড্রেট",
  "Azithromycin": "অ্যাজিথ্রোমাইসিন",
  "Ciprofloxacin": "সিপ্রোফ্লক্সাসিন",
  "Levofloxacin": "লেভোফ্লক্সাসিন",
  "Levofloxacin Hemihydrate": "লেভোফ্লক্সাসিন হেমিহাইড্রেট",
  "Metronidazole": "মেট্রোনিডাজল",
  "Metformin": "মেটফরমিন",
  "Metformin Hydrochloride": "মেটফরমিন হাইড্রোক্লোরাইড",
  "Amlodipine": "অ্যামলোডিপিন",
  "Amlodipine Besylate": "অ্যামলোডিপিন বেসিলেট",
  "Losartan Potassium": "লোসারটান পটাশিয়াম",
  "Montelukast": "মন্টেলুকাস্ট",
  "Fexofenadine": "ফেক্সোফেনাডিন",
  "Fexofenadine Hydrochloride": "ফেক্সোফেনাডিন হাইড্রোক্লোরাইড",
  "Cetirizine": "সেটিরিজিন",
  "Cetirizine Dihydrochloride": "সেটিরিজিন ডাইহাইড্রোক্লোরাইড",
  "Ketorolac Tromethamine": "কিটোরোলাক ট্রোমিথামিন",
  "Diclofenac": "ডাইক্লোফেনাক",
  "Diclofenac Sodium": "ডাইক্লোফেনাক সোডিয়াম",
  "Aceclofenac": "অ্যাসেক্লোফেনাক",
  "Naproxen": "ন্যাপ্রোক্সেন",
  "Etoricoxib": "ইটোরিকক্সিব",
  "Pregabalin": "প্রিগাবালিন",
  "Gabapentin": "গ্যাবাপেন্টিন",
  "Ceftriaxone": "সেফট্রিয়াক্সন",
  "Cephradine": "সেফ্রাডিন",
  "Cefuroxime Axetil": "সেফুরোক্সিম অ্যাক্সেটিল",
  "Fluconazole": "ফ্লুকোনাজোল",
  "Vitamin B1, B6 & B12": "ভিটামিন বি১, বি৬ এবং বি১২",
  "Calcium Carbonate": "ক্যালসিয়াম কার্বনেট",
  "Cholecalciferol [Vitamin D3]": "ভিটামিন ডি৩ (কোলেক্যালসিফেরল)",
  "Oral Rehydration Salt (ORS)": "ওরাল রিহাইড্রেশন সল্ট (খাবার স্যালাইন)",
};

export const PACK_UNIT_MAP: Record<string, string> = {
  "Piece": "পিস",
  "Strip": "পাতা",
  "Box": "বক্স",
  "Bottle": "বোতল",
  "Vial": "ভায়াল",
  "Tube": "টিউব",
  "Sachet": "প্যাকেট",
};

export function getDosageFormBn(form: string): string {
  if (!form) return "ট্যাবলেট";
  return DOSAGE_FORM_MAP[form] || form;
}

export function getGenericBn(gen: string): string {
  if (!gen) return "সাধারণ জেনেরিক উপাদান";
  return GENERIC_BANGLA_MAP[gen] || gen;
}

export function getPackUnitBn(unit: string): string {
  if (!unit) return "পিস";
  return PACK_UNIT_MAP[unit] || unit;
}

// Convert English clinical descriptions into structured readable Bangla
export function translateIndicationsToBn(text: string, genericName: string): string {
  if (!text || text.toLowerCase().includes("not reported")) {
    return `${genericName}-এর নির্দেশিকা: চিকিৎসকের পরামর্শ অনুযায়ী সেবনযোগ্য। সাধারণত প্রদাহ, সংক্রমণ বা সংশ্লিষ্ট উপসর্গ নিরাময়ে নির্দেশিত।`;
  }
  let bn = text;
  bn = bn.replace(/is indicated for the treatment of/gi, "এর চিকিৎসায় নির্দেশিত:");
  bn = bn.replace(/is indicated where a deficiency of the relevant vitamins exists/gi, "নির্দিষ্ট ভিটামিনের ঘাটতি পূরণে নির্দেশিত");
  bn = bn.replace(/is indicated in/gi, "নির্দেশিত:");
  bn = bn.replace(/Upper Respiratory Tract Infections/gi, "উর্ধ্ব শ্বাসনালীর সংক্রমণ");
  bn = bn.replace(/Lower Respiratory Tract Infections/gi, "নিম্ন শ্বাসনালীর সংক্রমণ");
  bn = bn.replace(/Urinary Tract Infections/gi, "মূত্রনালীর সংক্রমণ (UTI)");
  bn = bn.replace(/bronchitis/gi, "ব্রংকাইটিস");
  bn = bn.replace(/otitis media/gi, "কানের প্রদাহ ও সংক্রমণ");
  bn = bn.replace(/pharyngitis/gi, "গলবিল প্রদাহ");
  bn = bn.replace(/tonsillitis/gi, "টনসিল ইনফেকশন");
  bn = bn.replace(/pneumonia/gi, "নিউমোনিয়া");
  bn = bn.replace(/fever/gi, "জ্বর");
  bn = bn.replace(/headache/gi, "মাথাব্যথা");
  bn = bn.replace(/toothache/gi, "দাঁতের ব্যথা");
  bn = bn.replace(/backache/gi, "কোমর ব্যথা");
  bn = bn.replace(/myalgia/gi, "মাংসপেশির তীব্র ব্যথা");
  bn = bn.replace(/neuralgia/gi, "স্নায়ু বা নার্ভের ব্যথা");
  bn = bn.replace(/Generally well tolerated/gi, "সাধারণত ওষুধটি শরীরে সহনশীল");
  return bn;
}

export function translateSideEffectsToBn(text: string): string {
  if (!text || text.toLowerCase().includes("not reported")) {
    return "সাধারণত ওষুধটি নিরাপদ ও সহনশীল। তবে যেকোনো অপ্রত্যাশিত পার্শ্বপ্রতিক্রিয়া বা অ্যালার্জি দেখা দিলে চিকিৎসকের পরামর্শ নিন।";
  }
  let bn = text;
  bn = bn.replace(/Generally well tolerated but allergic reactions may be observed in few cases/gi, "সাধারণত নিরাপদ এবং সহনশীল, তবে বিরল ক্ষেত্রে অ্যালার্জি বা ত্বকে র‍্যাশ দেখা দিতে পারে।");
  bn = bn.replace(/The majority of adverse reactions observed in clinical trials were mild and self limiting in nature/gi, "বেশিরভাগ ক্ষেত্রে পার্শ্বপ্রতিক্রিয়াগুলো মৃদু এবং নিজে থেকেই ঠিক হয়ে যায়।");
  bn = bn.replace(/diarrhoea and stool changes/gi, "পাতলা পায়খানা বা মলের পরিবর্তন");
  bn = bn.replace(/nausea, abdominal pain, dyspepsia, vomiting and flatulence/gi, "বমি বমি ভাব, পেটে ব্যথা, বদহজম, বমি এবং পেটে গ্যাস জমা");
  bn = bn.replace(/headache and dizziness/gi, "মাথাব্যথা এবং মাথা ঘোরা");
  bn = bn.replace(/rash, pruritis, urticaria/gi, "ত্বকে চুলকানি, লাল চাকা বা র‍্যাশ");
  return bn;
}

export function translateStorageToBn(text: string): string {
  if (!text || text.toLowerCase().includes("not reported")) {
    return "আলো ও আর্দ্রতা থেকে দূরে, ৩০° সে. তাপমাত্রার নিচে ঠান্ডা ও শুকনো স্থানে রাখুন। শিশুদের নাগালের বাইরে রাখুন।";
  }
  let bn = text;
  bn = bn.replace(/Keep out of reach of children/gi, "শিশুদের নাগালের বাইরে রাখুন");
  bn = bn.replace(/Keep out of the reach of children/gi, "শিশুদের নাগালের বাইরে রাখুন");
  bn = bn.replace(/Store in a cool.*and dry place/gi, "ঠান্ডা ও শুকনো স্থানে সংরক্ষণ করুন");
  bn = bn.replace(/protected from light/gi, "আলো থেকে দূরে রাখুন");
  bn = bn.replace(/protected from light &amp; moisture/gi, "আলো ও আর্দ্রতা থেকে সুরক্ষিত রাখুন");
  bn = bn.replace(/below 30ºC temperature/gi, "৩০ ডিগ্রি সেলসিয়াসের নিচে");
  bn = bn.replace(/below 25°C temperature/gi, "২৫ ডিগ্রি সেলসিয়াসের নিচে");
  return bn;
}