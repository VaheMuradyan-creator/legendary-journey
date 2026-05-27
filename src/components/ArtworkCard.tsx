import type { ArtworkItem } from "@/lib/portfolio";
import { DriveImage } from "@/components/DriveImage";
import { isPlaceholderMedia } from "@/lib/drive";

export function ArtworkCard({ item }: { item: ArtworkItem }) {
  const raw = item.images?.length ? item.images : item.image ? [item.image] : [];
  const images = raw.filter((s) => !isPlaceholderMedia(s));

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card transition hover:border-accent-muted">
      {images.length === 0 && (
        <div className="flex aspect-[4/3] items-center justify-center bg-black/30 p-6 text-center text-sm text-muted">
          Add a Google Drive link in content JSON
        </div>
      )}
      {images.length > 0 && (
        <div
          className={
            images.length > 1
              ? "grid grid-cols-2 gap-0.5 bg-card-border"
              : "relative aspect-[4/3] w-full bg-black/40"
          }
        >
          {images.map((src, i) => (
            <div
              key={`${item.title}-${i}`}
              className={
                images.length > 1
                  ? "relative aspect-square"
                  : "relative aspect-[4/3] w-full"
              }
            >
              <DriveImage
                src={src}
                alt={`${item.title}${images.length > 1 ? ` ${i + 1}` : ""}`}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
        <p className="text-sm text-accent">{item.media}</p>
        {item.description && (
          <p className="text-sm leading-relaxed text-muted">{item.description}</p>
        )}
      </div>
    </article>
  );
}
