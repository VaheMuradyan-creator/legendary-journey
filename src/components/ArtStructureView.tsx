import type { ArtStructurePortfolio } from "@/lib/portfolio";
import {
  ARTIST_STATEMENTS_REQUIRED,
  ART_STRUCTURE_SLOT_COUNT,
} from "@/lib/art-structure-categories";
import { ArtStructureCard } from "@/components/ArtStructureCard";
import { BlendImage } from "@/components/BlendImage";
import { HeroScroll } from "@/components/HeroScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteNav } from "@/components/SiteNav";
import { isPlaceholderMedia } from "@/lib/drive";

export function ArtStructureView({ portfolio }: { portfolio: ArtStructurePortfolio }) {
  const { artStructure } = portfolio;
  const cover =
    artStructure.coverImage && !isPlaceholderMedia(artStructure.coverImage)
      ? artStructure.coverImage
      : null;

  return (
    <div className="scroll-story min-h-screen">
      <ScrollProgress />
      <SiteNav active="/art-structure" />

      <header className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden px-6 pb-16 pt-24">
        <HeroScroll />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <ScrollReveal>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-[var(--accent-cool)]">
              {artStructure.portfolioTitle}
            </p>
            <h1 className="text-3d text-5xl sm:text-6xl md:text-7xl">{portfolio.name}</h1>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
              Best work grouped by material and theme — full views, detail shots, and
              artist&apos;s statements. Minimum {ART_STRUCTURE_SLOT_COUNT} artworks,{" "}
              {ARTIST_STATEMENTS_REQUIRED} with writing.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-white/10 bg-card px-4 py-2 backdrop-blur-md">
                {portfolio.filledCount} / {ART_STRUCTURE_SLOT_COUNT} artworks
              </span>
              <span className="rounded-full border border-white/10 bg-card px-4 py-2 backdrop-blur-md">
                {portfolio.statementCount} / {ARTIST_STATEMENTS_REQUIRED} artist&apos;s
                statements
              </span>
            </div>
          </ScrollReveal>
          {cover && (
            <ScrollReveal delay={320} className="mt-10 max-w-4xl">
              <BlendImage
                src={cover}
                alt="Art structure cover"
                aspectClass="aspect-[21/9] max-h-72"
                priority
              />
            </ScrollReveal>
          )}
        </div>
      </header>

      <main id="work" className="relative">
        {portfolio.sections.length === 0 && (
          <p className="mx-auto max-w-6xl px-6 py-20 text-muted">
            Artworks will appear here when you add them in Portfolio Studio → Art structure.
          </p>
        )}

        {portfolio.sections.map((section, sectionIndex) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-20 border-t border-white/5 py-16 md:py-24"
          >
            <div className="mx-auto max-w-6xl px-6">
              <ScrollReveal delay={sectionIndex * 60}>
                <div className="mb-4 flex items-baseline gap-4">
                  <span className="font-display text-5xl font-bold text-white/10 md:text-7xl">
                    {String(sectionIndex + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-display text-3xl font-bold md:text-5xl">
                      {section.title}
                    </h2>
                    {section.subtitle && (
                      <p className="mt-2 max-w-2xl text-muted">{section.subtitle}</p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={100}>
              <div className="gallery-track items-start">
                {section.items.map((work, i) => (
                  <ArtStructureCard key={work.id} work={work} index={i} />
                ))}
              </div>
              <p className="mx-auto mt-2 max-w-6xl px-6 text-center text-xs text-muted md:text-left">
                ← Scroll sideways — full view, details, and statements per piece →
              </p>
            </ScrollReveal>
          </section>
        ))}
      </main>

      <footer className="border-t border-white/10 py-16 text-center">
        <ScrollReveal>
          <p className="font-display text-2xl font-bold">{portfolio.name}</p>
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-muted">
            {artStructure.portfolioTitle}
          </p>
        </ScrollReveal>
      </footer>
    </div>
  );
}
