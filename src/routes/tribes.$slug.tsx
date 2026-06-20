import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CHARACTERS, getTribe, type Tribe } from "@/lib/dragons";
import { SCENES } from "@/lib/scenes";
import { CHARACTER_ART } from "@/lib/character-art";
import { Particles } from "@/components/Particles";
import { trackJournalItem } from "@/lib/journal";
import mudwingFamily from "@/assets/fan/mudwing-family.jpg";
import { useEffect } from "react";
import { ReadingFactPanels } from "@/components/ReadingFactPanels";
import { getTribeReadingFacts } from "@/lib/reading-facts";

export const Route = createFileRoute("/tribes/$slug")({
  loader: ({ params }): { tribe: Tribe } => {
    const tribe = getTribe(params.slug);
    if (!tribe) throw notFound();
    return { tribe };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.tribe.name} — DragonHub` },
          { name: "description", content: loaderData.tribe.description },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-[60vh] place-items-center px-4 text-center">
      <div>
        <h1 className="font-display text-3xl font-bold">Tribe not found</h1>
        <Link to="/tribes" className="mt-4 inline-block font-bold text-primary">
          ← Back to all tribes
        </Link>
      </div>
    </div>
  ),
  component: TribePage,
});

function TribePage() {
  const { tribe } = Route.useLoaderData() as { tribe: Tribe };
  const famous = CHARACTERS.filter((c) => c.tribe === tribe.slug);
  const scene = SCENES[tribe.slug];
  const readingFacts = getTribeReadingFacts(tribe);

  useEffect(() => {
    trackJournalItem("visitedTribes", tribe.slug);
  }, [tribe.slug]);

  return (
    <div>
      {/* Cinematic hero */}
      <section
        className="relative isolate overflow-hidden"
        style={{ minHeight: "min(86vh, 820px)" }}
      >
        <img
          src={scene}
          alt={`${tribe.name} habitat`}
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover animate-ken-burns"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,.25) 0%, rgba(0,0,0,.05) 40%, rgba(0,0,0,.85) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-70 mix-blend-soft-light"
          style={{
            background: `radial-gradient(ellipse at 60% 30%, var(--${tribe.glowVar}), transparent 70%)`,
          }}
        />
        <div className="fog-layer" />
        <Particles count={26} />

        <div className="relative z-10 mx-auto flex min-h-[86vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-24 text-white">
          <Link
            to="/tribes"
            className="mb-6 inline-flex w-fit rounded-full bg-white/15 px-4 py-2 text-xs font-bold backdrop-blur hover:bg-white/30"
          >
            ← All Tribes
          </Link>
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] backdrop-blur">
            <span>{tribe.emoji}</span> {tribe.habitat}
          </div>
          <h1 className="font-display text-6xl font-black drop-shadow-[0_6px_30px_rgba(0,0,0,.6)] sm:text-8xl">
            {tribe.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lg font-medium opacity-95 drop-shadow sm:text-2xl">
            {tribe.tagline}
          </p>
          {tribe.slug === "nightwing" && (
            <p className="mt-3 max-w-xl text-xs italic text-white/75 drop-shadow sm:text-sm">
              His world imagines five rainforest moons. (In the actual books, there are only 3
              moons)
            </p>
          )}
        </div>
      </section>

      {/* Powers ribbon */}
      <section className="relative -mt-8 px-4">
        <div className="mx-auto grid max-w-6xl gap-3 rounded-3xl border border-border/60 bg-card p-4 shadow-magic sm:grid-cols-2 md:grid-cols-4">
          {tribe.powers.map((p, i) => (
            <div
              key={p}
              className="flex items-center gap-3 rounded-2xl p-3 animate-fade-up"
              style={{
                background: `linear-gradient(135deg, color-mix(in oklab, var(--${tribe.colorVar}) 16%, transparent), transparent)`,
                animationDelay: `${i * 80}ms`,
              }}
            >
              <div
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white shadow-glow"
                style={{ background: `var(--${tribe.colorVar})` }}
              >
                ✦
              </div>
              <span className="font-semibold">{p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Lore + facts in side-scene panels */}
      <section className="mx-auto max-w-6xl space-y-10 px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div
            className="overflow-hidden rounded-3xl border border-border/60 shadow-magic"
            style={{
              background: `linear-gradient(155deg, var(--card), color-mix(in oklab, var(--${tribe.colorVar}) 12%, var(--card)))`,
            }}
          >
            <div className="relative h-44">
              <img src={scene} alt="" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
            </div>
            <div className="p-6">
              <h2 className="font-display text-2xl font-bold">
                <span className="text-gradient-magic">Lore</span>
              </h2>
              <p className="mt-3 leading-relaxed">{tribe.description}</p>
              <p className="mt-3 leading-relaxed text-muted-foreground">{tribe.history}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-magic">
            <h2 className="font-display text-2xl font-bold">
              <span className="text-gradient-magic">Spirit</span>
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {tribe.personality.map((p) => (
                <span
                  key={p}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-glow"
                  style={{ background: `var(--${tribe.colorVar})` }}
                >
                  {p}
                </span>
              ))}
            </div>
            <h3 className="mt-8 font-display text-xl font-bold">Wonders</h3>
            <ul className="mt-3 space-y-3">
              {tribe.funFacts.map((f) => (
                <li key={f} className="flex gap-3 rounded-2xl bg-secondary/50 p-3">
                  <span className="text-accent">✦</span>
                  <span className="text-sm leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ReadingFactPanels panels={readingFacts} />

        {tribe.slug === "mudwing" && (
          <section className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-magic">
            <div className="grid gap-0 md:grid-cols-[1.25fr_.75fr]">
              <div className="relative min-h-[320px]">
                <img
                  src={mudwingFamily}
                  alt="MudWing sibling troop together in the marsh"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-card/75" />
              </div>
              <div className="p-6 md:p-8">
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                  Entire Family
                </div>
                <h2 className="mt-2 font-display text-3xl font-black">
                  The sibling troop stays together
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  MudWings hatch in big sibling groups called troops. The oldest bigwings watches
                  over the younger dragons, and the whole family grows up side by side in the warm
                  marshes.
                </p>
              </div>
            </div>
          </section>
        )}

        {famous.length > 0 && (
          <div>
            <h2 className="mb-4 font-display text-3xl font-bold">
              <span className="text-gradient-magic">Dragons of the {tribe.name}</span>
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {famous.map((c) => (
                <Link
                  key={c.slug}
                  to="/characters/$slug"
                  params={{ slug: c.slug }}
                  className="group relative block overflow-hidden rounded-3xl shadow-magic ring-1 ring-white/10"
                  style={{ aspectRatio: "3 / 4" }}
                >
                  {CHARACTER_ART[c.tribe] ? (
                    <img
                      src={CHARACTER_ART[c.tribe]}
                      alt=""
                      className="scene-zoom absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={scene}
                      alt=""
                      className="scene-zoom absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <div className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-90">
                      {c.role}
                    </div>
                    <div className="font-display text-3xl font-black drop-shadow">{c.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <Link
          to="/map"
          className="relative block overflow-hidden rounded-3xl border border-border/60 shadow-magic"
        >
          <div className="relative h-44">
            <img src={scene} alt="" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/50 to-transparent" />
          </div>
          <div className="absolute inset-0 flex items-center px-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                World Map
              </div>
              <div className="font-display text-2xl font-black">Find {tribe.name} on the map →</div>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
