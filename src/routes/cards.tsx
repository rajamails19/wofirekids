import { createFileRoute } from "@tanstack/react-router";
import { CHARACTERS, TRIBES } from "@/lib/dragons";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/cards")({
  head: () => ({
    meta: [
      { title: "Dragon Card Collection — DragonHub" },
      {
        name: "description",
        content: "Collect, flip and favorite dragon trading cards from across the kingdoms.",
      },
    ],
  }),
  component: CardsPage,
});

function CardsPage() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [favs, setFavs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const raw = localStorage.getItem("wof-favs");
    if (raw)
      try {
        setFavs(JSON.parse(raw));
      } catch (error) {
        console.warn("Unable to load favorite cards.", error);
      }
  }, []);

  const toggleFav = (slug: string) => {
    const next = { ...favs, [slug]: !favs[slug] };
    setFavs(next);
    localStorage.setItem("wof-favs", JSON.stringify(next));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="text-center">
        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
          Card Collection
        </div>
        <h1 className="font-display text-4xl font-black sm:text-6xl">
          <span className="text-gradient-magic">Dragon Trading Cards</span>
        </h1>
        <p className="mt-3 text-muted-foreground">Tap any card to flip and reveal its stats.</p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {CHARACTERS.map((c, i) => {
          const t = TRIBES.find((x) => x.slug === c.tribe)!;
          const power = 60 + ((c.slug.length * 13) % 40);
          const intel = 60 + ((c.name.length * 17) % 40);
          const speed = 50 + ((i * 23) % 50);
          const strength = 55 + ((c.tribe.length * 19) % 45);
          const isFlipped = !!flipped[c.slug];
          return (
            <div key={c.slug} className="relative" style={{ perspective: 1200 }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFav(c.slug);
                }}
                className={`absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition ${favs[c.slug] ? "bg-destructive text-destructive-foreground" : "bg-background/80 text-foreground"}`}
                aria-label="Favorite"
              >
                <Heart className={`h-4 w-4 ${favs[c.slug] ? "fill-current" : ""}`} />
              </button>
              <div
                onClick={() => setFlipped({ ...flipped, [c.slug]: !isFlipped })}
                className="relative h-[420px] cursor-pointer transition-transform duration-700"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-[1.5rem] border-2 border-white/20 p-5 text-white shadow-magic"
                  style={{
                    backfaceVisibility: "hidden",
                    background: `linear-gradient(160deg, var(--${t.colorVar}), var(--${t.glowVar}))`,
                  }}
                >
                  <div className="grid aspect-square place-items-center rounded-2xl bg-white/15 text-7xl backdrop-blur">
                    🐉
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                      {t.name}
                    </div>
                    <div className="font-display text-2xl font-black">{c.name}</div>
                    <div className="text-xs opacity-90">{c.role}</div>
                  </div>
                </div>
                {/* Back */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-[1.5rem] border-2 border-border/60 bg-card p-5 shadow-magic"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="text-center">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-accent">
                      {t.name}
                    </div>
                    <div className="font-display text-2xl font-black">{c.name}</div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {[
                      ["Power", power],
                      ["Intelligence", intel],
                      ["Speed", speed],
                      ["Strength", strength],
                    ].map(([l, v]) => (
                      <div key={l as string}>
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{l}</span>
                          <span>{v}</span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-secondary">
                          <div className="h-full bg-gradient-magic" style={{ width: `${v}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{c.bio}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
