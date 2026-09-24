import { ICONS } from "@/data/site";

export function IconMarquee() {
  const row = [...ICONS, ...ICONS];
  return (
    <div className="overflow-hidden border-y border-line bg-ink-2 py-4">
      <div className="animate-marquee flex w-max gap-10 pr-10">
        {row.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-display text-2xl italic tracking-wide text-gilt/80 md:text-3xl"
          >
            {name}
            <span className="ml-10 text-ember">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
