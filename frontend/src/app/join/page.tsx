import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { TrialBookingWizard } from "@/features/membership/components/trial-booking-wizard";
import { createClient } from "@/lib/supabase/server";
import { MEMBERSHIP_PLANS } from "@/data/home";
import type { Package } from "@/types/database";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Choose a membership package and book a free 1-day Evolution Gym visit.",
};

type Props = { searchParams: Promise<{ package?: string }> };

const FALLBACK_PACKAGES: Package[] = MEMBERSHIP_PLANS.map((p) => ({
  id: `local-${p.slug}`,
  slug: p.slug,
  name: p.name,
  price_label: p.price,
  period_label: p.period,
  duration_days: p.durationDays,
  featured: p.featured,
  active: true,
  created_at: new Date(0).toISOString(),
}));

export default async function JoinPage({ searchParams }: Props) {
  const { package: packageSlug } = await searchParams;
  const supabase = await createClient();

  let packages: Package[] = FALLBACK_PACKAGES;
  try {
    const { data } = await supabase
      .from("packages")
      .select("*")
      .eq("active", true)
      .order("duration_days", { ascending: true });
    if (data && data.length > 0) packages = data;
  } catch {
    // Local / missing env — use static plans
  }

  return (
    <>
      <PageHero
        eyebrow="Join"
        title={
          <>
            START YOUR
            <br />
            <span className="text-[var(--orange)]">FREE VISIT.</span>
          </>
        }
        description="Pick a package you’re interested in, choose a day this month or next, and we’ll lock a complimentary gym visit."
      />
      <section className="px-[var(--page-pad-x)] pb-[var(--section-gap)]">
        <TrialBookingWizard
          packages={packages}
          initialSlug={packageSlug}
        />
      </section>
    </>
  );
}
