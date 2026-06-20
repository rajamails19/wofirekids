import { createFileRoute, Link } from "@tanstack/react-router";
import { TRIBES } from "@/lib/dragons";
import { SCENES } from "@/lib/scenes";
import { DragonBackground } from "@/components/DragonBackground";
import { Particles } from "@/components/Particles";
import heroImg from "@/assets/hero-dragon.jpg";
import portalBuilder from "@/assets/portal-builder.jpg";
import portalStory from "@/assets/portal-story.jpg";
import portalMap from "@/assets/portal-map.jpg";
import portalCards from "@/assets/portal-cards.jpg";
import portalAcademy from "@/assets/portal-academy.jpg";
import portalAchievements from "@/assets/portal-achievements.jpg";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DragonHub — Welcome to the Dragon Kingdom" },
      {
        name: "description",
        content:
          "Discover tribes, explore kingdoms, create dragons, and embark on legendary adventures.",
      },
      { property: "og:title", content: "DragonHub — Welcome to the Dragon Kingdom" },
      {
        property: "og:description",
        content: "A premium interactive fan experience for young dragon explorers.",
      },
    ],
  }),
  component: Home,
});

const PORTALS = [
  {
    to: "/builder",
    title: "Create Your Dragon",
    whisper: "Hatch a legend of your own",
    img: portalBuilder,
    tint: "from-emerald-500/40",
  },
  {
    to: "/story",
    title: "Story Generator",
    whisper: "Open the book of endless tales",
    img: portalStory,
    tint: "from-amber-500/40",
  },
  {
    to: "/map",
    title: "World Map",
    whisper: "Fly across seven kingdoms",
    img: portalMap,
    tint: "from-orange-500/40",
  },
  {
    to: "/cards",
    title: "Dragon Collection",
    whisper: "Enter the vault of legends",
    img: portalCards,
    tint: "from-yellow-500/40",
  },
  {
    to: "/academy",
    title: "Dragon Academy",
    whisper: "Step into the great library",
    img: portalAcademy,
    tint: "from-sky-500/40",
  },
  {
    to: "/achievements",
    title: "Achievements",
    whisper: "Stand among the Hall of Heroes",
    img: portalAchievements,
    tint: "from-rose-500/40",
  },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt=""
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background" />
        </div>
        <DragonBackground />

        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center">
          <span className="mb-5 inline-flex animate-fade-up items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 text-xs font-bold uppercase tracking-widest backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" /> A magical adventure awaits
          </span>
          <h1 className="animate-fade-up font-display text-5xl font-black leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl">
            Welcome to the
            <br />
            <span className="text-gradient-magic">Dragon Kingdom</span>
          </h1>
          <p
            className="mt-6 max-w-2xl animate-fade-up text-base text-foreground/85 sm:text-lg"
            style={{ animationDelay: "120ms" }}
          >
            Discover seven dragon tribes, explore mystical kingdoms, create your own dragon, and
            embark on legendary adventures across a world of wonder.
          </p>
          <div
            className="mt-9 flex flex-wrap items-center justify-center gap-3 animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              to="/tribes"
              className="rounded-full bg-gradient-magic px-7 py-4 text-base font-bold text-primary-foreground shadow-magic transition hover:scale-105"
            >
              Explore Tribes
            </Link>
            <Link
              to="/quiz"
              className="rounded-full border border-border/60 bg-background/80 px-7 py-4 text-base font-bold backdrop-blur transition hover:scale-105 hover:bg-background"
            >
              Take the Dragon Quiz
            </Link>
            <Link
              to="/builder"
              className="rounded-full border border-border/60 bg-background/80 px-7 py-4 text-base font-bold backdrop-blur transition hover:scale-105 hover:bg-background"
            >
              Create Your Dragon
            </Link>
          </div>

          <div className="mt-16 grid w-full max-w-3xl grid-cols-3 gap-3 sm:gap-6">
            {[
              { n: "10", l: "Canon tribes" },
              { n: "2", l: "Continents" },
              { n: "3", l: "Moons of fate" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-border/60 bg-background/70 px-3 py-4 backdrop-blur"
              >
                <div className="font-display text-3xl font-black text-gradient-magic sm:text-4xl">
                  {s.n}
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHOOSE YOUR DESTINY — horizontal cinematic journey */}
      <section className="relative py-20">
        <SectionHeader
          eyebrow="The Ten Canon Tribes"
          title="Choose Your Dragon"
          subtitle="Seven tribes of Pyrrhia. Three tribes of Pantala. Which one is yours?"
        />

        <div className="mt-12">
          <div className="scroll-rail flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-8 sm:gap-7 sm:px-8 lg:px-16">
            {TRIBES.map((t, i) => (
              <Link
                key={t.slug}
                to="/tribes/$slug"
                params={{ slug: t.slug }}
                className="group relative isolate flex h-[78vh] min-h-[520px] w-[82vw] max-w-[520px] shrink-0 snap-center overflow-hidden rounded-[2.5rem] shadow-magic ring-1 ring-white/10 sm:w-[440px]"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <img
                  src={SCENES[t.slug]}
                  alt={`${t.name} kingdom`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  loading="lazy"
                />
                {/* atmospheric overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div
                  className="absolute inset-0 opacity-70 mix-blend-soft-light transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse at 50% 35%, var(--${t.glowVar}), transparent 65%)`,
                  }}
                />
                <div className="fog-layer" />
                <Particles count={18} />

                {/* tribe sigil floating top */}
                <div className="absolute left-6 top-6 z-10 flex items-center gap-2">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-2xl text-2xl text-white shadow-glow animate-pulse-glow"
                    style={{ background: `var(--${t.colorVar})` }}
                  >
                    {t.emoji}
                  </span>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white backdrop-blur">
                    {t.continent} · {i + 1} / {TRIBES.length}
                  </span>
                </div>

                {/* foot content */}
                <div className="relative z-10 mt-auto w-full p-7 text-white">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-80">
                    {t.habitat.split(" ").slice(0, 3).join(" ")}
                  </div>
                  <h3 className="mt-1 font-display text-4xl font-black drop-shadow-[0_6px_30px_rgba(0,0,0,.7)] sm:text-5xl">
                    {t.name}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm font-medium opacity-95 drop-shadow">
                    {t.tagline}
                  </p>
                  <span
                    className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-glow transition group-hover:translate-x-1"
                    style={{ background: `var(--${t.colorVar})` }}
                  >
                    Enter Kingdom →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-2 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            ← Drag or scroll to explore →
          </p>
        </div>
      </section>

      {/* BEGIN YOUR ADVENTURE — six magical portals */}
      <section className="relative overflow-hidden py-20">
        <SectionHeader
          eyebrow="Adventures await"
          title="Begin Your Adventure"
          subtitle="Every choice unlocks a new legend."
        />
        <div className="mx-auto mt-12 grid max-w-7xl gap-5 px-4 md:grid-cols-2 lg:grid-cols-3">
          {PORTALS.map((p, i) => (
            <Link
              key={p.to}
              to={p.to}
              className="group relative isolate block overflow-hidden rounded-[2rem] shadow-magic ring-1 ring-white/10"
              style={{ aspectRatio: "4 / 5", animationDelay: `${i * 80}ms` }}
            >
              <img
                src={p.img}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
                loading="lazy"
              />
              {/* glow tint */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${p.tint} via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
              />
              {/* depth darken */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />
              {/* magical ring on hover */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ boxShadow: "inset 0 0 80px rgba(255, 200, 90, .35)" }}
              />
              <Particles count={14} />

              {/* arcane sigil corner */}
              <div className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition group-hover:bg-white/30">
                <Sparkles className="h-4 w-4" />
              </div>

              <div className="relative z-10 mt-auto flex h-full flex-col justify-end p-6 text-white">
                <h3 className="font-display text-3xl font-black drop-shadow-[0_6px_30px_rgba(0,0,0,.7)] sm:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm font-medium opacity-90 drop-shadow">{p.whisper}</p>
                <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur transition group-hover:bg-white/30 group-hover:translate-x-1">
                  Enter the Portal →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-4 mb-20 mt-12 overflow-hidden rounded-[2rem] bg-gradient-magic px-6 py-16 text-center shadow-magic sm:py-20">
        <DragonBackground variant="subtle" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-black text-primary-foreground sm:text-5xl">
            Ready to find your tribe?
          </h2>
          <p className="mt-4 text-primary-foreground/90">
            Answer ten magical questions and we'll reveal the dragon tribe that matches your heart.
          </p>
          <Link
            to="/quiz"
            className="mt-8 inline-flex rounded-full bg-background px-8 py-4 font-bold text-foreground shadow-glow transition hover:scale-105"
          >
            Start the Dragon Quiz →
          </Link>
        </div>
      </section>
    </>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 text-center">
      <div className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">{eyebrow}</div>
      <h2 className="font-display text-3xl font-black sm:text-5xl">
        <span className="text-gradient-magic">{title}</span>
      </h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
