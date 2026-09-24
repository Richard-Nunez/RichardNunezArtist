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

    const move = (e: PointerEvent) => {
      const transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;

      if (dot.current) {
        dot.current.style.transform = transform;
      }

      if (ring.current) {
        ring.current.style.transform = transform;
      }
    };

    window.addEventListener("pointermove", move, {
      passive: true,
      capture: true,
    });

    return () => {
      window.removeEventListener("pointermove", move, {
        capture: true,
      });

      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden size-1.5 rounded-full bg-gilt will-change-transform md:block"
      />

      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden size-9 rounded-full border border-gilt/45 will-change-transform md:block"
      />
    </>
  );
}