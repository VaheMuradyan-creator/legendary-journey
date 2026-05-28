import type { Portfolio } from "@/lib/portfolio";
import { animationHasContent, countDrawingWorks, countFilledAnimations } from "@/lib/portfolio";
import { ArtworkCard } from "@/components/ArtworkCard";
import { AnimationBlock } from "@/components/AnimationBlock";
import { BlendImage } from "@/components/BlendImage";
import { HeroScroll } from "@/components/HeroScroll";
import { ImageExpand } from "@/components/ImageExpand";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteNav } from "@/components/SiteNav";
import { isPlaceholderMedia } from "@/lib/drive";

export function PortfolioView({ portfolio }: { portfolio: Portfolio }) {
  const drawingCount = countDrawingWorks(portfolio);
  const animationCount = countFilledAnimations(portfolio);
  const visibleAnimations = portfolio.animations.filter(animationHasContent);

  return (
    <div className="scroll-story min-h-screen">
      <ScrollProgress />
      <SiteNav active="/animation" />

      <header className="relative flex min-h-[55vh] flex-col justify-center overflow-hidden px-6 pb-16 pt-24">
        <HeroScroll />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <ScrollReveal>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-[var(--accent-cool)]">
              Animation Portfolio
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
              {portfolio.name}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <p className="mt-6 max-w-xl text-lg text-muted">{portfolio.subtitle}</p>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <div className="mt-8 flex flex-wrap gap-4">
              <span className="rounded-full border border-white/10 bg-card px-4 py-2 text-sm backdrop-blur-md">
                {drawingCount} pictures &amp; artworks
              </span>
              <span className="rounded-full border border-white/10 bg-card px-4 py-2 text-sm backdrop-blur-md">
                {animationCount} animations
              </span>
            </div>
          </ScrollReveal>

          <nav className="mt-10 flex flex-wrap gap-6">
            <a
              href="#work"
              className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent-glow)] transition hover:text-foreground"
            >
              Pictures ↓
            </a>
            <a
              href="#animations"
              className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent-cool)] transition hover:text-foreground"
            >
              Films ↓
            </a>
          </nav>

          {portfolio.coverImage && !isPlaceholderMedia(portfolio.coverImage) && (
            <ScrollReveal delay={320} className="mt-10 max-w-4xl">
              <ImageExpand
                src={portfolio.coverImage}
                alt={`${portfolio.name} cover`}
                className="rounded-2xl"
              >
                <BlendImage
                  src={portfolio.coverImage}
                  alt={`${portfolio.name} cover`}
                  aspectClass="aspect-[21/9] max-h-72"
                  priority
                />
              </ImageExpand>
            </ScrollReveal>
          )}
        </div>
      </header>

      <main id="work" className="relative">
        {portfolio.drawingSections.length > 0 && (
          <div className="mx-auto max-w-6xl px-6 pt-12">
            <ScrollReveal>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--accent-glow)]">
                Design &amp; drawing
              </p>
              <h2 className="text-3d mt-4 text-4xl md:text-5xl">Pictures</h2>
              <p className="mt-3 max-w-2xl text-muted">
                Tap any image for full screen. Original artwork by category.
              </p>
            </ScrollReveal>
          </div>
        )}
        {portfolio.drawingSections.map((section, sectionIndex) => (
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

            {section.items.length > 0 ? (
              <ScrollReveal delay={120}>
                <div className="gallery-track">
                  {section.items.map((item, i) => (
                    <ArtworkCard
                      key={`${section.id}-${item.title}-${i}`}
                      item={item}
                      index={i}
                    />
                  ))}
                </div>
                <p className="mx-auto mt-2 max-w-6xl px-6 text-center text-xs text-muted md:text-left">
                  ← Scroll sideways · tap image for full screen →
                </p>
              </ScrollReveal>
            ) : null}
          </section>
        ))}
      </main>

      <section
        id="animations"
        className="scroll-mt-20 border-t border-white/10 px-6 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--accent-cool)]">
              Motion &amp; film
            </p>
            <h2 className="text-3d mt-4 text-4xl md:text-6xl">Films</h2>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Animation exercises and films — video, stills, and behind-the-scenes.
            </p>
          </ScrollReveal>

          <div className="mt-16 flex flex-col gap-4">
            {visibleAnimations.map((item, i) => (
              <AnimationBlock key={item.id} item={item} index={i} />
            ))}
            {visibleAnimations.length === 0 && (
              <p className="text-muted">No animations published yet.</p>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-16 text-center">
        <ScrollReveal>
          <p className="font-display text-2xl font-bold">{portfolio.name}</p>
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-muted">
            Animation Portfolio
          </p>
        </ScrollReveal>
      </footer>
    </div>
  );
}
