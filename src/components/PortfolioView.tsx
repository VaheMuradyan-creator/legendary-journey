import Link from "next/link";
import type { Portfolio } from "@/lib/portfolio";
import { animationHasContent, countDrawingWorks, countFilledAnimations } from "@/lib/portfolio";
import { ArtworkCard } from "@/components/ArtworkCard";
import { AnimationBlock } from "@/components/AnimationBlock";
import { BlendImage } from "@/components/BlendImage";
import { HeroScroll } from "@/components/HeroScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteNav } from "@/components/SiteNav";
import { isPlaceholderMedia } from "@/lib/drive";

export type PortfolioViewMode = "full" | "animation";

type PortfolioViewProps = {
  portfolio: Portfolio;
  mode?: PortfolioViewMode;
};

export function PortfolioView({ portfolio, mode = "full" }: PortfolioViewProps) {
  const drawingCount = countDrawingWorks(portfolio);
  const animationCount = countFilledAnimations(portfolio);
  const visibleAnimations = portfolio.animations.filter(animationHasContent);

  const showArt = mode === "full" || mode === "animation";
  const showAnimation = mode === "full" || mode === "animation";

  const activeNav = mode === "animation" ? "/animation" : "/";
  const sectionLabel = mode === "animation" ? "Animation" : "Animation Portfolio";
  const compactHero = mode !== "full";

  return (
    <div className="scroll-story min-h-screen">
      <ScrollProgress />
      <SiteNav active={activeNav} />

      <header
        className={`relative flex flex-col justify-center overflow-hidden px-6 ${
          compactHero ? "min-h-[55vh] pb-16 pt-24" : "min-h-screen pb-20 pt-16"
        }`}
      >
        <HeroScroll />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <ScrollReveal>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-[var(--accent-cool)]">
              {sectionLabel}
            </p>
            <h1
              className={
                compactHero
                  ? "font-display text-4xl font-bold tracking-tight md:text-6xl"
                  : "text-3d text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem]"
              }
            >
              {portfolio.name}
            </h1>
          </ScrollReveal>

          {mode === "full" && (
            <>
              <ScrollReveal delay={150}>
                <p className="mt-8 max-w-xl text-lg font-light text-muted md:text-xl">
                  {portfolio.subtitle}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={280}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <span className="rounded-full border border-white/10 bg-card px-4 py-2 text-sm backdrop-blur-md">
                    {drawingCount} artworks
                  </span>
                  <span className="rounded-full border border-white/10 bg-card px-4 py-2 text-sm backdrop-blur-md">
                    {animationCount} animations
                  </span>
                </div>
              </ScrollReveal>
            </>
          )}

          {mode === "animation" && (
            <>
              <ScrollReveal delay={150}>
                <p className="mt-6 max-w-xl text-lg text-muted">
                  {portfolio.subtitle}
                </p>
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
            </>
          )}

          {(mode === "full" || mode === "animation") &&
            portfolio.coverImage &&
            !isPlaceholderMedia(portfolio.coverImage) && (
              <ScrollReveal delay={400} className="mt-12 max-w-4xl">
                <BlendImage
                  src={portfolio.coverImage}
                  alt={`${portfolio.name} cover`}
                  aspectClass="aspect-[21/9] max-h-80"
                  priority
                />
              </ScrollReveal>
            )}

          {mode === "full" && (
            <nav className="mt-14 flex flex-wrap gap-6">
              <a
                href="#work"
                className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-foreground/80 transition hover:text-[var(--accent-glow)]"
              >
                Work ↓
              </a>
              <a
                href="#animations"
                className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-foreground/80 transition hover:text-[var(--accent-glow)]"
              >
                Film ↓
              </a>
              <Link
                href="/art-structure"
                className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent-glow)]"
              >
                Art structure →
              </Link>
              <Link
                href="/animation"
                className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent-cool)]"
              >
                Animation →
              </Link>
            </nav>
          )}
        </div>

        {!compactHero && (
          <a
            href="#work"
            className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted transition hover:text-foreground"
          >
            <span>Scroll</span>
            <span className="animate-scroll-cue block h-8 w-px bg-gradient-to-b from-[var(--accent)] to-transparent" />
          </a>
        )}
      </header>

      {showArt && (
        <main id="work" className="relative">
          {mode === "animation" && portfolio.drawingSections.length > 0 && (
            <div className="mx-auto max-w-6xl px-6 pt-12">
              <ScrollReveal>
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--accent-glow)]">
                  Design &amp; drawing
                </p>
                <h2 className="text-3d mt-4 text-4xl md:text-5xl">Pictures</h2>
                <p className="mt-3 max-w-2xl text-muted">
                  Original artwork — character design, drawing, backgrounds, and more.
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
                    ← Scroll sideways through this section →
                  </p>
                </ScrollReveal>
              ) : (
                <p className="mx-auto max-w-6xl px-6 text-muted">
                  No pieces in this section yet.
                </p>
              )}
            </section>
          ))}
        </main>
      )}

      {showAnimation && (
        <section
          id="animations"
          className="scroll-mt-20 border-t border-white/10 px-6 py-20 md:px-8 md:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--accent-cool)]">
                Motion & film
              </p>
              <h2 className="text-3d mt-4 text-4xl md:text-6xl">Animation</h2>
              {mode !== "animation" && (
                <p className="mt-4 max-w-2xl text-lg text-muted">
                  Scroll through each film — video, stills, and behind-the-scenes.
                </p>
              )}
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
      )}

      <footer className="border-t border-white/10 py-16 text-center">
        <ScrollReveal>
          <p className="font-display text-2xl font-bold">{portfolio.name}</p>
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-muted">
            Animation Class Portfolio
          </p>
        </ScrollReveal>
      </footer>
    </div>
  );
}
