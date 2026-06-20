import { createFileRoute, Link } from "@tanstack/react-router";
import { TRIBES, type Tribe, type TribeSlug } from "@/lib/dragons";
import { CanonBackdrop } from "@/components/CanonBackdrop";
import { Particles } from "@/components/Particles";
import { Starfield } from "@/components/Starfield";

export const Route = createFileRoute("/abilities")({
  head: () => ({
    meta: [
      { title: "Lands of Power — Wings of Fire Adventure" },
      {
        name: "description",
        content: "An immersive journey through every dragon tribe's homeland.",
      },
    ],
  }),
  component: AbilitiesPage,
});

/* Per-tribe atmospheric overlays — pure visual flavour layered on top of CanonBackdrop */
function TribeAtmosphere({ slug }: { slug: TribeSlug }) {
  switch (slug) {
    case "nightwing":
      return (
        <>
          <Starfield count={60} />
          <div className="absolute left-[20%] top-[12%] h-16 w-16 rounded-full bg-[radial-gradient(circle,#fff,#cdc6ff_60%,#5a3fa0)] shadow-[0_0_60px_rgba(190,170,255,.6)]" />
          <div className="absolute left-1/2 top-[8%] h-24 w-24 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#fff,#e0d8ff_60%,#5a3fa0)] shadow-[0_0_80px_rgba(190,170,255,.7)]" />
          <div className="absolute right-[20%] top-[14%] h-12 w-12 rounded-full bg-[radial-gradient(circle,#fff,#cdc6ff_60%,#5a3fa0)] shadow-[0_0_50px_rgba(190,170,255,.6)]" />
        </>
      );
    case "seawing":
      return (
        <>
          {/* bioluminescent rays */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(180deg,rgba(140,255,240,.18),transparent)] mix-blend-screen" />
          {/* light shafts */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-beam absolute top-0 h-full w-24 bg-[linear-gradient(to_bottom,rgba(180,255,250,.4),transparent_75%)] blur-xl"
              style={{
                left: `${15 + i * 22}%`,
                animationDelay: `${i * -1.7}s`,
                transform: "rotate(8deg)",
              }}
            />
          ))}
          <Particles count={28} color="rgba(180,255,250,.95)" />
        </>
      );
    case "rainwing":
      return (
        <>
          <div
            className="absolute inset-0 animate-color-shift mix-blend-overlay opacity-50"
            style={{ background: "linear-gradient(120deg,#ff6ec7,#ffd86e,#7afff0,#a070ff)" }}
          />
          {/* falling petals */}
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-lg"
              style={{
                left: `${(i * 73) % 100}%`,
                top: "-10%",
                animation: `float-particle ${10 + (i % 6)}s linear infinite`,
                animationDelay: `${-i * 0.8}s`,
                color: ["#ff8ad9", "#ffd166", "#7afff0", "#b388ff"][i % 4],
                textShadow: "0 0 8px currentColor",
              }}
            >
              ✿
            </span>
          ))}
        </>
      );
    case "icewing":
      return (
        <>
          {/* aurora */}
          <div
            className="absolute inset-x-0 top-[12%] h-40 animate-aurora mix-blend-screen blur-3xl"
            style={{
              background: "linear-gradient(90deg,transparent,#7afff0 30%,#7a9bff 70%,transparent)",
            }}
          />
          <Particles count={36} color="rgba(220,240,255,.95)" />
        </>
      );
    case "skywing":
      return (
        <>
          {/* embers */}
          {Array.from({ length: 22 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full"
              style={{
                left: `${(i * 53) % 100}%`,
                bottom: "-2%",
                background: ["#ff6a2a", "#ffb347", "#ffd166"][i % 3],
                boxShadow: "0 0 10px currentColor",
                animation: `float-particle ${8 + (i % 6)}s linear infinite`,
                animationDelay: `${-i * 0.5}s`,
              }}
            />
          ))}
          <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,120,40,.35),transparent_55%)]" />
        </>
      );
    case "sandwing":
      return (
        <>
          {/* sandstorm streaks */}
          <div
            className="absolute inset-0 opacity-50 mix-blend-overlay"
            style={{
              background:
                "repeating-linear-gradient(75deg, transparent 0 14px, rgba(255,220,150,.18) 14px 16px)",
              animation: "fog-drift 14s ease-in-out infinite alternate",
            }}
          />
          {/* sun glare */}
          <div className="absolute left-1/2 top-[16%] h-40 w-40 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#fff5c8,transparent_65%)] blur-2xl" />
        </>
      );
    case "mudwing":
      return (
        <>
          {/* fireflies */}
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-amber-200 animate-twinkle"
              style={{
                left: `${(i * 41) % 100}%`,
                top: `${30 + ((i * 17) % 50)}%`,
                animationDelay: `${(i * 0.3) % 4}s`,
                boxShadow: "0 0 10px #ffd97a",
              }}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(to_top,rgba(80,55,30,.6),transparent)]" />
        </>
      );
    case "silkwing":
      return (
        <>
          {/* floating lanterns */}
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-3 w-3 rounded-full"
              style={{
                left: `${10 + i * 11}%`,
                top: `${40 + ((i * 13) % 30)}%`,
                background: "#ffd28a",
                boxShadow: "0 0 18px #ffb070, 0 0 40px #ff8ad988",
                animation: `float-particle ${14 + (i % 4)}s linear infinite`,
                animationDelay: `${-i * 1.2}s`,
              }}
            />
          ))}
          {/* silk threads */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <path
                key={i}
                d={`M${i * 18} 0 Q ${i * 18 + 10} 50 ${i * 18 + 4} 100`}
                stroke="rgba(255,220,240,.25)"
                fill="none"
                strokeWidth="0.2"
              />
            ))}
          </svg>
        </>
      );
    case "hivewing":
      return (
        <>
          {/* hex grid */}
          <div
            className="absolute inset-0 opacity-35 mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,200,80,.4) 1px, transparent 1.5px)",
              backgroundSize: "26px 26px",
            }}
          />
          {/* amber glow */}
          <div className="absolute inset-x-0 top-[24%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(255,180,50,.35),transparent_60%)]" />
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-[10px] text-amber-200/80"
              style={{
                left: `${(i * 61) % 100}%`,
                top: `${(i * 47) % 100}%`,
                animation: `float-particle ${6 + (i % 5)}s linear infinite`,
                animationDelay: `${-i * 0.4}s`,
                textShadow: "0 0 8px #ffb347",
              }}
            >
              ✦
            </span>
          ))}
        </>
      );
    case "leafwing":
      return (
        <>
          {/* sun rays through canopy */}
          <div
            className="absolute inset-0 mix-blend-screen opacity-50"
            style={{
              background:
                "repeating-linear-gradient(95deg, transparent 0 30px, rgba(220,255,180,.2) 30px 34px)",
            }}
          />
          {/* falling leaves */}
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-base"
              style={{
                left: `${(i * 67) % 100}%`,
                top: "-8%",
                color: "#a5e36b",
                textShadow: "0 0 8px #6cce4a",
                animation: `float-particle ${10 + (i % 6)}s linear infinite`,
                animationDelay: `${-i * 0.7}s`,
                transform: "rotate(20deg)",
              }}
            >
              ❦
            </span>
          ))}
        </>
      );
  }
}

const TRIBE_THEME_NOTES: Record<TribeSlug, { eyebrow: string; word: string }> = {
  nightwing: { eyebrow: "Realm of Shadows", word: "Whispers" },
  seawing: { eyebrow: "Realm of Tides", word: "Currents" },
  rainwing: { eyebrow: "Realm of Color", word: "Bloom" },
  icewing: { eyebrow: "Realm of Frost", word: "Auroras" },
  skywing: { eyebrow: "Realm of Flame", word: "Embers" },
  sandwing: { eyebrow: "Realm of Sun", word: "Mirage" },
  mudwing: { eyebrow: "Realm of Marsh", word: "Fireflies" },
  silkwing: { eyebrow: "Realm of Silk", word: "Lanterns" },
  hivewing: { eyebrow: "Realm of Amber", word: "Hive" },
  leafwing: { eyebrow: "Realm of Leaves", word: "Canopy" },
};

function TribeLand({ tribe, index }: { tribe: Tribe; index: number }) {
  const theme = TRIBE_THEME_NOTES[tribe.slug];
  const flip = index % 2 === 1;
  return (
    <section
      className="relative isolate overflow-hidden"
      style={{ minHeight: "min(100vh, 920px)" }}
    >
      <CanonBackdrop tribe={tribe.slug} />
      <TribeAtmosphere slug={tribe.slug} />
      <div className="fog-layer opacity-30" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,.6)_100%)]" />

      <div
        className={`relative z-10 mx-auto flex min-h-[100vh] max-w-6xl items-end px-6 pb-20 pt-28 ${flip ? "justify-end text-right" : "justify-start text-left"}`}
      >
        <div className="max-w-xl text-white">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.35em] backdrop-blur">
            {tribe.emoji} {theme.eyebrow}
          </div>
          <h2 className="font-display text-6xl font-black leading-[1] drop-shadow-[0_10px_40px_rgba(0,0,0,.6)] sm:text-8xl">
            {tribe.name}
          </h2>
          <div className="mt-3 font-display text-2xl italic text-white/75">{theme.word}</div>

          {/* sigil chips — minimal text */}
          <div className={`mt-8 flex flex-wrap gap-2 ${flip ? "justify-end" : ""}`}>
            {tribe.abilities.slice(0, 3).map((a) => (
              <span
                key={a}
                className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] backdrop-blur"
              >
                ✦ {a.split("(")[0].trim()}
              </span>
            ))}
          </div>

          <Link
            to="/tribes/$slug"
            params={{ slug: tribe.slug }}
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white/15 px-6 py-3 text-xs font-bold uppercase tracking-[0.3em] backdrop-blur transition hover:bg-white/25"
          >
            Enter the {tribe.name.replace(/s$/, "")} realm
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* edge fade into next chapter */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_bottom,transparent,#04030d)]" />
    </section>
  );
}

function AbilitiesPage() {
  return (
    <div className="bg-[#04030d] text-white">
      {/* Intro */}
      <section className="relative isolate flex min-h-[80vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#3a2f7a_0%,#120e2e_55%,#04030d_100%)]" />
        <Starfield count={140} />
        <Particles count={20} color="rgba(220,210,255,.9)" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-violet-200/80">
            An Atlas of Power
          </div>
          <h1 className="mt-4 font-display text-6xl font-black leading-[1] sm:text-8xl">
            <span className="text-gradient-magic">Lands of Power</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/70 sm:text-lg">
            Ten tribes. Ten worlds. Step through each one and feel the magic in the air.
          </p>
          <div className="mt-10 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/55">
            Scroll to journey <span className="animate-bounce">↓</span>
          </div>
        </div>
      </section>

      {/* Tribe lands — one full screen each */}
      {TRIBES.map((tribe, i) => (
        <TribeLand key={tribe.slug} tribe={tribe} index={i} />
      ))}

      {/* Outro */}
      <section className="relative isolate overflow-hidden py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#2a1f5a,#04030d_70%)]" />
        <Starfield count={90} />
        <div className="relative z-10 mx-auto max-w-2xl px-4">
          <h2 className="font-display text-4xl font-black sm:text-6xl">
            <span className="text-gradient-magic">The Sky Awaits</span>
          </h2>
          <p className="mt-4 text-white/70">Every dragon has a destiny. Discover yours.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/moons"
              className="rounded-full border border-violet-300/30 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-[0.3em] backdrop-blur transition hover:bg-white/15"
            >
              ✦ The Three Moons
            </Link>
            <Link
              to="/map"
              className="rounded-full bg-gradient-magic px-6 py-3 text-xs font-bold uppercase tracking-[0.3em] text-primary-foreground shadow-magic transition hover:scale-105"
            >
              Open the World Map
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
