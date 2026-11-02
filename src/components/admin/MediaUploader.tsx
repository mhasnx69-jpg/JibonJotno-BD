"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, X, Loader2 } from "lucide-react";

interface MediaUploaderProps {
  readonly onUploadComplete: (publicUrl: string) => void;
  readonly bucketName?: string;
}

export function MediaUploader({ onUploadComplete, bucketName = "media-public" }: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage("ফাইলের সাইজ সর্বোচ্চ ২ মেগাবাইট (2MB) হতে হবে।");
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrorMessage("শুধুমাত্র JPEG, PNG বা WEBP ফরম্যাটের ছবি আপলোড করা যাবে।");
      return;
    }

    setUploading(true);
    setErrorMessage("");

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      const publicUrl = data.publicUrl;

      setPreviewUrl(publicUrl);
      onUploadComplete(publicUrl);
      setUploading(false);
    } catch (err: any) {
      setErrorMessage(err?.message || "ছবি আপলোড করতে সমস্যা হয়েছে।");
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-slate-700 block">ছবি আপলোড (Media Upload)</label>

      {previewUrl ? (
        <div className="relative w-32 h-32 rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 shadow-sm">
          <img src={previewUrl} alt="Uploaded preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => {
              setPreviewUrl(null);
              onUploadComplete("");
            }}
            className="absolute top-2 right-2 p-1 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="border-2 border-dashed border-slate-300 hover:border-brand-500 rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-emerald-50/50 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
            {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
          </div>
          <span className="text-sm font-semibold text-slate-700">
            {uploading ? "আপলোড হচ্ছে..." : "ছবি নির্বাচন করতে ক্লিক করুন"}
          </span>
          <span className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP (সর্বোচ্চ ২ মেগাবাইট)</span>
          <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} disabled={uploading} className="hidden" />
        </label>
      )}

      {errorMessage && <p className="text-xs text-rose-600 font-medium">{errorMessage}</p>}
    </div>
  );
}
