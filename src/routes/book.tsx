import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Tilt } from "@/components/site/tilt";
import { BOOK, LIVES } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book")({
  component: BookPage,
  head: () => ({
    meta: [{ title: "’carnation — Matthew W. Bertsch & Richard Nuñez" }],
  }),
});

function BookPage() {
  const [format, setFormat] = useState<(typeof BOOK.formats)[number]["id"]>("ebook");
  const current = BOOK.formats.find((f) => f.id === format) ?? BOOK.formats[0];

  return (
    <div className="pt-52">
      <div className="overflow-hidden border-y border-line bg-ink-2 py-3">
        <div className="animate-marquee flex w-max gap-10 pr-10">
          {[...LIVES, ...LIVES].map((life, i) => (
            <span key={`${life.n}-${i}`} className="font-display text-xl italic text-gilt/80">
              {life.title}
              <span className="ml-10 text-ember">◆</span>
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-8">
        <div className="flex justify-center">
          <Tilt>
            <div className="relative w-[min(100%,280px)]">
              <div className="absolute top-2 -left-2 h-[calc(100%-0.5rem)] w-2 bg-ink-3" aria-hidden />
              <div className="book-shine relative aspect-2/3 overflow-hidden bg-ink-3 shadow-[16px_24px_50px_rgba(0,0,0,0.5)]">
                <img
                  src={BOOK.cover}
                  alt={`${BOOK.title}: ${BOOK.subtitle}`}
                  className="size-full object-cover"
                />
              </div>
            </div>
          </Tilt>
        </div>

        <div>
          <p className="text-xs tracking-[0.3em] text-gilt uppercase">Book · A collaboration</p>
          <h1 className="mt-3 font-display text-5xl leading-[0.9] md:text-7xl">{BOOK.title}</h1>
          <p className="mt-4 font-display text-2xl italic text-paper-dim">{BOOK.subtitle}</p>
          <p className="mt-5 text-sm tracking-[0.14em] text-muted uppercase">
            {BOOK.author} · with {BOOK.collaborator}
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-paper-dim">{BOOK.logline}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {BOOK.formats.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFormat(f.id)}
                className={cn(
                  "min-h-11 px-4 text-xs tracking-[0.16em] uppercase transition-colors",
                  format === f.id
                    ? "bg-gilt text-ink"
                    : "border border-line text-paper-dim hover:border-gilt",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p className="mt-4 font-display text-3xl">{current.price}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={current.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center bg-gilt px-6 text-xs tracking-[0.2em] text-ink uppercase transition-transform duration-150 ease-out active:scale-[0.96]"
            >
              Buy {current.label}
            </a>
            <a
              href={BOOK.store}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center border border-paper/30 px-6 text-xs tracking-[0.2em] uppercase hover:border-gilt hover:text-gilt"
            >
              All formats
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-8 md:px-8">
        <p className="font-display text-2xl italic leading-snug text-paper">{BOOK.pitch}</p>
        <p className="mt-6 text-sm text-muted">
          {BOOK.origin} {BOOK.publisher}. {BOOK.published}. ISBN {BOOK.isbn}. {BOOK.genre}.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 md:px-8">
        <h2 className="font-display text-3xl">The lives</h2>
        <ol className="mt-8 divide-y divide-line border-y border-line">
          {LIVES.map((life, i) => (
            <li
              key={life.n}
              className="grid gap-2 py-6 md:grid-cols-12 md:items-baseline"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <p className="font-display text-2xl text-gilt/70 tabular-nums md:col-span-2">{life.n}</p>
              <h3 className="font-display text-2xl md:col-span-3">{life.title}</h3>
              <p className="text-paper-dim md:col-span-7">{life.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-sm text-muted">
          Hear him talk the book on{" "}
          <Link to="/podcast" className="text-gilt hover:text-gilt-bright">
            The Really Podcast
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
