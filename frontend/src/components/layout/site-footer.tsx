import Link from "next/link";
import { CTA, NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { Logo } from "@/components/navigation/logo";

const FOOTER_EXTRA = [
  { label: "Transformations", href: "/transformations" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--black)] px-[var(--page-pad-x)] pt-16 pb-12 md:pb-16">
      <div className="container-page mx-auto">
        <p className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,4rem)] leading-[0.95] tracking-wide text-white">
          TRAIN HARD.
          <br />
          <span className="text-[var(--gold)]">LIVE STRONG.</span>
        </p>

        <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10 lg:flex-row lg:justify-between">
          <div>
            <Logo compact />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--gray)]">
              {SITE_NAME} — premium training, expert coaching, and a community
              that refuses to settle.
            </p>
            <Link
              href={CTA.join.href}
              className="mt-5 inline-block text-sm font-semibold tracking-[0.14em] text-[var(--orange)] uppercase hover:text-[var(--orange-light)]"
            >
              {CTA.join.label} →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">
                Explore
              </p>
              <ul className="mt-4 space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--gray)] transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">
                More
              </p>
              <ul className="mt-4 space-y-2">
                {FOOTER_EXTRA.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--gray)] transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">
                Visit
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--gray)]">
                Open daily
                <br />
                5:00 AM – 11:00 PM
                <br />
                <a
                  href="/locations"
                  className="mt-2 inline-block text-white underline decoration-[var(--gold)]/40 underline-offset-4 hover:text-[var(--gold-light)]"
                >
                  Find a location
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/membership-terms" className="hover:text-white">
              Membership Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
