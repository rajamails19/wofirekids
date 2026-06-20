import { createFileRoute } from "@tanstack/react-router";
import { TRIBES, type TribeSlug } from "@/lib/dragons";
import { useEffect, useState } from "react";
import { Save, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Create Your Dragon — DragonHub" },
      {
        name: "description",
        content: "Design your very own dragon — tribe, colors, wings, horns, powers and name.",
      },
    ],
  }),
  component: BuilderPage,
});

const WINGS = ["Broad & feathered", "Sleek & sharp", "Spiked & strong", "Iridescent"];
const HORNS = ["Curved", "Straight", "Branching", "Crowned"];
const TAILS = ["Spike tip", "Fin tip", "Forked", "Smooth"];
const ABILITIES = [
  "Fire breath",
  "Frost breath",
  "Bioluminescence",
  "Color-shift",
  "Mind-reading",
  "Super strength",
  "Venom",
];
const EYE_COLORS = ["Amber", "Emerald", "Sapphire", "Violet", "Ruby"];
const BODY_COLORS = ["Crimson", "Sapphire", "Emerald", "Gold", "Violet", "Onyx", "Ivory"];

interface Dragon {
  name: string;
  tribe: TribeSlug;
  body: string;
  wing: string;
  horn: string;
  tail: string;
  ability: string;
  eye: string;
}

const DEFAULT: Dragon = {
  name: "",
  tribe: "skywing",
  body: "Crimson",
  wing: WINGS[0],
  horn: HORNS[0],
  tail: TAILS[0],
  ability: ABILITIES[0],
  eye: EYE_COLORS[0],
};

function BuilderPage() {
  const [d, setD] = useState<Dragon>(DEFAULT);
  const [saved, setSaved] = useState<Dragon[]>([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("wof-dragons");
    if (raw)
      try {
        setSaved(JSON.parse(raw));
      } catch (error) {
        console.warn("Unable to load saved dragons.", error);
      }
  }, []);

  const tribe = TRIBES.find((t) => t.slug === d.tribe)!;

  const save = () => {
    if (!d.name.trim()) {
      setToast("Give your dragon a name first!");
      setTimeout(() => setToast(""), 2000);
      return;
    }
    const next = [...saved, d];
    setSaved(next);
    localStorage.setItem("wof-dragons", JSON.stringify(next));
    setToast(`${d.name} the ${tribe.name.replace(/s$/, "")} is saved!`);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="text-center">
        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
          Dragon Builder
        </div>
        <h1 className="font-display text-4xl font-black sm:text-6xl">
          <span className="text-gradient-magic">Create Your Dragon</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Customize every detail and bring your dragon to life.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <Field label="Dragon name">
            <input
              value={d.name}
              onChange={(e) => setD({ ...d, name: e.target.value })}
              placeholder="e.g. Emberglow"
              className="h-14 w-full rounded-2xl border border-border/60 bg-card px-5 text-lg font-display font-bold shadow-magic outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>

          <Field label="Tribe">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {TRIBES.map((t) => (
                <button
                  key={t.slug}
                  onClick={() => setD({ ...d, tribe: t.slug })}
                  className={`rounded-2xl border-2 p-3 text-left transition ${d.tribe === t.slug ? "border-primary shadow-glow" : "border-border/60 hover:border-primary/50"}`}
                  style={
                    d.tribe === t.slug
                      ? { background: `color-mix(in oklab, var(--${t.colorVar}) 20%, var(--card))` }
                      : undefined
                  }
                >
                  <div className="text-xl">{t.emoji}</div>
                  <div className="mt-1 text-xs font-bold">{t.name}</div>
                </button>
              ))}
            </div>
          </Field>

          <ChipField
            label="Body color"
            value={d.body}
            options={BODY_COLORS}
            onChange={(v) => setD({ ...d, body: v })}
          />
          <ChipField
            label="Wing style"
            value={d.wing}
            options={WINGS}
            onChange={(v) => setD({ ...d, wing: v })}
          />
          <ChipField
            label="Horn type"
            value={d.horn}
            options={HORNS}
            onChange={(v) => setD({ ...d, horn: v })}
          />
          <ChipField
            label="Tail type"
            value={d.tail}
            options={TAILS}
            onChange={(v) => setD({ ...d, tail: v })}
          />
          <ChipField
            label="Special ability"
            value={d.ability}
            options={ABILITIES}
            onChange={(v) => setD({ ...d, ability: v })}
          />
          <ChipField
            label="Eye color"
            value={d.eye}
            options={EYE_COLORS}
            onChange={(v) => setD({ ...d, eye: v })}
          />

          <div className="flex flex-wrap gap-3">
            <button
              onClick={save}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-magic px-6 py-3 font-bold text-primary-foreground shadow-magic"
            >
              <Save className="h-4 w-4" /> Save dragon
            </button>
            <button
              onClick={() => setD(DEFAULT)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 font-bold"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <DragonCard
            d={d}
            tribeName={tribe.name}
            colorVar={tribe.colorVar}
            glowVar={tribe.glowVar}
          />
        </div>
      </div>

      {saved.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-4 font-display text-2xl font-bold">
            <span className="text-gradient-magic">Your hatchlings</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((s, i) => {
              const t = TRIBES.find((x) => x.slug === s.tribe)!;
              return (
                <DragonCard
                  key={i}
                  d={s}
                  tribeName={t.name}
                  colorVar={t.colorVar}
                  glowVar={t.glowVar}
                  compact
                />
              );
            })}
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed inset-x-0 bottom-6 z-50 mx-auto w-fit rounded-full bg-gradient-magic px-6 py-3 font-bold text-primary-foreground shadow-magic animate-fade-up">
          {toast}
        </div>
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

function ChipField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <Field label={label}>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${value === o ? "border-primary bg-primary text-primary-foreground" : "border-border/60 bg-card hover:border-primary/50"}`}
          >
            {o}
          </button>
        ))}
      </div>
    </Field>
  );
}

function DragonCard({
  d,
  tribeName,
  colorVar,
  glowVar,
  compact,
}: {
  d: Dragon;
  tribeName: string;
  colorVar: string;
  glowVar: string;
  compact?: boolean;
}) {
  return (
    <div
      className="overflow-hidden rounded-[2rem] border-2 border-white/20 p-6 text-white shadow-magic"
      style={{ background: `linear-gradient(160deg, var(--${colorVar}), var(--${glowVar}))` }}
    >
      <div
        className={`mx-auto grid place-items-center rounded-2xl bg-white/15 backdrop-blur ${compact ? "aspect-square text-6xl" : "aspect-square w-full text-8xl"}`}
      >
        🐉
      </div>
      <div className="mt-4">
        <div className="text-xs font-bold uppercase tracking-widest opacity-80">{tribeName}</div>
        <h3 className="font-display text-3xl font-black">{d.name || "Unnamed Dragon"}</h3>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <Stat label="Body" v={d.body} />
          <Stat label="Eyes" v={d.eye} />
          <Stat label="Wings" v={d.wing} />
          <Stat label="Horns" v={d.horn} />
          <Stat label="Tail" v={d.tail} />
          <Stat label="Power" v={d.ability} />
        </div>
      </div>
    </div>
  );
}
function Stat({ label, v }: { label: string; v: string }) {
  return (
    <div className="rounded-xl bg-white/15 px-2.5 py-1.5 backdrop-blur">
      <div className="text-[10px] font-bold uppercase opacity-80">{label}</div>
      <div className="truncate font-semibold">{v}</div>
    </div>
  );
}
