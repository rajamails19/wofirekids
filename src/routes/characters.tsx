import { createFileRoute, Link } from "@tanstack/react-router";
import { CHARACTERS, TRIBES, type TribeSlug } from "@/lib/dragons";
import { CanonBackdrop } from "@/components/CanonBackdrop";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/characters")({
  head: () => ({
    meta: [
      { title: "Character Gallery — Wings of Fire Adventure" },
      {
        name: "description",
        content:
          "Meet canon Wings of Fire dragons through cinematic poster scenes inspired by the books and graphic novels.",
      },
    ],
  }),
  component: CharactersPage,
});

function CharactersPage() {
  const [q, setQ] = useState("");
  const [tribe, setTribe] = useState<TribeSlug | "all">("all");

  const filtered = useMemo(() => {
    return CHARACTERS.filter(
      (c) =>
        (tribe === "all" || c.tribe === tribe) &&
        (q.trim() === "" ||
          c.name.toLowerCase().includes(q.toLowerCase()) ||
          c.role.toLowerCase().includes(q.toLowerCase())),
    );
  }, [q, tribe]);

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-12">
      <div className="text-center">
        <div className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Canon Character Gallery
        </div>
        <h1 className="font-display text-4xl font-black sm:text-6xl">
          <span className="text-gradient-magic">Dragons of Destiny</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Clean poster scenes, canon names, and no malformed dragon anatomy.
        </p>
      </div>

      <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search canon dragons…"
            className="h-12 w-full rounded-full border border-border/60 bg-card pl-11 pr-4 text-sm font-medium shadow-magic outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <FilterChip active={tribe === "all"} onClick={() => setTribe("all")}>
            All
          </FilterChip>
          {TRIBES.map((t) => (
            <FilterChip
              key={t.slug}
              active={tribe === t.slug}
              onClick={() => setTribe(t.slug)}
              color={`var(--${t.colorVar})`}
            >
              {t.emoji} {t.name}
            </FilterChip>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mx-auto mt-16 max-w-md rounded-3xl border border-dashed border-border bg-card p-10 text-center">
          <div className="text-5xl">🔍</div>
          <h3 className="mt-4 font-display text-xl font-bold">No dragons found</h3>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((c, i) => {
            const t = TRIBES.find((x) => x.slug === c.tribe)!;
            return (
              <Link
                key={c.slug}
                to="/characters/$slug"
                params={{ slug: c.slug }}
                className="group relative block overflow-hidden rounded-[1.75rem] shadow-magic ring-1 ring-white/10 animate-fade-up"
                style={{ aspectRatio: "3 / 4", animationDelay: `${i * 60}ms` }}
              >
                <CanonBackdrop tribe={c.tribe} poster />
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/28 to-transparent" />
                <div
                  className="absolute inset-0 opacity-50 mix-blend-soft-light"
                  style={{
                    background: `radial-gradient(ellipse at 70% 20%, var(--${t.glowVar}), transparent 65%)`,
                  }}
                />

                <div className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur">
                  <span className="mr-1">{t.emoji}</span>
                  {t.name}
                </div>

                <div className="absolute right-4 top-14 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
                  Canon dragon
                </div>

                <div className="absolute bottom-[29%] right-[10%] z-10 text-[132px] leading-none text-white/12 transition duration-500 group-hover:text-white/18">
                  {t.emoji}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-90">
                    {c.role}
                  </div>
                  <div className="font-display text-3xl font-black leading-tight drop-shadow-[0_4px_18px_rgba(0,0,0,.7)] sm:text-4xl">
                    {c.name}
                  </div>
                  <div className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-white/80">
                    {t.continent} · {t.habitat}
                  </div>
                  <div className="mt-3 inline-flex translate-y-2 items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-black opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    Meet {c.name} →
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/0 transition group-hover:ring-white/40" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
  color,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${
        active ? "text-white shadow-glow" : "bg-card text-foreground hover:bg-secondary"
      }`}
      style={active ? { background: color ?? "var(--primary)" } : undefined}
    >
      {children}
    </button>
  );
}
