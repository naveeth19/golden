const ALLOWED_TAGS = [
  "p", "br", "b", "strong", "i", "em", "u", "a",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li",
  "blockquote", "pre", "code",
  "img", "figure", "figcaption",
  "table", "thead", "tbody", "tr", "th", "td",
  "hr", "div", "span",
];

function sanitizeHtml(html: string): string {
  const tagPattern = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/gi;
  return html.replace(tagPattern, (match, tagName) => {
    if (ALLOWED_TAGS.includes(tagName.toLowerCase())) {
      return match;
    }
    return "";
  });
}

export default function BlogContent({ content }: { content: string }) {
  return (
    <div
      className="prose prose-sm max-w-none
        [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-[var(--gt-navy)] [&_h1]:mb-4 [&_h1]:mt-8
        [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--gt-navy)] [&_h2]:mb-3 [&_h2]:mt-6
        [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[var(--gt-navy)] [&_h3]:mb-2 [&_h3]:mt-5
        [&_p]:text-[var(--gt-muted)] [&_p]:leading-relaxed [&_p]:mb-4
        [&_a]:text-[var(--gt-red)] [&_a]:underline
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:text-[var(--gt-muted)]
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:text-[var(--gt-muted)]
        [&_li]:mb-1
        [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--gt-red)] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[var(--gt-muted)]
        [&_img]:w-full [&_img]:my-4
        [&_hr]:border-[var(--gt-border)] [&_hr]:my-8
      "
      style={{ fontFamily: "var(--font-sans)" }}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
    />
  );
}
