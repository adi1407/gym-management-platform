import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Evolution Gym for memberships, tours, personal training, and corporate inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            WE&apos;RE HERE
            <br />
            <span className="text-[var(--gold)]">WHEN YOU ARE.</span>
          </>
        }
        description="Membership questions, facility tours, or coaching consults — send a note and we’ll get back within one business day."
      />

      <section className="px-[var(--page-pad-x)] pb-[var(--section-gap)]">
        <div className="container-page mx-auto grid max-w-[var(--content-max)] gap-10 lg:grid-cols-2">
          <form className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1.5 block text-xs tracking-[0.12em] text-white/50 uppercase">
                  First name
                </span>
                <input
                  name="firstName"
                  required
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-white outline-none focus:border-[var(--gold)]/50"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block text-xs tracking-[0.12em] text-white/50 uppercase">
                  Last name
                </span>
                <input
                  name="lastName"
                  required
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-white outline-none focus:border-[var(--gold)]/50"
                />
              </label>
            </div>
            <label className="block text-sm">
              <span className="mb-1.5 block text-xs tracking-[0.12em] text-white/50 uppercase">
                Email
              </span>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-white outline-none focus:border-[var(--gold)]/50"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block text-xs tracking-[0.12em] text-white/50 uppercase">
                Topic
              </span>
              <select
                name="topic"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-white outline-none focus:border-[var(--gold)]/50"
                defaultValue="membership"
              >
                <option value="membership">Membership</option>
                <option value="tour">Facility tour</option>
                <option value="pt">Personal training</option>
                <option value="corporate">Corporate</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block text-xs tracking-[0.12em] text-white/50 uppercase">
                Message
              </span>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full resize-y rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-white outline-none focus:border-[var(--gold)]/50"
              />
            </label>
            <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto">
              Send Message
            </Button>
          </form>

          <div className="space-y-6">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wide text-white">
                FRONT DESK
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--gray)]">
                Mon–Fri 6 AM – 11 PM · Sat–Sun 7 AM – 10 PM
              </p>
              <p className="mt-2 text-sm text-white">hello@evolutiongym.example</p>
              <p className="mt-1 text-sm text-white">+1 (555) 014-2000</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/locations" variant="outline" size="md">
                Locations
              </Button>
              <Button href="/join" variant="ghost" size="md">
                Join Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
