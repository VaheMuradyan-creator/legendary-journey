"use client";

import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { usePortfolioAdmin } from "@/components/admin/usePortfolioAdmin";
import { ART_STRUCTURE_SLOT_COUNT } from "@/lib/art-structure-categories";
import { ANIMATION_SLOT_COUNT } from "@/lib/portfolio";

export function StudioHub() {
  const { storageNote, status, saving, save } = usePortfolioAdmin();

  return (
    <AdminShell
      title="Portfolio Studio"
      subtitle="Your private editor — changes stay after deploy when Blob is on"
      active="/studio"
      storageNote={storageNote}
      status={status}
      saving={saving}
      onSave={save}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/studio/art-structure"
          className="rounded-2xl border border-white/10 bg-[#12101c] p-8 transition hover:border-[#ff6b4a]"
        >
          <h2 className="font-display text-2xl font-bold">Art structure</h2>
          <p className="mt-2 text-sm text-[#a39bb8]">
            {ART_STRUCTURE_SLOT_COUNT} artworks by material/theme, detail shots, 4
            artist&apos;s statements.
          </p>
          <p className="mt-4 text-sm font-medium text-[#ff6b4a]">Open editor →</p>
        </Link>
        <Link
          href="/studio/animation"
          className="rounded-2xl border border-white/10 bg-[#12101c] p-8 transition hover:border-[#6ec8ff]"
        >
          <h2 className="font-display text-2xl font-bold">Animation</h2>
          <p className="mt-2 text-sm text-[#a39bb8]">
            {ANIMATION_SLOT_COUNT} films — video, stills, storyboard, BTS.
          </p>
          <p className="mt-4 text-sm font-medium text-[#6ec8ff]">Open editor →</p>
        </Link>
      </div>
      <p className="mt-8 text-sm text-[#a39bb8]">
        Public:{" "}
        <a href="/art-structure" className="text-[#ffb347] hover:underline">
          /art-structure
        </a>
        ,{" "}
        <a href="/animation" className="text-[#ffb347] hover:underline">
          /animation
        </a>
        . Login: <code className="text-foreground">/studio/login</code>
      </p>
    </AdminShell>
  );
}
