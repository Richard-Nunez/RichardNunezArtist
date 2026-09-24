import type { ReactNode } from "react";
import { StudioCursor } from "./cursor";
import { Grain } from "./grain";
import { ScrollProgress } from "./progress";
import { SiteFooter } from "./footer";
import { SiteNav } from "./nav";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-ink text-paper">
      <ScrollProgress />
      <Grain />
      <StudioCursor />
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
