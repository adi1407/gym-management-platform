import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { StorySection } from "@/components/sections/story-section";
import { FacilitySpiralSection } from "@/components/sections/facility-spiral-section";
import { ScrollVelocitySection } from "@/components/sections/scroll-velocity-section";
import { MindsetSection } from "@/components/sections/mindset-section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Evolution Gym — built for people who refuse to settle. Standards, community, results.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            OUR STANDARD
            <br />
            <span className="text-[var(--orange)]">IS THE WORK.</span>
          </>
        }
        description="Evolution Gym exists for athletes and everyday lifters who want coaching, community, and a floor that demands focus — not fluff."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/join" variant="primary" size="md">
            Join Now
          </Button>
          <Button href="/locations" variant="outline" size="md">
            Visit Us
          </Button>
        </div>
      </PageHero>

      <div className="[&_#story]:border-t-0 [&_#story]:pt-16">
        <StorySection />
      </div>
      <ScrollVelocitySection />
      <FacilitySpiralSection />
      <MindsetSection />
    </>
  );
}
