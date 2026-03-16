import { createClient } from "@/lib/supabase/server";
import type { Blog } from "@/lib/supabase/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import BlogContent from "@/components/blog/BlogContent";
import BlogCard from "@/components/blog/BlogCard";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!blog) return { title: "Post Not Found" };

  return {
    title: blog.meta_title || blog.title,
    description: blog.meta_desc || blog.content?.replace(/<[^>]*>/g, "").slice(0, 160),
  };
}

function ArticleJsonLd({ blog }: { blog: Blog }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.meta_desc,
    image: blog.cover_image,
    datePublished: blog.published_at,
    dateModified: blog.published_at,
    author: {
      "@type": "Organization",
      name: "Golden Travels",
    },
    publisher: {
      "@type": "Organization",
      name: "Golden Travels",
      url: "https://www.goldentravels.co",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!blog) notFound();

  const b = blog as Blog;

  // Related posts by matching tags
  let relatedPosts: Blog[] = [];
  if (b.tags && b.tags.length > 0) {
    const { data: related } = await supabase
      .from("blogs")
      .select("*")
      .eq("is_published", true)
      .neq("slug", b.slug)
      .overlaps("tags", b.tags)
      .limit(3);
    relatedPosts = (related || []) as Blog[];
  }

  return (
    <>
      <ArticleJsonLd blog={b} />

      {/* Cover */}
      {b.cover_image && (
        <div className="w-full h-[300px] md:h-[400px] bg-[var(--gt-cream)] overflow-hidden">
          <img
            src={b.cover_image}
            alt={b.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1
            className="text-3xl md:text-4xl font-bold text-[var(--gt-navy)] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {b.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-[var(--gt-muted)]">
            {b.published_at && (
              <span>{format(new Date(b.published_at), "MMMM d, yyyy")}</span>
            )}
            {b.tags && b.tags.length > 0 && (
              <div className="flex gap-2">
                {b.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 bg-[var(--gt-cream)] text-[var(--gt-muted)] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <BlogContent content={b.content || ""} />
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-[var(--gt-cream)]">
          <div className="max-w-7xl mx-auto px-6">
            <h2
              className="text-2xl font-bold text-[var(--gt-navy)] mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <BlogCard key={post.id} blog={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
