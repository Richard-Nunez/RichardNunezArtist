import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { ROOMS, SITE } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/studio")({
  component: StudioPage,

  head: () => ({
    meta: [
      {
        title: "Richard Nuñez Studio | Live Painting in Dallas",
      },
      {
        name: "description",
        content:
          "Explore the studio life of Richard Nuñez, a Dallas artist known for live acrylic painting in public spaces, restaurants, galleries, and events.",
      },

      {
        property: "og:title",
        content: "Richard Nuñez Studio | Live Painting in Dallas",
      },
      {
        property: "og:description",
        content:
          "Discover the places, rooms, and live painting settings that shape the studio practice of Dallas artist Richard Nuñez.",
      },
      {
        property: "og:url",
        content: "https://richardnunezartist.com/studio",
      },
      {
        property: "og:type",
        content: "website",
      },

      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Richard Nuñez Studio | Live Painting in Dallas",
      },
      {
        name: "twitter:description",
        content:
          "Explore Richard Nuñez's studio life, live painting practice, and Dallas-based creative spaces.",
      },
    ],

    links: [
      {
        rel: "canonical",
        href: "https://richardnunezartist.com/studio",
      },
    ],
  }),
});

function StudioPage() {
  return (
    <div className="pt-52">
      <header className="mx-auto max-w-5xl px-5 md:px-8">
        <p className="text-xs tracking-[0.3em] text-gilt uppercase">Rooms</p>
        <h1 className="mt-3 font-display text-5xl md:text-7xl">The city is the gallery.</h1>
        <p className="mt-5 max-w-2xl text-paper-dim">
          Richard Nuñez paints where people gather — wine, steak, and a full
          room. The canvas goes up in public, and Dallas gets to watch it finish.
        </p>
      </header>

      <div className="mx-auto mt-16 max-w-5xl space-y-24 px-5 pb-24 md:px-8">
        {ROOMS.map((room, i) => (
          <Reveal key={room.title}>
            <article
              className={cn(
                "grid gap-8 md:grid-cols-2 md:items-center",
                i % 2 === 1 && "md:[&>img]:order-2",
              )}
            >
              <img src={room.image} alt={room.title} className="aspect-4/3 w-full object-cover" />
              <div>
                <p className="text-xs tracking-[0.2em] text-ember uppercase">{room.years}</p>
                <h2 className="mt-2 font-display text-4xl">{room.title}</h2>
                <p className="mt-1 text-sm text-gilt">{room.place}</p>
                <p className="mt-5 leading-relaxed text-paper-dim">{room.body}</p>
              </div>
            </article>
          </Reveal>
        ))}

        <aside className="overflow-hidden border border-line bg-ink-2">
          <img
            src="/images/mall-studio.jpg"
            alt="Valley View mall corridor"
            className="h-56 w-full object-cover"
          />
          <div className="p-8">
            <p className="text-xs tracking-[0.2em] text-gilt uppercase">Instagram</p>
            <h2 className="mt-3 font-display text-3xl">@nunezart1</h2>
            <p className="mt-4 max-w-xl text-paper-dim">
              Richard Nuñez paints live, in acrylic, in front of the room. Follow
              the studio for the work, the nights, and what’s on the easel.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center bg-gilt px-5 text-xs tracking-[0.2em] text-ink uppercase transition-transform duration-150 active:scale-[0.96]"
              >
                Open Instagram
              </a>
              <Link
                to="/press"
                className="inline-flex min-h-11 items-center border border-line px-5 text-xs tracking-[0.2em] uppercase hover:border-gilt"
              >
                Press links
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
