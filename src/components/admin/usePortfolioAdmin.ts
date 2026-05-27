"use client";

import { useCallback, useEffect, useState } from "react";
import type { PortfolioData } from "@/lib/portfolio";

export function usePortfolioAdmin() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [storageNote, setStorageNote] = useState("");

  const load = useCallback(async () => {
    const [portfolioRes, storageRes] = await Promise.all([
      fetch("/api/portfolio"),
      fetch("/api/portfolio/storage"),
    ]);
    if (portfolioRes.ok) {
      setData((await portfolioRes.json()) as PortfolioData);
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
    setData((await res.json()) as PortfolioData);
    setStatus("Saved! Your changes persist after git push / redeploy.");
    await load();
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
  };
}
