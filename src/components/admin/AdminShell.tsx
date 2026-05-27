"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

const ADMIN_LINKS = [
  { href: "/studio", label: "Portfolio Studio" },
  { href: "/studio/art-structure", label: "Art structure" },
  { href: "/studio/animation", label: "Animation" },
] as const;

export function AdminShell({
  title,
  subtitle,
  active,
  storageNote,
  status,
  saving,
  onSave,
  children,
}: {
  title: string;
  subtitle: string;
  active: (typeof ADMIN_LINKS)[number]["href"];
  storageNote?: string;
  status: string;
  saving: boolean;
  onSave: () => void;
  children: ReactNode;
}) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/studio/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#07060d] text-[#f8f4ef]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#07060d]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <h1 className="font-display text-xl font-bold">{title}</h1>
            <p className="text-xs text-[#a39bb8]">{subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:border-[#ff6b4a]"
            >
              View site ↗
            </a>
            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="rounded-lg bg-[#ff6b4a] px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save all"}
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-white/15 px-4 py-2 text-sm"
            >
              Log out
            </button>
          </div>
        </div>

        {storageNote && (
          <p className="mx-auto max-w-5xl border-t border-white/5 px-6 py-3 text-xs leading-relaxed text-[#6ec8ff]">
            {storageNote}
          </p>
        )}
        {status && (
          <p className="mx-auto max-w-5xl px-6 pb-3 text-sm text-[#ffb347]">{status}</p>
        )}

        <nav className="mx-auto flex max-w-5xl flex-wrap gap-2 px-6 pb-3">
          {ADMIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                active === link.href
                  ? "bg-[#ff6b4a] text-black"
                  : "bg-white/5 text-[#a39bb8] hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
