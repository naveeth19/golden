"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

interface GalleryImage {
  id: string;
  project_slug: string;
  storage_path: string;
  caption: string | null;
  display_order: number;
  created_at: string;
}

const PROJECT_SLUGS = ["the-shiva-day"] as const;
type ProjectSlug = typeof PROJECT_SLUGS[number];

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

function storageUrl(path: string) {
  return `${SUPABASE_URL}/storage/v1/object/public/project-gallery/${path}`;
}

export default function AdminProjectsPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<ProjectSlug>("the-shiva-day");
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  useEffect(() => {
    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSlug]);

  async function loadImages() {
    const { data, error } = await supabase
      .from("project_gallery")
      .select("*")
      .eq("project_slug", selectedSlug)
      .order("display_order", { ascending: true });
    if (!error && data) setImages(data as GalleryImage[]);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    const maxOrder = images.length > 0 ? Math.max(...images.map((i) => i.display_order)) : 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split(".").pop();
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const path = `${selectedSlug}/${filename}`;

      const { error: uploadError } = await supabase.storage
        .from("project-gallery")
        .upload(path, file);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        continue;
      }

      await supabase.from("project_gallery").insert({
        project_slug: selectedSlug,
        storage_path: path,
        caption: caption.trim() || null,
        display_order: maxOrder + i + 1,
      });
    }

    setCaption("");
    if (fileRef.current) fileRef.current.value = "";
    setUploading(false);
    loadImages();
  }

  async function handleDelete(id: string, storagePath: string) {
    await supabase.storage.from("project-gallery").remove([storagePath]);
    await supabase.from("project_gallery").delete().eq("id", id);
    setDeleteConfirm(null);
    loadImages();
  }

  async function saveOrder(reordered: GalleryImage[]) {
    const updates = reordered.map((img, i) =>
      supabase.from("project_gallery").update({ display_order: i + 1 }).eq("id", img.id)
    );
    await Promise.all(updates);
  }

  // Drag to reorder
  function onDragStart(id: string) {
    setDragging(id);
  }

  function onDragOver(e: React.DragEvent, id: string) {
    e.preventDefault();
    setDragOver(id);
  }

  function onDrop(targetId: string) {
    if (!dragging || dragging === targetId) {
      setDragging(null);
      setDragOver(null);
      return;
    }
    const from = images.findIndex((i) => i.id === dragging);
    const to = images.findIndex((i) => i.id === targetId);
    const reordered = [...images];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    setImages(reordered);
    saveOrder(reordered);
    setDragging(null);
    setDragOver(null);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-2xl font-bold text-[var(--gt-navy)]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Projects Gallery
        </h1>
        <select
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value as ProjectSlug)}
          className="text-sm border border-[var(--gt-border)] px-3 py-2 text-[var(--gt-navy)] bg-white focus:outline-none focus:border-[var(--gt-red)]"
        >
          {PROJECT_SLUGS.map((slug) => (
            <option key={slug} value={slug}>
              {slug}
            </option>
          ))}
        </select>
      </div>

      {/* Upload form */}
      <div className="border border-[var(--gt-border)] p-6 mb-8 bg-[var(--gt-cream)]">
        <h2 className="text-sm font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-4">
          Upload Images
        </h2>
        <div className="flex flex-col gap-3 max-w-lg">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
            className="text-sm text-[var(--gt-muted)] file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[var(--gt-navy)] file:text-white file:text-xs file:uppercase file:tracking-widest file:cursor-pointer disabled:opacity-50"
          />
          <input
            type="text"
            placeholder="Caption (optional)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="text-sm border border-[var(--gt-border)] px-4 py-2 text-[var(--gt-navy)] focus:outline-none focus:border-[var(--gt-red)]"
          />
          {uploading && (
            <p className="text-xs text-[var(--gt-muted)] uppercase tracking-widest">
              Uploading…
            </p>
          )}
        </div>
      </div>

      {/* Images grid */}
      <p className="text-xs text-[var(--gt-muted)] uppercase tracking-widest mb-4">
        {images.length} image{images.length !== 1 ? "s" : ""} · drag to reorder
      </p>

      {images.length === 0 ? (
        <div className="flex items-center justify-center h-32 border border-[var(--gt-border)] border-dashed">
          <p className="text-[var(--gt-muted)] text-sm">No images yet. Upload some above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((img, index) => (
            <div
              key={img.id}
              draggable
              onDragStart={() => onDragStart(img.id)}
              onDragOver={(e) => onDragOver(e, img.id)}
              onDrop={() => onDrop(img.id)}
              onDragEnd={() => { setDragging(null); setDragOver(null); }}
              className={`relative group border transition-all cursor-grab active:cursor-grabbing ${
                dragOver === img.id
                  ? "border-[var(--gt-red)] scale-105"
                  : dragging === img.id
                  ? "opacity-40 border-[var(--gt-border)]"
                  : "border-[var(--gt-border)]"
              }`}
            >
              {/* Order badge */}
              <div className="absolute top-1 left-1 z-10 bg-[var(--gt-navy)] text-white text-[10px] w-5 h-5 flex items-center justify-center">
                {index + 1}
              </div>

              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={storageUrl(img.storage_path)}
                alt={img.caption ?? `Image ${index + 1}`}
                className="w-full aspect-square object-cover"
              />

              {/* Caption */}
              {img.caption && (
                <div className="px-2 py-1 bg-white border-t border-[var(--gt-border)]">
                  <p className="text-[10px] text-[var(--gt-muted)] truncate">{img.caption}</p>
                </div>
              )}

              {/* Delete button */}
              {deleteConfirm === img.id ? (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-2 p-2">
                  <p className="text-white text-[10px] text-center">Delete?</p>
                  <button
                    onClick={() => handleDelete(img.id, img.storage_path)}
                    className="bg-[var(--gt-red)] text-white text-[10px] uppercase tracking-widest px-3 py-1 w-full"
                  >
                    Yes, delete
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="text-white/60 text-[10px] uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirm(img.id)}
                  className="absolute top-1 right-1 z-10 w-6 h-6 bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-[var(--gt-red)]"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
