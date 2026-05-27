import Link from "next/link";
import type { Portfolio } from "@/lib/portfolio";
import { countDrawingWorks } from "@/lib/portfolio";
import { ArtworkCard } from "@/components/ArtworkCard";
import { AnimationBlock } from "@/components/AnimationBlock";
import { DriveImage } from "@/components/DriveImage";
import { isPlaceholderMedia } from "@/lib/drive";

export function PortfolioView({ portfolio }: { portfolio: Portfolio }) {
  const drawingCount = countDrawingWorks(portfolio);
  const animationCount = portfolio.animations.length;

  return (
    <div className="min-h-screen">
      <header
        className="relative overflow-hidden border-b border-card-border"
        style={{
          background: `linear-gradient(135deg, color-mix(in srgb, ${portfolio.accent} 18%, var(--background)) 0%, var(--background) 55%)`,
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 md:py-24">
          <Link
            href="/"
            className="w-fit text-sm text-muted transition hover:text-foreground"
          >
            ← All portfolios
          </Link>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Animation Portfolio
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            {portfolio.name}
          </h1>
          <p className="max-w-2xl text-lg text-muted">{portfolio.subtitle}</p>
          <div className="flex flex-wrap gap-3 text-sm text-muted">
            <span className="rounded-full border border-card-border px-3 py-1">
              {drawingCount} design / drawing works
            </span>
            <span className="rounded-full border border-card-border px-3 py-1">
              {animationCount} animations
            </span>
          </div>
          {portfolio.coverImage && !isPlaceholderMedia(portfolio.coverImage) && (
            <div className="relative mt-4 aspect-[21/9] max-h-72 w-full overflow-hidden rounded-2xl border border-card-border">
              <DriveImage
                src={portfolio.coverImage}
                alt={`${portfolio.name} cover`}
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-14">
        {portfolio.drawingSections.map((section) => (
          <section key={section.id} id={section.id} className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold">{section.title}</h2>
              {section.subtitle && (
                <p className="mt-2 max-w-2xl text-muted">{section.subtitle}</p>
              )}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <ArtworkCard key={`${section.id}-${item.title}`} item={item} />
              ))}
            </div>
          </section>
        ))}

        <section id="animations" className="scroll-mt-24">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold">Animation</h2>
            <p className="mt-2 max-w-2xl text-muted">
              Best animation work with descriptions. At least one project includes
              progress, storyboard, and process materials.
            </p>
          </div>
          <div className="flex flex-col gap-10">
            {portfolio.animations.map((item) => (
              <AnimationBlock key={item.title} item={item} />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-card-border py-10 text-center text-sm text-muted">
        {portfolio.name} · Animation Class Portfolio
      </footer>
    </div>
  );
}
