import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Tilt } from "@/components/site/tilt";
import { SERIES, WORKS } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/work")({
  component: WorkPage,
  head: () => ({
    meta: [{ title: "Works — Richard Nuñez" }],
  }),
});

function WorkPage() {
  const [open, setOpen] = useState<string | null>(null);
  const [series, setSeries] = useState<"all" | (typeof SERIES)[number]>("all");
  const current = WORKS.find((w) => w.id === open);
  const items = useMemo(
    () =>
      WORKS.filter((w) =>
        series === "all" ? w.series !== "Ornaments" : w.series === series,
      ),
    [series],
  );
  const index = items.findIndex((w) => w.id === open);

  const go = (dir: -1 | 1) => {
    if (index < 0 || !items.length) return;
    const next = items[(index + dir + items.length) % items.length];
    setOpen(next.id);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, index, items]);

  return (
    <div>
      <header className="relative overflow-hidden pt-52">
        <video
          className="absolute inset-0 size-full object-cover opacity-50"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/pour.jpg"
        >
          <source src="/videos/pour.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
          <p className="text-sm tracking-[0.3em] text-gilt uppercase">Works</p>
          <h1 className="mt-3 font-display text-5xl md:text-7xl">The paintings.</h1>
          <p className="mt-5 max-w-2xl text-paper-dim">
            Acrylic on canvas. Originals by Richard Nuñez. Click any
            piece to see it larger.
          </p>
        </div>
      </header>

      <div className="sticky top-40 z-20 border-y border-line bg-ink/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-5 py-4 md:px-8">
          <button
            type="button"
            onClick={() => setSeries("all")}
            className={cn(
              "min-h-11 px-4 text-xs tracking-[0.16em] uppercase transition-colors",
              series === "all" ? "bg-gilt text-ink" : "border border-line text-paper-dim hover:border-gilt",
            )}
          >
            All
          </button>
          {SERIES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSeries(s)}
              className={cn(
                "min-h-11 px-4 text-xs tracking-[0.16em] uppercase transition-colors",
                series === s ? "bg-gilt text-ink" : "border border-line text-paper-dim hover:border-gilt",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 px-5 py-16 sm:grid-cols-2 md:px-8 lg:grid-cols-3">
        {items.map((work) => (
          <Tilt key={work.id}>
            <button
              type="button"
              onClick={() => setOpen(work.id)}
              className="group w-full text-left"
            >
              <div className="overflow-hidden bg-ink-3">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <p className="mt-4 font-display text-2xl">{work.title}</p>
              <p className="text-xs tracking-[0.16em] text-muted uppercase">
                {[work.medium, work.year].filter(Boolean).join(" · ")}
              </p>
            </button>
          </Tilt>
        ))}
      </div>

      {current ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal
          aria-label={current.title}
        >
          <button
            type="button"
            className="absolute top-5 right-5 size-11 text-paper"
            aria-label="Close"
            onClick={() => setOpen(null)}
          >
            <X className="size-7" />
          </button>
          <button
            type="button"
            className="absolute top-1/2 left-3 hidden size-11 -translate-y-1/2 text-paper md:flex"
            aria-label="Previous work"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
          >
            <ChevronLeft className="size-8" />
          </button>
          <button
            type="button"
            className="absolute top-1/2 right-3 hidden size-11 -translate-y-1/2 text-paper md:flex"
            aria-label="Next work"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
          >
            <ChevronRight className="size-8" />
          </button>
          <div
            className="grid max-h-[90dvh] max-w-5xl overflow-auto bg-ink-2 md:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.image}
              alt={current.title}
              className="max-h-[90dvh] w-full bg-black object-contain"
            />
            <div className="flex flex-col justify-end p-8">
              <p className="text-xs tracking-[0.2em] text-gilt uppercase">{current.series}</p>
              <h2 className="mt-2 font-display text-4xl">{current.title}</h2>
              <p className="mt-2 text-sm text-muted">
                {[current.medium, current.year].filter(Boolean).join(" · ")}
              </p>
              <p className="mt-6 leading-relaxed text-paper-dim">{current.note}</p>
              <p className="mt-8 text-xs tracking-[0.16em] text-muted uppercase">
                Arrows to browse
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
