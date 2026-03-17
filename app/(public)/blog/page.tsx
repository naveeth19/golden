import { createClient } from "@/lib/supabase/server";
import type { Blog } from "@/lib/supabase/types";
import type { Metadata } from "next";
import BlogCard from "@/components/blog/BlogCard";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Travel tips, destination guides, and updates from Golden Travels. Read our latest articles on road travel across South India.",
};

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  const posts: Blog[] = blogs || [];

  return (
    <>
      <section className="bg-[var(--gt-navy)] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold block mb-3">
            Insights & Stories
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Blog
          </h1>
          <p className="text-white/50 text-sm mt-3 max-w-lg mx-auto">
            Travel tips, destination guides, and stories from over three decades on the road.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {posts.length === 0 ? (
            <p className="text-center text-[var(--gt-muted)]">
              No blog posts yet. Check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
