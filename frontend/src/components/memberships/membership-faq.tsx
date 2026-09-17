"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MEMBERSHIP_FAQS } from "@/data/memberships";

export function MembershipFaq() {
  return (
    <section
      className="border-b border-[var(--border)] bg-[var(--black)] px-[var(--page-pad-x)] py-[var(--section-gap)]"
      aria-labelledby="membership-faq-heading"
    >
      <div className="container-page mx-auto grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-[var(--orange)] uppercase">
            FAQ
          </p>
          <h2
            id="membership-faq-heading"
            className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] leading-[0.92] tracking-wide text-white"
          >
            BEFORE YOU
            <br />
            <span className="text-[var(--orange)]">COMMIT.</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--gray)]">
            Straight answers on visits, freezes, PT, and switching plans. Still
            unsure? We’ll walk you through it in person.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contact" variant="outline" size="md">
              Ask a question
            </Button>
            <Button href="/faq" variant="ghost" size="md">
              Full FAQ
            </Button>
          </div>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="item-0"
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 sm:px-6"
        >
          {MEMBERSHIP_FAQS.map((faq, i) => (
            <AccordionItem key={faq.q} value={`item-${i}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
