import { Link } from "@tanstack/react-router";
import { NAV, SITE, SOCIALS } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-3xl text-paper">Richard Nuñez</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Self-taught painter in Dallas. Acrylic on canvas.
            <br />
            He paints live.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm tracking-[0.18em] uppercase text-paper-dim">
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} className="hover:text-gilt">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="text-sm text-muted">
          <p className="tracking-[0.18em] text-gilt uppercase">Atelier</p>
          <p className="mt-3">{SITE.domain}</p>
          <a className="mt-1 block hover:text-gilt" href={SITE.instagram}>
            Instagram @nunezart1
          </a>
        </div>
      </div>
      <div className="border-t border-line px-5 py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-2">
          {SOCIALS.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center border border-line px-4 text-xs tracking-[0.16em] text-paper-dim uppercase transition-colors hover:border-gilt hover:text-gilt"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-line px-5 py-5 text-center text-xs tracking-[0.2em] text-muted uppercase">
        Richard Nuñez All Rights Reserved ©
      </div>
    </footer>
  );
}
