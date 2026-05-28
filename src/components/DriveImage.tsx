"use client";

import Image from "next/image";
import { useState } from "react";
import { resolveImageUrl, extractDriveId } from "@/lib/drive";

type DriveImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function DriveImage({
  src,
  alt,
  className,
  priority,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: DriveImageProps) {
  const [urlIndex, setUrlIndex] = useState(0);
  const isDrive = Boolean(extractDriveId(src));
  const urls = isDrive
    ? [
        resolveImageUrl(src, "thumb"),
        resolveImageUrl(src, "view"),
        resolveImageUrl(src, "full"),
      ]
    : [src];
  const url = urls[Math.min(urlIndex, urls.length - 1)];

  return (
    <Image
      src={url}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized
      draggable={false}
      onError={() => {
        if (urlIndex < urls.length - 1) {
          setUrlIndex((i) => i + 1);
        }
      }}
    />
  );
}
