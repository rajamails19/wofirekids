import { createFileRoute } from "@tanstack/react-router";
import { TRIBES, type TribeSlug } from "@/lib/dragons";
import { useEffect, useState } from "react";
import { Download, RotateCcw, Save, Wand2 } from "lucide-react";
import { trackJournalItem } from "@/lib/journal";

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

const BODY_HEX: Record<string, string> = {
  Crimson: "#dc2626",
  Sapphire: "#2563eb",
  Emerald: "#059669",
  Gold: "#d97706",
  Violet: "#7c3aed",
  Onyx: "#18181b",
  Ivory: "#f8fafc",
};

const EYE_HEX: Record<string, string> = {
  Amber: "#f59e0b",
  Emerald: "#10b981",
  Sapphire: "#38bdf8",
  Violet: "#a78bfa",
  Ruby: "#ef4444",
};

const TRIBE_HEX: Record<TribeSlug, { main: string; glow: string }> = {
  mudwing: { main: "#7c4a2d", glow: "#d39a55" },
  sandwing: { main: "#d08b24", glow: "#fde68a" },
  skywing: { main: "#dc2626", glow: "#fb923c" },
  seawing: { main: "#0284c7", glow: "#22d3ee" },
  icewing: { main: "#93c5fd", glow: "#e0f2fe" },
  rainwing: { main: "#16a34a", glow: "#f472b6" },
  nightwing: { main: "#1e1b4b", glow: "#8b5cf6" },
  silkwing: { main: "#ec4899", glow: "#f9a8d4" },
  hivewing: { main: "#ca8a04", glow: "#facc15" },
  leafwing: { main: "#15803d", glow: "#86efac" },
};

const ABILITY_STYLE: Record<string, { aura: string; glyph: string; note: string }> = {
  "Fire breath": { aura: "#fb923c", glyph: "🔥", note: "ember aura" },
  "Frost breath": { aura: "#bae6fd", glyph: "❄", note: "frost aura" },
  Bioluminescence: { aura: "#22d3ee", glyph: "✦", note: "glowing scales" },
  "Color-shift": { aura: "#f472b6", glyph: "◐", note: "rainbow shimmer" },
  "Mind-reading": { aura: "#a78bfa", glyph: "☽", note: "moon mind glow" },
  "Super strength": { aura: "#fbbf24", glyph: "◆", note: "power stance" },
  Venom: { aura: "#84cc16", glyph: "☣", note: "venom spark" },
};

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
  const abilityStyle = ABILITY_STYLE[d.ability];

  const save = () => {
    if (!d.name.trim()) {
      setToast("Give your dragon a name first!");
      setTimeout(() => setToast(""), 2000);
      return;
    }
    const next = [...saved, d];
    setSaved(next);
    localStorage.setItem("wof-dragons", JSON.stringify(next));
    trackJournalItem("visitedTribes", d.tribe);
    setToast(`${d.name} was added to your dragon collection!`);
    setTimeout(() => setToast(""), 2500);
  };

  const randomize = () => {
    const tribe = pick(TRIBES).slug;
    const next: Dragon = {
      name: d.name,
      tribe,
      body: pick(BODY_COLORS),
      wing: pick(WINGS),
      horn: pick(HORNS),
      tail: pick(TAILS),
      ability: pick(ABILITIES),
      eye: pick(EYE_COLORS),
    };
    setD(next);
  };

  const exportCard = () => {
    const svg = createDragonCardSvg(d, tribe.name);
    const filename = `${slugify(d.name || "my-dragon")}-dragon-card.svg`;
    downloadTextFile(filename, svg, "image/svg+xml");
    setToast("Dragon card exported!");
    setTimeout(() => setToast(""), 2200);
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

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_470px]">
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
              <Save className="h-4 w-4" /> Add to collection
            </button>
            <button
              onClick={exportCard}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 font-bold shadow-magic"
            >
              <Download className="h-4 w-4" /> Export card
            </button>
            <button
              onClick={randomize}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 font-bold"
            >
              <Wand2 className="h-4 w-4" /> Surprise me
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
          <div className="mb-3 flex items-center justify-between gap-3 rounded-3xl border border-border/60 bg-card px-4 py-3 shadow-magic">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-accent">
                Live Preview
              </div>
              <div className="text-sm font-semibold text-muted-foreground">
                {d.body} scales · {abilityStyle.note}
              </div>
            </div>
            <div
              className="grid h-11 w-11 place-items-center rounded-2xl text-xl text-white shadow-glow"
              style={{ background: abilityStyle.aura }}
            >
              {abilityStyle.glyph}
            </div>
          </div>
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
            <span className="text-gradient-magic">Your dragon collection</span>
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
  const tribeColors = TRIBE_HEX[d.tribe];
  const bodyColor = BODY_HEX[d.body] ?? tribeColors.main;
  const eyeColor = EYE_HEX[d.eye] ?? "#f59e0b";
  const ability = ABILITY_STYLE[d.ability];

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] border-2 border-white/20 p-6 text-white shadow-magic"
      style={{
        background: `radial-gradient(circle at 72% 16%, ${ability.aura}aa, transparent 34%), linear-gradient(160deg, var(--${colorVar}), var(--${glowVar}))`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <div className="absolute left-8 top-8 text-5xl">{ability.glyph}</div>
        <div className="absolute bottom-10 right-10 text-6xl">{ability.glyph}</div>
      </div>
      <div
        className={`relative mx-auto grid place-items-center overflow-hidden rounded-2xl bg-white/15 backdrop-blur ${
          compact ? "aspect-square" : "aspect-square w-full"
        }`}
      >
        <DragonAvatar
          bodyColor={bodyColor}
          accentColor={tribeColors.glow}
          eyeColor={eyeColor}
          abilityColor={ability.aura}
          wingStyle={d.wing}
          hornType={d.horn}
          tailType={d.tail}
          compact={compact}
        />
      </div>
      <div className="relative mt-4">
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

function DragonAvatar({
  bodyColor,
  accentColor,
  eyeColor,
  abilityColor,
  wingStyle,
  hornType,
  tailType,
  compact,
}: {
  bodyColor: string;
  accentColor: string;
  eyeColor: string;
  abilityColor: string;
  wingStyle: string;
  hornType: string;
  tailType: string;
  compact?: boolean;
}) {
  const spiked = wingStyle.includes("Spiked");
  const sleek = wingStyle.includes("Sleek");
  const crowned = hornType === "Crowned";
  const branching = hornType === "Branching";
  const finTail = tailType === "Fin tip";
  const forkTail = tailType === "Forked";
  const gradientId = bodyColor.replace(/[^a-zA-Z0-9]/g, "");

  return (
    <svg
      viewBox="0 0 420 420"
      className={compact ? "h-full w-full" : "h-[95%] w-[95%]"}
      role="img"
      aria-label="Custom dragon preview"
    >
      <defs>
        <radialGradient id={`aura-${gradientId}`} cx="52%" cy="42%" r="55%">
          <stop offset="0%" stopColor={abilityColor} stopOpacity="0.95" />
          <stop offset="100%" stopColor={abilityColor} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`body-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accentColor} />
          <stop offset="62%" stopColor={bodyColor} />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>
      </defs>

      <circle cx="210" cy="210" r="180" fill={`url(#aura-${gradientId})`} opacity="0.62" />
      <path
        d="M112 230 C64 194 56 132 86 72 C118 108 152 142 176 192 Z"
        fill={`url(#body-${gradientId})`}
        opacity={sleek ? 0.8 : 0.95}
      />
      <path
        d="M308 230 C356 194 364 132 334 72 C302 108 268 142 244 192 Z"
        fill={`url(#body-${gradientId})`}
        opacity={sleek ? 0.8 : 0.95}
      />
      {spiked && (
        <>
          <path d="M104 126 L78 88 L120 110 Z" fill={accentColor} opacity="0.85" />
          <path d="M316 126 L342 88 L300 110 Z" fill={accentColor} opacity="0.85" />
        </>
      )}
      <path
        d="M150 252 C178 188 244 188 272 252 C258 326 164 326 150 252 Z"
        fill={`url(#body-${gradientId})`}
      />
      <path
        d="M205 308 C184 344 146 356 110 342"
        fill="none"
        stroke={bodyColor}
        strokeLinecap="round"
        strokeWidth="18"
      />
      {finTail && <path d="M94 334 L56 306 L72 360 Z" fill={accentColor} opacity="0.9" />}
      {forkTail && (
        <>
          <path d="M92 336 L52 320" stroke={accentColor} strokeLinecap="round" strokeWidth="10" />
          <path d="M92 336 L58 364" stroke={accentColor} strokeLinecap="round" strokeWidth="10" />
        </>
      )}
      <path
        d="M176 176 C172 126 248 126 244 176 C276 188 288 224 268 258 C246 286 174 286 152 258 C132 224 144 188 176 176 Z"
        fill={`url(#body-${gradientId})`}
      />
      <path d="M178 168 L150 102 L202 150 Z" fill={bodyColor} />
      <path d="M242 168 L270 102 L218 150 Z" fill={bodyColor} />
      {branching && (
        <>
          <path
            d="M162 124 L128 82 M146 106 L124 106"
            stroke={accentColor}
            strokeLinecap="round"
            strokeWidth="8"
          />
          <path
            d="M258 124 L292 82 M274 106 L296 106"
            stroke={accentColor}
            strokeLinecap="round"
            strokeWidth="8"
          />
        </>
      )}
      {crowned && (
        <path
          d="M176 130 L194 94 L210 130 L226 94 L244 130"
          fill="none"
          stroke={accentColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="10"
        />
      )}
      <circle cx="188" cy="212" r="10" fill={eyeColor} />
      <circle cx="232" cy="212" r="10" fill={eyeColor} />
      <path
        d="M194 244 C206 252 218 252 230 244"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="6"
        opacity="0.8"
      />
      <path d="M172 278 L150 326" stroke={accentColor} strokeLinecap="round" strokeWidth="10" />
      <path d="M248 278 L270 326" stroke={accentColor} strokeLinecap="round" strokeWidth="10" />
      <circle
        cx="210"
        cy="246"
        r="78"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.12"
        strokeWidth="2"
      />
    </svg>
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

function pick<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function downloadTextFile(filename: string, text: string, type: string) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function createDragonCardSvg(d: Dragon, tribeName: string) {
  const tribe = TRIBE_HEX[d.tribe];
  const body = BODY_HEX[d.body] ?? tribe.main;
  const eye = EYE_HEX[d.eye] ?? "#f59e0b";
  const ability = ABILITY_STYLE[d.ability];
  const name = escapeXml(d.name || "Unnamed Dragon");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1260" viewBox="0 0 900 1260">
  <defs>
    <linearGradient id="card" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${tribe.glow}"/>
      <stop offset=".55" stop-color="${body}"/>
      <stop offset="1" stop-color="#111827"/>
    </linearGradient>
    <radialGradient id="aura" cx=".55" cy=".28" r=".55">
      <stop offset="0" stop-color="${ability.aura}" stop-opacity=".95"/>
      <stop offset="1" stop-color="${ability.aura}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="900" height="1260" rx="70" fill="url(#card)"/>
  <rect x="44" y="44" width="812" height="1172" rx="50" fill="none" stroke="white" stroke-opacity=".32" stroke-width="6"/>
  <circle cx="450" cy="390" r="310" fill="url(#aura)"/>
  <path d="M250 540 C152 460 142 300 198 164 C270 250 330 312 372 438 Z" fill="${body}" opacity=".92"/>
  <path d="M650 540 C748 460 758 300 702 164 C630 250 570 312 528 438 Z" fill="${body}" opacity=".92"/>
  <path d="M320 610 C380 470 520 470 580 610 C552 770 348 770 320 610 Z" fill="${body}"/>
  <path d="M380 404 C372 286 528 286 520 404 C594 442 612 530 560 600 C510 670 390 670 340 600 C288 530 306 442 380 404 Z" fill="${body}"/>
  <path d="M384 394 L316 244 L430 362 Z" fill="${body}"/>
  <path d="M516 394 L584 244 L470 362 Z" fill="${body}"/>
  <circle cx="405" cy="490" r="22" fill="${eye}"/>
  <circle cx="495" cy="490" r="22" fill="${eye}"/>
  <path d="M410 555 C435 572 465 572 490 555" fill="none" stroke="white" stroke-width="14" stroke-linecap="round" opacity=".85"/>
  <text x="450" y="880" text-anchor="middle" font-family="Georgia, serif" font-size="82" font-weight="900" fill="white">${name}</text>
  <text x="450" y="944" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="5" fill="white" opacity=".78">${escapeXml(tribeName.toUpperCase())}</text>
  <g font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="white">
    <text x="105" y="1040">Body: ${escapeXml(d.body)}</text>
    <text x="105" y="1090">Eyes: ${escapeXml(d.eye)}</text>
    <text x="105" y="1140">Wings: ${escapeXml(d.wing)}</text>
    <text x="105" y="1190">Power: ${escapeXml(d.ability)}</text>
  </g>
  <text x="770" y="1145" text-anchor="middle" font-size="72">${ability.glyph}</text>
</svg>`;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
