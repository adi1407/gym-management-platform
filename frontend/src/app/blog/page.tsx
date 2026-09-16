import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Blog",
  description: "Training tips, recovery notes, and gym culture from Evolution Gym.",
};

const POSTS = [
  {
    slug: "progressive-overload-basics",
    title: "Progressive overload without the ego",
    excerpt: "How we add load safely so strength compounds for years.",
  },
  {
    slug: "recovery-is-training",
    title: "Recovery is part of the program",
    excerpt: "Sleep, mobility, and why rest days protect your next PR.",
  },
  {
    slug: "first-week-on-the-floor",
    title: "Your first week on the floor",
    excerpt: "What to expect when you join — from assessment to first session.",
  },
] as const;

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title={
          <>
            NOTES FROM
            <br />
            <span className="text-[var(--gold)]">THE FLOOR.</span>
          </>
        }
        description="Short reads on training, recovery, and the standards we coach every day."
      />

      <section className="px-[var(--page-pad-x)] pb-[var(--section-gap)]">
        <div className="container-page max-w-3xl divide-y divide-[var(--border)] border-t border-[var(--border)]">
          {POSTS.map((post) => (
            <article key={post.slug} className="py-8">
              <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wide text-white">
                <Link
                  href="/contact"
                  className="transition-colors hover:text-[var(--gold-light)]"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--gray)]">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
