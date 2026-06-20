import { createFileRoute, Link } from "@tanstack/react-router";
import { TRIBES } from "@/lib/dragons";
import { BookOpen, Compass, Sparkles } from "lucide-react";

export const Route = createFileRoute("/facts")({
  head: () => ({
    meta: [
      { title: "Dragon Facts — DragonHub" },
      {
        name: "description",
        content:
          "Quick, kid-friendly Wings of Fire facts about dragon tribes, powers, habitats, and lore.",
      },
    ],
  }),
  component: FactsPage,
});

const FEATURED_FACTS = [
  {
    title: "Three moons can shape rare NightWing gifts",
    detail:
      "NightWings hatched under full moons may receive mind-reading, prophecy, or stronger versions of both gifts.",
    tag: "Moon lore",
  },
  {
    title: "SeaWings speak with light",
    detail:
      "Their glowing scale patterns form Aquatic, a silent underwater language used in the deep sea.",
    tag: "Language",
  },
  {
    title: "RainWing colors show emotion",
    detail:
      "RainWing scales shift with mood and surroundings, turning camouflage into both defense and expression.",
    tag: "Camouflage",
  },
  {
    title: "MudWing siblings grow up as troops",
    detail:
      "A troop is led by the bigwings, the strongest first-hatched sibling who protects the group.",
    tag: "Family",
  },
];

function FactsPage() {
  const tribeFacts = TRIBES.flatMap((tribe) =>
    tribe.funFacts.slice(0, 2).map((fact) => ({
      fact,
      tribe,
    })),
  );

  return (
    <div className="relative overflow-hidden">
      <section className="relative isolate px-4 py-16 text-center sm:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(167,83,225,.18),transparent_55%)]" />
        <div className="mx-auto max-w-4xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-accent">
            <Sparkles className="h-4 w-4" />
            Dragon Field Notes
          </div>
          <h1 className="font-display text-4xl font-black sm:text-6xl">
            <span className="text-gradient-magic">Facts from the Dragon Kingdom</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Bite-sized lore for quick exploring: powers, habitats, moons, tribes, and the tiny
            details that make every dragon kingdom feel alive.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-12 md:grid-cols-2 xl:grid-cols-4">
        {FEATURED_FACTS.map((item) => (
          <article
            key={item.title}
            className="rounded-[1.75rem] border border-border/60 bg-card p-6 shadow-magic"
          >
            <div className="mb-4 inline-flex rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              {item.tag}
            </div>
            <h2 className="font-display text-2xl font-black">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent">
              <BookOpen className="h-4 w-4" />
              Tribe Fact Cards
            </div>
            <h2 className="font-display text-3xl font-black sm:text-5xl">Quick facts by tribe</h2>
          </div>
          <Link
            to="/tribes"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-bold transition hover:bg-accent/20"
          >
            <Compass className="h-4 w-4" />
            Explore tribes
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tribeFacts.map(({ fact, tribe }, index) => (
            <article
              key={`${tribe.slug}-${index}`}
              className="group relative overflow-hidden rounded-[1.5rem] border border-border/60 bg-card p-5 shadow-magic"
            >
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{
                  background: `linear-gradient(90deg, var(--${tribe.colorVar}), var(--${tribe.glowVar}))`,
                }}
              />
              <div className="flex items-start gap-4">
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-xl text-white shadow-glow"
                  style={{ background: `var(--${tribe.colorVar})` }}
                >
                  {tribe.emoji}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {tribe.name}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed">{fact}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
