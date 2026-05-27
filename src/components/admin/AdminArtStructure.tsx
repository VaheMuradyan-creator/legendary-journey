"use client";

import {
  ArtStructureSiteEditor,
  ArtStructureWorkEditor,
} from "@/components/admin/AdminEditors";
import { AdminShell } from "@/components/admin/AdminShell";
import { usePortfolioAdmin } from "@/components/admin/usePortfolioAdmin";
import {
  ARTIST_STATEMENTS_REQUIRED,
  ART_STRUCTURE_SLOT_COUNT,
} from "@/lib/art-structure-categories";
import type { ArtStructureWork } from "@/lib/portfolio";
import { createEmptyArtStructureWork } from "@/lib/portfolio";

export function AdminArtStructure() {
  const { data, setData, status, setStatus, saving, save, storageNote } =
    usePortfolioAdmin();

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07060d] text-[#a39bb8]">
        Loading…
      </div>
    );
  }

  function updateWork(index: number, patch: Partial<ArtStructureWork>) {
    const works = [...data!.artStructure.works];
    works[index] = { ...works[index], ...patch };
    setData({
      ...data!,
      artStructure: { ...data!.artStructure, works },
    });
  }

  function clearWork(index: number) {
    const works = [...data!.artStructure.works];
    works[index] = createEmptyArtStructureWork(index);
    setData({
      ...data!,
      artStructure: { ...data!.artStructure, works },
    });
    setStatus(`Cleared slot ${index + 1}. Click Save all.`);
  }

  return (
    <AdminShell
      title="Art structure"
      subtitle={`${ART_STRUCTURE_SLOT_COUNT} artworks · ${ARTIST_STATEMENTS_REQUIRED} artist's statements`}
      active="/studio/art-structure"
      storageNote={storageNote}
      status={status}
      saving={saving}
      onSave={save}
    >
      <ArtStructureSiteEditor
        name={data.name}
        artStructure={data.artStructure}
        onNameChange={(name) => setData({ ...data, name })}
        onArtStructureChange={(patch) =>
          setData({
            ...data,
            artStructure: { ...data.artStructure, ...patch },
          })
        }
      />
      {data.artStructure.works.map((work, index) => (
        <ArtStructureWorkEditor
          key={work.id}
          index={index}
          work={work}
          onChange={(patch) => updateWork(index, patch)}
          onClear={() => clearWork(index)}
        />
      ))}
    </AdminShell>
  );
}
