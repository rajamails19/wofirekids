import { useMemo } from "react";

export function DragonBackground({ variant = "default" }: { variant?: "default" | "subtle" }) {
  const sparkles = useMemo(
    () =>
      Array.from({ length: variant === "subtle" ? 12 : 28 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        size: 2 + Math.random() * 4,
      })),
    [variant],
  );

  const dragons = useMemo(
    () =>
      Array.from({ length: variant === "subtle" ? 1 : 3 }).map((_, i) => ({
        id: i,
        top: 10 + Math.random() * 60,
        delay: i * 10,
        duration: 30 + Math.random() * 20,
        scale: 0.4 + Math.random() * 0.6,
      })),
    [variant],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-accent animate-sparkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            boxShadow: "0 0 8px var(--accent)",
          }}
        />
      ))}
      {dragons.map((d) => (
        <svg
          key={d.id}
          viewBox="0 0 100 60"
          className="absolute text-foreground/15 animate-drift"
          style={{
            top: `${d.top}%`,
            width: `${60 * d.scale}px`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        >
          <path
            fill="currentColor"
            d="M5 30 Q15 10 30 20 Q40 5 55 18 Q70 8 85 22 Q95 30 80 35 Q60 32 50 38 Q40 32 25 36 Q12 38 5 30 Z"
          />
        </svg>
      ))}
    </div>
  );
}
