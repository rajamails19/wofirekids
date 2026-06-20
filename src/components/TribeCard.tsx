import { Link } from "@tanstack/react-router";
import type { Tribe } from "@/lib/dragons";

export function TribeCard({ tribe, index = 0 }: { tribe: Tribe; index?: number }) {
  return (
    <Link
      to="/tribes/$slug"
      params={{ slug: tribe.slug }}
      className="group card-tilt relative block overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-magic animate-fade-up"
      style={{
        animationDelay: `${index * 70}ms`,
        background: `linear-gradient(155deg, var(--card) 0%, color-mix(in oklab, var(--${tribe.colorVar}) 18%, var(--card)) 100%)`,
      }}
    >
      <div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-50 blur-3xl transition-opacity group-hover:opacity-80"
        style={{ background: `var(--${tribe.glowVar})` }}
      />
      <div className="relative">
        <div
          className="mb-4 grid h-16 w-16 place-items-center rounded-2xl text-3xl shadow-glow"
          style={{ background: `var(--${tribe.colorVar})`, color: "white" }}
        >
          {tribe.emoji}
        </div>
        <h3 className="font-display text-2xl font-bold">{tribe.name}</h3>
        <p className="mt-1 text-sm font-medium text-muted-foreground">{tribe.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed">{tribe.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {tribe.powers.slice(0, 3).map((p) => (
            <span
              key={p}
              className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-semibold"
            >
              {p}
            </span>
          ))}
        </div>
        <div className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-primary">
          Explore tribe <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}
