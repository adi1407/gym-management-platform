import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { JoinCtaSection } from "@/components/sections/join-cta-section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Start your Evolution Gym membership — pick a plan, book a tour, and train with standards.",
};

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Join"
        title={
          <>
            START YOUR
            <br />
            <span className="text-[var(--gold)]">EVOLUTION.</span>
          </>
        }
        description="No hard sell — clear plans, a walkthrough of the floor, and a coach who helps you start with structure."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/memberships" variant="primary" size="md">
            View Plans
          </Button>
          <Button href="/contact" variant="outline" size="md">
            Book a Tour
          </Button>
        </div>
      </PageHero>
      <JoinCtaSection />
    </>
  );
}
