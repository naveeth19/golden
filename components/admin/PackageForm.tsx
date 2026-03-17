"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Package, PackageType } from "@/lib/supabase/types";
import ImageUploader from "./ImageUploader";

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

const packageTypes: PackageType[] = ["pilgrimage", "outstation", "airport", "corporate"];

export default function PackageForm({
  pkg,
  onSaved,
}: {
  pkg: Package | null;
  onSaved: (newId?: string) => void;
}) {
  const [title, setTitle] = useState(pkg?.title || "");
  const [slug, setSlug] = useState(pkg?.slug || "");
  const [type, setType] = useState<PackageType>(pkg?.type || "outstation");
  const [durationDays, setDurationDays] = useState(pkg?.duration_days || 1);
  const [priceFrom, setPriceFrom] = useState(pkg?.price_from || 0);
  const [overview, setOverview] = useState(pkg?.overview || "");
  const [inclusions, setInclusions] = useState<string[]>(pkg?.inclusions || []);
  const [exclusions, setExclusions] = useState<string[]>(pkg?.exclusions || []);
  const [images, setImages] = useState<string[]>(pkg?.images || []);
  const [youtubeUrls, setYoutubeUrls] = useState<string[]>(pkg?.youtube_urls || []);
  const [youtubeInput, setYoutubeInput] = useState("");
  const [inclusionInput, setInclusionInput] = useState("");
  const [exclusionInput, setExclusionInput] = useState("");
  const [isFeatured, setIsFeatured] = useState(pkg?.is_featured ?? false);
  const [isActive, setIsActive] = useState(pkg?.is_active ?? true);
  const [showVehicle, setShowVehicle] = useState(pkg?.show_vehicle ?? true);
  const [pricingType, setPricingType] = useState<"per_person" | "per_vehicle">(pkg?.pricing_type || "per_person");
  const [loading, setLoading] = useState(false);

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!pkg) setSlug(slugify(val));
  }

  function addTag(list: string[], setter: (v: string[]) => void, input: string, inputSetter: (v: string) => void) {
    return (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && input.trim()) {
        e.preventDefault();
        setter([...list, input.trim()]);
        inputSetter("");
      }
    };
  }

  function addYoutubeUrl() {
    const val = youtubeInput.trim();
    if (val) {
      setYoutubeUrls([...youtubeUrls, val]);
      setYoutubeInput("");
    }
  }

  function handleYoutubeKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      addYoutubeUrl();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const payload = {
      title, slug, type, duration_days: durationDays, price_from: priceFrom,
      overview, inclusions, exclusions, images, youtube_urls: youtubeUrls,
      is_featured: isFeatured, is_active: isActive,
      show_vehicle: showVehicle, pricing_type: pricingType,
    };

    if (pkg) {
      await supabase.from("packages").update(payload).eq("id", pkg.id);
      setLoading(false);
      onSaved();
    } else {
      const { data } = await supabase.from("packages").insert(payload).select("id").single();
      setLoading(false);
      onSaved(data?.id);
    }
  }

  const inputCls = "w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]";
  const labelCls = "block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Title</label>
          <input type="text" required value={title} onChange={(e) => handleTitleChange(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Slug</label>
          <input type="text" required value={slug} onChange={(e) => setSlug(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value as PackageType)} className={inputCls}>
            {packageTypes.map((t) => (<option key={t} value={t} className="capitalize">{t}</option>))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Duration (Days)</label>
          <input type="number" value={durationDays} onChange={(e) => setDurationDays(parseInt(e.target.value) || 0)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Price From (Rs.)</label>
          <input type="number" value={priceFrom} onChange={(e) => setPriceFrom(parseInt(e.target.value) || 0)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Pricing Type</label>
          <select value={pricingType} onChange={(e) => setPricingType(e.target.value as "per_person" | "per_vehicle")} className={inputCls}>
            <option value="per_person">Per Person</option>
            <option value="per_vehicle">Per Vehicle</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Overview</label>
        <textarea rows={6} value={overview} onChange={(e) => setOverview(e.target.value)}
          className={`${inputCls} resize-none`} />
      </div>

      {/* Inclusions */}
      <div>
        <label className={labelCls}>Inclusions</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {inclusions.map((item, i) => (
            <span key={i} onClick={() => setInclusions(inclusions.filter((_, j) => j !== i))}
              className="text-xs px-2 py-1 bg-green-50 text-green-700 cursor-pointer hover:bg-red-50 hover:text-red-700 transition-colors">
              {item}
              <span className="ml-1">x</span>
            </span>
          ))}
        </div>
        <input type="text" value={inclusionInput} onChange={(e) => setInclusionInput(e.target.value)}
          onKeyDown={addTag(inclusions, setInclusions, inclusionInput, setInclusionInput)}
          placeholder="Type and press Enter" className={inputCls} />
      </div>

      {/* Exclusions */}
      <div>
        <label className={labelCls}>Exclusions</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {exclusions.map((item, i) => (
            <span key={i} onClick={() => setExclusions(exclusions.filter((_, j) => j !== i))}
              className="text-xs px-2 py-1 bg-red-50 text-red-700 cursor-pointer hover:bg-red-100 transition-colors">
              {item}
              <span className="ml-1">x</span>
            </span>
          ))}
        </div>
        <input type="text" value={exclusionInput} onChange={(e) => setExclusionInput(e.target.value)}
          onKeyDown={addTag(exclusions, setExclusions, exclusionInput, setExclusionInput)}
          placeholder="Type and press Enter" className={inputCls} />
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-6">
        <Toggle label="Show Vehicle" value={showVehicle} onChange={setShowVehicle} />
        <Toggle label="Featured" value={isFeatured} onChange={setIsFeatured} />
        <Toggle label="Active" value={isActive} onChange={setIsActive} />
      </div>

      {/* Images */}
      <div>
        <label className={labelCls}>Images</label>
        <ImageUploader images={images} onChange={setImages} folder="packages" />
      </div>

      {/* YouTube URLs */}
      <div>
        <label className={labelCls}>YouTube URLs</label>
        {youtubeUrls.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
            {youtubeUrls.map((url, i) => {
              const vid = extractVideoId(url);
              return (
                <div key={i} className="border border-[var(--gt-border)] overflow-hidden group relative">
                  {vid ? (
                    <img
                      src={`https://img.youtube.com/vi/${vid}/hqdefault.jpg`}
                      alt={`Video ${i + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  ) : (
                    <div className="w-full h-24 bg-[var(--gt-cream)] flex items-center justify-center text-xs text-[var(--gt-muted)]">
                      Invalid URL
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setYoutubeUrls(youtubeUrls.filter((_, j) => j !== i))}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <div className="flex gap-2">
          <input
            type="url"
            value={youtubeInput}
            onChange={(e) => setYoutubeInput(e.target.value)}
            onKeyDown={handleYoutubeKeyDown}
            onPaste={(e) => {
              setTimeout(() => {
                const val = (e.target as HTMLInputElement).value.trim();
                if (val && extractVideoId(val)) {
                  setYoutubeUrls([...youtubeUrls, val]);
                  setYoutubeInput("");
                }
              }, 0);
            }}
            placeholder="Paste YouTube link"
            className={`flex-1 ${inputCls}`}
          />
          <button type="button" onClick={addYoutubeUrl}
            className="border border-[var(--gt-border)] px-4 py-2 text-xs font-semibold text-[var(--gt-navy)] hover:bg-[var(--gt-cream)] transition-colors">
            Add
          </button>
        </div>
      </div>

      <button type="submit" disabled={loading}
        className="bg-[var(--gt-red)] text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-8 py-2.5 hover:bg-[var(--gt-red-dark)] transition-colors disabled:opacity-50">
        {loading ? "Saving..." : "Save Package"}
      </button>
    </form>
  );
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`w-10 h-5 rounded-full relative transition-colors ${value ? "bg-[var(--gt-red)]" : "bg-gray-300"}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${value ? "left-5" : "left-0.5"}`} />
      </button>
      <span className="text-sm text-[var(--gt-navy)]">{label}</span>
    </div>
  );
}
