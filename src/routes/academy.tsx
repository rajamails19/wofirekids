import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookOpen, Check } from "lucide-react";

export const Route = createFileRoute("/academy")({
  head: () => ({
    meta: [
      { title: "Dragon Academy — DragonHub" },
      {
        name: "description",
        content: "Learn about dragon history, powers, kingdoms, legendary battles and prophecies.",
      },
    ],
  }),
  component: AcademyPage,
});

const LESSONS = [
  {
    cat: "Dragon History",
    title: "The First Dragons",
    mins: 5,
    desc: "How seven tribes came to share one world.",
    emoji: "📜",
  },
  {
    cat: "Dragon History",
    title: "Wings of the Past",
    mins: 7,
    desc: "Famous tales from long-lost ages.",
    emoji: "🌌",
  },
  {
    cat: "Dragon Powers",
    title: "Breaths of Fire & Frost",
    mins: 4,
    desc: "Every elemental power explained.",
    emoji: "🔥",
  },
  {
    cat: "Dragon Powers",
    title: "Hidden Gifts",
    mins: 6,
    desc: "Mind-reading, prophecy and color magic.",
    emoji: "🔮",
  },
  {
    cat: "Kingdom Guides",
    title: "Map of the Seven Lands",
    mins: 5,
    desc: "Every kingdom's secrets in one quick tour.",
    emoji: "🗺️",
  },
  {
    cat: "Kingdom Guides",
    title: "Hidden Places",
    mins: 8,
    desc: "Rare locations only dragons know.",
    emoji: "🏔️",
  },
  {
    cat: "Legendary Battles",
    title: "The Storm of Stars",
    mins: 9,
    desc: "A battle remembered in every tribe.",
    emoji: "⚔️",
  },
  {
    cat: "Prophecies",
    title: "Whispers of Tomorrow",
    mins: 5,
    desc: "Reading prophecies the safe way.",
    emoji: "✨",
  },
];

const CATEGORIES = Array.from(new Set(LESSONS.map((l) => l.cat)));

function AcademyPage() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [cat, setCat] = useState<string>("All");

  useEffect(() => {
    const raw = localStorage.getItem("wof-progress");
    if (raw)
      try {
        setDone(JSON.parse(raw));
      } catch (error) {
        console.warn("Unable to load academy progress.", error);
      }
  }, []);

  const toggle = (k: string) => {
    const next = { ...done, [k]: !done[k] };
    setDone(next);
    localStorage.setItem("wof-progress", JSON.stringify(next));
  };

  const list = cat === "All" ? LESSONS : LESSONS.filter((l) => l.cat === cat);
  const completed = Object.values(done).filter(Boolean).length;
  const progress = Math.round((completed / LESSONS.length) * 100);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
          Dragon Academy
        </div>
        <h1 className="font-display text-4xl font-black sm:text-6xl">
          <span className="text-gradient-magic">Learn & Discover</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Beautiful lessons for every young dragon scholar.
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-magic">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Your reading progress
            </div>
            <div className="font-display text-2xl font-black">
              {completed} of {LESSONS.length} lessons
            </div>
          </div>
          <div className="text-3xl font-display font-black text-gradient-magic">{progress}%</div>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-gradient-magic transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {["All", ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border/60 bg-card"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((l, i) => {
          const k = `${l.cat}-${l.title}`;
          return (
            <div
              key={k}
              className="card-tilt rounded-3xl border border-border/60 bg-card p-6 shadow-magic animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-magic text-2xl text-primary-foreground shadow-glow">
                  {l.emoji}
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold">
                  {l.mins} min
                </span>
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-accent">{l.cat}</div>
              <h3 className="mt-1 font-display text-lg font-bold">{l.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{l.desc}</p>
              <button
                onClick={() => toggle(k)}
                className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${done[k] ? "bg-rainwing text-white" : "border-2 border-border bg-card hover:border-primary"}`}
              >
                {done[k] ? (
                  <>
                    <Check className="h-4 w-4" /> Completed
                  </>
                ) : (
                  <>
                    <BookOpen className="h-4 w-4" /> Mark as read
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
