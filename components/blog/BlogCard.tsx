import Link from "next/link";
import type { Blog } from "@/lib/supabase/types";
import { format } from "date-fns";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group block border border-[var(--gt-border)]">
      <div className="h-48 bg-[var(--gt-cream)] overflow-hidden">
        {blog.cover_image ? (
          <img
            src={blog.cover_image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gt-muted)" strokeWidth="1" opacity="0.3">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {(blog.tags || []).slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 bg-[var(--gt-cream)] text-[var(--gt-muted)] font-medium">
              {tag}
            </span>
          ))}
        </div>
        <h3
          className="text-lg font-bold text-[var(--gt-navy)] group-hover:text-[var(--gt-red)] transition-colors mb-2"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {blog.title}
        </h3>
        <p className="text-sm text-[var(--gt-muted)] line-clamp-2 mb-3">
          {blog.meta_desc || blog.content?.replace(/<[^>]*>/g, "").slice(0, 120)}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--gt-muted)]">
            {blog.published_at ? format(new Date(blog.published_at), "MMM d, yyyy") : "Draft"}
          </span>
          <span className="text-xs text-[var(--gt-red)] font-medium group-hover:underline">
            Read More
          </span>
        </div>
      </div>
    </Link>
  );
}
