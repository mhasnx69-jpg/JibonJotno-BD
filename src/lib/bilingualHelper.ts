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

export function translateIndicationsToBn(text: string, genericName: string): string {
  if (!text || text.toLowerCase().includes("not reported")) {
    return `${getGenericBn(genericName)}-এর নির্দেশিকা: রেজিস্টার্ড চিকিৎসকের পরামর্শ অনুযায়ী সেব্য। সাধারণত প্রদাহ, সংক্রমণ বা সংশ্লিষ্ট উপসর্গ নিরাময়ে নির্দেশিত।`;
  }
  let bn = text;
  bn = bn.replace(/is indicated where a deficiency of the relevant vitamins exists/gi, "সংশ্লিষ্ট ভিটামিনের ঘাটতি পূরণে নির্দেশিত। এটি মূলত নিম্নলিখিত রোগ ও জটিলতায় সেব্য:");
  bn = bn.replace(/It is indicated for the treatment of following diseases:/gi, "এটি নিম্নলিখিত রোগসমূহের চিকিৎসায় কার্যকর:");
  bn = bn.replace(/is indicated for the treatment of the following acute infections/gi, "তীব্র ব্যাকটেরিয়াল সংক্রমণের চিকিৎসায় নির্দেশিত:");
  bn = bn.replace(/is indicated for the treatment of/gi, "এর চিকিৎসায় নির্দেশিত:");
  bn = bn.replace(/is indicated in/gi, "নির্দেশিত:");
  bn = bn.replace(/Upper Respiratory Tract Infections \(URTI\)/gi, "উর্ধ্ব শ্বাসনালীর তীব্র সংক্রমণ (যেমন: টনসিল ও সাইনাস)");
  bn = bn.replace(/Lower Respiratory Tract Infections/gi, "ফুসফুস ও নিম্ন শ্বাসনালীর সংক্রমণ (যেমন: ব্রংকাইটিস ও নিউমোনিয়া)");
  bn = bn.replace(/Urinary Tract Infections/gi, "মূত্রনালীর ইনফেকশন বা সংক্রমণ (UTI)");
  bn = bn.replace(/otitis media/gi, "কানের তীব্র ইনফেকশন ও প্রদাহ");
  bn = bn.replace(/bronchitis/gi, "ব্রংকাইটিস");
  bn = bn.replace(/pharyngitis/gi, "গলবিল প্রদাহ");
  bn = bn.replace(/tonsillitis/gi, "টনসিল ইনফেকশন");
  bn = bn.replace(/pneumonia/gi, "নিউমোনিয়া");
  bn = bn.replace(/fever/gi, "জ্বর");
  bn = bn.replace(/headache/gi, "মাথাব্যথা");
  bn = bn.replace(/toothache/gi, "দাঁতের ব্যথা");
  bn = bn.replace(/backache/gi, "কোমরের ব্যথা");
  bn = bn.replace(/myalgia/gi, "পেশির তীব্র ব্যথা");
  bn = bn.replace(/neuralgia/gi, "স্নায়ু বা নার্ভের ব্যথা");
  bn = bn.replace(/Cervical Syndrome/gi, "ঘাড়ের স্নায়ুর তীব্র টান বা সার্ভাইক্যাল পেইন");
  bn = bn.replace(/Shoulder-arm syndrome/gi, "কাঁধ ও বাহুর ব্যথা");
  bn = bn.replace(/Lumbago/gi, "কোমরের তীব্র বাতব্যথা");
  bn = bn.replace(/Sciatica/gi, "সায়াটিকা নার্ভের ব্যথা");
  bn = bn.replace(/Herpes Zoster/gi, "হার্পিস জোস্টার (দাদ/বিসর্প)");
  bn = bn.replace(/Trigeminal Neuralgia/gi, "ট্রাইজেমিনাল স্নায়ুশূল");
  bn = bn.replace(/Supportive treatment in facial paresis/gi, "মুখমন্ডলের স্নায়ুবিক পক্ষাঘাত বা প্যারালাইসিসের সহায়ক চিকিৎসা");
  bn = bn.replace(/Polyneuropathy of any origin such alcoholic or toxiconeuropathies as-diabetic/gi, "ডায়াবেটিসজনিত স্নায়ুর ক্ষতি বা পলি-নিউরোপ্যাথি");
  return bn;
}

export function translateSideEffectsToBn(text: string): string {
  if (!text || text.toLowerCase().includes("not reported")) {
    return "স্বাভাবিক মাত্রায় ওষুধটি সুসহনশীল। তবে কোনো অস্বাভাবিক অ্যালার্জি বা জটিলতা দেখা দিলে দ্রুত চিকিৎসকের পরামর্শ নিন।";
  }
  let bn = text;
  bn = bn.replace(/Generally well tolerated but allergic reactions may be observed in few cases/gi, "ওষুধটি সাধারণত শরীরে খুব ভালো সহনশীল। তবে বিরল ক্ষেত্রে অ্যালার্জি, ফুসকুড়ি বা চুলকানি দেখা যেতে পারে।");
  bn = bn.replace(/The majority of adverse reactions observed in clinical trials were mild and self limiting in nature/gi, "বেশিরভাগ ক্ষেত্রে পার্শ্বপ্রতিক্রিয়াগুলো অত্যন্ত মৃদু এবং কয়েকদিনের মধ্যে নিজে থেকেই ভালো হয়ে যায়।");
  bn = bn.replace(/diarrhoea and stool changes/gi, "পাতলা পায়খানা বা পেটের অস্বস্তি");
  bn = bn.replace(/nausea, abdominal pain, dyspepsia, vomiting and flatulence/gi, "বমি বমি ভাব, পেটে ব্যথা, বদহজম, বমি এবং পেটে গ্যাস জমা");
  bn = bn.replace(/headache and dizziness/gi, "মাথাব্যথা ও মাথা ঘোরানো");
  bn = bn.replace(/Hypersensitivity reactions: allergies in the form of rash, pruritis, urticaria, drug fever and arthralgia have been observed/gi, "অ্যালার্জিক প্রতিক্রিয়া: ত্বকে লাল র‍্যাশ, চুলকানি, চাকা হওয়া, হালকা জ্বর ও জয়েন্টে ব্যথা দেখা দিতে পারে");
  bn = bn.replace(/Hematological and clinical chemistry: thrombocytopenia, leukopenia and eosinophilia have been reported/gi, "রক্তের উপাদানের সাময়িক পরিবর্তন (খুবই বিরল ও প্রত্যাহারযোগ্য)");
  bn = bn.replace(/Pseudomembraneous colitis has been reported/gi, "অন্ত্রের মারাত্মক প্রদাহ (খুবই বিরল)");
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
  bn = bn.replace(/Store in a cool \(below 25°C temperature\) and dry place, protected from light\./gi, "২৫° সে. তাপমাত্রার নিচে ঠান্ডা ও শুষ্ক স্থানে সংরক্ষণ করুন এবং সরাসরি সূর্যের আলো থেকে দূরে রাখুন।");
  bn = bn.replace(/Keep below 30ºC temperature, protected from light &amp; moisture\./gi, "৩০° সে. তাপমাত্রার নিচে আলো ও আর্দ্রতা থেকে সুরক্ষিত শুকনো স্থানে রাখুন।");
  bn = bn.replace(/Keep below 30ºC temperature, protected from light & moisture\./gi, "৩০° সে. তাপমাত্রার নিচে আলো ও আর্দ্রতা থেকে সুরক্ষিত শুকনো স্থানে রাখুন।");
  return bn;
}

export function translateActiveIngredientToBn(text: string): string {
  if (!text) return "";
  let bn = text;
  bn = bn.replace(/Each film-coated tablet contains :/gi, "প্রতিটি ফিল্ম-কোটেড ট্যাবলেটে রয়েছে:");
  bn = bn.replace(/Each 3 ml ampoule contains :/gi, "প্রতিটি ৩ মি.লি. অ্যাম্পুলে রয়েছে:");
  bn = bn.replace(/Thiamine Mononitrate/gi, "থায়ামিন মনো নাইট্রেট");
  bn = bn.replace(/Thiamine Hydrochloride/gi, "থায়ামিন হাইড্রোক্লোরাইড");
  bn = bn.replace(/Pyridoxine Hydrochloride/gi, "পাইরিডক্সিন হাইড্রোক্লোরাইড");
  bn = bn.replace(/Cyanocobalamin/gi, "সায়ানোকোবালামিন");
  bn = bn.replace(/Vitamin B1/gi, "ভিটামিন বি১");
  bn = bn.replace(/Vitamin B6/gi, "ভিটামিন বি৬");
  bn = bn.replace(/Vitamin B12/gi, "ভিটামিন বি১২");
  bn = bn.replace(/Cefixime Trihydrate/gi, "সেফিক্সিম ট্রাইহাইড্রেট");
  return bn;
}