"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Blog } from "@/lib/supabase/types";
import ImageUploader from "./ImageUploader";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function Toolbar({ editor }: { editor: ReturnType<typeof useEditor> | null }) {
  if (!editor) return null;

  const btnClass = (active: boolean) =>
    `px-2 py-1 text-xs border border-[var(--gt-border)] ${active ? "bg-[var(--gt-navy)] text-white" : "text-[var(--gt-navy)] hover:bg-[var(--gt-cream)]"} transition-colors`;

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-[var(--gt-border)]">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive("bold"))}>B</button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive("italic"))}>I</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btnClass(editor.isActive("heading", { level: 1 }))}>H1</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive("heading", { level: 2 }))}>H2</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnClass(editor.isActive("heading", { level: 3 }))}>H3</button>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive("bulletList"))}>UL</button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive("orderedList"))}>OL</button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive("blockquote"))}>Quote</button>
      <button
        type="button"
        onClick={() => {
          const url = window.prompt("Enter URL:");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
        className={btnClass(editor.isActive("link"))}
      >
        Link
      </button>
      <button
        type="button"
        onClick={async () => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;
            const supabase = createClient();
            const ext = file.name.split(".").pop();
            const path = `blogs/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
            const { error } = await supabase.storage.from("Media").upload(path, file);
            if (!error) {
              const { data: urlData } = supabase.storage.from("Media").getPublicUrl(path);
              if (urlData?.publicUrl) {
                editor.chain().focus().setImage({ src: urlData.publicUrl }).run();
              }
            }
          };
          input.click();
        }}
        className={btnClass(false)}
      >
        Image
      </button>
    </div>
  );
}

export default function BlogEditor({
  blog,
  onSaved,
}: {
  blog: Blog | null;
  onSaved: (newId?: string) => void;
}) {
  const [title, setTitle] = useState(blog?.title || "");
  const [slug, setSlug] = useState(blog?.slug || "");
  const [metaTitle, setMetaTitle] = useState(blog?.meta_title || "");
  const [metaDesc, setMetaDesc] = useState(blog?.meta_desc || "");
  const [coverImage, setCoverImage] = useState<string[]>(blog?.cover_image ? [blog.cover_image] : []);
  const [tags, setTags] = useState<string[]>(blog?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [isPublished, setIsPublished] = useState(blog?.is_published ?? false);
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Start writing your blog post..." }),
    ],
    content: blog?.content || "",
    immediatelyRender: false,
  });

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!blog) setSlug(slugify(val));
  }

  function addTag(e: React.KeyboardEvent) {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editor) return;
    setLoading(true);

    const supabase = createClient();
    const content = editor.getHTML();
    const payload = {
      title,
      slug,
      content,
      cover_image: coverImage[0] || "",
      meta_title: metaTitle,
      meta_desc: metaDesc,
      tags,
      is_published: isPublished,
      published_at: isPublished && !blog?.published_at ? new Date().toISOString() : blog?.published_at || null,
    };

    if (blog) {
      await supabase.from("blogs").update(payload).eq("id", blog.id);
      setLoading(false);
      onSaved();
    } else {
      const { data } = await supabase.from("blogs").insert(payload).select("id").single();
      setLoading(false);
      onSaved(data?.id);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor */}
        <div className="lg:col-span-2">
          <div className="border border-[var(--gt-border)] min-h-[500px]">
            <Toolbar editor={editor} />
            <div className="p-4">
              <EditorContent
                editor={editor}
                className="min-h-[400px] text-sm text-[var(--gt-navy)] [&_.tiptap]:outline-none [&_.tiptap]:min-h-[400px] [&_.tiptap_p]:mb-3 [&_.tiptap_h1]:text-2xl [&_.tiptap_h1]:font-bold [&_.tiptap_h1]:mb-3 [&_.tiptap_h2]:text-xl [&_.tiptap_h2]:font-bold [&_.tiptap_h2]:mb-2 [&_.tiptap_h3]:text-lg [&_.tiptap_h3]:font-bold [&_.tiptap_h3]:mb-2 [&_.tiptap_blockquote]:border-l-2 [&_.tiptap_blockquote]:border-[var(--gt-red)] [&_.tiptap_blockquote]:pl-4 [&_.tiptap_blockquote]:italic [&_.tiptap_ul]:list-disc [&_.tiptap_ul]:pl-6 [&_.tiptap_ol]:list-decimal [&_.tiptap_ol]:pl-6 [&_.tiptap_img]:max-w-full [&_.tiptap_img]:my-3 [&_.tiptap_a]:text-[var(--gt-red)] [&_.tiptap_a]:underline [&_.is-editor-empty]:before:content-[attr(data-placeholder)] [&_.is-editor-empty]:before:text-[var(--gt-muted)] [&_.is-editor-empty]:before:float-left [&_.is-editor-empty]:before:pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Metadata Panel */}
        <div className="lg:col-span-1 space-y-4">
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
            <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">
              Meta Title <span className="text-[var(--gt-muted)] normal-case">({metaTitle.length}/60)</span>
            </label>
            <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} maxLength={60}
              className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">
              Meta Description <span className="text-[var(--gt-muted)] normal-case">({metaDesc.length}/160)</span>
            </label>
            <textarea rows={3} value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} maxLength={160}
              className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)] resize-none" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Cover Image</label>
            <ImageUploader images={coverImage} onChange={setCoverImage} folder="blogs" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, i) => (
                <span key={i} onClick={() => setTags(tags.filter((_, j) => j !== i))}
                  className="text-xs px-2 py-1 bg-[var(--gt-cream)] text-[var(--gt-navy)] cursor-pointer hover:bg-red-50 hover:text-[var(--gt-red)]">
                  {tag} x
                </span>
              ))}
            </div>
            <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={addTag} placeholder="Type and press Enter"
              className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]" />
          </div>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setIsPublished(!isPublished)}
              className={`w-10 h-5 rounded-full relative transition-colors ${isPublished ? "bg-[var(--gt-red)]" : "bg-gray-300"}`}>
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${isPublished ? "left-5" : "left-0.5"}`} />
            </button>
            <span className="text-sm text-[var(--gt-navy)]">Published</span>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-[var(--gt-red)] text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-2.5 hover:bg-[var(--gt-red-dark)] transition-colors disabled:opacity-50">
            {loading ? "Saving..." : "Save Blog Post"}
          </button>
        </div>
      </div>
    </form>
  );
}
