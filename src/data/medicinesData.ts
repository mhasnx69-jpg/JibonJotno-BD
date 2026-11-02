export interface ClinicalProfile {
  generic_bn: string;
  generic_en: string;
  category_key: string;
  category_bn: string;
  category_en: string;
  therapeutic_class_bn: string;
  therapeutic_class_en: string;
  indications_bn: string;
  indications_en: string;
  pharmacology_bn: string;
  pharmacology_en: string;
  dosage_bn: string;
  dosage_en: string;
  interaction_bn: string;
  interaction_en: string;
  contraindications_bn: string;
  contraindications_en: string;
  side_effects_bn: string;
  side_effects_en: string;
  pregnancy_cat_bn: string;
  pregnancy_cat_en: string;
  storage_bn: string;
  storage_en: string;
}

export interface MedicineRecord extends ClinicalProfile {
  id: string;
  slug: string;
  name_bn: string;
  name_en: string;
  strength_bn: string;
  strength_en: string;
  dosage_form_bn: string;
  dosage_form_en: string;
  manufacturer_bn: string;
  manufacturer_en: string;
  unit_price: number;
  strip_price: number;
  pack_unit_bn: string;
  pack_unit_en: string;
  is_prescription_required: boolean;
}

const GENERIC_PROFILES: Record<string, ClinicalProfile> = {
  Paracetamol: {
    generic_bn: "প্যারাসিটামল",
    generic_en: "Paracetamol",
    category_key: "pain",
    category_bn: "ব্যথানাশক ও জ্বর",
    category_en: "Fever & Painkiller",
    therapeutic_class_bn: "নন-ওপিওয়েড অ্যানালজেসিক ও অ্যান্টিপাইরেটিক (ব্যথানাশক ও জ্বর নিবারক)",
    therapeutic_class_en: "Non-opioid Analgesic & Antipyretic",
    indications_bn: "যেকোনো ধরনের জ্বর, সর্দি-জ্বর, ডেঙ্গু জ্বর, মাথাব্যথা, মাইগ্রেন, দাঁত ব্যথা, কান ব্যথা, শরীর ও পেশির ব্যথা, মাসিকের ব্যথা এবং টিকা পরবর্তী জ্বরে নির্দেশিত।",
    indications_en: "Indicated for fever, common cold, dengue fever, headache, migraine, toothache, earache, neuralgia, myalgia, dysmenorrhea, and post-vaccination pyrexia.",
    pharmacology_bn: "প্যারাসিটামল কেন্দ্রীয় স্নায়ুতন্ত্রে সাইক্লোঅক্সিজিনেজ (COX) এনজাইম ব্লক করে প্রোস্টাগ্ল্যান্ডিন সংশ্লেষণ কমায় এবং মস্তিষ্কের হাইপোথ্যালামিক তাপ-নিয়ন্ত্রণ কেন্দ্রের মাধ্যমে জ্বর নামায়।",
    pharmacology_en: "Inhibits prostaglandin synthesis in the central nervous system and acts on the hypothalamic heat-regulating center to produce antipyresis and analgesia.",
    dosage_bn: "প্রাপ্তবয়স্ক: ১ থেকে ২টি ট্যাবলেট (৫০০-১০০০ মি.গ্রা.) প্রতি ৪-৬ ঘণ্টা পরপর ভরা পেটে সেব্য (২৪ ঘণ্টায় সর্বোচ্চ ৪ গ্রাম বা ৮টি ট্যাবলেট)। ৬৬৫ মি.গ্রা. এক্সটেন্ড ট্যাবলেট প্রতি ৮ ঘণ্টা পরপর।",
    dosage_en: "Adults: 1-2 tablets (500-1000 mg) every 4-6 hours after food (Maximum 4000 mg or 8 tablets in 24 hours). For 665 mg sustained release: 1-2 tablets every 8 hours.",
    interaction_bn: "ওয়ারফারিন (রক্ত পাতলা করার ওষুধ), কার্বামাজেপিন, ফেনিটয়েন এবং অ্যালকোহলের সাথে একত্রে সেবনে লিভারের ক্ষতির ঝুঁকি বাড়ে।",
    interaction_en: "Prolonged use enhances anticoagulant effect of Warfarin. Enzyme-inducing drugs (Carbamazepine, Phenytoin) and alcohol increase hepatotoxicity risk.",
    contraindications_bn: "প্যারাসিটামলে অতিসংবেদনশীলতা এবং গুরুতর লিভার বা কিডনি বিকল রোগীদের ক্ষেত্রে নিষিদ্ধ।",
    contraindications_en: "Contraindicated in patients with known hypersensitivity to Paracetamol or severe hepatic/renal impairment.",
    side_effects_bn: "নির্ধারিত মাত্রায় পার্শ্বপ্রতিক্রিয়া নেই বললেই চলে। বিরল ক্ষেত্রে ত্বকে র‍্যাশ বা বমি ভাব হতে পারে।",
    side_effects_en: "Generally well-tolerated at recommended doses. Rare side effects include skin rash, nausea, or hepatotoxicity upon overdose.",
    pregnancy_cat_bn: "প্রেগন্যান্সি ক্যাটাগরি বি (গর্ভাবস্থায় ও স্তন্যদানকালে চিকিৎসকের পরামর্শে নিরাপদ)।",
    pregnancy_cat_en: "Pregnancy Category B. Safe during pregnancy and lactation at recommended therapeutic doses.",
    storage_bn: "৩০° সে. তাপমাত্রার নিচে, আলো ও আর্দ্রতা থেকে দূরে এবং শিশুদের নাগালের বাইরে রাখুন।",
    storage_en: "Store below 30°C in a dry place, protected from light and moisture."
  },
  Esomeprazole: {
    generic_bn: "ইসোমিপ্রাজল",
    generic_en: "Esomeprazole",
    category_key: "gastric",
    category_bn: "গ্যাস্ট্রিক ও আলসার",
    category_en: "Gastric & Ulcer",
    therapeutic_class_bn: "প্রোটন পাম্প ইনহিবিটর (PPI - গ্যাস্ট্রিক ও অ্যাসিডিটি রোধক)",
    therapeutic_class_en: "Proton Pump Inhibitor (PPI)",
    indications_bn: "গ্যাস্ট্রোইসোফেজিয়াল রিফ্লাক্স ডিজিজ (GERD), বুক জ্বালাপোড়া, অতিরিক্ত অ্যাসিডিটি, পেপটিক আলসার এবং ব্যথানাশক ওষুধ (NSAIDs) সেবনজনিত গ্যাস্ট্রিক আলসার প্রতিরোধে ব্যবহৃত হয়।",
    indications_en: "Gastroesophageal Reflux Disease (GERD), severe heartburn, acid reflux, peptic ulcer, H. pylori eradication, and NSAID-induced gastric ulcer prevention.",
    pharmacology_bn: "ইসোমিপ্রাজল পাকস্থলীর প্যারাইটাল কোষের H+/K+ ATPase (প্রোটন পাম্প) এনজাইমকে সুনির্দিষ্টভাবে ব্লক করে গ্যাস্ট্রিক অ্যাসিড নিঃসরণের চূড়ান্ত ধাপ বন্ধ করে।",
    pharmacology_en: "Specifically inhibits the H+/K+ ATPase enzyme system at the secretory surface of gastric parietal cells, blocking acid production.",
    dosage_bn: "প্রাপ্তবয়স্ক: প্রতিদিন ১টি ক্যাপসুল/ট্যাবলেট দিনে ১ থেকে ২ বার, খাবার খাওয়ার অন্তত ৩০-৬০ মিনিট আগে এক গ্লাস পানির সাথে গিলে খাবেন।",
    dosage_en: "Adults: 20-40 mg once or twice daily, taken at least 30-60 minutes before meals with water.",
    interaction_bn: "ক্লপিডোগ্রেল, কিটোকোনাজল, ইট্রাকোনাজল, আয়রন সল্ট এবং ডায়াজেপামের শোষণ ও কার্যকারিতা প্রভাবিত হতে পারে।",
    interaction_en: "May reduce antiplatelet activity of Clopidogrel and alter absorption of Ketoconazole, Itraconazole, Iron salts, and Diazepam.",
    contraindications_bn: "ইসোমিপ্রাজল বা অন্য কোনো প্রোটন পাম্প ইনহিবিটরের প্রতি অ্যালার্জি থাকলে নিষিদ্ধ।",
    contraindications_en: "Hypersensitivity to Esomeprazole or substituted benzimidazoles.",
    side_effects_bn: "মাথাব্যথা, পেটে বাতাস জমা, হালকা ডায়রিয়া, মুখ শুকিয়ে যাওয়া বা কোষ্ঠকাঠিন্য হতে পারে।",
    side_effects_en: "Headache, flatulence, mild diarrhea, abdominal pain, constipation, or dry mouth.",
    pregnancy_cat_bn: "প্রেগন্যান্সি ক্যাটাগরি বি (চিকিৎসকের পরামর্শে সেব্য)।",
    pregnancy_cat_en: "Pregnancy Category B. Use during pregnancy only if clearly needed.",
    storage_bn: "আলো ও আর্দ্রতা থেকে দূরে, ২৫° সে. তাপমাত্রার নিচে রাখুন।",
    storage_en: "Store below 25°C, protected from light and moisture."
  },
  Omeprazole: {
    generic_bn: "ওমিপ্রাজল",
    generic_en: "Omeprazole",
    category_key: "gastric",
    category_bn: "গ্যাস্ট্রিক ও আলসার",
    category_en: "Gastric & Ulcer",
    therapeutic_class_bn: "প্রোটন পাম্প ইনহিবিটর (PPI)",
    therapeutic_class_en: "Proton Pump Inhibitor (PPI)",
    indications_bn: "বুক জ্বালাপোড়া, গ্যাস্ট্রিক ও ডিওডেনাল আলসার, অ্যাসিড রিফ্লাক্স এবং জলিঞ্জার-এলিসন সিন্ড্রোমে নির্দেশিত।",
    indications_en: "Benign gastric and duodenal ulcers, GERD, heartburn, acid reflux, and Zollinger-Ellison syndrome.",
    pharmacology_bn: "পাকস্থলীর প্যারাইটাল কোষে হাইড্রোক্লোরিক অ্যাসিড নিঃসরণ অবরুদ্ধ করে ২৪ ঘণ্টা অ্যাসিড নিয়ন্ত্রণে রাখে।",
    pharmacology_en: "Suppresses gastric acid secretion by specific inhibition of the H+/K+ ATPase system in gastric parietal cells.",
    dosage_bn: "প্রাপ্তবয়স্ক: ২০ মি.গ্রা. ক্যাপসুল দিনে ১-২ বার খাবারের ৩০ মিনিট পূর্বে।",
    dosage_en: "Adults: 20 mg once or twice daily 30 minutes before meals.",
    interaction_bn: "ফেনিটয়েন, ওয়ারফারিন, ডায়াজেপাম ও ক্লপিডোগ্রেলের সাথে আন্তঃক্রিয়া হতে পারে।",
    interaction_en: "May prolong elimination of Diazepam, Warfarin, and Phenytoin; reduces efficacy of Clopidogrel.",
    contraindications_bn: "ওমিপ্রাজল বা পিপিআই গ্রুপের ওষুধে অতিসংবেদনশীলতা।",
    contraindications_en: "Known hypersensitivity to Omeprazole or any formulation component.",
    side_effects_bn: "মাথাব্যথা, ডায়রিয়া, পেট ফাঁপা বা হালকা বমি ভাব।",
    side_effects_en: "Headache, diarrhea, flatulence, nausea, or dizziness.",
    pregnancy_cat_bn: "প্রেগন্যান্সি ক্যাটাগরি সি (চিকিৎসকের পরামর্শে সেব্য)।",
    pregnancy_cat_en: "Pregnancy Category C. Consult physician before use.",
    storage_bn: "শুষ্ক ও ঠান্ডা স্থানে সংরক্ষণ করুন।",
    storage_en: "Store in a cool and dry place away from light."
  },
  Pantoprazole: {
    generic_bn: "প্যান্টোপ্রাজল",
    generic_en: "Pantoprazole",
    category_key: "gastric",
    category_bn: "গ্যাস্ট্রিক ও আলসার",
    category_en: "Gastric & Ulcer",
    therapeutic_class_bn: "প্রোটন পাম্প ইনহিবিটর (PPI - হার্টের রোগীদের জন্য অধিক নিরাপদ গ্যাস্ট্রিক ওষুধ)",
    therapeutic_class_en: "Proton Pump Inhibitor (PPI)",
    indications_bn: "গ্যাস্ট্রিক আলসার, ইরোসিভ ইসোফেজাইটিস, দীর্ঘমেয়াদী ব্যথানাশক বা হার্টের ওষুধের (Clopidogrel) সাথে পেটের সুরক্ষায় ব্যবহৃত।",
    indications_en: "Erosive esophagitis, peptic ulcer, GERD, and gastroprotection in patients taking cardiovascular antiplatelets.",
    pharmacology_bn: "পাকস্থলীর প্রোটন পাম্প নিষ্ক্রিয় করে অতিরিক্ত অ্যাসিড নিঃসরণ বন্ধ করে এবং অন্যান্য ওষুধের সাথে সবচেয়ে কম বিক্রিয়া করে।",
    pharmacology_en: "Inhibits gastric acid secretion with minimal cytochrome P450 drug-drug interactions compared to other PPIs.",
    dosage_bn: "প্রাপ্তবয়স্ক: ২০-৪০ মি.গ্রা. ট্যাবলেট দিনে ১-২ বার খাবারের ৩০ মিনিট আগে।",
    dosage_en: "Adults: 20-40 mg once or twice daily 30 minutes before food.",
    interaction_bn: "অন্যান্য পিপিআই-এর তুলনায় ক্লপিডোগ্রেলের সাথে অনেক নিরাপদ; তবে কিটোকোনাজলের শোষণ কমাতে পারে।",
    interaction_en: "Minimal CYP2C19 interaction; may reduce absorption of pH-dependent drugs like Ketoconazole.",
    contraindications_bn: "প্যান্টোপ্রাজলে সংবেদনশীলতা।",
    contraindications_en: "Hypersensitivity to Pantoprazole.",
    side_effects_bn: "হালকা মাথাব্যথা বা পেটে অস্বস্তি।",
    side_effects_en: "Mild headache, diarrhea, or abdominal discomfort.",
    pregnancy_cat_bn: "প্রেগন্যান্সি ক্যাটাগরি বি।",
    pregnancy_cat_en: "Pregnancy Category B.",
    storage_bn: "৩০° সে. তাপমাত্রার নিচে রাখুন।",
    storage_en: "Store below 30°C."
  },
  Azithromycin: {
    generic_bn: "অ্যাজিথ্রোমাইসিন",
    generic_en: "Azithromycin",
    category_key: "antibiotic",
    category_bn: "অ্যান্টিবায়োটিক",
    category_en: "Antibiotic",
    therapeutic_class_bn: "ম্যাক্রোলাইড অ্যান্টিবায়োটিক (ব্যাকটেরিয়া নাশক)",
    therapeutic_class_en: "Macrolide Antibiotic",
    indications_bn: "শ্বাসনালীর সংক্রমণ (ব্রংকাইটিস, নিউমোনিয়া), টনসিলাইটিস, ফ্যারিনজাইটিস, সাইনোসাইটিস, কানের ইনফেকশন (Otitis Media), ত্বকের সংক্রমণ এবং টাইফয়েড জ্বরে ব্যবহৃত।",
    indications_en: "Respiratory tract infections (bronchitis, pneumonia), tonsillitis, sinusitis, otitis media, skin & soft tissue infections, and uncomplicated typhoid.",
    pharmacology_bn: "ব্যাকটেরিয়ার 50S রাইবোজোমাল সাবইউনিটের সাথে যুক্ত হয়ে প্রোটিন সংশ্লেষণ বন্ধ করে ব্যাকটেরিয়ার বংশবৃদ্ধি নির্মূল করে।",
    pharmacology_en: "Binds to the 50S ribosomal subunit of susceptible microorganisms and inhibits bacterial protein synthesis.",
    dosage_bn: "প্রাপ্তবয়স্ক: প্রতিদিন ৫০০ মি.গ্রা. এর ১টি ট্যাবলেট দিনে ১ বার (টানা ৩ থেকে ৫ দিন)। অ্যান্টিবায়োটিকের পূর্ণ কোর্স সম্পন্ন করা বাধ্যতামূলক।",
    dosage_en: "Adults: 500 mg once daily for 3 to 5 days. Must complete the full prescribed course.",
    interaction_bn: "অ্যান্টাসিড (অ্যালুমিনিয়াম/ম্যাগনেসিয়াম) একই সাথে খেলে শোষণ কমে যায়; অন্তত ২ ঘণ্টা বিরতি দিন।",
    interaction_en: "Aluminum and magnesium-containing antacids reduce peak serum levels; administer at least 2 hours apart.",
    contraindications_bn: "ম্যাক্রোলাইড অ্যান্টিবায়োটিকে অ্যালার্জি বা গুরুতর লিভার জন্ডিসে নিষিদ্ধ।",
    contraindications_en: "Hypersensitivity to macrolides or history of cholestatic jaundice/hepatic dysfunction.",
    side_effects_bn: "বমি ভাব, পেটে মোচড়ানো, হালকা পাতলা পায়খানা বা অরুচি হতে পারে।",
    side_effects_en: "Nausea, abdominal cramping, mild diarrhea, or flatulence.",
    pregnancy_cat_bn: "প্রেগন্যান্সি ক্যাটাগরি বি (শুধুমাত্র রেজিস্টার্ড ডাক্তারের প্রেসক্রিপশনে সেব্য)।",
    pregnancy_cat_en: "Pregnancy Category B (Use strictly under registered physician's prescription).",
    storage_bn: "৩০° সে. তাপমাত্রার নিচে শুষ্ক স্থানে রাখুন।",
    storage_en: "Store below 30°C in a dry place."
  },
  Cefixime: {
    generic_bn: "সেফিক্সিম",
    generic_en: "Cefixime",
    category_key: "antibiotic",
    category_bn: "অ্যান্টিবায়োটিক",
    category_en: "Antibiotic",
    therapeutic_class_bn: "তৃতীয় প্রজন্মের সেফালোস্পোরিন অ্যান্টিবায়োটিক",
    therapeutic_class_en: "3rd Generation Cephalosporin Antibiotic",
    indications_bn: "প্রস্রাবের রাস্তায় ইনফেকশন (UTI), টাইফয়েড জ্বর (Enteric Fever), শ্বাসনালীর সংক্রমণ, নিউমোনিয়া, টনসিলাইটিস ও গনোরিয়ায় নির্দেশিত।",
    indications_en: "Urinary Tract Infections (UTI), typhoid fever, acute bronchitis, pneumonia, tonsillitis, pharyngitis, and otitis media.",
    pharmacology_bn: "ব্যাকটেরিয়ার কোষপ্রাচীর (Cell Wall) তৈরি বন্ধ করে ব্যাকটেরিয়া ধ্বংস করে (Bactericidal)।",
    pharmacology_en: "Exerts bactericidal activity by interfering with bacterial cell wall peptidoglycan synthesis.",
    dosage_bn: "প্রাপ্তবয়স্ক: ২০০ মি.গ্রা. ক্যাপসুল দিনে ২ বার (১২ ঘণ্টা পরপর) অথবা ৪০০ মি.গ্রা. দিনে ১ বার, ৭ থেকে ১৪ দিন।",
    dosage_en: "Adults: 200 mg twice daily (every 12 hours) or 400 mg once daily for 7 to 14 days.",
    interaction_bn: "ওয়ারফারিন, কার্বামাজেপিন ও প্রোবেনেসিডের সাথে সতর্কতার সাথে ব্যবহার্য।",
    interaction_en: "Enhances anticoagulant effect of Warfarin; Probenecid increases serum concentration of Cefixime.",
    contraindications_bn: "সেফালোস্পোরিন বা পেনিসিলিন গ্রুপের অ্যান্টিবায়োটিকে অ্যালার্জি থাকলে নিষিদ্ধ।",
    contraindications_en: "Known allergy to Cephalosporin or Penicillin group antibiotics.",
    side_effects_bn: "পাতলা পায়খানা, পেট ব্যথা, বদহজম বা বমি ভাব।",
    side_effects_en: "Diarrhea, loose stools, abdominal pain, dyspepsia, or mild nausea.",
    pregnancy_cat_bn: "প্রেগন্যান্সি ক্যাটাগরি বি।",
    pregnancy_cat_en: "Pregnancy Category B.",
    storage_bn: "আলো ও আর্দ্রতা থেকে দূরে, ৩০° সে. এর নিচে রাখুন।",
    storage_en: "Store below 30°C away from light and moisture."
  },
  Montelukast: {
    generic_bn: "মন্টেলুকাস্ট",
    generic_en: "Montelukast",
    category_key: "allergy",
    category_bn: "অ্যালার্জি ও হাঁপানি",
    category_en: "Allergy & Asthma",
    therapeutic_class_bn: "লিউকোট্রিন রিসেপ্টর অ্যান্টাগনিস্ট (হাঁপানি ও অ্যালার্জি রোধক)",
    therapeutic_class_en: "Leukotriene Receptor Antagonist",
    indications_bn: "অ্যাজমা বা হাঁপানি প্রতিরোধ ও দীর্ঘমেয়াদী নিয়ন্ত্রণ, মৌসুমি অ্যালার্জিক রাইনাইটিস (অতিরিক্ত হাঁচি, নাক বন্ধ থাকা) এবং ব্যায়ামজনিত শ্বাসকষ্ট রোধে ব্যবহৃত।",
    indications_en: "Prophylaxis and chronic management of asthma, seasonal and perennial allergic rhinitis, and exercise-induced bronchoconstriction.",
    pharmacology_bn: "সিস্টিনাইল লিউকোট্রিন (CysLT1) রিসেপ্টর ব্লক করে শ্বাসনালীর প্রদাহ, শ্লেষ্মা ও সংকোচন রোধ করে।",
    pharmacology_en: "Selectively binds to Cysteinyl Leukotriene (CysLT1) receptors in the airway, preventing bronchoconstriction and inflammation.",
    dosage_bn: "১৫ বছর ও প্রাপ্তবয়স্কদের জন্য: প্রতিদিন রাতে ঘুমানোর আগে ১০ মি.গ্রা. এর ১টি ট্যাবলেট।",
    dosage_en: "Adults & adolescents (15+ years): One 10 mg tablet once daily in the evening.",
    interaction_bn: "ফেনোবারবিটাল, ফেনিটয়েন বা রিফাম্পিসিনের সাথে সতর্কতার সাথে সেব্য।",
    interaction_en: "Phenobarbital and Rifampicin may decrease plasma concentration of Montelukast.",
    contraindications_bn: "মন্টেলুকাস্টের প্রতি অ্যালার্জি। তীব্র হাঁপানির তাৎক্ষণিক অ্যাটাক থামাতে ইনহেলারের বিকল্প নয়।",
    contraindications_en: "Hypersensitivity to Montelukast. Not indicated for reversal of acute asthma attacks.",
    side_effects_bn: "মাথাব্যথা, গলা শুকানো, ঘুমের তারতম্য বা হালকা পেট ব্যথা।",
    side_effects_en: "Headache, dizziness, sleep disturbances, or mild abdominal pain.",
    pregnancy_cat_bn: "প্রেগন্যান্সি ক্যাটাগরি বি।",
    pregnancy_cat_en: "Pregnancy Category B.",
    storage_bn: "আর্দ্রতা ও আলো থেকে দূরে রাখুন।",
    storage_en: "Protect from moisture and light."
  },
  Fexofenadine: {
    generic_bn: "ফেক্সোফেনাডিন",
    generic_en: "Fexofenadine",
    category_key: "allergy",
    category_bn: "অ্যালার্জি ও হাঁপানি",
    category_en: "Allergy & Asthma",
    therapeutic_class_bn: "নন-সিডোটিভ অ্যান্টিহিস্টামিন (ঘুম ভাবহীন অ্যালার্জির ওষুধ)",
    therapeutic_class_en: "Non-sedating 2nd Generation H1 Antihistamine",
    indications_bn: "সর্দি, হাঁচি, নাক দিয়ে পানি পড়া, চোখ চুলকানো এবং ত্বকের অ্যালার্জি বা আর্টিক্যারিয়া (চুলকানি ও লাল চাকা হওয়া) দূর করতে ব্যবহৃত।",
    indications_en: "Seasonal allergic rhinitis (sneezing, runny nose, itchy eyes) and chronic idiopathic urticaria (hives & skin itching).",
    pharmacology_bn: "পেরিফেরাল H1-রিসেপ্টরকে ব্লক করে হিস্টামিনের অ্যালার্জিক ক্রিয়া বন্ধ করে; মস্তিষ্কে প্রবেশ করে না বলে ঘুম ঘুম ভাব হয় না।",
    pharmacology_en: "Selectively blocks peripheral H1-receptors without crossing the blood-brain barrier, avoiding sedation.",
    dosage_bn: "প্রাপ্তবয়স্ক ও ১২ বছরের ঊর্ধ্বে: ১২০ মি.গ্রা. বা ১৮০ মি.গ্রা. ট্যাবলেট দিনে ১ বার পানির সাথে সেব্য।",
    dosage_en: "Adults & children 12+ years: 120 mg or 180 mg tablet once daily with water.",
    interaction_bn: "ফলের রস (কমলা বা আপেল জুস) এবং অ্যান্টাসিডের সাথে একত্রে খেলে শোষণ কমে যায়।",
    interaction_en: "Fruit juices (orange, apple, grapefruit) and aluminum/magnesium antacids reduce oral bioavailability.",
    contraindications_bn: "ফেক্সোফেনাডিনে অতিসংবেদনশীলতা।",
    contraindications_en: "Known hypersensitivity to Fexofenadine.",
    side_effects_bn: "হালকা মাথাব্যথা, মাথা ঘোরা বা মুখ শুকিয়ে যাওয়া।",
    side_effects_en: "Mild headache, dizziness, or dry mouth.",
    pregnancy_cat_bn: "প্রেগন্যান্সি ক্যাটাগরি সি।",
    pregnancy_cat_en: "Pregnancy Category C.",
    storage_bn: "শুষ্ক ও ঠান্ডা স্থানে রাখুন।",
    storage_en: "Store in a cool, dry place."
  },
  Metformin: {
    generic_bn: "মেটফরমিন হাইড্রোক্লোরাইড",
    generic_en: "Metformin Hydrochloride",
    category_key: "diabetes",
    category_bn: "ডায়াবেটিস ও প্রেশার",
    category_en: "Diabetes & BP",
    therapeutic_class_bn: "বাইগুয়ানাইড অ্যান্টি-ডায়াবেটিক (রক্তের শর্করা নিয়ন্ত্রক)",
    therapeutic_class_en: "Biguanide Oral Antidiabetic",
    indications_bn: "টাইপ-২ ডায়াবেটিস মেলিটাস নিয়ন্ত্রণে এবং পলিসিস্টিক ওভারি সিন্ড্রোমে (PCOS) ইনসুলিন সংবেদনশীলতা বাড়াতে নির্দেশিত।",
    indications_en: "Management of Type 2 Diabetes Mellitus and improving insulin sensitivity in Polycystic Ovary Syndrome (PCOS).",
    pharmacology_bn: "লিভার থেকে গ্লুকোজ উৎপাদন কমায়, অন্ত্রে গ্লুকোজ শোষণ হ্রাস করে এবং শরীরের কোষে ইনসুলিনের কার্যকারিতা বৃদ্ধি করে।",
    pharmacology_en: "Decreases hepatic glucose production, decreases intestinal absorption of glucose, and improves peripheral insulin sensitivity.",
    dosage_bn: "শুরুতে ৫০০ মি.গ্রা. দিনে ১-২ বার অথবা ৮৫০ মি.গ্রা. দিনে ১ বার খাবারের সাথে বা খাবারের ঠিক পরে।",
    dosage_en: "Initially 500 mg once or twice daily or 850 mg once daily with or immediately after meals.",
    interaction_bn: "আয়োডিনেটেড কন্ট্রাস্ট ডাই, সিমেটিডিন ও অতিরিক্ত অ্যালকোহল ল্যাকটিক অ্যাসিডোসিসের ঝুঁকি বাড়ায়।",
    interaction_en: "Iodinated contrast media, Cimetidine, and alcohol increase the risk of lactic acidosis.",
    contraindications_bn: "গুরুতর কিডনি রোগ (eGFR < 30) এবং ডায়াবেটিক কিটোঅ্যাসিডোসিস।",
    contraindications_en: "Severe renal impairment (eGFR < 30 mL/min) and acute metabolic acidosis.",
    side_effects_bn: "মুখে ধাতব স্বাদ, বমি ভাব বা পেট খারাপ (খাবারের সাথে খেলে কমে যায়)।",
    side_effects_en: "Metallic taste, mild GI upset, nausea, or diarrhea (minimized by taking with meals).",
    pregnancy_cat_bn: "প্রেগন্যান্সি ক্যাটাগরি বি।",
    pregnancy_cat_en: "Pregnancy Category B.",
    storage_bn: "শুষ্ক ও ঠান্ডা স্থানে সংরক্ষণ করুন।",
    storage_en: "Store in a cool and dry place."
  },
  Amlodipine: {
    generic_bn: "অ্যামলোডিপিন",
    generic_en: "Amlodipine",
    category_key: "diabetes",
    category_bn: "ডায়াবেটিস ও প্রেশার",
    category_en: "Diabetes & BP",
    therapeutic_class_bn: "ক্যালসিয়াম চ্যানেল ব্লকার (উচ্চ রক্তচাপ ও বুকে ব্যথা রোধক)",
    therapeutic_class_en: "Calcium Channel Blocker (Antihypertensive)",
    indications_bn: "উচ্চ রক্তচাপ (Hypertension) এবং করোনারি আর্টারি ডিজিজ বা অ্যানজাইনা (হার্টের রক্তনালীর সংকোচনজনিত বুকে ব্যথা) নিয়ন্ত্রণে ব্যবহৃত।",
    indications_en: "Essential hypertension (high blood pressure), chronic stable angina, and vasospastic angina.",
    pharmacology_bn: "রক্তনালীর মসৃণ পেশিতে ক্যালসিয়াম আয়ন প্রবেশে বাধা দিয়ে রক্তনালী প্রসারিত করে এবং রক্তচাপ কমায়।",
    pharmacology_en: "Inhibits transmembrane influx of calcium ions into vascular smooth muscle, causing vasodilation and reducing peripheral resistance.",
    dosage_bn: "প্রাপ্তবয়স্ক: প্রতিদিন ৫ মি.গ্রা. এর ১টি ট্যাবলেট দিনে ১ বার নির্দিষ্ট সময়ে (প্রয়োজনে ১০ মি.গ্রা. পর্যন্ত)।",
    dosage_en: "Adults: 5 mg once daily; may be increased to a maximum of 10 mg once daily.",
    interaction_bn: "সিমভাস্ট্যাটিন, সাইক্লোস্পোরিন ও অ্যান্টিফাঙ্গাল ওষুধের সাথে সতর্কতা প্রয়োজন।",
    interaction_en: "May increase exposure to Simvastatin and Cyclosporine; CYP3A4 inhibitors increase plasma levels.",
    contraindications_bn: "অতিরিক্ত নিম্ন রক্তচাপ (Severe Hypotension) ও কার্ডিওজেনিক শক।",
    contraindications_en: "Severe hypotension, aortic stenosis, and cardiogenic shock.",
    side_effects_bn: "গোড়ালি বা পায়ে হালকা পানি আসা (Edema), মুখ লালচে হওয়া বা মাথাব্যথা।",
    side_effects_en: "Peripheral ankle edema, facial flushing, palpitations, or headache.",
    pregnancy_cat_bn: "প্রেগন্যান্সি ক্যাটাগরি সি।",
    pregnancy_cat_en: "Pregnancy Category C.",
    storage_bn: "আলো ও আর্দ্রতা থেকে দূরে রাখুন।",
    storage_en: "Store away from light and moisture."
  },
  CalciumD3: {
    generic_bn: "ক্যালসিয়াম ৫০০ মি.গ্রা. + ভিটামিন ডি৩",
    generic_en: "Calcium 500mg + Vitamin D3",
    category_key: "vitamin",
    category_bn: "ভিটামিন ও স্যালাইন",
    category_en: "Vitamins & ORS",
    therapeutic_class_bn: "ক্যালসিয়াম ও ভিটামিন সাপ্লিমেন্ট (হাড় ও দাঁতের ক্ষয়রোধক)",
    therapeutic_class_en: "Calcium & Vitamin D3 Bone Supplement",
    indications_bn: "হাড়ের ক্ষয়রোগ (Osteoporosis), ক্যালসিয়াম ও ভিটামিন ডি-এর অভাব, হাড় ও কোমর ব্যথা, গর্ভাবস্থা ও স্তন্যদানকালে ক্যালসিয়ামের চাহিদা পূরণে ব্যবহৃত।",
    indications_en: "Osteoporosis, osteomalacia, rickets, bone & joint weakness, and increased calcium demand during pregnancy and lactation.",
    pharmacology_bn: "ভিটামিন ডি৩ অন্ত্র থেকে ক্যালসিয়াম শোষণে সাহায্য করে এবং হাড়ের ঘনত্ব ও মজবুতি বজায় রাখে।",
    pharmacology_en: "Vitamin D3 facilitates active intestinal calcium absorption and promotes bone mineralization.",
    dosage_bn: "প্রতিদিন ১টি করে ট্যাবলেট দিনে ১ থেকে ২ বার ভরা পেটে সেব্য।",
    dosage_en: "1 tablet once or twice daily with plenty of water after meals.",
    interaction_bn: "টেট্রাসাইক্লিন, ফ্লুরোকুইনোলোন ও আয়রন ট্যাবলেটের সাথে অন্তত ২-৩ ঘণ্টা বিরতি রেখে খেতে হবে।",
    interaction_en: "Space at least 2-3 hours apart from Tetracycline/Quinolone antibiotics and oral Iron supplements.",
    contraindications_bn: "রক্তে অতিরিক্ত ক্যালসিয়াম (Hypercalcemia) বা কিডনিতে ক্যালসিয়াম পাথর থাকলে নিষিদ্ধ।",
    contraindications_en: "Hypercalcemia, hypercalciuria, and severe renal calculi (kidney stones).",
    side_effects_bn: "হালকা কোষ্ঠকাঠিন্য বা পেটে গ্যাস হতে পারে।",
    side_effects_en: "Mild constipation, flatulence, or bloating.",
    pregnancy_cat_bn: "গর্ভাবস্থায় ও স্তন্যদানকালে সম্পূর্ণ নিরাপদ।",
    pregnancy_cat_en: "Completely safe during pregnancy and lactation.",
    storage_bn: "শুষ্ক ও ঠান্ডা স্থানে রাখুন।",
    storage_en: "Store in a cool, dry place."
  },
  ORS: {
    generic_bn: "ওরাল রিহাইড্রেশন সল্ট (খাবার স্যালাইন)",
    generic_en: "Oral Rehydration Salt (ORS)",
    category_key: "vitamin",
    category_bn: "ভিটামিন ও স্যালাইন",
    category_en: "Vitamins & ORS",
    therapeutic_class_bn: "ইলেকট্রোলাইট ও পানিশূন্যতা পূরণকারী (WHO অনুমোদিত ফর্মুলা)",
    therapeutic_class_en: "WHO Reduced Osmolarity Oral Electrolyte",
    indications_bn: "ডায়রিয়া, বমি, অতিরিক্ত ঘাম, ডেঙ্গু জ্বর, হিটস্ট্রোক বা গরমে পানিশূন্যতা ও লবণের ঘাটতি দ্রুত পূরণে ব্যবহৃত।",
    indications_en: "Prevention and treatment of fluid and electrolyte depletion due to diarrhea, vomiting, dengue fever, or excessive sweating.",
    pharmacology_bn: "অন্ত্রে সোডিয়াম-গ্লুকোজ কো-ট্রান্সপোর্ট প্রক্রিয়ার মাধ্যমে শরীরে পানি ও ইলেকট্রোলাইট দ্রুত শোষণ করে।",
    pharmacology_en: "Utilizes sodium-glucose cotransport in the small intestine to rapidly restore water and electrolyte balance.",
    dosage_bn: "১ প্যাকেট স্যালাইন আধা লিটার (৫০০ মি.লি.) বিশুদ্ধ ঠান্ডা পানিতে গুলে প্রতিবার পাতলা পায়খানার পর পান করুন। গোলানো স্যালাইন ১২ ঘণ্টা পর্যন্ত ভালো থাকে।",
    dosage_en: "Dissolve 1 full sachet in 500 ml (half liter) of clean drinking water. Discard unused solution after 12 hours.",
    interaction_bn: "অন্য কোনো ওষুধের সাথে বিরূপ প্রতিক্রিয়া নেই।",
    interaction_en: "No known adverse drug interactions.",
    contraindications_bn: "তীব্র কিডনি অকেজো (Anuria) বা অন্ত্রের প্রতিবন্ধকতা (Intestinal Obstruction)।",
    contraindications_en: "Anuria or severe intestinal obstruction/paralytic ileus.",
    side_effects_bn: "সঠিক নিয়মে ৫০০ মি.লি. পানিতে গুলে খেলে কোনো পার্শ্বপ্রতিক্রিয়া নেই।",
    side_effects_en: "None when prepared accurately with 500 ml water.",
    pregnancy_cat_bn: "সকল বয়সী, শিশু ও গর্ভবতীদের জন্য ১০০% নিরাপদ।",
    pregnancy_cat_en: "100% safe for all ages, infants, and pregnant women.",
    storage_bn: "শুষ্ক স্থানে রাখুন।",
    storage_en: "Store in a cool and dry place."
  }
};

function makeMed(
  id: string,
  slug: string,
  name_bn: string,
  name_en: string,
  profileKey: keyof typeof GENERIC_PROFILES,
  strength_bn: string,
  strength_en: string,
  dosage_form_bn: string,
  dosage_form_en: string,
  manufacturer_bn: string,
  manufacturer_en: string,
  unit_price: number,
  strip_price: number,
  is_prescription_required: boolean,
  pack_unit_bn = "পিস",
  pack_unit_en = "Piece"
): MedicineRecord {
  return {
    id,
    slug,
    name_bn,
    name_en,
    strength_bn,
    strength_en,
    dosage_form_bn,
    dosage_form_en,
    manufacturer_bn,
    manufacturer_en,
    unit_price,
    strip_price,
    pack_unit_bn,
    pack_unit_en,
    is_prescription_required,
    ...GENERIC_PROFILES[profileKey],
  };
}

export const MEDICINES_DATA: MedicineRecord[] = [
  // 1. Paracetamol Brands
  makeMed("m-1", "napa-extend-665mg", "নাপা এক্সটেন্ড", "Napa Extend", "Paracetamol", "৬৬৫ মি.গ্রা.", "665 mg", "ট্যাবলেট", "Tablet", "বেক্সিমকো ফার্মাসিউটিক্যালস লিমিটেড", "Beximco Pharmaceuticals Ltd.", 2.0, 24.0, false),
  makeMed("m-2", "napa-500mg", "নাপা ৫০০", "Napa 500", "Paracetamol", "৫০০ মি.গ্রা.", "500 mg", "ট্যাবলেট", "Tablet", "বেক্সিমকো ফার্মাসিউটিক্যালস লিমিটেড", "Beximco Pharmaceuticals Ltd.", 1.2, 12.0, false),
  makeMed("m-3", "ace-500mg", "এইস ৫০০", "Ace 500", "Paracetamol", "৫০০ মি.গ্রা.", "500 mg", "ট্যাবলেট", "Tablet", "স্কয়ার ফার্মাসিউটিক্যালস লিমিটেড", "Square Pharmaceuticals Ltd.", 1.2, 12.0, false),
  makeMed("m-4", "reset-500mg", "রিসেট ৫০০", "Reset 500", "Paracetamol", "৫০০ মি.গ্রা.", "500 mg", "ট্যাবলেট", "Tablet", "ইনসেপ্টা ফার্মাসিউটিক্যালস লিমিটেড", "Incepta Pharmaceuticals Ltd.", 1.0, 10.0, false),
  makeMed("m-5", "fast-500mg", "ফাস্ট ৫০০", "Fast 500", "Paracetamol", "৫০০ মি.গ্রা.", "500 mg", "ট্যাবলেট", "Tablet", "একমি ল্যাবরেটরিজ লিমিটেড", "ACME Laboratories Ltd.", 1.1, 11.0, false),

  // 2. Esomeprazole Brands
  makeMed("m-6", "sergel-20mg", "সার্জেল ২০", "Sergel 20", "Esomeprazole", "২০ মি.গ্রা.", "20 mg", "ক্যাপসুল", "Capsule", "হেলথকেয়ার ফার্মাসিউটিক্যালস লিমিটেড", "Healthcare Pharmaceuticals Ltd.", 7.0, 70.0, false),
  makeMed("m-7", "maxpro-20mg", "ম্যাক্সপ্রো ২০", "Maxpro 20", "Esomeprazole", "২০ মি.গ্রা.", "20 mg", "ট্যাবলেট", "Tablet", "রেনাটা পিএলসি", "Renata PLC", 7.0, 70.0, false),
  makeMed("m-8", "nexum-20mg", "নেক্সাম ২০", "Nexum 20", "Esomeprazole", "২০ মি.গ্রা.", "20 mg", "ক্যাপসুল", "Capsule", "স্কয়ার ফার্মাসিউটিক্যালস লিমিটেড", "Square Pharmaceuticals Ltd.", 7.0, 70.0, false),
  makeMed("m-9", "esonix-20mg", "ইসোনিক্স ২০", "Esonix 20", "Esomeprazole", "২০ মি.গ্রা.", "20 mg", "ক্যাপসুল", "Capsule", "ইনসেপ্টা ফার্মাসিউটিক্যালস লিমিটেড", "Incepta Pharmaceuticals Ltd.", 6.0, 60.0, false),

  // 3. Omeprazole Brands
  makeMed("m-10", "seclo-20mg", "সেক্লো ২০", "Seclo 20", "Omeprazole", "২০ মি.গ্রা.", "20 mg", "ক্যাপসুল", "Capsule", "স্কয়ার ফার্মাসিউটিক্যালস লিমিটেড", "Square Pharmaceuticals Ltd.", 6.0, 60.0, false),
  makeMed("m-11", "losectil-20mg", "লোসেকটিল ২০", "Losectil 20", "Omeprazole", "২০ মি.গ্রা.", "20 mg", "ক্যাপসুল", "Capsule", "এসকেএফ ফার্মাসিউটিক্যালস লিমিটেড", "Eskayef Pharmaceuticals Ltd. (SK+F)", 5.5, 55.0, false),
  makeMed("m-12", "ppi-20mg", "পিপিআই ২০", "PPI 20", "Omeprazole", "২০ মি.গ্রা.", "20 mg", "ক্যাপসুল", "Capsule", "একমি ল্যাবরেটরিজ লিমিটেড", "ACME Laboratories Ltd.", 5.0, 50.0, false),

  // 4. Pantoprazole Brands
  makeMed("m-13", "pantonix-20mg", "প্যানটনিক্স ২০", "Pantonix 20", "Pantoprazole", "২০ মি.গ্রা.", "20 mg", "ট্যাবলেট", "Tablet", "ইনসেপ্টা ফার্মাসিউটিক্যালস লিমিটেড", "Incepta Pharmaceuticals Ltd.", 7.0, 70.0, false),
  makeMed("m-14", "truelink-20mg", "ট্রুলিংক ২০", "Truelink 20", "Pantoprazole", "২০ মি.গ্রা.", "20 mg", "ট্যাবলেট", "Tablet", "স্কয়ার ফার্মাসিউটিক্যালস লিমিটেড", "Square Pharmaceuticals Ltd.", 6.5, 65.0, false),

  // 5. Azithromycin Brands
  makeMed("m-15", "zimax-500mg", "জিমেক্স ৫০০", "Zimax 500", "Azithromycin", "৫০০ মি.গ্রা.", "500 mg", "ট্যাবলেট", "Tablet", "স্কয়ার ফার্মাসিউটিক্যালস লিমিটেড", "Square Pharmaceuticals Ltd.", 35.0, 105.0, true),
  makeMed("m-16", "azithrox-500mg", "অ্যাজিথ্রোক্স ৫০০", "Azithrox 500", "Azithromycin", "৫০০ মি.গ্রা.", "500 mg", "ট্যাবলেট", "Tablet", "ইনসেপ্টা ফার্মাসিউটিক্যালস লিমিটেড", "Incepta Pharmaceuticals Ltd.", 32.0, 96.0, true),
  makeMed("m-17", "azmasin-500mg", "অ্যাজমাসিন ৫০০", "Azmasin 500", "Azithromycin", "৫০০ মি.গ্রা.", "500 mg", "ট্যাবলেট", "Tablet", "বেক্সিমকো ফার্মাসিউটিক্যালস লিমিটেড", "Beximco Pharmaceuticals Ltd.", 30.0, 90.0, true),

  // 6. Cefixime Brands
  makeMed("m-18", "cef-3-200mg", "সেফ-৩ ২০০", "Cef-3 200", "Cefixime", "২০০ মি.গ্রা.", "200 mg", "ক্যাপসুল", "Capsule", "স্কয়ার ফার্মাসিউটিক্যালস লিমিটেড", "Square Pharmaceuticals Ltd.", 35.0, 245.0, true),
  makeMed("m-19", "denvar-200mg", "ডেনভার ২০০", "Denvar 200", "Cefixime", "২০০ মি.গ্রা.", "200 mg", "ক্যাপসুল", "Capsule", "হেলথকেয়ার ফার্মাসিউটিক্যালস লিমিটেড", "Healthcare Pharmaceuticals Ltd.", 32.0, 224.0, true),
  makeMed("m-20", "orcef-200mg", "ওরসেফ ২০০", "Orcef 200", "Cefixime", "২০০ মি.গ্রা.", "200 mg", "ক্যাপসুল", "Capsule", "ইনসেপ্টা ফার্মাসিউটিক্যালস লিমিটেড", "Incepta Pharmaceuticals Ltd.", 30.0, 210.0, true),

  // 7. Montelukast Brands
  makeMed("m-21", "monas-10mg", "মোনাস ১০", "Monas 10", "Montelukast", "১০ মি.গ্রা.", "10 mg", "ট্যাবলেট", "Tablet", "একমি ল্যাবরেটরিজ লিমিটেড", "ACME Laboratories Ltd.", 16.0, 240.0, true),
  makeMed("m-22", "mirakast-10mg", "মিরাকাস্ট ১০", "Mirakast 10", "Montelukast", "১০ মি.গ্রা.", "10 mg", "ট্যাবলেট", "Tablet", "স্কয়ার ফার্মাসিউটিক্যালস লিমিটেড", "Square Pharmaceuticals Ltd.", 15.0, 150.0, true),
  makeMed("m-23", "provair-10mg", "প্রোভেয়ার ১০", "Provair 10", "Montelukast", "১০ মি.গ্রা.", "10 mg", "ট্যাবলেট", "Tablet", "ইনসেপ্টা ফার্মাসিউটিক্যালস লিমিটেড", "Incepta Pharmaceuticals Ltd.", 14.0, 140.0, true),

  // 8. Fexofenadine Brands
  makeMed("m-24", "fexo-120mg", "ফেক্সো ১২০", "Fexo 120", "Fexofenadine", "১২০ মি.গ্রা.", "120 mg", "ট্যাবলেট", "Tablet", "স্কয়ার ফার্মাসিউটিক্যালস লিমিটেড", "Square Pharmaceuticals Ltd.", 9.0, 90.0, false),
  makeMed("m-25", "fenadin-120mg", "ফেনাডিন ১২০", "Fenadin 120", "Fexofenadine", "১২০ মি.গ্রা.", "120 mg", "ট্যাবলেট", "Tablet", "রেনাটা পিএলসি", "Renata PLC", 8.5, 85.0, false),

  // 9. Metformin & Amlodipine Brands
  makeMed("m-26", "comet-500mg", "কমেট ৫০০", "Comet 500", "Metformin", "৫০০ মি.গ্রা.", "500 mg", "ট্যাবলেট", "Tablet", "স্কয়ার ফার্মাসিউটিক্যালস লিমিটেড", "Square Pharmaceuticals Ltd.", 4.0, 40.0, true),
  makeMed("m-27", "nobesit-500mg", "নোবেসিট ৫০০", "Nobesit 500", "Metformin", "৫০০ মি.গ্রা.", "500 mg", "ট্যাবলেট", "Tablet", "ইনসেপ্টা ফার্মাসিউটিক্যালস লিমিটেড", "Incepta Pharmaceuticals Ltd.", 3.5, 35.0, true),
  makeMed("m-28", "amdocal-5mg", "অ্যামডোক্যাল ৫", "Amdocal 5", "Amlodipine", "৫ মি.গ্রা.", "5 mg", "ট্যাবলেট", "Tablet", "বেক্সিমকো ফার্মাসিউটিক্যালস লিমিটেড", "Beximco Pharmaceuticals Ltd.", 7.0, 70.0, true),
  makeMed("m-29", "camlodin-5mg", "ক্যামলোডিন ৫", "Camlodin 5", "Amlodipine", "৫ মি.গ্রা.", "5 mg", "ট্যাবলেট", "Tablet", "স্কয়ার ফার্মাসিউটিক্যালস লিমিটেড", "Square Pharmaceuticals Ltd.", 6.5, 65.0, true),

  // 10. Calcium & ORS Brands
  makeMed("m-30", "calbo-d-tablet", "ক্যালবো-ডি", "Calbo-D", "CalciumD3", "৫০০ মি.গ্রা. + ২০০ আইইউ", "500 mg + 200 IU", "ট্যাবলেট", "Tablet", "স্কয়ার ফার্মাসিউটিক্যালস লিমিটেড", "Square Pharmaceuticals Ltd.", 8.0, 120.0, false),
  makeMed("m-31", "ostocal-d-tablet", "অস্টোক্যাল-ডি", "Ostocal-D", "CalciumD3", "৫০০ মি.গ্রা. + ২০০ আইইউ", "500 mg + 200 IU", "ট্যাবলেট", "Tablet", "এসকেএফ ফার্মাসিউটিক্যালস লিমিটেড", "Eskayef Pharmaceuticals Ltd. (SK+F)", 7.5, 112.5, false),
  makeMed("m-32", "orsaline-n-smc", "ওরস্যালাইন-এন (এসএমসি)", "Orsaline-N (SMC)", "ORS", "১০.২৫ গ্রাম স্যাশেট", "10.25 gm Sachet", "পাউডার স্যাশেট", "Powder Sachet", "এসএমসি এন্টারপ্রাইজ লিমিটেড", "SMC Enterprise Ltd.", 6.0, 120.0, false, "প্যাকেট", "Sachet"),
];