import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Radio } from "lucide-react";
import { useState } from "react";
import { SHOW, VODS } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/podcast")({
  component: PodcastPage,
  head: () => ({
    meta: [{ title: "The Really Podcast — Richard Nuñez" }],
  }),
});

const MARQUEE = [
  "Faith",
  "Art",
  "Life",
  "Soul",
  "Peace",
  SHOW.verse,
  "Hey Miranda",
  "Sweet Mercy",
];

function PodcastPage() {
  const [activeId, setActiveId] = useState(VODS[0].id);
  const active = VODS.find((v) => v.id === activeId) ?? VODS[0];

  return (
    <div>
      <section className="relative min-h-[70dvh] overflow-hidden pt-52">
        <img
          src={SHOW.banner}
          alt=""
          className="absolute inset-0 size-full object-cover object-top opacity-55"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/70 to-ink/35" />
        <div className="relative z-10 mx-auto flex min-h-[70dvh] max-w-6xl flex-col justify-end px-5 pb-14 md:px-8">
          <p className="flex items-center gap-2 text-xs tracking-[0.3em] text-gilt uppercase">
            On Kick
          </p>
          <h1 className="mt-3 font-display text-5xl leading-[0.92] md:text-7xl">{SHOW.name}</h1>
          <p className="mt-4 max-w-2xl font-display text-2xl italic text-paper-dim">
            {SHOW.host}. Self-taught artist. Comedian.
          </p>
          <p className="mt-5 max-w-2xl leading-relaxed text-paper-dim">{SHOW.bio}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SHOW.kick}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-2 bg-gilt px-6 text-xs tracking-[0.2em] text-ink uppercase transition-transform duration-150 ease-out active:scale-[0.96]"
            >
              <Radio className="size-4" />
              Watch on Kick
            </a>
            <a
              href={SHOW.linktree}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-2 border border-paper/30 px-6 text-xs tracking-[0.2em] uppercase hover:border-gilt hover:text-gilt"
            >
              All links
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-line bg-ink-2 py-3">
        <div className="animate-marquee flex w-max gap-10 pr-10">
          {[...MARQUEE, ...MARQUEE].map((word, i) => (
            <span key={`${word}-${i}`} className="font-display text-xl italic text-gilt/80">
              {word}
              <span className="ml-10 text-ember">◆</span>
            </span>
          ))}
        </div>
      </div>

      <section id="stage" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-16 md:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.3em] text-gilt uppercase">On this page</p>
            <h2 className="mt-2 font-display text-4xl">{active.title}</h2>
          </div>
          <span className="eq hidden md:inline-flex" aria-hidden>
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="overflow-hidden border border-line bg-ink-3">
          <iframe
            key={active.id}
            title={active.title}
            src={`https://player.kick.com/video/${active.id}`}
            className="aspect-video w-full"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <p className="mt-4 text-sm text-muted">
          Pick a night below. No Kick account needed. Open the channel at{" "}
          <a href={SHOW.kick} className="text-gilt hover:text-gilt-bright" target="_blank" rel="noopener">
            kick.com/thereallypodcast
          </a>
          .
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-8 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <img
            src={SHOW.hostImage}
            alt={SHOW.host}
            className="aspect-4/5 w-full border border-gilt/40 object-cover object-[50%_20%]"
          />
        </div>
        <div className="md:col-span-7">
          <p className="text-xs tracking-[0.3em] text-ember uppercase">{SHOW.verse}</p>
          <h2 className="mt-3 font-display text-4xl">Faith. Art. Life. Soul.</h2>
          <blockquote className="mt-6 font-display text-2xl italic leading-snug text-paper">
            “All of the aspects of my Faith, Art, Life and Soul are here to entertain you.”
          </blockquote>
          <p className="mt-6 leading-relaxed text-paper-dim">{SHOW.bio}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {SHOW.links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center border border-line px-4 text-xs tracking-[0.16em] uppercase transition-colors hover:border-gilt hover:text-gilt"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <h2 className="font-display text-3xl">Recent nights</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {VODS.map((vod) => (
            <li key={vod.id}>
              <button
                type="button"
                onClick={() => {
                  setActiveId(vod.id);
                  document.getElementById("stage")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={cn(
                  "group grid w-full gap-4 border bg-ink-2 p-3 text-left transition-colors sm:grid-cols-5",
                  activeId === vod.id ? "border-gilt" : "border-line hover:border-gilt",
                )}
              >
                <div className="relative aspect-video overflow-hidden bg-ink-3 sm:col-span-2">
                  <img
                    src={vod.thumb}
                    alt=""
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute right-2 bottom-2 bg-ink/80 px-2 py-0.5 text-[10px] tracking-[0.14em] text-paper uppercase">
                    {vod.duration}
                  </span>
                </div>
                <div className="flex flex-col justify-center sm:col-span-3 sm:pr-2">
                  <p className="text-xs tracking-[0.16em] text-muted uppercase">{vod.date}</p>
                  <h3 className="mt-2 font-display text-xl leading-snug group-hover:text-gilt">
                    {vod.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted">{vod.views} views on Kick</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-muted">
          Album nights:{" "}
          <Link to="/album" className="text-gilt hover:text-gilt-bright">
            Hey Miranda
          </Link>
        </p>
      </section>
    </div>
  );
}
