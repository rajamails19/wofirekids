import { createFileRoute } from "@tanstack/react-router";
import { Image, X } from "lucide-react";
import { useEffect, useState } from "react";
import heroDragon from "@/assets/hero-dragon.jpg";
import threeMoons from "@/assets/three-moons.jpg";
import worldMap from "@/assets/world-map.jpg";
import portalStory from "@/assets/portal-story.jpg";
import { SCENES } from "@/lib/scenes";
import { TRIBES, type TribeSlug } from "@/lib/dragons";

export const Route = createFileRoute("/pics")({
  head: () => ({
    meta: [
      { title: "Dragon Pics — DragonHub" },
      {
        name: "description",
        content:
          "A pure image gallery of dragon kingdom pictures, tribe scenes, moonlit skies, maps, and story portals.",
      },
    ],
  }),
  component: PicsPage,
});

type GalleryPic = {
  title: string;
  image: string;
  caption: string;
  type: "Featured" | "Tribe Scene";
};

const FEATURED_PICS: GalleryPic[] = [
  {
    title: "Dragon Kingdom",
    image: heroDragon,
    caption: "Floating castles and dragon skies.",
    type: "Featured",
  },
  {
    title: "Three Moons",
    image: threeMoons,
    caption: "Moonlit magic and NightWing lore.",
    type: "Featured",
  },
  {
    title: "World Map",
    image: worldMap,
    caption: "The kingdoms from above.",
    type: "Featured",
  },
  {
    title: "Story Portal",
    image: portalStory,
    caption: "A doorway into dragon adventure.",
    type: "Featured",
  },
];

const FEATURED_TRIBES: TribeSlug[] = [
  "nightwing",
  "skywing",
  "rainwing",
  "seawing",
  "icewing",
  "sandwing",
  "mudwing",
  "silkwing",
  "hivewing",
  "leafwing",
];

const TRIBE_PICS: GalleryPic[] = FEATURED_TRIBES.map((slug) => {
  const tribe = TRIBES.find((item) => item.slug === slug)!;
  return {
    title: tribe.name,
    image: SCENES[slug],
    caption: tribe.habitat,
    type: "Tribe Scene",
  };
});

const GALLERY = [...FEATURED_PICS, ...TRIBE_PICS];

function PicsPage() {
  const [selected, setSelected] = useState<GalleryPic | null>(null);

  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <section className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white/70">
            <Image className="h-4 w-4" />
            Dragon Gallery
          </div>
          <h1 className="font-display text-4xl font-black sm:text-6xl">Pics</h1>
          <p className="mt-3 max-w-2xl text-base text-white/65">
            Tap any picture to open it large. No links, no extra pages, just dragon-world images.
          </p>
        </div>

        <GalleryRow title="Featured Pics" pics={FEATURED_PICS} onSelect={setSelected} />
        <GalleryRow title="Dragon Homelands" pics={TRIBE_PICS.slice(0, 8)} onSelect={setSelected} />
        <GalleryRow title="More Kingdom Scenes" pics={TRIBE_PICS.slice(8)} onSelect={setSelected} />
      </section>

      {selected && <ImageViewer pic={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function GalleryRow({
  title,
  pics,
  onSelect,
}: {
  title: string;
  pics: GalleryPic[];
  onSelect: (pic: GalleryPic) => void;
}) {
  if (pics.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-black tracking-tight text-white/90">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pics.map((pic) => (
          <button
            key={`${title}-${pic.title}`}
            type="button"
            onClick={() => onSelect(pic)}
            className="group relative overflow-hidden rounded-lg bg-white/5 text-left shadow-[0_10px_30px_rgba(0,0,0,.35)] outline-none ring-1 ring-white/10 transition duration-300 hover:z-10 hover:scale-[1.035] hover:ring-white/35 focus-visible:ring-2 focus-visible:ring-white"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={pic.image}
                alt={pic.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
                {pic.type}
              </div>
              <div className="mt-1 truncate font-display text-xl font-black text-white">
                {pic.title}
              </div>
              <p className="mt-1 line-clamp-1 text-xs font-medium text-white/70">{pic.caption}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function ImageViewer({ pic, onClose }: { pic: GalleryPic; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={pic.title}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Close image"
      >
        <X className="h-5 w-5" />
      </button>

      <div
        className="relative h-[75vh] w-[92vw] max-w-[1400px] overflow-hidden rounded-xl bg-black shadow-[0_24px_90px_rgba(0,0,0,.7)] ring-1 ring-white/15"
        onClick={(event) => event.stopPropagation()}
      >
        <img src={pic.image} alt={pic.title} className="h-full w-full object-contain" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-6">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-white/60">
            {pic.type}
          </div>
          <div className="mt-1 font-display text-3xl font-black text-white">{pic.title}</div>
        </div>
      </div>
    </div>
  );
}
