/**
 * Turn a Google Drive share link into URLs the site can use.
 *
 * Workflow:
 * 1. Upload file to Google Drive (class folder is fine).
 * 2. Right-click → Share → "Anyone with the link" → Viewer.
 * 3. Paste the share link in content/*.json as `driveUrl` or `driveId`.
 *
 * If you replace the file *in place* (same file in Drive, new version),
 * the link stays the same and the site updates automatically.
 * If you upload a brand-new file, copy its new share link into the JSON.
 */

const DRIVE_ID_PATTERNS = [
  /\/file\/d\/([a-zA-Z0-9_-]+)/,
  /[?&]id=([a-zA-Z0-9_-]+)/,
  /\/folders\/([a-zA-Z0-9_-]+)/,
];

export function isPlaceholderMedia(value?: string): boolean {
  if (!value?.trim()) return true;
  const t = value.trim();
  return t.startsWith("PASTE_") || t === "";
}

export function extractDriveId(urlOrId: string): string | null {
  const trimmed = urlOrId.trim();
  if (isPlaceholderMedia(trimmed)) return null;
  if (/^[a-zA-Z0-9_-]{10,}$/.test(trimmed)) {
    return trimmed;
  }
  for (const pattern of DRIVE_ID_PATTERNS) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

/** Direct image URL for next/image or <img> (works for images shared publicly). */
export function driveImageUrl(urlOrId: string): string {
  const id = extractDriveId(urlOrId);
  if (!id) return urlOrId;
  return `https://drive.google.com/uc?export=view&id=${id}`;
}

/** Embed URL for Google Drive video preview (use in iframe). */
export function driveVideoEmbedUrl(urlOrId: string): string {
  const id = extractDriveId(urlOrId);
  if (!id) return urlOrId;
  return `https://drive.google.com/file/d/${id}/preview`;
}

/** Thumbnail helper (lower res, faster load). */
export function driveThumbnailUrl(urlOrId: string, size = 1200): string {
  const id = extractDriveId(urlOrId);
  if (!id) return urlOrId;
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`;
}

/** High-resolution URL for fullscreen lightbox. */
export function driveFullImageUrl(urlOrId: string): string {
  const id = extractDriveId(urlOrId);
  if (!id) return urlOrId;
  return `https://drive.google.com/thumbnail?id=${id}&sz=w2560`;
}

export function resolveImageUrl(
  urlOrId: string,
  size: "thumb" | "full" | "view" = "view"
): string {
  if (!extractDriveId(urlOrId)) return urlOrId;
  if (size === "thumb") return driveThumbnailUrl(urlOrId, 1200);
  if (size === "full") return driveFullImageUrl(urlOrId);
  return driveImageUrl(urlOrId);
}
