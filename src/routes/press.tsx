import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PRESS, type PressKind } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/press")({
  component: PressPage,
  head: () => ({
    meta: [{ title: "Press — Richard Nuñez" }],
  }),
});

const FILTERS: { id: "all" | PressKind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "journalism", label: "Journalism" },
  { id: "encyclopedia", label: "Encyclopedia" },
  { id: "social", label: "Social" },
  { id: "listing", label: "Listings" },
];

function PressPage() {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<(typeof FILTERS)[number]["id"]>("all");

  const items = useMemo(() => {
    return PRESS.filter((item) => {
      const okKind = kind === "all" || item.kind === kind;
      const hay = `${item.title} ${item.publication} ${item.excerpt}`.toLowerCase();
      return okKind && hay.includes(q.toLowerCase());
    });
  }, [q, kind]);

  const featured = PRESS.filter((p) => p.featured && p.kind === "journalism");

  return (
    <div className="pt-52">
      <header className="mx-auto max-w-5xl px-5 pb-10 md:px-8">
        <p className="text-xs tracking-[0.3em] text-gilt uppercase">Press</p>
        <h1 className="mt-3 font-display text-5xl leading-[0.92] md:text-7xl">
          Richard Nuñez in print.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper-dim">
          The Dallas stories, the biography, and every link that put the studio
          on the record.
        </p>
        <dl className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
          <div className="bg-ink px-5 py-5">
            <dt className="text-[10px] tracking-[0.2em] text-gilt uppercase">Dallas</dt>
            <dd className="mt-2 font-display text-2xl">D Magazine</dd>
            <dd className="mt-1 text-sm text-muted">Preston Hollow Advocate</dd>
          </div>
          <div className="bg-ink px-5 py-5">
            <dt className="text-[10px] tracking-[0.2em] text-gilt uppercase">Biography</dt>
            <dd className="mt-2 font-display text-2xl">Wikipedia</dd>
            <dd className="mt-1 text-sm text-muted">The public life of the studio</dd>
          </div>
          <div className="bg-ink px-5 py-5">
            <dt className="text-[10px] tracking-[0.2em] text-gilt uppercase">On the floor</dt>
            <dd className="mt-2 font-display text-2xl">Live acrylic</dd>
            <dd className="mt-1 text-sm text-muted">Finished in the room, often that night</dd>
          </div>
        </dl>
      </header>

      <div className="mx-auto grid max-w-5xl gap-6 px-5 pb-12 md:grid-cols-2 md:px-8">
        {featured.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden border border-line bg-ink-2 transition-colors hover:border-gilt"
          >
            {item.image ? (
              <div className="aspect-16/9 overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ) : null}
            <div className="p-6">
              <p className="text-xs tracking-[0.2em] text-ember uppercase">Featured · {item.publication}</p>
              <h2 className="mt-3 font-display text-3xl group-hover:text-gilt">{item.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{item.excerpt}</p>
              <p className="mt-5 text-xs tracking-[0.16em] text-paper-dim uppercase">{item.date}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="sticky top-40 z-20 border-y border-line bg-ink/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:px-8">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search titles, papers, excerpts"
              className="h-11 w-full border border-line bg-ink-2 pr-3 pl-10 text-sm text-paper outline-none placeholder:text-muted focus:border-gilt"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setKind(f.id)}
                className={cn(
                  "min-h-11 px-4 text-xs tracking-[0.16em] uppercase transition-colors",
                  kind === f.id
                    ? "bg-gilt text-ink"
                    : "border border-line text-paper-dim hover:border-gilt",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ol className="mx-auto max-w-5xl px-5 py-12 md:px-8">
        {items.length === 0 ? (
          <li className="py-20 text-center text-muted">No matches in the archive.</li>
        ) : (
          items.map((item, i) => (
            <li
              key={item.id}
              className="animate-fade-up border-b border-line py-10"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group grid gap-4 md:grid-cols-12"
              >
                <div className="md:col-span-3">
                  <p className="text-xs tracking-[0.2em] text-ember uppercase">{item.publication}</p>
                  <p className="mt-2 text-sm text-muted">{item.date}</p>
                  <p className="mt-3 text-xs tracking-[0.16em] text-gilt uppercase">{item.kind}</p>
                </div>
                <div className="md:col-span-8">
                  <h2 className="flex items-start gap-2 font-display text-3xl text-paper group-hover:text-gilt">
                    {item.title}
                    <ArrowUpRight className="mt-2 size-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-paper-dim">{item.excerpt}</p>
                  <p className="mt-4 break-all text-xs text-muted">{item.href}</p>
                </div>
              </a>
            </li>
          ))
        )}
      </ol>
    </div>
  );
}
