import { createFileRoute } from "@tanstack/react-router";
import { TRIBES, type TribeSlug } from "@/lib/dragons";
import { useState } from "react";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "AI Dragon Story Generator — DragonHub" },
      {
        name: "description",
        content: "Spin a magical dragon adventure with your own name, tribe and theme.",
      },
    ],
  }),
  component: StoryPage,
});

const THEMES = [
  "Lost Prophecy",
  "Hidden Treasure",
  "Stolen Egg",
  "Volcano Quest",
  "Sky Tournament",
  "Underwater Mystery",
];

interface Story {
  title: string;
  summary: string;
  chapters: { title: string; body: string }[];
  powers: string[];
  items: string[];
}

function StoryPage() {
  const [name, setName] = useState("");
  const [tribe, setTribe] = useState<TribeSlug>("nightwing");
  const [theme, setTheme] = useState(THEMES[0]);
  const [role, setRole] = useState<"hero" | "villain">("hero");
  const [level, setLevel] = useState<"Easy" | "Medium" | "Epic">("Medium");
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      const t = TRIBES.find((x) => x.slug === tribe)!;
      const heroName = name.trim() || "Dragonheart";
      const s: Story = {
        title: `${heroName} and the ${theme}`,
        summary: `A ${level.toLowerCase()} adventure where ${heroName} the ${t.name.replace(/s$/, "")} must rise as a ${role} to face the ${theme.toLowerCase()}. Wings beat. Stars shine. Magic awakens.`,
        chapters: [
          {
            title: "Chapter 1 — A Spark in the Sky",
            body: `${heroName} woke before dawn. Something was different. The wind carried whispers of the ${theme.toLowerCase()}, and ${heroName} knew the time had come to fly.`,
          },
          {
            title: "Chapter 2 — Allies and Echoes",
            body: `Across the ${t.habitat.toLowerCase()}, ${heroName} met brave friends. Together they uncovered the first clue and the first danger.`,
          },
          {
            title: "Chapter 3 — The Hidden Path",
            body: `Caves glowed. Stars shifted. ${heroName} used the ancient gift of ${t.powers[0].toLowerCase()} to slip past the guardians.`,
          },
          {
            title: "Chapter 4 — The Final Stand",
            body: `At the heart of the storm, ${heroName} faced the ${role === "hero" ? "shadow" : "guardian"}. Wings wide. Heart bright. The truth of the ${theme.toLowerCase()} was finally revealed.`,
          },
        ],
        powers: t.powers,
        items: ["Star compass", "Ember scale", "Whispering leaf", "Tide pearl"].slice(0, 3),
      };
      setStory(s);
      setLoading(false);
    }, 900);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="text-center">
        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
          Story Generator
        </div>
        <h1 className="font-display text-4xl font-black sm:text-6xl">
          <span className="text-gradient-magic">Spin a Dragon Adventure</span>
        </h1>
        <p className="mt-3 text-muted-foreground">Mix the ingredients and watch a legend appear.</p>
      </div>

      <div className="mt-10 grid gap-6 rounded-3xl border border-border/60 bg-card p-6 shadow-magic sm:grid-cols-2">
        <Input label="Dragon name" value={name} onChange={setName} placeholder="e.g. Starflare" />
        <Field label="Tribe">
          <select
            value={tribe}
            onChange={(e) => setTribe(e.target.value as TribeSlug)}
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 font-semibold"
          >
            {TRIBES.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Theme">
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 font-semibold"
          >
            {THEMES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Hero or Villain">
          <div className="flex gap-2">
            {(["hero", "villain"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 rounded-2xl border-2 py-3 font-bold capitalize ${role === r ? "border-primary bg-primary text-primary-foreground" : "border-border/60"}`}
              >
                {r}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Difficulty">
          <div className="flex gap-2">
            {(["Easy", "Medium", "Epic"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`flex-1 rounded-2xl border-2 py-3 font-bold ${level === l ? "border-primary bg-primary text-primary-foreground" : "border-border/60"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </Field>
        <div className="sm:col-span-2">
          <button
            onClick={generate}
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-magic py-4 font-bold text-primary-foreground shadow-magic disabled:opacity-60"
          >
            <Sparkles className="h-5 w-5" /> {loading ? "Weaving magic…" : "Generate my story"}
          </button>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Future-ready: API integration placeholder for live AI generation.
          </p>
        </div>
      </div>

      {story && (
        <article className="mt-12 overflow-hidden rounded-[2rem] border border-border/60 bg-card p-8 shadow-magic animate-fade-up sm:p-12">
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-accent">
              A Storybook Tale
            </div>
            <h2 className="mt-2 font-display text-3xl font-black sm:text-5xl">
              <span className="text-gradient-magic">{story.title}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl italic text-muted-foreground">"{story.summary}"</p>
          </div>

          <div className="mt-10 space-y-8">
            {story.chapters.map((c) => (
              <section key={c.title}>
                <h3 className="font-display text-xl font-bold">{c.title}</h3>
                <p className="mt-2 leading-relaxed text-foreground/90">{c.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-secondary/60 p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-accent">
                Dragon powers
              </div>
              <ul className="mt-2 space-y-1 text-sm">
                {story.powers.map((p) => (
                  <li key={p}>✦ {p}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-secondary/60 p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-accent">
                Legendary items
              </div>
              <ul className="mt-2 space-y-1 text-sm">
                {story.items.map((p) => (
                  <li key={p}>✦ {p}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}
function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <Field label={label}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-border bg-background px-4 font-semibold outline-none focus:ring-2 focus:ring-ring"
      />
    </Field>
  );
}
