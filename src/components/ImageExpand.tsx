"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { driveImageUrl, extractDriveId } from "@/lib/drive";

type ImageExpandProps = {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
};

type LightboxPhase = "enter" | "open" | "exit";

function Lightbox({
  src,
  alt,
  rect,
  onClose,
}: {
  src: string;
  alt: string;
  rect: DOMRect;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<LightboxPhase>("enter");
  const imageUrl = extractDriveId(src) ? driveImageUrl(src) : src;

  const close = useCallback(() => {
    setPhase("exit");
    window.setTimeout(onClose, 420);
  }, [onClose]);

  useEffect(() => {
    requestAnimationFrame(() => setPhase("open"));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const open = phase === "open";
  const exiting = phase === "exit";

  const frameStyle: React.CSSProperties = open && !exiting
    ? {
        top: "50%",
        left: "50%",
        width: "min(92vw, 1100px)",
        height: "min(88vh, 820px)",
        transform: "translate(-50%, -50%)",
        borderRadius: "12px",
      }
    : exiting
      ? {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          transform: "none",
          borderRadius: "16px",
        }
      : {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          transform: "none",
          borderRadius: "16px",
        };

  return createPortal(
    <div className="fixed inset-0 z-[300]" role="dialog" aria-modal aria-label={alt}>
      <div
        className="absolute inset-0 transition-opacity duration-[420ms] ease-out"
        style={{
          opacity: open && !exiting ? 1 : 0,
          background: `
            radial-gradient(ellipse 70% 55% at 25% 15%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 55%),
            radial-gradient(ellipse 60% 50% at 85% 75%, color-mix(in srgb, var(--accent-cool) 18%, transparent), transparent 50%),
            rgba(7, 6, 13, 0.94)
          `,
          backdropFilter: open && !exiting ? "blur(28px) saturate(1.2)" : "blur(0px)",
          WebkitBackdropFilter: open && !exiting ? "blur(28px) saturate(1.2)" : "blur(0px)",
        }}
        onClick={close}
        aria-hidden
      />

      <button
        type="button"
        onClick={close}
        className="absolute right-4 top-4 z-[302] rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15 md:right-8 md:top-8"
        style={{ opacity: open && !exiting ? 1 : 0 }}
      >
        Close
      </button>

      <div
        className="pointer-events-none absolute z-[301] overflow-hidden shadow-[0_40px_120px_-20px_rgba(0,0,0,0.85)] transition-all duration-[420ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={frameStyle}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={alt}
          className="h-full w-full object-contain"
          draggable={false}
        />
      </div>

      <p
        className="absolute bottom-6 left-1/2 z-[302] max-w-lg -translate-x-1/2 truncate px-4 text-center text-sm text-white/70 transition-opacity duration-300"
        style={{ opacity: open && !exiting ? 1 : 0 }}
      >
        {alt}
      </p>
    </div>,
    document.body
  );
}

export function ImageExpand({ src, alt, children, className = "" }: ImageExpandProps) {
  const [lightbox, setLightbox] = useState<{
    src: string;
    alt: string;
    rect: DOMRect;
  } | null>(null);

  function open(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setLightbox({ src, alt, rect });
    document.body.style.overflow = "hidden";
  }

  function close() {
    setLightbox(null);
    document.body.style.overflow = "";
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className={`relative block w-full cursor-zoom-in overflow-hidden border-0 bg-transparent p-0 text-left transition active:scale-[0.98] ${className}`}
        aria-label={`View full size: ${alt}`}
      >
        {children}
        <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-0 transition group-hover:ring-1 group-hover:ring-white/20" />
      </button>
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          rect={lightbox.rect}
          onClose={close}
        />
      )}
    </>
  );
}
