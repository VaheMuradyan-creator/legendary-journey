"use client";

import {
  ARTIST_STATEMENTS_REQUIRED,
  ART_STRUCTURE_CATEGORIES,
  ART_STRUCTURE_SLOT_COUNT,
} from "@/lib/art-structure-categories";
import { WORK_CATEGORIES } from "@/lib/categories";
import type {
  AnimationItem,
  ArtStructureData,
  ArtStructureWork,
  WorkItem,
} from "@/lib/portfolio";
import { ANIMATION_SLOT_COUNT, WORK_SLOT_COUNT } from "@/lib/portfolio";

export function WorkEditor({
  index,
  work,
  onChange,
  onClear,
}: {
  index: number;
  work: WorkItem;
  onChange: (patch: Partial<WorkItem>) => void;
  onClear: () => void;
}) {
  const extraImages = (work.images ?? []).join("\n");

  return (
    <section className="mb-6 rounded-2xl border border-white/10 bg-[#12101c] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold">
          Artwork slot {index + 1}{" "}
          <span className="text-[#a39bb8]">/ {WORK_SLOT_COUNT}</span>
        </h2>
        <button
          type="button"
          onClick={onClear}
          className="text-sm text-red-400 hover:underline"
        >
          Clear slot
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" value={work.title} onChange={(v) => onChange({ title: v })} />
        <Field
          label="Media (e.g. Digital · Ink)"
          value={work.media}
          onChange={(v) => onChange({ media: v })}
        />
        <label className="block text-sm md:col-span-2">
          Section
          <select
            value={work.category}
            onChange={(e) =>
              onChange({ category: e.target.value as WorkItem["category"] })
            }
            className="mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3"
          >
            {WORK_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </label>
        <Field
          label="Image — Google Drive link"
          value={work.image ?? ""}
          onChange={(v) => onChange({ image: v })}
          className="md:col-span-2"
        />
        <label className="block text-sm md:col-span-2">
          Extra images (one Drive link per line)
          <textarea
            value={extraImages}
            onChange={(e) =>
              onChange({
                images: e.target.value
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            rows={3}
            className="mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3 font-mono text-xs"
            placeholder="https://drive.google.com/..."
          />
        </label>
        <Field
          label="Description"
          value={work.description ?? ""}
          onChange={(v) => onChange({ description: v })}
          multiline
          className="md:col-span-2"
        />
      </div>
    </section>
  );
}

export function AnimationEditor({
  index,
  anim,
  onChange,
  onProgressChange,
  onClear,
}: {
  index: number;
  anim: AnimationItem;
  onChange: (patch: Partial<AnimationItem>) => void;
  onProgressChange: (patch: Partial<NonNullable<AnimationItem["progress"]>>) => void;
  onClear: () => void;
}) {
  const progress = anim.progress ?? {
    title: "Behind the scenes",
    description: "",
    storyboard: "",
    images: [],
    video: "",
  };
  const progressImages = (progress.images ?? []).join("\n");

  return (
    <section className="mb-6 rounded-2xl border border-white/10 bg-[#12101c] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold">
          Animation slot {index + 1}{" "}
          <span className="text-[#a39bb8]">/ {ANIMATION_SLOT_COUNT}</span>
          {index === 0 && (
            <span className="ml-2 text-xs font-normal text-[#6ec8ff]">
              (fill progress for class BTS)
            </span>
          )}
        </h2>
        <button
          type="button"
          onClick={onClear}
          className="text-sm text-red-400 hover:underline"
        >
          Clear slot
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" value={anim.title} onChange={(v) => onChange({ title: v })} />
        <Field label="Media" value={anim.media} onChange={(v) => onChange({ media: v })} />
        <Field
          label="Video — Google Drive link"
          value={anim.video}
          onChange={(v) => onChange({ video: v })}
          className="md:col-span-2"
        />
        <Field
          label="Still frame — Drive link"
          value={anim.still ?? ""}
          onChange={(v) => onChange({ still: v })}
          className="md:col-span-2"
        />
        <Field
          label="Description"
          value={anim.description}
          onChange={(v) => onChange({ description: v })}
          multiline
          className="md:col-span-2"
        />
      </div>

      <details className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
        <summary className="cursor-pointer font-medium text-[#ffb347]">
          Progress / behind the scenes
        </summary>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field
            label="Progress section title"
            value={progress.title ?? ""}
            onChange={(v) => onProgressChange({ title: v })}
          />
          <Field
            label="Storyboard — Drive link"
            value={progress.storyboard ?? ""}
            onChange={(v) => onProgressChange({ storyboard: v })}
          />
          <Field
            label="Process video — Drive link"
            value={progress.video ?? ""}
            onChange={(v) => onProgressChange({ video: v })}
            className="md:col-span-2"
          />
          <label className="block text-sm md:col-span-2">
            Progress photos (one link per line)
            <textarea
              value={progressImages}
              onChange={(e) =>
                onProgressChange({
                  images: e.target.value
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              rows={3}
              className="mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3 font-mono text-xs"
            />
          </label>
          <Field
            label="Progress description"
            value={progress.description}
            onChange={(v) => onProgressChange({ description: v })}
            multiline
            className="md:col-span-2"
          />
        </div>
      </details>
    </section>
  );
}

export function ArtStructureSiteEditor({
  name,
  artStructure,
  onNameChange,
  onArtStructureChange,
}: {
  name: string;
  artStructure: ArtStructureData;
  onNameChange: (name: string) => void;
  onArtStructureChange: (patch: Partial<ArtStructureData>) => void;
}) {
  return (
    <div className="mb-8 space-y-4 rounded-2xl border border-white/10 bg-[#12101c] p-6">
      <h2 className="font-display text-lg font-bold">Cover page</h2>
      <p className="text-xs text-[#a39bb8]">
        Name, &quot;Art Structure Portfolio&quot; title, and cover image per class instructions.
      </p>
      <Field label="Your name" value={name} onChange={onNameChange} />
      <Field
        label="Portfolio title"
        value={artStructure.portfolioTitle}
        onChange={(v) => onArtStructureChange({ portfolioTitle: v })}
      />
      <Field
        label="Cover image — Google Drive link"
        value={artStructure.coverImage ?? ""}
        onChange={(v) => onArtStructureChange({ coverImage: v })}
      />
    </div>
  );
}

export function ArtStructureWorkEditor({
  index,
  work,
  onChange,
  onClear,
}: {
  index: number;
  work: ArtStructureWork;
  onChange: (patch: Partial<ArtStructureWork>) => void;
  onClear: () => void;
}) {
  const details = (work.images ?? []).join("\n");
  const process = (work.processImages ?? []).join("\n");
  const needsStatement = index < ARTIST_STATEMENTS_REQUIRED;

  return (
    <section className="mb-6 rounded-2xl border border-white/10 bg-[#12101c] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold">
          Artwork {index + 1}{" "}
          <span className="text-[#a39bb8]">/ {ART_STRUCTURE_SLOT_COUNT}</span>
          {needsStatement && (
            <span className="ml-2 text-xs font-normal text-[#6ec8ff]">
              — artist&apos;s statement required
            </span>
          )}
        </h2>
        <button
          type="button"
          onClick={onClear}
          className="text-sm text-red-400 hover:underline"
        >
          Clear slot
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" value={work.title} onChange={(v) => onChange({ title: v })} />
        <Field
          label="Date (year)"
          value={work.date}
          onChange={(v) => onChange({ date: v })}
          placeholder="2025"
        />
        <Field
          label="Media (materials)"
          value={work.media}
          onChange={(v) => onChange({ media: v })}
          className="md:col-span-2"
        />
        <label className="block text-sm md:col-span-2">
          Material / theme group
          <select
            value={work.category}
            onChange={(e) =>
              onChange({ category: e.target.value as ArtStructureWork["category"] })
            }
            className="mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3"
          >
            {ART_STRUCTURE_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </label>
        <Field
          label="Main image (full view) — Drive link"
          value={work.image ?? ""}
          onChange={(v) => onChange({ image: v })}
          className="md:col-span-2"
        />
        <label className="block text-sm md:col-span-2">
          Detail images (one link per line)
          <textarea
            value={details}
            onChange={(e) =>
              onChange({
                images: e.target.value
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            rows={2}
            className="mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3 font-mono text-xs"
          />
        </label>
        <label className="block text-sm md:col-span-2">
          Process / sketchbook (one link per line)
          <textarea
            value={process}
            onChange={(e) =>
              onChange({
                processImages: e.target.value
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            rows={2}
            className="mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3 font-mono text-xs"
          />
        </label>
        <Field
          label="Artist's statement"
          value={work.artistStatement ?? ""}
          onChange={(v) => onChange({ artistStatement: v })}
          multiline
          className="md:col-span-2"
        />
      </div>
    </section>
  );
}

export function SiteInfoEditor({
  name,
  subtitle,
  coverImage,
  onChange,
}: {
  name: string;
  subtitle: string;
  coverImage: string;
  onChange: (patch: { name?: string; subtitle?: string; coverImage?: string }) => void;
}) {
  return (
    <div className="mb-8 space-y-4 rounded-2xl border border-white/10 bg-[#12101c] p-6">
      <h2 className="font-display text-lg font-bold">Site info (all pages)</h2>
      <Field label="Your name" value={name} onChange={(v) => onChange({ name: v })} />
      <Field label="Subtitle" value={subtitle} onChange={(v) => onChange({ subtitle: v })} />
      <Field
        label="Cover image — Google Drive link"
        value={coverImage}
        onChange={(v) => onChange({ coverImage: v })}
      />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
  className = "",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
}) {
  return (
    <label className={`block text-sm ${className}`}>
      {label}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3"
        />
      )}
    </label>
  );
}
