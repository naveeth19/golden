"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ImageUploader({
  images,
  onChange,
  folder,
}: {
  images: string[];
  onChange: (urls: string[]) => void;
  folder: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);
    const supabase = createClient();
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("Media")
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        console.error("Image upload error:", uploadError);
        setError(`Upload failed: ${uploadError.message}`);
        setUploading(false);
        if (fileRef.current) fileRef.current.value = "";
        return;
      }

      const { data: urlData } = supabase.storage
        .from("Media")
        .getPublicUrl(path);

      if (urlData?.publicUrl) {
        newUrls.push(urlData.publicUrl);
      }
    }

    if (newUrls.length > 0) {
      onChange([...images, ...newUrls]);
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleRemove(index: number) {
    const url = images[index];
    const supabase = createClient();

    const match = url.match(/Media\/(.+)$/);
    if (match) {
      const { error: removeError } = await supabase.storage.from("Media").remove([match[1]]);
      if (removeError) {
        console.error("Image remove error:", removeError);
      }
    }

    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 mb-3">
        {images.map((img, i) => (
          <div key={i} className="relative h-24 bg-[var(--gt-cream)] overflow-hidden group">
            <img src={img} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          className="text-sm"
          disabled={uploading}
        />
        {uploading && <span className="text-xs text-[var(--gt-muted)]">Uploading...</span>}
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
}
