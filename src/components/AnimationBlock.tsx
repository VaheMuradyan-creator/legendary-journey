import type { AnimationItem } from "@/lib/portfolio";
import { ArtworkCard } from "@/components/ArtworkCard";
import { BlendImage } from "@/components/BlendImage";
import { ImageExpand } from "@/components/ImageExpand";
import { DriveVideo } from "@/components/DriveVideo";
import { ScrollReveal } from "@/components/ScrollReveal";
import { isPlaceholderMedia } from "@/lib/drive";

export function AnimationBlock({
  item,
  index,
}: {
  item: AnimationItem;
  index: number;
}) {
  const progressImages =
    item.progress?.images?.filter((s) => !isPlaceholderMedia(s)) ?? [];

  return (
    <ScrollReveal delay={index * 120}>
      <section className="relative min-h-[85vh] scroll-mt-8 py-8 md:min-h-screen md:py-16">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="mb-2 font-display text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent-cool)]">
              Animation {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="font-display text-3xl font-bold md:text-5xl">{item.title}</h3>
            <p className="mt-2 text-sm font-medium uppercase tracking-wider text-[var(--accent-glow)]">
              {item.media}
            </p>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="overflow-visible">
            {isPlaceholderMedia(item.video) ? (
              <div className="flex aspect-video items-center justify-center rounded-3xl border border-dashed border-white/15 bg-black/30 p-8 text-center text-sm text-muted">
                Paste Google Drive video link in content/mine.json
              </div>
            ) : (
              <div className="relative overflow-visible rounded-3xl">
                <div
                  className="pointer-events-none absolute -inset-8 rounded-[2rem] opacity-60 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, color-mix(in srgb, var(--accent) 35%, transparent), transparent 70%)",
                  }}
                />
                <div className="blend-image-vignette pointer-events-none absolute -inset-6 z-[2] rounded-3xl opacity-70" />
                <div className="relative z-[3] overflow-hidden rounded-3xl ring-1 ring-white/10">
                  <DriveVideo src={item.video} title={item.title} />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            {item.still && !isPlaceholderMedia(item.still) && (
              <div className="overflow-visible">
                <ImageExpand
                  src={item.still}
                  alt={`${item.title} still`}
                  className="rounded-2xl"
                >
                  <BlendImage
                    src={item.still}
                    alt={`${item.title} still`}
                    aspectClass="aspect-video"
                  />
                </ImageExpand>
              </div>
            )}
            <p className="text-base leading-relaxed text-muted md:text-lg">
              {item.description}
            </p>
          </div>
        </div>

        {item.progress && (
          <div className="mt-14 border-t border-white/10 pt-12">
            <h4 className="font-display text-2xl font-bold md:text-3xl">
              {item.progress.title ?? "Behind the scenes"}
            </h4>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
              {item.progress.description}
            </p>

            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              {item.progress.storyboard &&
                !isPlaceholderMedia(item.progress.storyboard) && (
                  <ScrollReveal direction="left">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent-glow)]">
                      Storyboard
                    </p>
                    <ImageExpand
                      src={item.progress.storyboard}
                      alt={`${item.title} storyboard`}
                      className="rounded-2xl"
                    >
                      <BlendImage
                        src={item.progress.storyboard}
                        alt={`${item.title} storyboard`}
                        aspectClass="aspect-[16/10]"
                        objectFit="contain"
                      />
                    </ImageExpand>
                  </ScrollReveal>
                )}
              {item.progress.video && !isPlaceholderMedia(item.progress.video) && (
                <ScrollReveal direction="right">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent-glow)]">
                    Process video
                  </p>
                  <div className="overflow-visible rounded-3xl ring-1 ring-white/10">
                    <DriveVideo src={item.progress.video} title={`${item.title} progress`} />
                  </div>
                </ScrollReveal>
              )}
            </div>

            {progressImages.length > 0 && (
              <div className="gallery-track mt-8 -mx-6 md:-mx-0">
                {progressImages.map((src, i) => (
                <ArtworkCard
                  key={`${item.id}-progress-${i}`}
                  index={i}
                  item={{
                    title: `Progress ${i + 1}`,
                    media: item.media,
                    image: src,
                  }}
                />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </ScrollReveal>
  );
}
