import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCharacter, CHARACTERS, TRIBES, type Character } from "@/lib/dragons";
import { CanonBackdrop } from "@/components/CanonBackdrop";
import { Particles } from "@/components/Particles";

export const Route = createFileRoute("/characters/$slug")({
  loader: ({ params }): { character: Character } => {
    const character = getCharacter(params.slug);
    if (!character) throw notFound();
    return { character };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.character.name} — Wings of Fire Adventure` },
          { name: "description", content: loaderData.character.bio },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-[60vh] place-items-center">
      <Link to="/characters" className="font-bold text-primary">
        ← Back to gallery
      </Link>
    </div>
  ),
  component: CharacterProfile,
});

function CharacterProfile() {
  const { character: c } = Route.useLoaderData() as { character: Character };
  const t = TRIBES.find((x) => x.slug === c.tribe)!;

  const power = 60 + ((c.slug.length * 13) % 40);
  const intel = 60 + ((c.name.length * 17) % 40);
  const speed = 50 + ((c.slug.charCodeAt(0) * 7) % 50);
  const strength = 55 + ((c.tribe.length * 19) % 45);
  const stats = [
    { label: "Power", value: power },
    { label: "Intelligence", value: intel },
    { label: "Speed", value: speed },
    { label: "Strength", value: strength },
  ];

  return (
    <div>
      <section
        className="relative isolate overflow-hidden"
        style={{ minHeight: "min(92vh, 880px)" }}
      >
        <CanonBackdrop tribe={c.tribe} />
        <div
          className="absolute inset-0 opacity-60 mix-blend-soft-light"
          style={{
            background: `radial-gradient(ellipse at 70% 30%, var(--${t.glowVar}), transparent 65%)`,
          }}
        />
        <div className="fog-layer" />
        <Particles count={28} />

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-4 pb-14 pt-24 text-white">
          <Link
            to="/characters"
            className="mb-6 inline-flex w-fit rounded-full bg-white/15 px-4 py-2 text-xs font-bold backdrop-blur hover:bg-white/30"
          >
            ← Gallery
          </Link>
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.3em] backdrop-blur">
            <span>{t.emoji}</span> {t.name} · {c.role}
          </div>
          <div className="mb-5 inline-flex w-fit rounded-full border border-white/15 bg-black/15 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-white/85 backdrop-blur">
            Canon profile scene
          </div>
          <h1 className="font-display text-6xl font-black drop-shadow-[0_6px_30px_rgba(0,0,0,.6)] sm:text-8xl">
            {c.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-medium opacity-95 drop-shadow sm:text-2xl">
            {c.bio}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {c.powers.map((p) => (
              <span
                key={p}
                className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle eyebrow="Abilities" title="Power Signature" />
        <div className="grid gap-4 rounded-3xl border border-border/60 bg-card p-6 shadow-magic sm:grid-cols-2">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex justify-between text-sm font-bold">
                <span>{s.label}</span>
                <span style={{ color: `var(--${t.colorVar})` }}>{s.value}</span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full shadow-glow transition-all duration-1000"
                  style={{
                    width: `${s.value}%`,
                    background: `linear-gradient(90deg, var(--${t.colorVar}), var(--${t.glowVar}))`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <SectionTitle eyebrow="Habitat" title={`A poster scene from the ${t.name} world`} />
        <div
          className="relative overflow-hidden rounded-[2rem] shadow-magic ring-1 ring-white/10"
          style={{ aspectRatio: "16/8" }}
        >
          <CanonBackdrop tribe={c.tribe} poster />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <Particles count={18} />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <div className="text-[11px] font-bold uppercase tracking-[0.25em] opacity-90">
              Habitat
            </div>
            <Link
              to="/tribes/$slug"
              params={{ slug: t.slug }}
              className="font-display text-2xl font-bold underline-offset-4 hover:underline"
            >
              Explore the {t.name} territory →
            </Link>
          </div>
        </div>
      </section>

      {c.relationships.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <SectionTitle eyebrow="Bonds" title="Relationship Network" />
          <div className="relative grid place-items-center rounded-[2rem] border border-border/60 bg-card p-10 shadow-magic">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(ellipse at center, var(--${t.glowVar}), transparent 60%)`,
              }}
            />
            <div className="relative flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              <div className="relative grid place-items-center">
                <div
                  className="grid h-32 w-32 place-items-center rounded-full text-4xl text-white shadow-glow animate-pulse-glow"
                  style={{
                    background: `linear-gradient(135deg, var(--${t.colorVar}), var(--${t.glowVar}))`,
                  }}
                >
                  {t.emoji}
                </div>
                <div className="mt-2 font-display font-bold">{c.name}</div>
              </div>
              {c.relationships.map((r) => {
                const other = CHARACTERS.find((x) => x.name === r.name);
                const otherTribe = other ? TRIBES.find((x) => x.slug === other.tribe) : null;
                return (
                  <div key={r.name} className="relative grid place-items-center">
                    <div className="absolute -left-12 top-1/2 hidden h-px w-12 bg-gradient-to-r from-transparent to-border md:block" />
                    {other ? (
                      <Link
                        to="/characters/$slug"
                        params={{ slug: other.slug }}
                        className="grid place-items-center"
                      >
                        <div
                          className="grid h-24 w-24 place-items-center rounded-full text-3xl text-white shadow-magic transition hover:scale-110"
                          style={{
                            background: `linear-gradient(135deg, var(--${otherTribe!.colorVar}), var(--${otherTribe!.glowVar}))`,
                          }}
                        >
                          {otherTribe!.emoji}
                        </div>
                        <div className="mt-2 font-bold">{r.name}</div>
                        <div className="text-xs text-muted-foreground">{r.bond}</div>
                      </Link>
                    ) : (
                      <div className="grid place-items-center">
                        <div className="grid h-24 w-24 place-items-center rounded-full bg-secondary text-3xl">
                          ✦
                        </div>
                        <div className="mt-2 font-bold">{r.name}</div>
                        <div className="text-xs text-muted-foreground">{r.bond}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-2">
        <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-magic">
          <SectionTitle eyebrow="Light" title="Strengths" small />
          <ul className="mt-2 space-y-2">
            {c.strengths.map((s) => (
              <li key={s} className="flex items-center gap-3 rounded-2xl bg-secondary/50 p-3">
                <span className="text-accent">✦</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-magic">
          <SectionTitle eyebrow="Shadow" title="Weaknesses" small />
          <ul className="mt-2 space-y-2">
            {c.weaknesses.map((s) => (
              <li key={s} className="flex items-center gap-3 rounded-2xl bg-secondary/50 p-3">
                <span className="text-muted-foreground">◌</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle eyebrow="Saga" title="Journey Timeline" />
        <div className="relative pl-6">
          <div
            className="absolute left-2 top-2 bottom-2 w-px"
            style={{ background: `linear-gradient(180deg, var(--${t.colorVar}), transparent)` }}
          />
          <div className="space-y-6">
            {c.timeline.map((tl, i) => (
              <div
                key={i}
                className="relative animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className="absolute -left-[18px] top-1.5 h-3 w-3 rounded-full shadow-glow"
                  style={{ background: `var(--${t.colorVar})` }}
                />
                <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-magic">
                  <div
                    className="text-xs font-bold uppercase tracking-[0.25em]"
                    style={{ color: `var(--${t.colorVar})` }}
                  >
                    {tl.year}
                  </div>
                  <div className="mt-1 font-display text-lg font-bold">{tl.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <SectionTitle eyebrow="Whispers" title="Fun Facts" />
        <div className="grid gap-4 sm:grid-cols-2">
          {c.trivia.map((tr, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-3xl p-6 text-white shadow-magic"
              style={{
                background: `linear-gradient(135deg, var(--${t.colorVar}), var(--${t.glowVar}))`,
              }}
            >
              <div className="text-4xl opacity-30">✦</div>
              <p className="mt-2 text-base font-medium">{tr}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  small,
}: {
  eyebrow: string;
  title: string;
  small?: boolean;
}) {
  return (
    <div className="mb-4">
      <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent">{eyebrow}</div>
      <h2 className={`font-display font-black ${small ? "text-xl" : "text-3xl sm:text-4xl"}`}>
        <span className="text-gradient-magic">{title}</span>
      </h2>
    </div>
  );
}
