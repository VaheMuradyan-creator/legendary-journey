import type { AnimationItem } from "@/lib/portfolio";
import { ArtworkCard } from "@/components/ArtworkCard";
import { DriveVideo } from "@/components/DriveVideo";
import { DriveImage } from "@/components/DriveImage";
import { isPlaceholderMedia } from "@/lib/drive";

export function AnimationBlock({ item }: { item: AnimationItem }) {
  const progressImages =
    item.progress?.images?.filter((s) => !isPlaceholderMedia(s)) ?? [];

  return (
    <section className="scroll-mt-24 rounded-3xl border border-card-border bg-card/60 p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-2xl font-semibold">{item.title}</h3>
          <p className="text-sm text-accent">{item.media}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        {isPlaceholderMedia(item.video) ? (
          <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-card-border bg-black/20 p-6 text-center text-sm text-muted">
            Paste your Google Drive video share link in content JSON
          </div>
        ) : (
          <DriveVideo src={item.video} title={item.title} />
        )}
        <div className="flex flex-col gap-4">
          {item.still && !isPlaceholderMedia(item.still) && (
            <div className="relative aspect-video overflow-hidden rounded-xl border border-card-border">
              <DriveImage src={item.still} alt={`${item.title} still`} className="object-cover" />
            </div>
          )}
          <p className="text-sm leading-relaxed text-muted md:text-base">
            {item.description}
          </p>
        </div>
      </div>

      {item.progress && (
        <div className="mt-10 border-t border-card-border pt-8">
          <h4 className="mb-2 text-xl font-semibold text-foreground">
            {item.progress.title ?? "Progress & behind the scenes"}
          </h4>
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
            {item.progress.description}
          </p>

          <div className="grid gap-6 lg:grid-cols-2">
            {item.progress.storyboard && !isPlaceholderMedia(item.progress.storyboard) && (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent">
                  Storyboard
                </p>
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-card-border">
                  <DriveImage
                    src={item.progress.storyboard}
                    alt={`${item.title} storyboard`}
                    className="object-contain bg-black/30"
                  />
                </div>
              </div>
            )}
            {item.progress.video && !isPlaceholderMedia(item.progress.video) && (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent">
                  Process video
                </p>
                <DriveVideo src={item.progress.video} title={`${item.title} progress`} />
              </div>
            )}
          </div>

          {progressImages.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {progressImages.map((src, i) => (
                <ArtworkCard
                  key={`progress-${i}`}
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
  );
}
