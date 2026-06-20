import { createFileRoute, Link } from "@tanstack/react-router";
import { Particles } from "@/components/Particles";
import { Starfield } from "@/components/Starfield";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/moons")({
  head: () => ({
    meta: [
      { title: "The Three Moons — Wings of Fire Adventure" },
      { name: "description", content: "A cinematic NightWing observatory under three moons." },
    ],
  }),
  component: MoonsPage,
});

// Draco-like constellation (decorative)
const CONSTELLATIONS = [
  {
    id: "dragon",
    label: "The Dragon",
    points: [
      [12, 28],
      [22, 22],
      [32, 30],
      [42, 24],
      [52, 32],
      [60, 26],
      [70, 36],
      [78, 30],
      [86, 40],
    ] as [number, number][],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
    ] as [number, number][],
  },
  {
    id: "egg",
    label: "The Egg",
    points: [
      [18, 70],
      [28, 64],
      [40, 62],
      [50, 68],
      [44, 78],
      [30, 78],
    ] as [number, number][],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
    ] as [number, number][],
  },
  {
    id: "scroll",
    label: "The Scroll",
    points: [
      [60, 64],
      [72, 60],
      [84, 66],
      [88, 78],
      [76, 82],
      [64, 76],
    ] as [number, number][],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
    ] as [number, number][],
  },
];

const PROPHECIES = [
  "When the war has lasted twenty years…",
  "…the dragonets will come.",
  "Five eggs to hatch on brightest night.",
  "Wings of night shall come to you.",
  "The lost city of night shall rise again.",
];

function MoonsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const p = (factor: number) => `translate3d(0, ${scrollY * factor}px, 0)`;

  return (
    <div className="bg-black text-white">
      {/* ───── HERO: cinematic three-moon sky ───── */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden"
        style={{ minHeight: "min(108vh, 1100px)" }}
      >
        {/* Sky gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 18%, #4c3aa0 0%, #251b5f 35%, #0c0a26 70%, #04030d 100%)",
          }}
        />

        {/* Aurora ribbons */}
        <div className="absolute inset-0 mix-blend-screen opacity-60">
          <div
            className="animate-aurora absolute -left-1/4 top-[18%] h-40 w-[150%] blur-3xl"
            style={{
              background:
                "linear-gradient(90deg, transparent, #6a4af0 30%, #2eb6c8 60%, transparent)",
            }}
          />
          <div
            className="animate-aurora absolute -left-1/4 top-[34%] h-32 w-[150%] blur-3xl"
            style={{
              animationDelay: "-7s",
              background:
                "linear-gradient(90deg, transparent, #b06ef0 40%, #5a83ff 70%, transparent)",
            }}
          />
        </div>

        {/* Stars + constellations parallax */}
        <div className="absolute inset-0 parallax-slow" style={{ transform: p(-0.15) }}>
          <Starfield count={180} />
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            {CONSTELLATIONS.map((c) => (
              <g key={c.id} className="constellation">
                {c.edges.map(([a, b], i) => (
                  <line
                    key={i}
                    x1={c.points[a][0]}
                    y1={c.points[a][1]}
                    x2={c.points[b][0]}
                    y2={c.points[b][1]}
                  />
                ))}
                {c.points.map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="0.45" fill="white" opacity="0.9" />
                ))}
              </g>
            ))}
          </svg>
        </div>

        {/* Three moons */}
        <div className="absolute inset-0 parallax-slow" style={{ transform: p(-0.05) }}>
          {/* small left */}
          <div className="absolute left-[14%] top-[16%]">
            <div className="relative h-20 w-20 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff,#cfd0e8_55%,#7d7fb0_100%)] shadow-[0_0_80px_30px_rgba(190,200,255,.25)]" />
          </div>
          {/* huge center */}
          <div className="absolute left-1/2 top-[6%] -translate-x-1/2">
            <div className="relative h-[340px] w-[340px] sm:h-[440px] sm:w-[440px]">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_38%_32%,#fff,#e8e6fb_45%,#a59edd_75%,#3d3470_100%)] shadow-[0_0_160px_60px_rgba(190,180,255,.35)]" />
              {/* craters */}
              <span className="absolute left-[28%] top-[40%] h-6 w-6 rounded-full bg-black/15" />
              <span className="absolute left-[58%] top-[30%] h-3 w-3 rounded-full bg-black/15" />
              <span className="absolute left-[48%] top-[62%] h-8 w-10 rounded-full bg-black/15" />
              <span className="absolute left-[68%] top-[58%] h-4 w-4 rounded-full bg-black/15" />
              {/* glow ring */}
              <div className="absolute -inset-10 rounded-full border border-white/10" />
              <div className="absolute -inset-20 rounded-full border border-white/5" />
            </div>
          </div>
          {/* small right */}
          <div className="absolute right-[12%] top-[20%]">
            <div className="relative h-16 w-16 rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff,#d2cff0_55%,#7a72b0_100%)] shadow-[0_0_70px_25px_rgba(190,180,255,.22)]" />
          </div>
        </div>

        {/* Moonlight beams */}
        <div className="absolute inset-x-0 top-[26%] flex justify-center pointer-events-none">
          <div className="relative h-[80vh] w-[80%]">
            <div className="animate-beam absolute left-[18%] top-0 h-full w-[180px] origin-top bg-[linear-gradient(to_bottom,rgba(220,220,255,.45),transparent_75%)] rotate-[8deg] blur-md" />
            <div
              className="animate-beam absolute left-1/2 top-0 h-full w-[300px] -translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(230,225,255,.55),transparent_70%)] blur-lg"
              style={{ animationDelay: "-2s" }}
            />
            <div
              className="animate-beam absolute right-[18%] top-0 h-full w-[180px] origin-top bg-[linear-gradient(to_bottom,rgba(220,220,255,.45),transparent_75%)] -rotate-[8deg] blur-md"
              style={{ animationDelay: "-4s" }}
            />
          </div>
        </div>

        {/* Distant mountain silhouettes — parallax mid */}
        <svg
          viewBox="0 0 1600 600"
          preserveAspectRatio="none"
          className="absolute bottom-[28%] left-0 h-[36%] w-full parallax-slow"
          style={{ transform: p(0.08) }}
        >
          <path
            d="M0 600 L0 420 L120 320 L220 380 L340 240 L460 360 L580 280 L720 380 L860 260 L1000 360 L1140 300 L1280 380 L1400 280 L1520 360 L1600 320 L1600 600 Z"
            fill="#1a1740"
            opacity="0.85"
          />
        </svg>
        <svg
          viewBox="0 0 1600 600"
          preserveAspectRatio="none"
          className="absolute bottom-[20%] left-0 h-[34%] w-full parallax-slow"
          style={{ transform: p(0.14) }}
        >
          <path
            d="M0 600 L0 500 L160 360 L300 460 L440 320 L600 460 L760 360 L920 480 L1080 340 L1240 460 L1400 360 L1560 480 L1600 460 L1600 600 Z"
            fill="#0d0b28"
          />
        </svg>

        {/* Observatory ruins + dragon statues */}
        <div
          className="absolute bottom-0 left-0 right-0 parallax-slow"
          style={{ transform: p(0.22) }}
        >
          <svg viewBox="0 0 1600 400" preserveAspectRatio="none" className="block h-[40vh] w-full">
            {/* ground */}
            <path
              d="M0 400 L0 320 C200 280 400 290 800 300 C1200 310 1400 280 1600 320 L1600 400 Z"
              fill="#06050f"
            />
            {/* observatory pillars */}
            <g fill="#0a0820" stroke="#1a1738" strokeWidth="1">
              <rect x="280" y="160" width="22" height="160" rx="3" />
              <rect x="332" y="140" width="22" height="180" rx="3" />
              <rect x="384" y="160" width="22" height="160" rx="3" />
              <path d="M268 160 L418 160 L406 140 L280 140 Z" />
              {/* dome */}
              <ellipse cx="343" cy="120" rx="100" ry="38" />
              <rect x="338" y="60" width="10" height="60" />
              <circle cx="343" cy="58" r="6" fill="#dcd5ff" />
            </g>
            {/* right pillars */}
            <g fill="#0a0820" stroke="#1a1738" strokeWidth="1">
              <rect x="1180" y="180" width="20" height="140" rx="3" />
              <rect x="1230" y="170" width="20" height="150" rx="3" />
              <rect x="1280" y="180" width="20" height="140" rx="3" />
              <path d="M1170 180 L1310 180 L1300 162 L1180 162 Z" />
            </g>
            {/* dragon statue left */}
            <g transform="translate(120 200)" fill="#0a0822">
              <ellipse cx="80" cy="120" rx="90" ry="10" opacity=".6" />
              <path d="M0 110 C10 60 50 30 90 40 C110 30 130 40 140 60 C120 70 110 80 110 95 C140 100 170 115 200 130 C150 140 110 138 80 130 C50 150 20 160 -10 170 C-5 145 -2 125 0 110 Z" />
              <path d="M30 100 C-10 85 -40 60 -60 30 C-10 50 25 70 55 90 Z" />
              <circle cx="120" cy="55" r="3" fill="#c8c2ff" />
            </g>
            {/* dragon statue right */}
            <g transform="translate(1380 210) scale(-1 1)" fill="#0a0822">
              <ellipse cx="80" cy="110" rx="90" ry="10" opacity=".6" />
              <path d="M0 100 C10 55 50 25 90 36 C110 26 130 36 140 56 C120 66 110 75 110 90 C140 95 170 110 200 125 C150 135 110 132 80 124 C50 144 20 154 -10 164 C-5 140 -2 120 0 100 Z" />
              <circle cx="120" cy="50" r="3" fill="#c8c2ff" />
            </g>
            {/* stone altar */}
            <g transform="translate(740 250)">
              <rect x="0" y="40" width="120" height="40" rx="4" fill="#100c2a" />
              <rect x="10" y="20" width="100" height="20" rx="4" fill="#171436" />
            </g>
          </svg>
        </div>

        {/* Glowing dragon egg on altar */}
        <div className="absolute left-1/2 bottom-[18%] -translate-x-1/2 z-[2]">
          <div className="relative h-40 w-28 sm:h-52 sm:w-36">
            <div className="absolute inset-x-0 -bottom-6 mx-auto h-6 w-32 rounded-full bg-violet-300/40 blur-2xl" />
            <div className="absolute inset-0 rounded-[50%_50%_45%_45%/55%_55%_45%_45%] bg-[radial-gradient(circle_at_38%_30%,#fffdf6,#dccaff_45%,#7e62d4_80%,#2a1c5a_100%)] shadow-[0_0_60px_15px_rgba(190,170,255,.4)]" />
            <div
              className="absolute inset-0 rounded-[50%_50%_45%_45%/55%_55%_45%_45%] opacity-50"
              style={{
                background:
                  "repeating-linear-gradient(45deg, transparent 0 8px, rgba(255,255,255,.08) 8px 9px)",
              }}
            />
            {/* ripples */}
            <span
              className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-200/40"
              style={{ animation: "ripple 4s ease-out infinite" }}
            />
            <span
              className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-200/40"
              style={{ animation: "ripple 4s ease-out infinite", animationDelay: "2s" }}
            />
          </div>
        </div>

        {/* Fog */}
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(to_top,rgba(4,3,13,1),transparent)]" />
        <div className="fog-layer opacity-40" />

        {/* Floating prophecy whispers */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {PROPHECIES.map((line, i) => (
            <span
              key={i}
              className="absolute font-display text-xs sm:text-sm italic tracking-wide text-violet-100/80"
              style={{
                left: `${10 + i * 18}%`,
                bottom: "12%",
                animation: `float-up 14s ease-in infinite`,
                animationDelay: `${i * 2.6}s`,
                textShadow: "0 0 12px rgba(180,170,255,.7)",
              }}
            >
              ✦ {line}
            </span>
          ))}
        </div>

        <Particles count={26} color="rgba(220,210,255,.95)" />

        {/* Hero title */}
        <div className="relative z-10 mx-auto flex min-h-[108vh] max-w-5xl flex-col items-center justify-end px-4 pb-24 pt-32 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.4em] text-violet-100/90 backdrop-blur">
            ✦ NightWing Observatory ✦
          </div>
          <h1 className="font-display text-6xl font-black leading-[1] drop-shadow-[0_6px_40px_rgba(120,100,255,.6)] sm:text-8xl">
            The Three Moons
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/75 sm:text-lg">
            Three moons rise over Pyrrhia. Under their light, prophecy is whispered, minds are
            heard, and destiny is read in the stars.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/55">
            <span>Scroll to read the sky</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </section>

      {/* ───── ACT II — Moon phases as cinematic chambers ───── */}
      <section
        className="relative isolate overflow-hidden bg-[#06050f]"
        style={{ minHeight: "100vh" }}
      >
        <Starfield count={80} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(120,90,220,.25),transparent_55%)]" />

        <div className="relative mx-auto max-w-6xl px-4 py-24">
          <div className="text-center">
            <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-violet-200/80">
              Sacred Chambers
            </div>
            <h2 className="mt-3 font-display text-4xl font-black sm:text-6xl">
              <span className="text-gradient-magic">Born Beneath the Moons</span>
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((n) => (
              <div
                key={n}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-violet-950/40 to-black/60 p-6 shadow-magic transition hover:-translate-y-2"
                style={{ minHeight: 360 }}
              >
                <div className="pointer-events-none absolute inset-0 opacity-40 transition group-hover:opacity-100">
                  <div className="absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-violet-400/30 blur-3xl" />
                </div>
                {/* moons */}
                <div className="relative flex h-32 items-end justify-center gap-3">
                  {[0, 1, 2].map((i) => {
                    const lit = i < n;
                    return (
                      <div
                        key={i}
                        className={`h-12 w-12 rounded-full transition-all duration-700 ${
                          lit
                            ? "bg-[radial-gradient(circle_at_35%_30%,#fff,#cbb8ff_60%,#5a3fa0_100%)] shadow-[0_0_30px_8px_rgba(190,170,255,.55)]"
                            : "border border-white/15 bg-black/30"
                        }`}
                        style={{ transitionDelay: `${i * 120}ms` }}
                      />
                    );
                  })}
                </div>
                <div className="relative mt-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-violet-200/80">
                    {n} {n === 1 ? "Moon" : "Moons"}
                  </div>
                  <div className="mt-2 font-display text-2xl font-black">
                    {["Silent Sky", "First Gift", "Twin Light", "Triple Crown"][n]}
                  </div>
                  <p className="mt-3 text-sm text-white/65">
                    {
                      [
                        "A new NightWing hatches beneath an empty sky.",
                        "One moon-given gift awakens with the dragonet.",
                        "Two gifts braided together at the same hatch.",
                        "Three moons — the rarest, most powerful birth of all.",
                      ][n]
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/abilities"
              className="inline-flex items-center gap-2 rounded-full border border-violet-300/30 bg-white/5 px-7 py-3 text-xs font-bold uppercase tracking-[0.3em] backdrop-blur transition hover:bg-white/15"
            >
              ✦ Enter the Lands of Power ✦
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
