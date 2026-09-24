import { useEffect, useRef } from "react";

export function StudioCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!fine || reduce) return;

    document.documentElement.classList.add("has-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let raf = 0;

    const render = () => {
      const transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      if (dot.current) {
        dot.current.style.transform = transform;
      }

      if (ring.current) {
        ring.current.style.transform = transform;
      }

      raf = 0;
    };

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;

      if (!raf) {
        raf = requestAnimationFrame(render);
      }
    };

    window.addEventListener("pointermove", move, { passive: true });

    return () => {
      if (raf) {
        cancelAnimationFrame(raf);
      }

      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden size-1.5 rounded-full bg-gilt md:block"
      />

      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden size-9 rounded-full border border-gilt/45 md:block"
      />
    </>
  );
}