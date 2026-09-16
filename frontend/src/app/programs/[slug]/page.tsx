import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";
import { PROGRAMS, type ProgramSlug } from "@/data/pages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(PROGRAMS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = PROGRAMS[slug as ProgramSlug];
  if (!program) return { title: "Program" };
  return {
    title: program.title,
    description: program.description,
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = PROGRAMS[slug as ProgramSlug];
  if (!program) notFound();

  return (
    <>
      <PageHero
        eyebrow={program.eyebrow}
        title={
          <>
            {program.title.toUpperCase()}
            <br />
            <span className="text-[var(--gold)]">{program.headline}</span>
          </>
        }
        description={program.description}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/join" variant="primary" size="md">
            Start Training
          </Button>
          <Button href="/programs" variant="outline" size="md">
            All Programs
          </Button>
        </div>
      </PageHero>

      <section className="px-[var(--page-pad-x)] py-[var(--section-gap)]">
        <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="overflow-hidden rounded-xl border border-[var(--border)]">
            <SafeImage
              src={program.image}
              alt={program.title}
              className="aspect-[16/10] w-full max-w-none object-cover"
              style={{ width: "100%", height: "100%", minHeight: 280 }}
            />
          </div>
          <div className="space-y-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
                Cadence
              </p>
              <p className="mt-2 text-lg text-white">{program.sessions}</p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
                Focus
              </p>
              <ul className="mt-3 space-y-2">
                {program.focus.map((item) => (
                  <li
                    key={item}
                    className="border-b border-white/10 pb-2 text-sm text-[var(--gray)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Button href="/contact" variant="ghost" size="md">
              Talk to a coach →
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
