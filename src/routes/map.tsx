import { createFileRoute, Link } from "@tanstack/react-router";
import { KINGDOMS, TRIBES } from "@/lib/dragons";
import { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import mapImg from "@/assets/world-map.jpg";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "World Map — DragonHub" },
      {
        name: "description",
        content: "Explore mystical dragon kingdoms on an interactive fantasy map.",
      },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const [zoom, setZoom] = useState(1);
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="text-center">
        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
          Interactive Map
        </div>
        <h1 className="font-display text-4xl font-black sm:text-6xl">
          <span className="text-gradient-magic">The Dragon Kingdoms</span>
        </h1>
        <p className="mt-3 text-muted-foreground">Tap a glowing marker to discover its kingdom.</p>
      </div>

      <div className="relative mt-8 overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-magic">
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <button
            onClick={() => setZoom((z) => Math.min(2, z + 0.2))}
            className="grid h-10 w-10 place-items-center rounded-full bg-background/80 shadow backdrop-blur"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.8, z - 0.2))}
            className="grid h-10 w-10 place-items-center rounded-full bg-background/80 shadow backdrop-blur"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <div
            className="relative h-full w-full transition-transform duration-500"
            style={{ transform: `scale(${zoom})` }}
          >
            <img
              src={mapImg}
              alt="Dragon world map"
              className="absolute inset-0 h-full w-full object-cover"
              width={1600}
              height={1200}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            {KINGDOMS.map((k) => {
              const t = TRIBES.find((x) => x.slug === k.tribe)!;
              return (
                <button
                  key={k.slug}
                  onClick={() => setActive(active === k.slug ? null : k.slug)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: `${k.y}%`, left: `${k.x}%` }}
                  aria-label={k.name}
                >
                  <span
                    className="grid h-12 w-12 place-items-center rounded-full text-xl text-white shadow-glow animate-pulse-glow"
                    style={{ background: `var(--${t.colorVar})` }}
                  >
                    {t.emoji}
                  </span>
                  <span className="mt-1 block whitespace-nowrap rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-bold backdrop-blur">
                    {k.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {active &&
        (() => {
          const k = KINGDOMS.find((x) => x.slug === active)!;
          const t = TRIBES.find((x) => x.slug === k.tribe)!;
          return (
            <div className="mt-6 grid gap-4 rounded-3xl border border-border/60 bg-card p-6 shadow-magic animate-fade-up sm:grid-cols-[auto_1fr_auto] sm:items-center">
              <div
                className="grid h-16 w-16 place-items-center rounded-2xl text-3xl text-white"
                style={{ background: `var(--${t.colorVar})` }}
              >
                {t.emoji}
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold">{k.name}</h3>
                <p className="text-muted-foreground">{k.desc}</p>
              </div>
              <Link
                to="/tribes/$slug"
                params={{ slug: t.slug }}
                className="rounded-full bg-gradient-magic px-5 py-3 text-sm font-bold text-primary-foreground shadow-magic"
              >
                Visit {t.name} →
              </Link>
            </div>
          );
        })()}

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {KINGDOMS.map((k) => {
          const t = TRIBES.find((x) => x.slug === k.tribe)!;
          return (
            <button
              key={k.slug}
              onClick={() => setActive(k.slug)}
              className="card-tilt rounded-2xl border border-border/60 bg-card p-4 text-left shadow-magic"
            >
              <div className="flex items-center gap-3">
                <div
                  className="grid h-12 w-12 place-items-center rounded-xl text-xl text-white"
                  style={{ background: `var(--${t.colorVar})` }}
                >
                  {t.emoji}
                </div>
                <div className="min-w-0">
                  <div className="font-display font-bold">{k.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{k.desc}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
