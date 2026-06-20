import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { TRIBES } from "@/lib/dragons";
import { SCENES } from "@/lib/scenes";
import { Particles } from "@/components/Particles";

export const Route = createFileRoute("/tribes")({
  head: () => ({
    meta: [
      { title: "Dragon Tribes — DragonHub" },
      {
        name: "description",
        content:
          "Step into a kid-imagined dragon world of twelve mystical tribes, with the ten existing tribe doorways shown for now.",
      },
    ],
  }),
  component: TribesPage,
});

function TribesPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (pathname !== "/tribes") return <Outlet />;

  return (
    <div className="relative">
      {/* Intro */}
      <section className="relative px-4 pt-14 pb-6 text-center">
        <div className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Codex of Tribes
        </div>
        <h1 className="font-display text-4xl font-black sm:text-6xl">
          <span className="text-gradient-magic">Twelve Mystical Tribes</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Glide between the known tribe doorways while two mystery tribes wait to be imagined.
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-xs italic text-muted-foreground/75">
          (In the actual books, there are 10 tribes — 7 in Pyrrhia, 3 in Pantala)
        </p>
      </section>

      {/* Cinematic showcase panels */}
      <section className="mx-auto max-w-[1500px] space-y-8 px-3 py-10 sm:px-6">
        {TRIBES.map((t, i) => (
          <Link
            key={t.slug}
            to="/tribes/$slug"
            params={{ slug: t.slug }}
            className="group relative block overflow-hidden rounded-[2.25rem] shadow-magic ring-1 ring-white/10"
            style={{ aspectRatio: "16 / 9" }}
          >
            {/* Scene */}
            <img
              src={SCENES[t.slug]}
              alt={`${t.name} kingdom scene`}
              width={1920}
              height={1088}
              loading={i < 2 ? "eager" : "lazy"}
              className="scene-zoom absolute inset-0 h-full w-full object-cover"
            />
            {/* Cinematic gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,.65) 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-60 mix-blend-soft-light"
              style={{
                background: `radial-gradient(ellipse at 70% 30%, var(--${t.glowVar}), transparent 60%)`,
              }}
            />
            {/* Fog + particles */}
            <div className="fog-layer" />
            <Particles count={14} />

            {/* Text — minimal */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 md:p-14 text-white">
              <div className="flex items-end justify-between gap-6">
                <div className="min-w-0">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] backdrop-blur">
                    <span>{t.emoji}</span> Known Tribe {i + 1} / 10
                  </div>
                  <h2 className="font-display text-4xl font-black drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:text-6xl md:text-7xl">
                    {t.name}
                  </h2>
                  <p className="mt-2 max-w-xl text-base font-medium opacity-95 drop-shadow sm:text-lg">
                    {t.tagline}
                  </p>
                </div>
                <div className="shrink-0 self-end opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 translate-x-3 hidden sm:block">
                  <div className="rounded-full bg-white px-5 py-3 text-sm font-bold text-black shadow-glow">
                    Enter →
                  </div>
                </div>
              </div>
            </div>

            {/* Hover ring */}
            <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] ring-1 ring-inset ring-white/0 transition group-hover:ring-white/40" />
          </Link>
        ))}
      </section>
    </div>
  );
}
