"use client";

import { AddItemBar } from "@/components/admin/AddItemBar";
import {
  ArtStructureSiteEditor,
  ArtStructureWorkEditor,
} from "@/components/admin/AdminEditors";
import { AdminShell } from "@/components/admin/AdminShell";
import { usePortfolioAdmin } from "@/components/admin/usePortfolioAdmin";
import {
  ARTIST_STATEMENTS_REQUIRED,
  ART_STRUCTURE_MIN_ARTWORKS,
} from "@/lib/art-structure-categories";
import type { ArtStructureWork } from "@/lib/portfolio";
import { createEmptyArtStructureWork } from "@/lib/portfolio";

export function AdminArtStructure() {
  const { data, setData, status, saving, save, storageNote } =
    usePortfolioAdmin();

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07060d] text-[#a39bb8]">
        Loading…
      </div>
    );
  }

  const count = data.artStructure.works.length;
  let statementHintsLeft = ARTIST_STATEMENTS_REQUIRED;

  function updateWork(index: number, patch: Partial<ArtStructureWork>) {
    const works = [...data!.artStructure.works];
    works[index] = { ...works[index], ...patch };
    setData({
      ...data!,
      artStructure: { ...data!.artStructure, works },
    });
  }

  return (
    <AdminShell
      title="Art structure"
      subtitle={`${count} artworks — add or remove anytime`}
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

      <p className="mb-4 text-sm text-[#a39bb8]">
        Class minimum: {ART_STRUCTURE_MIN_ARTWORKS} artworks and{" "}
        {ARTIST_STATEMENTS_REQUIRED} artist&apos;s statements. You can add more than
        seven if you want.
      </p>

      <AddItemBar
        label="Add an artwork"
        hint="Image, details, optional statement"
        onAdd={() =>
          setData({
            ...data,
            artStructure: {
              ...data.artStructure,
              works: [
                ...data.artStructure.works,
                createEmptyArtStructureWork(),
              ],
            },
          })
        }
      />

      {data.artStructure.works.length === 0 && (
        <p className="mb-6 text-sm text-muted">No artworks yet — click Add above.</p>
      )}

      {data.artStructure.works.map((work, index) => {
        const showHint = statementHintsLeft > 0;
        if (showHint) statementHintsLeft -= 1;
        return (
          <ArtStructureWorkEditor
            key={work.id}
            index={index}
            work={work}
            showStatementHint={showHint}
            onChange={(patch) => updateWork(index, patch)}
            onRemove={() =>
              setData({
                ...data,
                artStructure: {
                  ...data.artStructure,
                  works: data.artStructure.works.filter((_, i) => i !== index),
                },
              })
            }
          />
        );
      })}
    </AdminShell>
  );
}
