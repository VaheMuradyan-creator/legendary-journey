"use client";

type AddItemBarProps = {
  label: string;
  hint?: string;
  onAdd: () => void;
};

export function AddItemBar({ label, hint, onAdd }: AddItemBarProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-[#ff6b4a]/40 bg-[#ff6b4a]/5 p-5">
      <div>
        <p className="font-display font-semibold">{label}</p>
        {hint && <p className="mt-1 text-xs text-[#a39bb8]">{hint}</p>}
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="rounded-lg bg-[#ff6b4a] px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-110"
      >
        + Add
      </button>
    </div>
  );
}
