import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/site/reveal";
import { ATHLETES, TIMELINE } from "@/data/site";

export const Route = createFileRoute("/bio")({
  component: BioPage,

  head: () => ({
    meta: [
      {
        title: "Richard Nuñez Biography | Dallas Artist",
      },
      {
        name: "description",
        content:
          "Discover the life and career of Richard Nuñez, a self-taught Dallas–Fort Worth artist known for acrylic painting, live art, iconic portraits, and charity work.",
      },

      {
        property: "og:title",
        content: "Richard Nuñez Biography | Dallas Artist",
      },
      {
        property: "og:description",
        content:
          "Explore the life, career, studio years, live painting, and artistic journey of Dallas–Fort Worth artist Richard Nuñez.",
      },
      {
        property: "og:url",
        content: "https://richardnunezartist.com/bio",
      },
      {
        property: "og:type",
        content: "profile",
      },
      {
        property: "og:image",
        content:
          "https://richardnunezartist.com/images/nunez-portrait.jpg",
      },
      {
        property: "og:image:alt",
        content: "Portrait of artist Richard Nuñez",
      },

      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Richard Nuñez Biography | Dallas Artist",
      },
      {
        name: "twitter:description",
        content:
          "Explore the life, career, and artistic journey of Dallas–Fort Worth artist Richard Nuñez.",
      },
      {
        name: "twitter:image",
        content:
          "https://richardnunezartist.com/images/nunez-portrait.jpg",
      },
    ],

    links: [
      {
        rel: "canonical",
        href: "https://richardnunezartist.com/bio",
      },
    ],
  }),
});

function BioPage() {
  const [year, setYear] = useState<string>(TIMELINE[0].year);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-year]"));
    if (!nodes.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setYear((vis.target as HTMLElement).dataset.year ?? TIMELINE[0].year);
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <article className="pt-52">
      <header className="mx-auto grid max-w-6xl items-end gap-10 px-5 pb-4 pt-4 md:grid-cols-2 md:px-8">
        <div className="portrait-haze">
          <img
            src="/images/nunez-portrait.jpg"
            alt="Richard Nuñez"
            className="aspect-square w-full object-cover object-[70%_20%]"
          />
        </div>
        <div className="pb-2">
          <p className="text-xs tracking-[0.3em] text-gilt uppercase">Biography</p>
          <h1 className="mt-2 font-display text-5xl md:text-7xl">A life that arrived late to the canvas.</h1>
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-8 px-5 py-16 text-base leading-relaxed text-paper-dim md:px-8">
        <p className="font-display text-2xl italic text-paper">
          Richard L. Nuñez was born March 23, 1961 in Fort Wayne, Indiana, to Esther
          and Henry Nuñez, both of Mescalero Apache descent. He did not learn that
          heritage until 2004 — his parents kept it from him, he has said, so he
          would not have to carry the prejudices they knew.
        </p>
        <p>
          He is a self-taught American painter based in the Dallas–Fort Worth
          Metroplex. He paints primarily acrylic on canvas. What follows is the
          life behind the work — the studio years, the live nights, and the rooms
          that became the gallery.
        </p>
      </div>

      <section className="relative border-y border-line bg-ink-2">
        <div className="pointer-events-none sticky top-40 z-10 mx-auto flex max-w-5xl justify-end px-5 md:px-8">
          <p className="font-display text-6xl text-gilt/40 md:text-8xl tabular-nums">{year}</p>
        </div>
        <ol className="mx-auto -mt-16 max-w-5xl space-y-0 px-5 pb-24 md:px-8">
          {TIMELINE.map((beat) => (
            <li
              key={beat.year}
              data-year={beat.year}
              className="grid gap-4 border-b border-line py-16 md:grid-cols-12"
            >
              <p className="text-xs tracking-[0.24em] text-ember uppercase md:col-span-3">
                {beat.year}
              </p>
              <div className="md:col-span-9">
                <h2 className="font-display text-4xl text-paper">{beat.title}</h2>
                <p className="mt-4 max-w-2xl leading-relaxed text-paper-dim">{beat.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:px-8">
        <Reveal>
          <img
            src="/images/painter-hands.jpg"
            alt="A man's hands painting gold acrylic on canvas"
            className="aspect-3/4 w-full object-cover"
          />
        </Reveal>
        <Reveal className="space-y-6 text-base leading-relaxed text-paper-dim" delay={80}>
          <p className="text-xs tracking-[0.3em] text-gilt uppercase">Early life</p>
          <h2 className="font-display text-4xl text-paper">Radio, then every other job.</h2>
          <p>
            Nuñez attended Southside High School in Fort Wayne, graduating in 1979.
            During high school he worked at WMEE as a maintenance engineer
            (1978–1979). At his first wife’s urging he left the station.
          </p>
          <p>
            The next twenty years were a catalogue of work: dishwasher in a Mexican
            restaurant, grocery bagger, salesman at Home Depot and Montgomery Ward,
            forklift operator, bartender, stand-up comic, singer. In 1993 he set
            out for Phoenix. Dallas stopped the car. An uncle’s spare room became a
            life. Thirteen years in hospitality followed — bartender, waiter, head
            trainer — until he was general manager of a wine bar in Highland
            Village, thirty minutes from downtown. The room became a gallery.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto max-w-3xl space-y-8 px-5 pb-16 text-base leading-relaxed text-paper-dim md:px-8">
        <p className="text-xs tracking-[0.3em] text-gilt uppercase">Career</p>
        <h2 className="font-display text-4xl text-paper">Richard Nuñez Art, 2005.</h2>
        <p>
          At forty-five he went full-time and founded Richard Nuñez Art to showcase the
          work. Renaissance drawing (Michelangelo) sits under a taste for “the icons”:
          Monroe, Hepburn, the Rat Pack, Jackson, Dallas athletes.
        </p>
        <p>
          In February 2009 he painted for Dan Aykroyd’s wine label. Earlier, at
          the House of Blues Houston opening in October 2008, he worked a John
          Belushi portrait with Jim Belushi and Aykroyd caught in the sunglasses.
          A full-body Marilyn Monroe canvas was stolen from a friend’s vehicle on
          July 7, 2007 and returned twenty days later with nine bullet holes. He
          kept the damaged painting at the front of the studio.
        </p>
        <p>
          Through Richard Nuñez Art he has described more than $350,000 raised from 2006
          to 2013 for women-and-children causes, with one auction piece reported
          at $21,000. Those figures come from Dallas coverage of the auctions.
        </p>
      </div>

      <section className="border-t border-line bg-ink-2 py-16">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <h2 className="font-display text-3xl">Athletes in the studio</h2>
          <ul className="mt-8 columns-2 gap-8 text-sm tracking-wide text-paper-dim md:columns-3">
            {ATHLETES.map((name) => (
              <li key={name} className="mb-2 border-b border-line/80 py-2">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
