import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { ProgramsMegaNav } from "@/components/navigation/programs-mega-nav";
import { FlowingMenuSection } from "@/components/sections/flowing-menu-section";
import { ProgramsSection } from "@/components/sections/programs-section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Strength, HIIT, functional training, fat loss, and mobility — train your way at Evolution Gym.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title={
          <>
            TRAIN YOUR
            <br />
            <span className="text-[var(--gold)]">WAY.</span>
          </>
        }
        description="Hover the menu to explore disciplines, then dive into featured programs. Every path is coached with structure and intent."
      >
        <ProgramsMegaNav />
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/trainers" variant="outline" size="md">
            Meet Coaches
          </Button>
          <Button href="/memberships" variant="ghost" size="md">
            Membership Access
          </Button>
        </div>
      </PageHero>

      <FlowingMenuSection />
      <ProgramsSection />
    </>
  );
}
