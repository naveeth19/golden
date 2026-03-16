"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Package, PackageType } from "@/lib/supabase/types";
import ImageUploader from "./ImageUploader";

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
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
    if (youtubeInput.trim()) {
      setYoutubeUrls([...youtubeUrls, youtubeInput.trim()]);
      setYoutubeInput("");
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Title</label>
          <input type="text" required value={title} onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Slug</label>
          <input type="text" required value={slug} onChange={(e) => setSlug(e.target.value)}
            className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value as PackageType)}
            className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]">
            {packageTypes.map((t) => (<option key={t} value={t} className="capitalize">{t}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Duration (Days)</label>
          <input type="number" value={durationDays} onChange={(e) => setDurationDays(parseInt(e.target.value) || 0)}
            className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Price From (Rs.)</label>
          <input type="number" value={priceFrom} onChange={(e) => setPriceFrom(parseInt(e.target.value) || 0)}
            className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Overview</label>
        <textarea rows={4} value={overview} onChange={(e) => setOverview(e.target.value)}
          className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)] resize-none" />
      </div>

      {/* Inclusions */}
      <div>
        <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Inclusions</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {inclusions.map((item, i) => (
            <span key={i} onClick={() => setInclusions(inclusions.filter((_, j) => j !== i))}
              className="text-xs px-2 py-1 bg-green-50 text-green-700 cursor-pointer hover:bg-red-50 hover:text-red-700">{item} x</span>
          ))}
        </div>
        <input type="text" value={inclusionInput} onChange={(e) => setInclusionInput(e.target.value)}
          onKeyDown={addTag(inclusions, setInclusions, inclusionInput, setInclusionInput)}
          placeholder="Type and press Enter"
          className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]" />
      </div>

      {/* Exclusions */}
      <div>
        <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Exclusions</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {exclusions.map((item, i) => (
            <span key={i} onClick={() => setExclusions(exclusions.filter((_, j) => j !== i))}
              className="text-xs px-2 py-1 bg-red-50 text-red-700 cursor-pointer hover:bg-red-100">{item} x</span>
          ))}
        </div>
        <input type="text" value={exclusionInput} onChange={(e) => setExclusionInput(e.target.value)}
          onKeyDown={addTag(exclusions, setExclusions, exclusionInput, setExclusionInput)}
          placeholder="Type and press Enter"
          className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]" />
      </div>

      {/* Images */}
      <div>
        <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Images</label>
        <ImageUploader images={images} onChange={setImages} folder="packages" />
      </div>

      {/* YouTube URLs */}
      <div>
        <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">YouTube URLs</label>
        <div className="space-y-2 mb-2">
          {youtubeUrls.map((url, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-[var(--gt-muted)] flex-1 truncate">{url}</span>
              <button type="button" onClick={() => setYoutubeUrls(youtubeUrls.filter((_, j) => j !== i))}
                className="text-xs text-[var(--gt-red)]">Remove</button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input type="url" value={youtubeInput} onChange={(e) => setYoutubeInput(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="flex-1 border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]" />
          <button type="button" onClick={addYoutubeUrl}
            className="border border-[var(--gt-border)] px-4 py-2 text-xs font-semibold text-[var(--gt-navy)] hover:bg-[var(--gt-cream)]">
            Add
          </button>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setIsFeatured(!isFeatured)}
            className={`w-10 h-5 rounded-full relative transition-colors ${isFeatured ? "bg-[var(--gt-red)]" : "bg-gray-300"}`}>
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${isFeatured ? "left-5" : "left-0.5"}`} />
          </button>
          <span className="text-sm text-[var(--gt-navy)]">Featured</span>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setIsActive(!isActive)}
            className={`w-10 h-5 rounded-full relative transition-colors ${isActive ? "bg-[var(--gt-red)]" : "bg-gray-300"}`}>
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${isActive ? "left-5" : "left-0.5"}`} />
          </button>
          <span className="text-sm text-[var(--gt-navy)]">Active</span>
        </div>
      </div>

      <button type="submit" disabled={loading}
        className="bg-[var(--gt-red)] text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-8 py-2.5 hover:bg-[var(--gt-red-dark)] transition-colors disabled:opacity-50">
        {loading ? "Saving..." : "Save Package"}
      </button>
    </form>
  );
}
