import { HeroSection } from "@/components/hero/hero-section";
import { TrustSection } from "@/components/sections/trust-section";
import { StorySection } from "@/components/sections/story-section";
import { FlowingMenuSection } from "@/components/sections/flowing-menu-section";
import { ProgramsSection } from "@/components/sections/programs-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { ScrollVelocitySection } from "@/components/sections/scroll-velocity-section";
import { FacilityGallerySection } from "@/components/sections/facility-gallery-section";
import { CommunitySection } from "@/components/sections/community-section";
import { MindsetSection } from "@/components/sections/mindset-section";
import { MembershipSection } from "@/components/sections/membership-section";
import { JoinCtaSection } from "@/components/sections/join-cta-section";

/**
 * Homepage narrative (gym product, not component demos):
 * Hero → Trust → Story → Program index → Featured programs → Features
 * → Momentum banner → Facility gallery → Community → Mindset → Memberships → Join
 */
export default function HomePage() {
  return (
    <main className="bg-[var(--color-bg)] text-[var(--color-text)]">
      <HeroSection />
      <TrustSection />
      <StorySection />
      <FlowingMenuSection />
      <ProgramsSection />
      <FeaturesSection />
      <ScrollVelocitySection />
      <FacilityGallerySection />
      <CommunitySection />
      <MindsetSection />
      <MembershipSection />
      <JoinCtaSection />
    </main>
  );
}
