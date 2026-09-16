import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { MembershipSection } from "@/components/sections/membership-section";
import { JoinCtaSection } from "@/components/sections/join-cta-section";

export const metadata: Metadata = {
  title: "Memberships",
  description:
    "Choose monthly, quarterly, or yearly Evolution Gym memberships — clear pricing, full floor access.",
};

export default function MembershipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Memberships"
        title={
          <>
            CHOOSE YOUR
            <br />
            <span className="text-[var(--gold)]">COMMITMENT.</span>
          </>
        }
        description="Transparent plans with gym access, classes, and assessment support. Pick the cadence that matches your goals."
      />
      <MembershipSection />
      <JoinCtaSection />
    </>
  );
}
