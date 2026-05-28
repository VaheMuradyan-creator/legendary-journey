"use client";

import { AddItemBar } from "@/components/admin/AddItemBar";
import {
  AnimationEditor,
  SiteInfoEditor,
  WorkEditor,
} from "@/components/admin/AdminEditors";
import { AdminShell } from "@/components/admin/AdminShell";
import { usePortfolioAdmin } from "@/components/admin/usePortfolioAdmin";
import type { AnimationItem, WorkItem } from "@/lib/portfolio";
import {
  ANIMATION_MIN_ARTWORKS,
  ANIMATION_MIN_FILMS,
  createEmptyAnimation,
  createEmptyWork,
} from "@/lib/portfolio";

export function AdminAnimation() {
  const { data, setData, status, saving, save, storageNote } =
    usePortfolioAdmin();

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07060d] text-[#a39bb8]">
        Loading…
      </div>
    );
  }

  const pictureCount = data.works.length;
  const filmCount = data.animations.length;

  function updateWork(index: number, patch: Partial<WorkItem>) {
    const works = [...data!.works];
    works[index] = { ...works[index], ...patch };
    setData({ ...data!, works });
  }

  function updateAnimation(index: number, patch: Partial<AnimationItem>) {
    const animations = [...data!.animations];
    animations[index] = { ...animations[index], ...patch };
    setData({ ...data!, animations });
  }

  function updateProgress(
    index: number,
    patch: Partial<NonNullable<AnimationItem["progress"]>>
  ) {
    const anim = data!.animations[index];
    const animations = [...data!.animations];
    animations[index] = {
      ...anim,
      progress: { ...anim.progress!, ...patch },
    };
    setData({ ...data!, animations });
  }

  return (
    <AdminShell
      title="Animation class"
      subtitle={`${pictureCount} pictures · ${filmCount} films — add as many as you need`}
      active="/studio/animation"
      storageNote={storageNote}
      status={status}
      saving={saving}
      onSave={save}
    >
      <SiteInfoEditor
        name={data.name}
        subtitle={data.subtitle}
        coverImage={data.coverImage ?? ""}
        onChange={(patch) => setData({ ...data, ...patch })}
      />

      <h2 className="mb-2 font-display text-xl font-bold text-[#ffb347]">
        Pictures &amp; design work
      </h2>
      <p className="mb-4 text-sm text-[#a39bb8]">
        Class asks for at least {ANIMATION_MIN_ARTWORKS} original artworks (character
        design, drawing, backgrounds, etc.). Each entry is one image or sketch sheet.
      </p>
      <AddItemBar
        label="Add a picture"
        hint="Still image from Google Drive"
        onAdd={() =>
          setData({ ...data, works: [...data.works, createEmptyWork()] })
        }
      />
      {data.works.length === 0 && (
        <p className="mb-6 text-sm text-muted">No pictures yet — click Add above.</p>
      )}
      {data.works.map((work, index) => (
        <WorkEditor
          key={work.id}
          index={index}
          work={work}
          kind="image"
          onChange={(patch) => updateWork(index, patch)}
          onRemove={() =>
            setData({
              ...data,
              works: data.works.filter((_, i) => i !== index),
            })
          }
        />
      ))}

      <h2 className="mb-2 mt-12 font-display text-xl font-bold text-[#6ec8ff]">
        Animations &amp; film
      </h2>
      <p className="mb-4 text-sm text-[#a39bb8]">
        Class asks for at least {ANIMATION_MIN_FILMS} animations (video links). One
        should include progress / storyboard.
      </p>
      <AddItemBar
        label="Add an animation"
        hint="Video from Google Drive"
        onAdd={() =>
          setData({
            ...data,
            animations: [...data.animations, createEmptyAnimation()],
          })
        }
      />
      {data.animations.length === 0 && (
        <p className="mb-6 text-sm text-muted">No films yet — click Add above.</p>
      )}
      {data.animations.map((anim, index) => (
        <AnimationEditor
          key={anim.id}
          index={index}
          anim={anim}
          onChange={(patch) => updateAnimation(index, patch)}
          onProgressChange={(patch) => updateProgress(index, patch)}
          onRemove={() =>
            setData({
              ...data,
              animations: data.animations.filter((_, i) => i !== index),
            })
          }
        />
      ))}
    </AdminShell>
  );
}
