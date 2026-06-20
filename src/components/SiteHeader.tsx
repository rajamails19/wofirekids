import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, Volume2, VolumeX } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/tribes", label: "Tribes" },
  { to: "/characters", label: "Dragons" },
  { to: "/abilities", label: "Abilities" },
  { to: "/moons", label: "Three Moons" },
  { to: "/map", label: "Map" },
  { to: "/builder", label: "Create" },
  { to: "/quiz", label: "Quiz" },
  { to: "/story", label: "Stories" },
  { to: "/cards", label: "Cards" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("wof-theme") : null;
    const prefers =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const d = stored ? stored === "dark" : !!prefers;
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("wof-theme", next ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex shrink-0 items-center gap-2" onClick={() => setOpen(false)}>
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-magic shadow-glow">
            <span className="text-xl">🐉</span>
          </div>
          <span className="font-display text-lg font-bold leading-tight">
            Dragon<span className="text-gradient-magic">Hub</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-accent/15 hover:text-foreground"
              activeProps={{ className: "bg-accent/20 text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSound((s) => !s)}
            className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition hover:bg-accent/15 hover:text-foreground"
            aria-label="Toggle sound"
          >
            {sound ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
          <button
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition hover:bg-accent/15 hover:text-foreground"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full text-foreground transition hover:bg-accent/15 lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/50 bg-background/95 lg:hidden">
          <nav className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-4 py-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-secondary/60 px-4 py-3 font-semibold"
                activeProps={{ className: "bg-gradient-magic text-primary-foreground" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
