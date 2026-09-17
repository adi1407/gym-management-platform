import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { ScrollVelocitySection } from "@/components/sections/scroll-velocity-section";
import { JoinCtaSection } from "@/components/sections/join-cta-section";
import { MembershipPlansDetailed } from "@/components/memberships/membership-plans-detailed";
import { MembershipIncludes } from "@/components/memberships/membership-includes";
import { MembershipCompare } from "@/components/memberships/membership-compare";
import { MembershipSteps } from "@/components/memberships/membership-steps";
import { MembershipFaq } from "@/components/memberships/membership-faq";

export const metadata: Metadata = {
  title: "Memberships",
  description:
    "Compare monthly, quarterly, and yearly Evolution Gym memberships — full floor access, classes, free visit booking.",
};

export default function MembershipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Memberships"
        title={
          <>
            TRAIN ON YOUR
            <br />
            <span className="text-[var(--orange)]">TERMS.</span>
          </>
        }
        description="Transparent pricing. Full gym access on every plan. Book a free 1-day visit, then choose the commitment that matches your goals."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/join" variant="primary" size="md">
            Book free visit
          </Button>
          <Button href="#compare" variant="outline" size="md">
            Compare plans
          </Button>
        </div>
      </PageHero>

      <MembershipIncludes />
      <MembershipPlansDetailed />
      <MembershipCompare />
      <MembershipSteps />
      <ScrollVelocitySection />
      <MembershipFaq />
      <JoinCtaSection />
    </>
  );
}
