export function Particles({ count = 18, color = "white" }: { count?: number; color?: string }) {
  return (
    <div className="particles" aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 53) % 100;
        const delay = (i * 0.7) % 12;
        const duration = 12 + ((i * 3) % 14);
        const size = 3 + ((i * 2) % 6);
        return (
          <span
            key={i}
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              background: color,
              boxShadow: `0 0 ${size * 3}px ${color}`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </div>
  );
}
