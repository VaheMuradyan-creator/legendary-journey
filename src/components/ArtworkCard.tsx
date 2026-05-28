"use client";

import type { ArtworkItem } from "@/lib/portfolio";
import { BlendImage } from "@/components/BlendImage";
import { ImageExpand } from "@/components/ImageExpand";
import { isPlaceholderMedia } from "@/lib/drive";

export function ArtworkCard({ item, index = 0 }: { item: ArtworkItem; index?: number }) {
  const raw = item.images?.length ? item.images : item.image ? [item.image] : [];
  const images = raw.filter((s) => !isPlaceholderMedia(s));

  return (
    <article
      className="gallery-item group"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative rounded-3xl bg-card/40 p-1 backdrop-blur-sm transition duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_28px_60px_-20px_rgba(255,107,74,0.35)]">
        <div
          className="absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--accent) 40%, transparent), transparent 50%, color-mix(in srgb, var(--accent-cool) 30%, transparent))",
          }}
        />

        {images.length === 0 && (
          <div className="relative flex aspect-[4/3] items-center justify-center rounded-[1.35rem] bg-black/40 p-8 text-center text-sm text-muted">
            Add image in Portfolio Studio
          </div>
        )}

        {images.length === 1 && (
          <ImageExpand
            src={images[0]}
            alt={item.title}
            className="rounded-[1.35rem]"
          >
            <BlendImage src={images[0]} alt={item.title} aspectClass="aspect-[4/3]" />
          </ImageExpand>
        )}

        {images.length > 1 && (
          <div className="grid grid-cols-2 gap-1 rounded-[1.35rem] p-1">
            {images.map((src, i) => (
              <ImageExpand
                key={`${item.title}-${i}`}
                src={src}
                alt={`${item.title} ${i + 1}`}
                className="overflow-visible rounded-2xl"
              >
                <BlendImage
                  src={src}
                  alt={`${item.title} ${i + 1}`}
                  aspectClass="aspect-square"
                />
              </ImageExpand>
            ))}
          </div>
        )}

        <div className="relative z-10 flex flex-col gap-2 px-5 pb-5 pt-4">
          <h3 className="font-display text-xl font-bold tracking-tight">{item.title}</h3>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-glow)]">
            {item.media}
          </p>
          {item.description && (
            <p className="text-sm leading-relaxed text-muted">{item.description}</p>
          )}
        </div>
      </div>
    </article>
  );
}
