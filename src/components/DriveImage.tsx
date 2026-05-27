"use client";

import Image from "next/image";
import { useState } from "react";
import { driveImageUrl, driveThumbnailUrl, extractDriveId } from "@/lib/drive";

type DriveImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function DriveImage({ src, alt, className, priority }: DriveImageProps) {
  const [useFallback, setUseFallback] = useState(false);
  const isDrive = Boolean(extractDriveId(src));
  const primary = isDrive ? driveThumbnailUrl(src) : src;
  const fallback = isDrive ? driveImageUrl(src) : src;

  if (!isDrive) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  const url = useFallback ? fallback : primary;

  return (
    <Image
      src={url}
      alt={alt}
      fill
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={priority}
      unoptimized
      onError={() => {
        if (!useFallback) setUseFallback(true);
      }}
    />
  );
}
