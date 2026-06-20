import { createFileRoute, Link } from "@tanstack/react-router";
import { TRIBES, type TribeSlug } from "@/lib/dragons";
import { useState } from "react";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "What Dragon Are You? — DragonHub" },
      {
        name: "description",
        content: "Answer 10 magical questions to discover which dragon tribe matches your heart.",
      },
    ],
  }),
  component: QuizPage,
});

interface Q {
  q: string;
  options: { label: string; tribe: TribeSlug }[];
}

const QUESTIONS: Q[] = [
  {
    q: "Where would you rather live?",
    options: [
      { label: "On a mountain peak", tribe: "skywing" },
      { label: "Under the ocean", tribe: "seawing" },
      { label: "In a rainforest canopy", tribe: "rainwing" },
      { label: "In a starry cave", tribe: "nightwing" },
    ],
  },
  {
    q: "How do you solve a tough problem?",
    options: [
      { label: "Think it through", tribe: "nightwing" },
      { label: "Charge in bravely", tribe: "skywing" },
      { label: "Ask my family", tribe: "mudwing" },
      { label: "Look for a clever trick", tribe: "sandwing" },
    ],
  },
  {
    q: "Your greatest strength?",
    options: [
      { label: "Wisdom", tribe: "nightwing" },
      { label: "Strength", tribe: "mudwing" },
      { label: "Speed", tribe: "skywing" },
      { label: "Kindness", tribe: "rainwing" },
    ],
  },
  {
    q: "Pick a treasure",
    options: [
      { label: "A glowing pearl", tribe: "seawing" },
      { label: "A crystal of ice", tribe: "icewing" },
      { label: "A golden coin", tribe: "sandwing" },
      { label: "A starlit scroll", tribe: "nightwing" },
    ],
  },
  {
    q: "Weekend plans?",
    options: [
      { label: "Sun-time nap", tribe: "rainwing" },
      { label: "Aerial races", tribe: "skywing" },
      { label: "Star-gazing", tribe: "nightwing" },
      { label: "Swimming with friends", tribe: "seawing" },
    ],
  },
  {
    q: "Pick a snack",
    options: [
      { label: "Tropical fruit", tribe: "rainwing" },
      { label: "Snowberry pie", tribe: "icewing" },
      { label: "Spicy desert figs", tribe: "sandwing" },
      { label: "Warm swamp stew", tribe: "mudwing" },
    ],
  },
  {
    q: "Friends would describe you as…",
    options: [
      { label: "Loyal", tribe: "mudwing" },
      { label: "Curious", tribe: "nightwing" },
      { label: "Cheerful", tribe: "rainwing" },
      { label: "Brave", tribe: "skywing" },
    ],
  },
  {
    q: "Favorite weather?",
    options: [
      { label: "Sunny and warm", tribe: "sandwing" },
      { label: "Snowy and quiet", tribe: "icewing" },
      { label: "Misty rainforest", tribe: "rainwing" },
      { label: "Wild ocean storm", tribe: "seawing" },
    ],
  },
  {
    q: "Your dream power?",
    options: [
      { label: "Read the stars", tribe: "nightwing" },
      { label: "Glow in the dark", tribe: "seawing" },
      { label: "Change colors", tribe: "rainwing" },
      { label: "Breathe frost", tribe: "icewing" },
    ],
  },
  {
    q: "Best way to spend an evening?",
    options: [
      { label: "Family dinner", tribe: "mudwing" },
      { label: "Adventure with friends", tribe: "skywing" },
      { label: "Reading a great story", tribe: "nightwing" },
      { label: "Watching the sunset", tribe: "sandwing" },
    ],
  },
];

export default function _() {}

function QuizPage() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const choose = (tribe: TribeSlug) => {
    const next = { ...scores, [tribe]: (scores[tribe] ?? 0) + 1 };
    setScores(next);
    if (step + 1 >= QUESTIONS.length) setDone(true);
    else setStep(step + 1);
  };

  const reset = () => {
    setStep(0);
    setScores({});
    setDone(false);
  };

  if (done) {
    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] as
      | TribeSlug
      | undefined;
    const tribe = TRIBES.find((t) => t.slug === winner) ?? TRIBES[0];

    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <div className="mb-4 text-xs font-bold uppercase tracking-widest text-accent">
          Your result
        </div>
        <h1 className="font-display text-4xl font-black sm:text-6xl">
          You are a <span className="text-gradient-magic">{tribe.name.replace(/s$/, "")}</span>!
        </h1>
        <div
          className="mx-auto mt-8 max-w-md rounded-[2rem] p-10 text-white shadow-magic"
          style={{
            background: `linear-gradient(160deg, var(--${tribe.colorVar}), var(--${tribe.glowVar}))`,
          }}
        >
          <div className="text-7xl">{tribe.emoji}</div>
          <h2 className="mt-4 font-display text-3xl font-black">{tribe.name}</h2>
          <p className="mt-3 opacity-95">{tribe.tagline}</p>
        </div>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">{tribe.description}</p>

        <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
              Strengths
            </div>
            <div className="flex flex-wrap gap-2">
              {tribe.personality.map((p) => (
                <span key={p} className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold">
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
              Powers
            </div>
            <div className="flex flex-wrap gap-2">
              {tribe.powers.map((p) => (
                <span key={p} className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/tribes/$slug"
            params={{ slug: tribe.slug }}
            className="rounded-full bg-gradient-magic px-6 py-3 font-bold text-primary-foreground shadow-magic"
          >
            Read about {tribe.name}
          </Link>
          <button
            onClick={reset}
            className="rounded-full border border-border bg-card px-6 py-3 font-bold"
          >
            Take it again
          </button>
          <button
            onClick={() =>
              navigator
                .share?.({ title: "Wings of Fire", text: `I'm a ${tribe.name.replace(/s$/, "")}!` })
                .catch(() => {})
            }
            className="rounded-full border border-border bg-card px-6 py-3 font-bold"
          >
            Share result
          </button>
        </div>
      </div>
    );
  }

  const current = QUESTIONS[step];
  const progress = (step / QUESTIONS.length) * 100;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="text-center">
        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
          Question {step + 1} of {QUESTIONS.length}
        </div>
        <div className="mx-auto h-2 max-w-md overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-gradient-magic transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h1
        className="mt-8 text-center font-display text-3xl font-black sm:text-4xl animate-fade-up"
        key={step}
      >
        {current.q}
      </h1>

      <div className="mt-8 grid gap-3">
        {current.options.map((o, i) => (
          <button
            key={o.label + i}
            onClick={() => choose(o.tribe)}
            className="card-tilt rounded-2xl border border-border/60 bg-card p-5 text-left font-semibold shadow-magic transition hover:border-primary"
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
