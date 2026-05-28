"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { resolveImageUrl, extractDriveId } from "@/lib/drive";

type ImageExpandProps = {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
};

type LightboxPhase = "closed" | "opening" | "open" | "closing";

function Lightbox({
  src,
  alt,
  rect,
  onClosed,
}: {
  src: string;
  alt: string;
  rect: DOMRect;
  onClosed: () => void;
}) {
  const [phase, setPhase] = useState<LightboxPhase>("opening");
  const [imgIndex, setImgIndex] = useState(0);
  const isDrive = Boolean(extractDriveId(src));
  const urls = isDrive
    ? [
        resolveImageUrl(src, "full"),
        resolveImageUrl(src, "view"),
        resolveImageUrl(src, "thumb"),
      ]
    : [src];
  const imageUrl = urls[Math.min(imgIndex, urls.length - 1)];

  const close = useCallback(() => {
    setPhase("closing");
    window.setTimeout(onClosed, 450);
  }, [onClosed]);

  useEffect(() => {
    const t1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("open"));
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(t1);
      window.removeEventListener("keydown", onKey);
    };
  }, [close]);

  const isOpen = phase === "open";
  const isClosing = phase === "closing";

  const frameStyle: React.CSSProperties =
    isOpen && !isClosing
      ? {
          position: "fixed",
          top: "50%",
          left: "50%",
          width: "min(92vw, 1200px)",
          height: "min(86vh, 900px)",
          transform: "translate(-50%, -50%)",
          borderRadius: "14px",
        }
      : {
          position: "fixed",
          top: rect.top,
          left: rect.left,
          width: Math.max(rect.width, 48),
          height: Math.max(rect.height, 48),
          transform: "none",
          borderRadius: "16px",
        };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999]"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <div
        className="absolute inset-0 transition-opacity duration-500 ease-out"
        style={{
          opacity: isOpen && !isClosing ? 1 : 0,
          background: `
            radial-gradient(ellipse 70% 55% at 25% 15%, color-mix(in srgb, var(--accent) 24%, transparent), transparent 55%),
            radial-gradient(ellipse 60% 50% at 85% 75%, color-mix(in srgb, var(--accent-cool) 20%, transparent), transparent 50%),
            rgba(7, 6, 13, 0.96)
          `,
          backdropFilter: isOpen && !isClosing ? "blur(32px) saturate(1.25)" : "none",
          WebkitBackdropFilter: isOpen && !isClosing ? "blur(32px) saturate(1.25)" : "none",
        }}
        onClick={close}
        onPointerDown={(e) => e.stopPropagation()}
        aria-hidden
      />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
        className="absolute right-4 top-4 z-[10001] rounded-full border border-white/25 bg-black/60 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md md:right-8 md:top-8"
        style={{
          opacity: isOpen && !isClosing ? 1 : 0,
          pointerEvents: isOpen && !isClosing ? "auto" : "none",
        }}
      >
        Close
      </button>

      <div
        className="z-[10000] overflow-hidden bg-black/40 shadow-[0_40px_120px_-16px_rgba(0,0,0,0.9)] transition-[top,left,width,height,transform,border-radius] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={frameStyle}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="relative h-full w-full">
          <Image
            src={imageUrl}
            alt={alt}
            fill
            unoptimized
            draggable={false}
            className="object-contain"
            sizes="100vw"
            onError={() => {
              if (imgIndex < urls.length - 1) {
                setImgIndex((i) => i + 1);
              }
            }}
          />
        </div>
      </div>

      <p
        className="pointer-events-none absolute bottom-6 left-1/2 z-[10001] max-w-[90vw] -translate-x-1/2 truncate px-4 text-center text-sm text-white/75"
        style={{ opacity: isOpen && !isClosing ? 1 : 0 }}
      >
        {alt}
      </p>
    </div>,
    document.body
  );
}

const TAP_MOVE_THRESHOLD_PX = 14;

export function ImageExpand({ src, alt, children, className = "" }: ImageExpandProps) {
  const [lightbox, setLightbox] = useState<{
    src: string;
    alt: string;
    rect: DOMRect;
  } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  function openFromRect() {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setLightbox({ src, alt, rect });
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.stopPropagation();
    pointerStart.current = { x: e.clientX, y: e.clientY };
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    e.stopPropagation();
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const dx = Math.abs(e.clientX - start.x);
    const dy = Math.abs(e.clientY - start.y);
    if (dx <= TAP_MOVE_THRESHOLD_PX && dy <= TAP_MOVE_THRESHOLD_PX) {
      e.preventDefault();
      openFromRect();
    }
  }

  function handlePointerCancel() {
    pointerStart.current = null;
  }

  function close() {
    setLightbox(null);
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }

  return (
    <>
      <div
        ref={wrapRef}
        role="button"
        tabIndex={0}
        data-image-expand=""
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openFromRect();
          }
        }}
        className={`group/expand relative block w-full cursor-zoom-in touch-manipulation select-none ${className}`}
        aria-label={`View full size: ${alt}`}
      >
        <div className="pointer-events-none [&_img]:pointer-events-none [&_*]:pointer-events-none">
          {children}
        </div>
        <span
          className="pointer-events-none absolute inset-0 z-[40] rounded-[inherit] ring-0 transition group-hover/expand:ring-1 group-hover/expand:ring-white/25"
          aria-hidden
        />
      </div>
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          rect={lightbox.rect}
          onClosed={close}
        />
      )}
    </>
  );
}
