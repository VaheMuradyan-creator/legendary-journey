import { readFile, writeFile } from "fs/promises";
import path from "path";
import type { PortfolioData } from "@/lib/portfolio";
import { normalizePortfolio } from "@/lib/portfolio";

const CONTENT_PATH = path.join(process.cwd(), "content", "mine.json");
const BLOB_PATHNAME = "portfolio-content.json";

export type StorageSource = "blob" | "file" | "seed";

function hasBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function isVercel(): boolean {
  return process.env.VERCEL === "1";
}

async function loadSeed(): Promise<PortfolioData> {
  try {
    return normalizePortfolio(await loadFromFile());
  } catch {
    const fallback = (await import("@/content/mine.json")).default as PortfolioData;
    return normalizePortfolio(fallback);
  }
}

async function loadFromBlob(): Promise<PortfolioData | null> {
  if (!hasBlobStorage()) return null;
  try {
    const { head } = await import("@vercel/blob");
    const meta = await head(BLOB_PATHNAME);
    const res = await fetch(meta.url, { cache: "no-store" });
    if (!res.ok) return null;
    return normalizePortfolio((await res.json()) as PortfolioData);
  } catch {
    return null;
  }
}

async function saveToBlob(data: PortfolioData): Promise<void> {
  const { put } = await import("@vercel/blob");
  const normalized = normalizePortfolio(data);
  await put(BLOB_PATHNAME, JSON.stringify(normalized, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
}

async function loadFromFile(): Promise<PortfolioData> {
  const raw = await readFile(CONTENT_PATH, "utf8");
  return normalizePortfolio(JSON.parse(raw) as PortfolioData);
}

/** Where live portfolio data is stored (for admin UI). */
export async function getStorageInfo(): Promise<{
  source: StorageSource;
  persistsAcrossDeploys: boolean;
  message: string;
}> {
  if (hasBlobStorage()) {
    const blob = await loadFromBlob();
    if (blob) {
      return {
        source: "blob",
        persistsAcrossDeploys: true,
        message:
          "Saved online in Vercel Blob — git pushes will NOT erase your artwork or animations.",
      };
    }
    return {
      source: "blob",
      persistsAcrossDeploys: true,
      message:
        "Blob is ready. Save once from admin to store your portfolio in the cloud.",
    };
  }

  if (isVercel()) {
    return {
      source: "seed",
      persistsAcrossDeploys: false,
      message:
        "⚠️ Enable Vercel Blob (Storage tab in project) so saves survive deploys. Until then, only the default JSON in git is used.",
    };
  }

  return {
    source: "file",
    persistsAcrossDeploys: false,
    message:
      "Local dev: saves go to content/mine.json. On Vercel, turn on Blob so deploys keep your edits.",
  };
}

export async function loadPortfolio(): Promise<PortfolioData> {
  if (hasBlobStorage()) {
    const fromBlob = await loadFromBlob();
    if (fromBlob) return fromBlob;

    const seed = await loadSeed();
    await saveToBlob(seed);
    return seed;
  }

  if (isVercel()) {
    return loadSeed();
  }

  try {
    return await loadFromFile();
  } catch {
    return loadSeed();
  }
}

export async function savePortfolio(data: PortfolioData): Promise<PortfolioData> {
  const normalized = normalizePortfolio(data);

  if (hasBlobStorage()) {
    await saveToBlob(normalized);
    if (!isVercel()) {
      try {
        await writeFile(
          CONTENT_PATH,
          `${JSON.stringify(normalized, null, 2)}\n`,
          "utf8"
        );
      } catch {
        /* local file optional when blob is configured */
      }
    }
    return normalized;
  }

  if (isVercel()) {
    throw new Error(
      "Cannot save on Vercel without Blob storage. In your Vercel project: Storage → Create Database → Blob, then redeploy."
    );
  }

  await writeFile(CONTENT_PATH, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
  return normalized;
}
