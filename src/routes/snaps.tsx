import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/snaps")({
  component: SnapsPage,
  head: () => ({
    meta: [{ title: "Snaps — Richard Nuñez" }],
  }),
});

const SNAPS = [
  {
    id: "east-west",
    title: "East Coast, West Coast",
    note: "Biggie and Tupac. The sides of the canvas read East Coast and West Coast.",
    src: "/videos/east-west.mp4",
    poster: "/images/snap-east-west.jpg",
  },
] as const;

function SnapsPage() {
  return (
    <div className="pt-52">
      <header className="mx-auto max-w-5xl px-5 md:px-8">
        <p className="text-sm tracking-[0.3em] text-gilt uppercase">Snaps</p>
        <h1 className="mt-3 font-display text-5xl md:text-7xl">In the room.</h1>
        <p className="mt-5 max-w-2xl text-paper-dim">
          Short looks at the work, still on the easel.
        </p>
      </header>

      <div className="mx-auto mt-12 grid max-w-5xl gap-16 px-5 pb-24 md:px-8">
        {SNAPS.map((snap) => (
          <figure key={snap.id}>
            <video
              src={snap.src}
              poster={snap.poster}
              controls
              playsInline
              preload="metadata"
              className="mx-auto h-auto max-h-[78dvh] w-auto max-w-full bg-ink-2"
              onPlay={() => window.dispatchEvent(new Event("site-audio-pause"))}
            />
            <figcaption className="mt-5">
              <p className="font-display text-3xl">{snap.title}</p>
              <p className="mt-2 max-w-xl text-paper-dim">{snap.note}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
