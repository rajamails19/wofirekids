import { createFileRoute, Link } from "@tanstack/react-router";
import { KINGDOMS, TRIBES } from "@/lib/dragons";
import { useEffect, useRef, useState } from "react";
import { Maximize2, Music, Volume2, X, ZoomIn, ZoomOut } from "lucide-react";
import mapImg from "@/assets/world-map.jpg";
import kidPantalaMap from "@/assets/fan/map-kid-pantala-routes.jpg";
import kidPyrrhiaMap from "@/assets/fan/map-kid-pyrrhia-routes.jpg";
import kidRefugeMap from "@/assets/fan/map-kid-refuge-routes.jpg";
import { trackJournalItem } from "@/lib/journal";
import { ReadingFactPanels } from "@/components/ReadingFactPanels";
import { getKidMapReadingFacts, MAIN_MAP_READING_FACTS } from "@/lib/reading-facts";

type KidMapLabel = {
  text: string;
  x: number;
  y: number;
};

type KidMap = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  facts: string[];
  image: string;
  labels: KidMapLabel[];
  music: MapMusicTheme;
};

type MapMusicTheme = {
  id: string;
  name: string;
  notes: number[];
  bass: number[];
  tempo: number;
  wave: OscillatorType;
};

type ExpandedMap = {
  title: string;
  subtitle: string;
  image: string;
  labels: KidMapLabel[];
};

const MAIN_MAP_MUSIC: MapMusicTheme = {
  id: "dragon-kingdoms",
  name: "Kingdom Overture",
  notes: [392, 523.25, 587.33, 659.25, 587.33, 523.25, 440, 392],
  bass: [130.81, 146.83, 164.81, 196],
  tempo: 0.42,
  wave: "triangle",
};

const KID_MAPS: KidMap[] = [
  {
    id: "pyrrhia-routes",
    title: "Map 1",
    subtitle: "Kingdom routes, strongholds, academies, and mountain paths.",
    description:
      "This is the grand Pyrrhia expedition route: icy cliffs, desert strongholds, dark moonlit peaks, sky mountains, sea paths, mud marshes, rainforest trails, and secret academy roads all connected like a dragon quest board.",
    facts: [
      "Ice K marks the frozen north, where royal IceWings guard glittering palaces and sharp mountain borders.",
      "Jade Mountain Academy sits near the center of big dragon history, where tribes meet, study, argue, and become friends.",
      "Thorn's Stronghold and Agave Mountain make this map feel like a SandWing adventure route with hidden desert stops.",
    ],
    image: kidPyrrhiaMap,
    labels: [
      { text: "Ice K", x: 18, y: 18 },
      { text: "Sand K", x: 41, y: 41 },
      { text: "Dark NK", x: 61, y: 18 },
      { text: "Old NK", x: 65, y: 33 },
      { text: "Sky K", x: 78, y: 33 },
      { text: "Sea K", x: 84, y: 56 },
      { text: "Mud K", x: 21, y: 50 },
      { text: "Rain K", x: 52, y: 70 },
      { text: "Thorn's Stronghold", x: 16, y: 77 },
      { text: "Agave Mountain", x: 70, y: 76 },
      { text: "Jade Mountain Academy", x: 82, y: 44 },
      { text: "Dragonet Mt.", x: 78, y: 88 },
    ],
    music: {
      id: "pyrrhia-routes",
      name: "Sky-Cliff Quest",
      notes: [261.63, 329.63, 392, 523.25, 493.88, 392, 329.63, 293.66],
      bass: [98, 130.81, 146.83, 164.81],
      tempo: 0.38,
      wave: "triangle",
    },
  },
  {
    id: "pantala-routes",
    title: "Map 2",
    subtitle: "Pantala paths through jungle, hives, caves, and the abyss.",
    description:
      "This map turns Pantala into a dangerous travel network: the Hives shine like golden cities, Leaf-Silk paths twist through the green, caves wait underneath, and the Abyss feels like the place no dragon wants to visit after dark.",
    facts: [
      "The Poison Jungle is perfect for LeafWing mystery because plants, traps, and secret paths are part of their world.",
      "The Hives work like giant dragon cities, making this a great map for patrols, escapes, and hidden missions.",
      "The Abyss is your kid's dramatic danger zone, so it gets the biggest dark corner of the route.",
    ],
    image: kidPantalaMap,
    labels: [
      { text: "Poison Jungle", x: 74, y: 18 },
      { text: "Leaf-Silk", x: 48, y: 42 },
      { text: "Hives", x: 47, y: 53 },
      { text: "Caves", x: 19, y: 78 },
      { text: "Abyss", x: 76, y: 78 },
    ],
    music: {
      id: "pantala-routes",
      name: "Poison Jungle Pulse",
      notes: [329.63, 392, 440, 392, 523.25, 440, 392, 349.23],
      bass: [82.41, 98, 110, 123.47],
      tempo: 0.34,
      wave: "sine",
    },
  },
  {
    id: "refuge-routes",
    title: "Map 3",
    subtitle: "Refuge island, patrol routes, barriers, eggs, and wing paths.",
    description:
      "This one feels like a special mission map: islands swirl around the edge, patrol routes loop through the sky, a Court of Refuge glows at the center, and the barrier path looks like magic protecting dragon eggs and secret travelers.",
    facts: [
      "Mulberry Patrol sounds like a scouting route, so it is placed near the purple forest path where watchers could hide.",
      "Dungeon eggs gives the map a treasure-room feeling, like something rare is guarded deep below the cliffs.",
      "HW route and SW route are marked as HiveWing and SilkWing travel paths, tying Pantala dragons into this refuge map.",
    ],
    image: kidRefugeMap,
    labels: [
      { text: "Pyrrhia", x: 61, y: 20 },
      { text: "Islands", x: 84, y: 46 },
      { text: "Mulberry Patrol", x: 24, y: 43 },
      { text: "Court of Refuge", x: 47, y: 43 },
      { text: "Dungeon eggs", x: 44, y: 68 },
      { text: "Barrier particle", x: 55, y: 82 },
      { text: "HW route", x: 80, y: 64 },
      { text: "SW route", x: 74, y: 72 },
    ],
    music: {
      id: "refuge-routes",
      name: "Refuge Flight",
      notes: [293.66, 349.23, 440, 587.33, 659.25, 587.33, 440, 349.23],
      bass: [110, 146.83, 196, 174.61],
      tempo: 0.4,
      wave: "triangle",
    },
  },
];

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "World Map — DragonHub" },
      {
        name: "description",
        content: "Explore mystical dragon kingdoms on an interactive fantasy map.",
      },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const [zoom, setZoom] = useState(1);
  const [active, setActive] = useState<string | null>(null);
  const [expandedMap, setExpandedMap] = useState<ExpandedMap | null>(null);
  const [activeMusic, setActiveMusic] = useState<string | null>(null);
  const [musicMuted, setMusicMuted] = useState(false);
  const audioRef = useRef<{
    context: AudioContext;
    gain: GainNode;
    interval: number;
  } | null>(null);

  function stopMusic() {
    if (!audioRef.current) return;
    window.clearInterval(audioRef.current.interval);
    audioRef.current.context.close();
    audioRef.current = null;
    setActiveMusic(null);
  }

  function playTheme(theme: MapMusicTheme) {
    if (activeMusic === theme.id && audioRef.current) {
      const nextMuted = !musicMuted;
      setMusicMuted(nextMuted);
      audioRef.current.gain.gain.setTargetAtTime(
        nextMuted ? 0 : 0.055,
        audioRef.current.context.currentTime,
        0.08,
      );
      return;
    }

    stopMusic();

    const AudioContextCtor =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) return;

    const context = new AudioContextCtor();
    const gain = context.createGain();
    gain.gain.value = 0.055;
    gain.connect(context.destination);

    const schedule = () => scheduleDragonTheme(context, gain, theme);
    schedule();

    const loopMs = theme.notes.length * theme.tempo * 1000;
    const interval = window.setInterval(schedule, loopMs);
    audioRef.current = { context, gain, interval };
    setMusicMuted(false);
    setActiveMusic(theme.id);
  }

  useEffect(() => stopMusic, []);

  const mainExpandedMap: ExpandedMap = {
    title: "The Dragon Kingdoms",
    subtitle: "The original interactive world map with all major kingdom markers.",
    image: mapImg,
    labels: KINGDOMS.map((kingdom) => ({
      text: kingdom.name,
      x: kingdom.x,
      y: kingdom.y,
    })),
  };

  function openMap(map: ExpandedMap) {
    trackJournalItem("openedMaps", map.title);
    setExpandedMap(map);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="text-center">
        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
          Interactive Map
        </div>
        <h1 className="font-display text-4xl font-black sm:text-6xl">
          <span className="text-gradient-magic">The Dragon Kingdoms</span>
        </h1>
        <p className="mt-3 text-muted-foreground">Tap a glowing marker to discover its kingdom.</p>
      </div>

      <div className="relative mt-8 overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-magic">
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <button
            type="button"
            onClick={() => playTheme(MAIN_MAP_MUSIC)}
            className="grid h-10 w-10 place-items-center rounded-full bg-background/80 shadow backdrop-blur"
            aria-label={`${activeMusic === MAIN_MAP_MUSIC.id && !musicMuted ? "Mute" : "Play"} kingdom map music`}
          >
            {activeMusic === MAIN_MAP_MUSIC.id && !musicMuted ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <Music className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => openMap(mainExpandedMap)}
            className="grid h-10 w-10 place-items-center rounded-full bg-background/80 shadow backdrop-blur"
            aria-label="Expand kingdom map"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(2, z + 0.2))}
            className="grid h-10 w-10 place-items-center rounded-full bg-background/80 shadow backdrop-blur"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.8, z - 0.2))}
            className="grid h-10 w-10 place-items-center rounded-full bg-background/80 shadow backdrop-blur"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
        </div>
        <div
          className="relative aspect-[16/10] cursor-zoom-in overflow-hidden"
          onClick={() => openMap(mainExpandedMap)}
        >
          <div
            className="relative h-full w-full transition-transform duration-500"
            style={{ transform: `scale(${zoom})` }}
          >
            <img
              src={mapImg}
              alt="Dragon world map"
              className="absolute inset-0 h-full w-full object-cover"
              width={1600}
              height={1200}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            {KINGDOMS.map((k) => {
              const t = TRIBES.find((x) => x.slug === k.tribe)!;
              return (
                <button
                  key={k.slug}
                  onClick={(event) => {
                    event.stopPropagation();
                    setActive(active === k.slug ? null : k.slug);
                  }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: `${k.y}%`, left: `${k.x}%` }}
                  aria-label={k.name}
                >
                  <span
                    className="grid h-12 w-12 place-items-center rounded-full text-xl text-white shadow-glow animate-pulse-glow"
                    style={{ background: `var(--${t.colorVar})` }}
                  >
                    {t.emoji}
                  </span>
                  <span className="mt-1 block whitespace-nowrap rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-bold backdrop-blur">
                    {k.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ReadingFactPanels
          eyebrow="Map Reading Mode"
          title="Did You Know?"
          panels={MAIN_MAP_READING_FACTS}
        />
      </div>

      {active &&
        (() => {
          const k = KINGDOMS.find((x) => x.slug === active)!;
          const t = TRIBES.find((x) => x.slug === k.tribe)!;
          return (
            <div className="mt-6 grid gap-4 rounded-3xl border border-border/60 bg-card p-6 shadow-magic animate-fade-up sm:grid-cols-[auto_1fr_auto] sm:items-center">
              <div
                className="grid h-16 w-16 place-items-center rounded-2xl text-3xl text-white"
                style={{ background: `var(--${t.colorVar})` }}
              >
                {t.emoji}
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold">{k.name}</h3>
                <p className="text-muted-foreground">{k.desc}</p>
              </div>
              <Link
                to="/tribes/$slug"
                params={{ slug: t.slug }}
                className="rounded-full bg-gradient-magic px-5 py-3 text-sm font-bold text-primary-foreground shadow-magic"
              >
                Visit {t.name} →
              </Link>
            </div>
          );
        })()}

      <section className="mt-12">
        <div className="text-center">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
            Your Dragon World
          </div>
          <h2 className="font-display text-3xl font-black sm:text-5xl">Kid's Expedition Maps</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Cinematic versions of the hand-drawn routes, kingdoms, and secret places.
          </p>
        </div>

        <div className="mt-8 space-y-10">
          {KID_MAPS.map((kidMap) => (
            <article
              key={kidMap.title}
              className="overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-magic"
            >
              <div
                className="relative aspect-[16/10] cursor-zoom-in overflow-hidden sm:aspect-[16/9]"
                onClick={() => openMap(kidMap)}
              >
                <img
                  src={kidMap.image}
                  alt={`${kidMap.title} dragon world map`}
                  className="h-full w-full object-cover"
                  width={1600}
                  height={1000}
                  loading="lazy"
                />
                {kidMap.labels.map((label) => (
                  <MapLabel key={label.text} label={label} />
                ))}
                <div className="absolute right-4 top-4 z-10 flex gap-2">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      playTheme(kidMap.music);
                    }}
                    className="grid h-10 w-10 place-items-center rounded-full bg-background/85 shadow backdrop-blur"
                    aria-label={`${activeMusic === kidMap.music.id && !musicMuted ? "Mute" : "Play"} ${kidMap.title} music`}
                  >
                    {activeMusic === kidMap.music.id && !musicMuted ? (
                      <Volume2 className="h-4 w-4" />
                    ) : (
                      <Music className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      openMap(kidMap);
                    }}
                    className="grid h-10 w-10 place-items-center rounded-full bg-background/85 shadow backdrop-blur"
                    aria-label={`Expand ${kidMap.title}`}
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-block rounded-2xl bg-black/35 px-4 py-3 text-white shadow backdrop-blur-sm">
                    <div className="font-display text-3xl font-black drop-shadow sm:text-5xl">
                      {kidMap.title}
                    </div>
                    <p className="mt-2 max-w-3xl text-sm font-semibold text-white/90 sm:text-lg">
                      {kidMap.subtitle}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-5 p-5 sm:p-7 lg:grid-cols-[1.1fr_1fr]">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-accent">
                    Scroll Quest Notes
                  </div>
                  <p className="mt-2 text-base leading-7 text-muted-foreground">
                    {kidMap.description}
                  </p>
                </div>
                <div className="rounded-3xl border border-border/60 bg-background/50 p-4">
                  <ReadingFactPanels
                    eyebrow="Map Reading Mode"
                    title="Did You Know?"
                    panels={getKidMapReadingFacts(kidMap.title, kidMap.facts)}
                    variant="embedded"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {KINGDOMS.map((k) => {
          const t = TRIBES.find((x) => x.slug === k.tribe)!;
          return (
            <button
              key={k.slug}
              onClick={() => setActive(k.slug)}
              className="card-tilt rounded-2xl border border-border/60 bg-card p-4 text-left shadow-magic"
            >
              <div className="flex items-center gap-3">
                <div
                  className="grid h-12 w-12 place-items-center rounded-xl text-xl text-white"
                  style={{ background: `var(--${t.colorVar})` }}
                >
                  {t.emoji}
                </div>
                <div className="min-w-0">
                  <div className="font-display font-bold">{k.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{k.desc}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {expandedMap && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setExpandedMap(null)}
        >
          <div
            className="relative w-full max-w-[1500px] overflow-hidden rounded-[2rem] border border-white/15 bg-black shadow-glow"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setExpandedMap(null)}
              className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-background/85 shadow backdrop-blur"
              aria-label="Close expanded map"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-[16/10] max-h-[86vh]">
              <img
                src={expandedMap.image}
                alt={`${expandedMap.title} expanded map`}
                className="h-full w-full object-cover"
                width={1600}
                height={1000}
              />
              {expandedMap.labels.map((label) => (
                <MapLabel key={label.text} label={label} expanded />
              ))}
              <div className="absolute bottom-5 left-5 right-16">
                <div className="inline-block rounded-2xl bg-black/40 px-4 py-3 text-white shadow backdrop-blur-sm">
                  <div className="font-display text-3xl font-black drop-shadow sm:text-5xl">
                    {expandedMap.title}
                  </div>
                  <p className="mt-2 max-w-3xl text-sm font-semibold text-white/90 sm:text-lg">
                    {expandedMap.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MapLabel({
  label,
  compact = false,
  expanded = false,
}: {
  label: KidMapLabel;
  compact?: boolean;
  expanded?: boolean;
}) {
  return (
    <span
      className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/25 bg-background/75 font-bold text-foreground shadow backdrop-blur-md ${
        compact
          ? "px-2 py-1 text-[9px] sm:text-[10px]"
          : expanded
            ? "px-4 py-2 text-sm sm:text-base"
            : "px-3 py-1.5 text-xs sm:text-sm"
      }`}
      style={{ left: `${label.x}%`, top: `${label.y}%` }}
    >
      {label.text}
    </span>
  );
}

function scheduleDragonTheme(context: AudioContext, masterGain: GainNode, theme: MapMusicTheme) {
  const start = context.currentTime + 0.03;

  theme.notes.forEach((frequency, index) => {
    scheduleTone(
      context,
      masterGain,
      frequency,
      start + index * theme.tempo,
      theme.tempo * 1.6,
      theme.wave,
      0.9,
    );
    scheduleTone(
      context,
      masterGain,
      frequency * 2,
      start + index * theme.tempo + theme.tempo * 0.15,
      theme.tempo * 0.7,
      "sine",
      0.18,
    );
  });

  theme.bass.forEach((frequency, index) => {
    scheduleTone(
      context,
      masterGain,
      frequency,
      start + index * theme.tempo * 2,
      theme.tempo * 3.2,
      "sine",
      0.6,
    );
  });
}

function scheduleTone(
  context: AudioContext,
  masterGain: GainNode,
  frequency: number,
  start: number,
  duration: number,
  wave: OscillatorType,
  volume: number,
) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = wave;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(0.08 * volume, start + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(gain);
  gain.connect(masterGain);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.05);
}
