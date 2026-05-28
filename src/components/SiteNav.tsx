import Link from "next/link";

const LINKS = [
  { href: "/animation", label: "Animation Portfolio" },
  { href: "/art-structure", label: "Art Structure" },
] as const;

export function SiteNav({ active }: { active?: (typeof LINKS)[number]["href"] }) {
  return (
    <nav
      className="fixed right-4 top-4 z-40 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-[#07060d]/80 p-2 backdrop-blur-md md:right-6 md:top-6"
      aria-label="Portfolio sections"
    >
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`rounded-xl px-3 py-2 font-display text-xs font-semibold uppercase tracking-wider transition md:text-sm ${
            active === link.href
              ? "bg-[#ff6b4a] text-black"
              : "text-[#a39bb8] hover:bg-white/10 hover:text-white"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
