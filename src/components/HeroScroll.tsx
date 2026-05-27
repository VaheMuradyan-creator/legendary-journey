"use client";

import { useEffect, useState } from "react";

export function HeroScroll() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      style={{ transform: `translateY(${offset * 0.35}px)` }}
    >
      <div
        className="animate-float-orb absolute -left-20 top-20 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--accent)" }}
      />
      <div
        className="animate-float-orb absolute right-0 top-1/3 h-96 w-96 rounded-full opacity-25 blur-[100px]"
        style={{
          background: "var(--accent-cool)",
          animationDelay: "-3s",
        }}
      />
    </div>
  );
}
