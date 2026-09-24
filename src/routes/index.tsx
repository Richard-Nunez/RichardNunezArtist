import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CountUp } from "@/components/site/count-up";
import { IconMarquee } from "@/components/site/marquee";
import { Reveal } from "@/components/site/reveal";
import { PRESS, STATS, WORKS } from "@/data/site";

export const Route = createFileRoute("/")({ component: Home });

function StaggerLine({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block animate-fade-up"
          style={{ animationDelay: `${80 + i * 70}ms` }}
        >
          {word}
          {"\u00A0"}
        </span>
      ))}
    </span>
  );
}

const STATEMENTS = [
  "He paints live in Dallas.",
  "Acrylic on canvas. In public.",
  "Self-taught. Mescalero Apache.",
];

function DynamicStatement() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = window.setInterval(() => {
      setI((n) => (n + 1) % STATEMENTS.length);
    }, 3200);
    return () => window.clearInterval(t);
  }, []);

  return (
    <p className="mt-6 max-w-xl font-display text-2xl italic leading-snug text-paper md:text-3xl min-h-16">
      <span key={i} className="animate-fade-up inline-block">
        {STATEMENTS[i]}
      </span>
    </p>
  );
}

function Home() {
  const featured = PRESS.filter((p) => p.featured && p.kind === "journalism");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.08)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <section className="relative min-h-dvh overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)]"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-hands.jpg"
        >
          <source src="/videos/hero-hands.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-ink/20" />
        <div className="relative z-10 mx-auto flex min-h-dvh max-w-7xl flex-col justify-end px-5 pb-16 pt-36 md:px-8 md:pb-24">
          <p
            className="animate-fade-up text-xs tracking-[0.4em] text-gilt uppercase"
            style={{ animationDelay: "40ms" }}
          >
            Dallas · Acrylic · Live
          </p>
          <h1 className="mt-4 max-w-5xl font-display text-6xl leading-[0.9] text-paper md:text-8xl">
            <StaggerLine text="The next canvas" />
            <span
              className="italic text-gilt animate-fade-up inline-block"
              style={{ animationDelay: "420ms" }}
            >
              is the favorite.
            </span>
          </h1>
          <div className="animate-fade-up" style={{ animationDelay: "520ms" }}>
            <DynamicStatement />
          </div>
          <div
            className="mt-10 flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: "640ms" }}
          >
            <Link
              to="/work"
              className="inline-flex min-h-11 items-center gap-2 bg-gilt px-6 py-3 text-xs tracking-[0.2em] text-ink uppercase transition-transform duration-150 ease-out active:scale-[0.96]"
            >
              View works <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/press"
              className="inline-flex min-h-11 items-center gap-2 border border-paper/30 px-6 py-3 text-xs tracking-[0.2em] text-paper uppercase transition-colors hover:border-gilt hover:text-gilt"
            >
              Press archive
            </Link>
          </div>
          <div className="mt-14 flex items-center gap-3 text-xs tracking-[0.28em] text-paper-dim uppercase">
            <span className="animate-pulse-line inline-block h-8 w-px bg-gilt" />
            Scroll the atelier
          </div>
        </div>
      </section>

      <IconMarquee />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-12 md:px-8">
        <Reveal className="md:col-span-5">
          <p className="text-xs tracking-[0.3em] text-gilt uppercase">The painter</p>
          <h2 className="mt-3 font-display text-5xl text-paper md:text-6xl">
            Forty-five when he went all in.
          </h2>
          <div className="mt-8 overflow-hidden">
            <img
              src="/images/painter-hands.jpg"
              alt="A man's hands painting wet gold acrylic on canvas"
              className="aspect-3/4 w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal className="md:col-span-7 space-y-5 text-base leading-relaxed text-paper-dim" delay={80}>
          <p>
            Born March 23, 1961 in Fort Wayne, Indiana. Radio kid. Dishwasher.
            Home Depot salesman. Stand-up. Bartender. Then Dallas held him — a
            broken car on the way to Phoenix, an uncle’s spare room, thirteen years
            in hospitality until the wine bar became a studio.
          </p>
          <p>
            In 2005 he founded Richard Nuñez Art to showcase the work. He paints primarily acrylic on canvas, chasing the faces
            everyone already knows, finishing a picture in an evening while the room
            watches.
          </p>
          <Link
            to="/bio"
            className="inline-flex items-center gap-2 text-gilt hover:text-gilt-bright"
          >
            Read the life <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>

      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:grid-cols-2 md:grid-cols-4 md:px-8">
          {STATS.map((stat) => (
            <Reveal key={stat.label}>
              <p className="font-display text-5xl text-gilt md:text-6xl">
                <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-xs tracking-[0.18em] text-muted uppercase">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-b border-line py-16">
        <div className="mx-auto flex max-w-7xl items-end justify-between px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl">Selected works</h2>
          </Reveal>
          <Link to="/work" className="hidden text-xs tracking-[0.2em] text-gilt uppercase md:inline">
            Full studio
          </Link>
        </div>
        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 hide-scrollbar md:px-8">
          {WORKS.filter((work) => work.home).map((work) => (
            <Link
              key={work.id}
              to="/work"
              className="group w-[70vw] shrink-0 snap-start sm:w-80"
            >
              <div className="flex aspect-4/5 items-center justify-center overflow-hidden bg-ink-3">
                <img
                  src={work.image}
                  alt={work.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 font-display text-2xl">{work.title}</p>
              <p className="text-xs tracking-[0.16em] text-muted uppercase">
                {[work.series, work.year].filter(Boolean).join(" · ")}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img
          src="/images/texture.jpg"
          alt=""
          className="animate-ken absolute inset-0 size-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <Reveal className="relative mx-auto max-w-4xl px-5 py-28 text-center md:px-8">
          <p className="text-xs tracking-[0.3em] text-gilt uppercase">Richard Nuñez Art</p>
          <blockquote className="mt-6 font-display text-4xl italic leading-tight md:text-6xl">
            “People always ask me what my favorite piece is, and I always tell them
            it’s the next one.”
          </blockquote>
          <p className="mt-6 text-sm tracking-[0.2em] text-paper-dim uppercase">
            — Richard Nuñez, 2013
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="flex items-end justify-between">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl">On the Record</h2>
          </Reveal>
          <Link to="/press" className="text-xs tracking-[0.2em] text-gilt uppercase">
            All articles
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {featured.map((item, i) => (
            <Reveal key={item.id} delay={i * 80}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden border border-line bg-ink-2 transition-colors hover:border-gilt"
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
                  <p className="text-xs tracking-[0.2em] text-ember uppercase">{item.publication}</p>
                  <h3 className="mt-4 font-display text-3xl group-hover:text-gilt">{item.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{item.excerpt}</p>
                  <p className="mt-6 text-xs tracking-[0.16em] text-paper-dim uppercase">{item.date}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
