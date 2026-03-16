"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Blog } from "@/lib/supabase/types";
import Link from "next/link";
import { format } from "date-fns";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const supabase = createClient();

  useEffect(() => {
    loadBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadBlogs() {
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });
    setBlogs((data as Blog[]) || []);
  }

  async function togglePublished(id: string, current: boolean) {
    const update: Record<string, unknown> = { is_published: !current };
    if (!current) update.published_at = new Date().toISOString();
    await supabase.from("blogs").update(update).eq("id", id);
    loadBlogs();
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    await supabase.from("blogs").delete().eq("id", id);
    loadBlogs();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--gt-navy)]" style={{ fontFamily: "var(--font-playfair)" }}>
          Blog Management
        </h1>
        <Link
          href="/admin/blogs/new"
          className="bg-[var(--gt-red)] text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-2.5 hover:bg-[var(--gt-red-dark)] transition-colors"
        >
          Add Blog Post
        </Link>
      </div>

      <div className="border border-[var(--gt-border)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--gt-cream)]">
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Title</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Tags</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Published</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Published At</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-t border-[var(--gt-border)]">
                <td className="p-3 text-[var(--gt-navy)] font-medium">{blog.title}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {(blog.tags || []).map((tag) => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-[var(--gt-cream)] text-[var(--gt-muted)]">{tag}</span>
                    ))}
                  </div>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => togglePublished(blog.id, blog.is_published)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${blog.is_published ? "bg-[var(--gt-red)]" : "bg-gray-300"}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${blog.is_published ? "left-5" : "left-0.5"}`} />
                  </button>
                </td>
                <td className="p-3 text-[var(--gt-muted)]">
                  {blog.published_at ? format(new Date(blog.published_at), "MMM d, yyyy") : "-"}
                </td>
                <td className="p-3 flex gap-2">
                  <Link href={`/admin/blogs/${blog.id}`} className="text-xs text-[var(--gt-red)] font-medium hover:underline">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(blog.id)} className="text-xs text-[var(--gt-muted)] font-medium hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-[var(--gt-muted)]">No blog posts yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
