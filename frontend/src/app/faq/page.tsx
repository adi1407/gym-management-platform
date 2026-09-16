import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about Evolution Gym memberships, classes, and facilities.",
};

const FAQS = [
  {
    q: "Do I need experience to join?",
    a: "No. Coaches assess your starting point and program from there — beginners are welcome.",
  },
  {
    q: "Are classes included in membership?",
    a: "Group classes are included on standard plans. Personal training is booked separately.",
  },
  {
    q: "Can I freeze my membership?",
    a: "Quarterly and yearly plans support freezes for travel or injury — ask the front desk.",
  },
  {
    q: "What should I bring on day one?",
    a: "Training shoes, water, and an open mind. Towels and lockers are available on-site.",
  },
] as const;

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            QUESTIONS,
            <br />
            <span className="text-[var(--gold)]">ANSWERED.</span>
          </>
        }
        description="Quick answers before you walk through the door. Still unsure? Talk to us."
      >
        <Button href="/contact" variant="outline" size="md">
          Contact Us
        </Button>
      </PageHero>

      <section className="px-[var(--page-pad-x)] pb-[var(--section-gap)]">
        <div className="container-page max-w-3xl space-y-4">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4"
            >
              <summary className="cursor-pointer list-none font-semibold text-white marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.q}
                  <span className="text-[var(--gold)] transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--gray)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
