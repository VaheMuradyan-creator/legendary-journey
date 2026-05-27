"use client";

import { DriveImage } from "@/components/DriveImage";

type BlendImageProps = {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain";
};

export function BlendImage({
  src,
  alt,
  className = "",
  aspectClass = "aspect-[4/3]",
  priority,
  objectFit = "cover",
}: BlendImageProps) {
  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";

  return (
    <div className={`blend-image-wrap relative w-full overflow-visible ${aspectClass}`}>
      <div className="blend-image-ambient absolute z-0" aria-hidden>
        <div className={`relative h-full w-full ${aspectClass}`}>
          <DriveImage
            src={src}
            alt=""
            className={fitClass}
            priority={priority}
          />
        </div>
      </div>

      <div
        className="blend-image-vignette pointer-events-none absolute inset-[-12%] z-[2]"
        aria-hidden
      />

      <div className={`blend-image-core relative z-[3] h-full w-full ${aspectClass}`}>
        <DriveImage
          src={src}
          alt={alt}
          className={`${fitClass} ${className}`}
          priority={priority}
        />
      </div>
    </div>
  );
}
