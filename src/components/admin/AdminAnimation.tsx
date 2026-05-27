"use client";

import { AnimationEditor } from "@/components/admin/AdminEditors";
import { AdminShell } from "@/components/admin/AdminShell";
import { usePortfolioAdmin } from "@/components/admin/usePortfolioAdmin";
import type { AnimationItem } from "@/lib/portfolio";
import { ANIMATION_SLOT_COUNT, createEmptyAnimation } from "@/lib/portfolio";

export function AdminAnimation() {
  const { data, setData, status, setStatus, saving, save, storageNote } =
    usePortfolioAdmin();

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07060d] text-[#a39bb8]">
        Loading…
      </div>
    );
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

  function clearAnimation(index: number) {
    const animations = [...data!.animations];
    animations[index] = createEmptyAnimation(index);
    setData({ ...data!, animations });
    setStatus(`Cleared animation ${index + 1}. Click Save all.`);
  }

  return (
    <AdminShell
      title="Animation"
      subtitle={`${ANIMATION_SLOT_COUNT} film slots`}
      active="/studio/animation"
      storageNote={storageNote}
      status={status}
      saving={saving}
      onSave={save}
    >
      {data.animations.map((anim, index) => (
        <AnimationEditor
          key={anim.id}
          index={index}
          anim={anim}
          onChange={(patch) => updateAnimation(index, patch)}
          onProgressChange={(patch) => updateProgress(index, patch)}
          onClear={() => clearAnimation(index)}
        />
      ))}
    </AdminShell>
  );
}
