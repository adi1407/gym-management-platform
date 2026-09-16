import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { CommunitySection } from "@/components/sections/community-section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Transformations",
  description:
    "Real Evolution Gym members — progress built on consistency, coaching, and standards.",
};

export default function TransformationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Transformations"
        title={
          <>
            PROGRESS
            <br />
            <span className="text-[var(--gold)]">YOU CAN SEE.</span>
          </>
        }
        description="Stories of strength, conditioning, and confidence — earned on the floor, not filtered for social."
      >
        <Button href="/join" variant="primary" size="md">
          Start Yours
        </Button>
      </PageHero>
      <CommunitySection />
    </>
  );
}
