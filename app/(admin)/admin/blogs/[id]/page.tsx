"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Blog } from "@/lib/supabase/types";
import BlogEditor from "@/components/admin/BlogEditor";

export default function AdminBlogEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(!isNew);
  const supabase = createClient();

  useEffect(() => {
    if (!isNew) {
      loadBlog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function loadBlog() {
    setLoading(true);
    const { data } = await supabase.from("blogs").select("*").eq("id", id).single();
    if (data) setBlog(data as Blog);
    setLoading(false);
  }

  function handleSaved(newId?: string) {
    if (isNew && newId) {
      router.push(`/admin/blogs/${newId}`);
    } else {
      loadBlog();
    }
  }

  if (loading) {
    return <div className="text-[var(--gt-muted)] text-sm">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--gt-navy)]" style={{ fontFamily: "var(--font-playfair)" }}>
          {isNew ? "New Blog Post" : `Edit: ${blog?.title || ""}`}
        </h1>
        <button
          onClick={() => router.push("/admin/blogs")}
          className="text-sm text-[var(--gt-muted)] hover:text-[var(--gt-navy)]"
        >
          Back to Blogs
        </button>
      </div>

      <BlogEditor blog={blog} onSaved={handleSaved} />
    </div>
  );
}
