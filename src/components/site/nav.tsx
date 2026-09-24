import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background,border] duration-300",
        scrolled
          ? "border-b border-line bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-5 py-4 md:px-8">
        <Link
          to="/"
          className="font-display text-3xl leading-none tracking-[0.12em] text-paper uppercase sm:text-4xl md:text-5xl md:tracking-[0.14em]"
        >
          {SITE.name.split(" ")[0]}
          <span className="text-gilt">·</span>
          {SITE.name.split(" ")[1]}
        </Link>

        <nav className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 md:gap-x-8">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "relative pb-1 text-sm tracking-[0.14em] uppercase transition-colors duration-200 sm:text-base md:text-xl md:tracking-[0.16em]",
                pathname === item.to ? "text-gilt" : "text-paper/75 hover:text-paper",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-px bg-gilt transition-all duration-300",
                  pathname === item.to ? "w-full" : "w-0",
                )}
              />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
