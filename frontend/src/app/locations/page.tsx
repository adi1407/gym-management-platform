import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { LinkPreview } from "@/components/ui/link-preview";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";
import { FacilityGallerySection } from "@/components/sections/facility-gallery-section";
import { IMG } from "@/data/home";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Find Evolution Gym locations, hours, amenities, and book a facility tour.",
};

const LOCATIONS = [
  {
    name: "Evolution Downtown",
    area: "Central Business District",
    hours: "Open until 11 PM",
    amenities: ["Strength floor", "Classes", "Parking", "Lockers"],
    image: IMG.floor,
  },
  {
    name: "Evolution Riverside",
    area: "Riverside / North",
    hours: "Open until 10 PM",
    amenities: ["HIIT bay", "PT studios", "Showers", "Cafe"],
    image: IMG.group,
  },
  {
    name: "Evolution Heights",
    area: "Hillside campus",
    hours: "Open until 11 PM",
    amenities: ["Olympic racks", "Mobility lab", "Recovery", "Valet"],
    image: IMG.squat,
  },
];

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title={
          <>
            FIND YOUR
            <br />
            <span className="text-[var(--gold)]">FLOOR.</span>
          </>
        }
        description="Same standards across clubs — premium equipment, coaching culture, and hours built for real schedules."
      >
        <p className="text-sm text-[var(--gray)]">
          Preview{" "}
          <LinkPreview
            url="/programs"
            isStatic
            imageSrc={IMG.squat}
            className="font-semibold text-white underline decoration-[var(--gold)]/50 underline-offset-4"
          >
            programs
          </LinkPreview>{" "}
          available at every location, or{" "}
          <LinkPreview
            url="/memberships"
            isStatic
            imageSrc={IMG.group}
            className="font-semibold text-white underline decoration-[var(--gold)]/50 underline-offset-4"
          >
            membership options
          </LinkPreview>
          .
        </p>
      </PageHero>

      <section className="px-[var(--page-pad-x)] py-[var(--section-gap)]">
        <div className="container-page mx-auto grid max-w-[var(--content-max)] gap-6 lg:grid-cols-3">
          {LOCATIONS.map((loc) => (
            <article
              key={loc.name}
              className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[var(--card)]">
                <SafeImage
                  src={loc.image}
                  alt={loc.name}
                  className="h-full w-full max-w-none object-cover"
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
              <div className="p-5">
                <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-white">
                  {loc.name}
                </h2>
                <p className="mt-1 text-sm text-[var(--gray)]">{loc.area}</p>
                <p className="mt-2 text-xs font-semibold tracking-[0.14em] text-[var(--gold)] uppercase">
                  {loc.hours}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {loc.amenities.map((a) => (
                    <li
                      key={a}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/70"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Button href="/join" variant="primary" size="sm">
                    Join Here
                  </Button>
                  <Button href="/contact" variant="outline" size="sm">
                    Get Directions
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FacilityGallerySection />
    </>
  );
}
