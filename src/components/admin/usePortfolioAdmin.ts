"use client";

import { useCallback, useEffect, useState } from "react";
import type { PortfolioData } from "@/lib/portfolio";

export function usePortfolioAdmin() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [storageNote, setStorageNote] = useState("");
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    const [portfolioRes, storageRes] = await Promise.all([
      fetch("/api/portfolio", { cache: "no-store" }),
      fetch("/api/portfolio/storage", { cache: "no-store" }),
    ]);
    if (portfolioRes.ok) {
      setData((await portfolioRes.json()) as PortfolioData);
      setLoaded(true);
    }
    if (storageRes.ok) {
      const info = (await storageRes.json()) as { message: string };
      setStorageNote(info.message);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function save() {
    if (!data) return;
    setSaving(true);
    setStatus("");
    const res = await fetch("/api/portfolio", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    if (!res.ok) {
      const err = (await res.json()) as { error?: string };
      setStatus(err.error ?? "Save failed — check Blob is enabled on Vercel.");
      return;
    }
    const saved = (await res.json()) as PortfolioData;
    setData(saved);
    setStatus(
      "Saved! When you come back, your text and links will still be here."
    );
  }

  return {
    data,
    setData,
    status,
    setStatus,
    saving,
    save,
    storageNote,
    load,
    loaded,
  };
}
