import { createFileRoute } from "@tanstack/react-router";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RECORD, TRACKS } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/album")({
  component: AlbumPage,

  head: () => ({
    meta: [
      {
        title: "Hey Miranda — Mr. Really?! | Richard Nuñez",
      },
      {
        name: "description",
        content:
          "Listen to previews from Hey Miranda — Mr. Really?! Explore the full tracklist and find the album on Spotify, Apple Music, Tidal, and other music platforms.",
      },

      {
        property: "og:title",
        content: "Hey Miranda — Mr. Really?! | Richard Nuñez",
      },
      {
        property: "og:description",
        content:
          "Listen to previews from Hey Miranda — Mr. Really?! Explore the album tracklist and streaming links.",
      },
      {
        property: "og:url",
        content: "https://richardnunezartist.com/album",
      },
      {
        property: "og:type",
        content: "music.album",
      },

      {
        name: "twitter:title",
        content: "Hey Miranda — Mr. Really?! | Richard Nuñez",
      },
      {
        name: "twitter:description",
        content:
          "Listen to previews from Hey Miranda — Mr. Really?! and explore the complete album tracklist.",
      },
    ],

    links: [
      {
        rel: "canonical",
        href: "https://richardnunezartist.com/album",
      },
    ],
  }),
});

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function AlbumPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const track = TRACKS[index];

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.src = track.preview;
    el.load();
    setProgress(0);
    if (playing) {
      void el.play().catch(() => setPlaying(false));
    }
  }, [index]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) void el.play().catch(() => setPlaying(false));
    else el.pause();
  }, [playing]);

  const playAt = (i: number) => {
    if (i === index && playing) {
      setPlaying(false);
      return;
    }
    setIndex(i);
    setPlaying(true);
  };

  const next = () => setIndex((i) => (i + 1) % TRACKS.length);
  const prev = () => setIndex((i) => (i - 1 + TRACKS.length) % TRACKS.length);

  return (
    <div className="pt-52">
      <audio
        ref={audioRef}
        preload="none"
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => {
          setIndex((i) => (i + 1) % TRACKS.length);
          setPlaying(true);
        }}
      />

      <div className="overflow-hidden border-y border-line bg-ink-2 py-3">
        <div className="animate-marquee flex w-max gap-10 pr-10">
          {[...TRACKS, ...TRACKS].map((t, i) => (
            <span key={`${t.n}-${i}`} className="font-display text-xl italic text-gilt/80">
              {t.title}
              <span className="ml-10 text-ember">◆</span>
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-8">
        <div className="relative mx-auto w-full max-w-md">
          <div
            className={cn(
              "absolute top-1/2 left-1/2 size-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line bg-ink-3",
              playing && "animate-vinyl",
            )}
            aria-hidden
          >
            <div className="absolute inset-[18%] rounded-full border border-gilt/20" />
            <div className="absolute inset-[38%] rounded-full border border-gilt/15" />
          </div>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="relative z-10 aspect-square w-full overflow-hidden border border-gilt/40 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
            aria-label={playing ? "Pause preview" : "Play preview"}
          >
            <img
              src={RECORD.cover}
              alt={`${RECORD.title} cover`}
              className={cn(
                "size-full object-cover transition-transform duration-700",
                playing && "scale-105",
              )}
            />
            <span className="absolute inset-0 flex items-center justify-center bg-ink/25">
              <span className="flex size-16 items-center justify-center rounded-full bg-gilt text-ink">
                {playing ? <Pause className="size-6" /> : <Play className="size-6 translate-x-0.5" />}
              </span>
            </span>
          </button>
        </div>

        <div>
          <p className="text-xs tracking-[0.3em] text-gilt uppercase">Album</p>
          <h1 className="mt-3 font-display text-5xl md:text-7xl">{RECORD.title}</h1>
          <p className="mt-3 font-display text-2xl italic text-paper-dim">{RECORD.artist}</p>
          <p className="mt-5 text-sm tracking-[0.16em] text-muted uppercase">
            {RECORD.released} · {RECORD.tracks} tracks · {RECORD.genre}
          </p>
          <p className="mt-4 max-w-md text-paper-dim">
            Click a track to hear the preview. Full album on Tidal, Spotify, Apple
            Music, and the rest.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              className="min-h-11 min-w-11 text-paper"
              aria-label="Previous track"
              onClick={prev}
            >
              <SkipBack className="size-5" />
            </button>
            <button
              type="button"
              className="flex size-14 items-center justify-center bg-gilt text-ink transition-transform duration-150 ease-out active:scale-[0.96]"
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? <Pause className="size-6" /> : <Play className="size-6 translate-x-0.5" />}
            </button>
            <button
              type="button"
              className="min-h-11 min-w-11 text-paper"
              aria-label="Next track"
              onClick={() => {
                next();
                setPlaying(true);
              }}
            >
              <SkipForward className="size-5" />
            </button>
            <div className="ml-2 min-w-0 flex-1">
              <p className="truncate font-display text-xl">{track.title}</p>
              <p className="text-xs tabular-nums text-muted">
                {formatTime(progress)} / {duration ? formatTime(duration) : track.time}
              </p>
            </div>
            {playing ? (
              <span className="eq" aria-hidden>
                <i /><i /><i /><i /><i />
              </span>
            ) : null}
          </div>
          <div className="mt-4 h-px bg-line">
            <div
              className="h-full bg-gilt progress-bar"
              style={{
                transform: `scaleX(${duration ? progress / duration : 0})`,
              }}
            />
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {RECORD.stores.map((store) => (
              <a
                key={store.id}
                href={store.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center border border-line px-4 text-xs tracking-[0.16em] uppercase transition-colors hover:border-gilt hover:text-gilt"
              >
                {store.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-24 md:px-8">
        <h2 className="font-display text-3xl">Tracklist</h2>
        <ol className="mt-8 divide-y divide-line border-y border-line">
          {TRACKS.map((t, i) => {
            const on = i === index;
            return (
              <li key={t.n}>
                <button
                  type="button"
                  onClick={() => playAt(i)}
                  className={cn(
                    "flex w-full items-center gap-4 py-4 text-left transition-colors",
                    on ? "text-gilt" : "text-paper hover:text-gilt",
                  )}
                >
                  <span className="w-8 font-display text-xl tabular-nums text-muted">
                    {on && playing ? (
                      <span className="eq eq-sm" aria-hidden>
                        <i /><i /><i />
                      </span>
                    ) : (
                      String(t.n).padStart(2, "0")
                    )}
                  </span>
                  <span className="flex-1 font-display text-2xl">{t.title}</span>
                  <span className="text-sm tabular-nums text-muted">{t.time}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <p className="mt-8 text-xs tracking-[0.16em] text-muted uppercase">
          {RECORD.copyright}
        </p>
      </section>
    </div>
  );
}
