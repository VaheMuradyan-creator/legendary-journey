"use client";

import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { usePortfolioAdmin } from "@/components/admin/usePortfolioAdmin";
import {
  ANIMATION_MIN_ARTWORKS,
  ANIMATION_MIN_FILMS,
} from "@/lib/portfolio";
import { ART_STRUCTURE_MIN_ARTWORKS } from "@/lib/art-structure-categories";

export function StudioHub() {
  const { storageNote, status, saving, save } = usePortfolioAdmin();

  return (
    <AdminShell
      title="Portfolio Studio"
      subtitle="Your private editor — add pictures or films anytime"
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
            Add artworks (min {ART_STRUCTURE_MIN_ARTWORKS}+), material groups,
            artist statements.
          </p>
          <p className="mt-4 text-sm font-medium text-[#ff6b4a]">Open editor →</p>
        </Link>
        <Link
          href="/studio/animation"
          className="rounded-2xl border border-white/10 bg-[#12101c] p-8 transition hover:border-[#6ec8ff]"
        >
          <h2 className="font-display text-2xl font-bold">Animation class</h2>
          <p className="mt-2 text-sm text-[#a39bb8]">
            Add pictures (min {ANIMATION_MIN_ARTWORKS}+) and films (min{" "}
            {ANIMATION_MIN_FILMS}+).
          </p>
          <p className="mt-4 text-sm font-medium text-[#6ec8ff]">Open editor →</p>
        </Link>
      </div>
      <p className="mt-8 text-sm text-[#a39bb8]">
        After editing, click <strong className="text-foreground">Save all</strong>.
        Your text and links stay when you return. Enable Vercel Blob so saves survive
        deploys.
      </p>
    </AdminShell>
  );
}
