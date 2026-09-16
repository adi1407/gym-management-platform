import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";
import { TRAINERS, type TrainerSlug } from "@/data/pages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(TRAINERS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trainer = TRAINERS[slug as TrainerSlug];
  if (!trainer) return { title: "Trainer" };
  return {
    title: trainer.name,
    description: trainer.bio,
  };
}

export default async function TrainerDetailPage({ params }: Props) {
  const { slug } = await params;
  const trainer = TRAINERS[slug as TrainerSlug];
  if (!trainer) notFound();

  return (
    <>
      <PageHero
        eyebrow={trainer.role}
        title={
          <>
            {trainer.name.split(" ")[0].toUpperCase()}
            <br />
            <span className="text-[var(--gold)]">
              {trainer.name.split(" ").slice(1).join(" ").toUpperCase()}
            </span>
          </>
        }
        description={trainer.bio}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact" variant="primary" size="md">
            Book Consultation
          </Button>
          <Button href="/trainers" variant="outline" size="md">
            All Trainers
          </Button>
        </div>
      </PageHero>

      <section className="px-[var(--page-pad-x)] pb-[var(--section-gap)]">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-xl border border-[var(--border)]">
            <SafeImage
              src={trainer.image}
              alt={trainer.name}
              className="aspect-[4/5] w-full max-w-none object-cover"
              style={{ width: "100%", height: "100%", minHeight: 420 }}
            />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--gold)] uppercase">
              {trainer.focus}
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--gray)]">
              {trainer.bio} Sessions are programmed to your level — assessment
              first, then a clear plan you can actually stick to.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/programs" variant="ghost" size="md">
                Explore programs →
              </Button>
              <Button href="/memberships" variant="outline" size="md">
                Memberships
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
