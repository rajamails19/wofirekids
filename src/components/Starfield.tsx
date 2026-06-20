export function Starfield({ count = 120, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`starfield ${className}`} aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const top = (i * 37) % 100;
        const left = (i * 53) % 100;
        const size = 1 + ((i * 7) % 4);
        const delay = (i * 0.3) % 6;
        const duration = 2 + ((i * 0.9) % 5);
        return (
          <span
            key={i}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: size,
              height: size,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </div>
  );
}
