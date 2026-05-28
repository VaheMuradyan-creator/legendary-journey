"use client";

import type { ArtStructureWork } from "@/lib/portfolio";
import { BlendImage } from "@/components/BlendImage";
import { ImageExpand } from "@/components/ImageExpand";
import { isPlaceholderMedia } from "@/lib/drive";

export function ArtStructureCard({
  work,
  index = 0,
}: {
  work: ArtStructureWork;
  index?: number;
}) {
  const mainImage =
    work.image && !isPlaceholderMedia(work.image) ? work.image : null;
  const details =
    work.images?.filter((s) => !isPlaceholderMedia(s)) ?? [];
  const process =
    work.processImages?.filter((s) => !isPlaceholderMedia(s)) ?? [];
  const hasStatement = Boolean(work.artistStatement?.trim());
  const meta = [work.media, work.date].filter(Boolean).join(" · ");

  return (
    <article
      className="gallery-item group max-w-2xl"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative rounded-3xl bg-card/40 p-1 backdrop-blur-sm transition duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_28px_60px_-20px_rgba(255,107,74,0.35)]">
        {!mainImage && details.length === 0 && (
          <div className="flex aspect-[4/3] items-center justify-center rounded-[1.35rem] bg-black/40 p-8 text-center text-sm text-muted">
            Add main image in Portfolio Studio
          </div>
        )}

        {mainImage && (
          <ImageExpand
            src={mainImage}
            alt={work.title}
            className="rounded-[1.35rem]"
          >
            <BlendImage src={mainImage} alt={work.title} aspectClass="aspect-[4/3]" />
          </ImageExpand>
        )}

        {details.length > 0 && (
          <div className="mt-2 grid grid-cols-2 gap-1 px-1">
            {details.map((src, i) => (
              <ImageExpand
                key={`${work.id}-detail-${i}`}
                src={src}
                alt={`${work.title} detail ${i + 1}`}
                className="overflow-visible rounded-2xl"
              >
                <BlendImage
                  src={src}
                  alt={`${work.title} detail ${i + 1}`}
                  aspectClass="aspect-square"
                />
              </ImageExpand>
            ))}
          </div>
        )}

        {process.length > 0 && (
          <div className="mt-2 px-4">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent-cool)]">
              Process & sketchbook
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {process.map((src, i) => (
                <ImageExpand
                  key={`${work.id}-proc-${i}`}
                  src={src}
                  alt={`${work.title} process ${i + 1}`}
                  className="h-24 w-32 shrink-0 overflow-visible rounded-xl"
                >
                  <BlendImage
                    src={src}
                    alt={`${work.title} process ${i + 1}`}
                    aspectClass="aspect-[4/3] h-24 w-32"
                  />
                </ImageExpand>
              ))}
            </div>
          </div>
        )}

        <div className="relative z-10 flex flex-col gap-3 px-5 pb-5 pt-4">
          <h3 className="font-display text-xl font-bold tracking-tight">{work.title}</h3>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-glow)]">
            {meta || "Add media and year"}
          </p>
          {hasStatement && (
            <div className="rounded-xl border border-white/10 bg-black/25 p-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--accent-cool)]">
                Artist&apos;s statement
              </p>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted">
                {work.artistStatement}
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
