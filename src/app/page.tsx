import Link from "next/link";
import { getAllPortfolios } from "@/lib/portfolio";

export default function HomePage() {
  const portfolios = getAllPortfolios();

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-4xl flex-col px-6 py-20 md:py-28">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">
          Animation Class
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          Portfolio Gallery
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Two student portfolios for final presentation. Each page meets class
          requirements: cover, 10+ original artworks, and 3+ animations with
          progress on at least one.
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {portfolios.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/portfolio/${p.slug}`}
                className="flex h-full flex-col rounded-2xl border border-card-border bg-card p-8 transition hover:border-accent hover:shadow-[0_0_40px_-12px] hover:shadow-accent/20"
                style={{
                  boxShadow: `inset 0 1px 0 color-mix(in srgb, ${p.accent} 25%, transparent)`,
                }}
              >
                <span
                  className="mb-4 h-1 w-12 rounded-full"
                  style={{ background: p.accent }}
                />
                <h2 className="text-2xl font-semibold">{p.name}</h2>
                <p className="mt-2 flex-1 text-sm text-muted">{p.subtitle}</p>
                <span className="mt-6 text-sm font-medium text-accent">
                  View portfolio →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-16 text-sm text-muted">
          Media lives on Google Drive — edit{" "}
          <code className="rounded bg-card px-1.5 py-0.5 text-foreground">
            content/mine.json
          </code>{" "}
          and{" "}
          <code className="rounded bg-card px-1.5 py-0.5 text-foreground">
            content/friend.json
          </code>
          . See README for sharing links and deploy steps.
        </p>
      </div>
    </div>
  );
}
