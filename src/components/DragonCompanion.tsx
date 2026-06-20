import { Link, useRouterState } from "@tanstack/react-router";
import { MessageCircle, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const HIDDEN_KEY = "wof-companion-hidden";
const TIP_INDEX_KEY = "wof-companion-tip-index";

const TIPS = [
  {
    text: "Did you know MudWings hatch in sibling troops?",
    to: "/tribes/mudwing",
    action: "Visit MudWings",
  },
  {
    text: "Try opening Map 2 for Pantala paths and the abyss.",
    to: "/map",
    action: "Open maps",
  },
  {
    text: "NightWing powers depend on moonlight. The Three Moons page has the mystery.",
    to: "/moons",
    action: "See moons",
  },
  {
    text: "Heart pictures on the Pics page to build your own dragon art shelf.",
    to: "/pics",
    action: "Collect pics",
  },
  {
    text: "Your Journal remembers maps, tribes, stories, quizzes, and created dragons.",
    to: "/journal",
    action: "Open Journal",
  },
  {
    text: "Create a dragon, then export it as a card for your collection.",
    to: "/builder",
    action: "Create dragon",
  },
  {
    text: "RainWings love fruit and can change their scale colors.",
    to: "/tribes/rainwing",
    action: "Visit RainWings",
  },
  {
    text: "SeaWings can glow with special scale patterns underwater.",
    to: "/tribes/seawing",
    action: "Visit SeaWings",
  },
];

export function DragonCompanion() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [hidden, setHidden] = useState(true);
  const [open, setOpen] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const storedHidden = localStorage.getItem(HIDDEN_KEY) === "true";
    const storedTipIndex = Number(localStorage.getItem(TIP_INDEX_KEY) ?? "0");

    setHidden(storedHidden);
    setOpen(!storedHidden);
    if (Number.isFinite(storedTipIndex)) {
      setTipIndex(storedTipIndex % TIPS.length);
    }
  }, []);

  useEffect(() => {
    if (hidden) return;

    const timer = window.setInterval(() => {
      setTipIndex((current) => {
        const next = (current + 1) % TIPS.length;
        localStorage.setItem(TIP_INDEX_KEY, String(next));
        return next;
      });
      setOpen(true);
    }, 24000);

    return () => window.clearInterval(timer);
  }, [hidden]);

  const tip = useMemo(() => {
    const routeHint = TIPS.find((item) => item.to !== pathname);
    return TIPS[tipIndex] ?? routeHint ?? TIPS[0];
  }, [pathname, tipIndex]);

  const dismiss = () => {
    setHidden(true);
    setOpen(false);
    localStorage.setItem(HIDDEN_KEY, "true");
  };

  const wake = () => {
    setHidden(false);
    setOpen(true);
    localStorage.setItem(HIDDEN_KEY, "false");
  };

  if (hidden) {
    return (
      <button
        type="button"
        onClick={wake}
        className="fixed bottom-4 right-4 z-40 grid h-12 w-12 place-items-center rounded-full border border-white/50 bg-gradient-magic text-xl shadow-magic transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:bottom-5 sm:right-5"
        aria-label="Wake dragon companion"
      >
        <span aria-hidden="true">🐲</span>
      </button>
    );
  }

  return (
    <aside
      className="fixed bottom-4 right-4 z-40 flex max-w-[calc(100vw-2rem)] items-end gap-3 sm:bottom-5 sm:right-5"
      aria-label="Dragon companion"
    >
      {open && (
        <div className="animate-fade-up mb-2 w-[min(20rem,calc(100vw-6rem))] rounded-2xl border border-border/70 bg-card/95 p-4 text-card-foreground shadow-magic backdrop-blur-xl">
          <div className="mb-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Dragon Tip
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Hide tip"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-sm font-semibold leading-relaxed">{tip.text}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Link
              to={tip.to}
              onClick={() => setOpen(false)}
              className="rounded-full bg-gradient-magic px-3 py-1.5 text-xs font-black text-primary-foreground shadow-glow"
            >
              {tip.action}
            </Link>
            <button
              type="button"
              onClick={() => {
                setTipIndex((current) => {
                  const next = (current + 1) % TIPS.length;
                  localStorage.setItem(TIP_INDEX_KEY, String(next));
                  return next;
                });
              }}
              className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-black text-muted-foreground transition hover:text-foreground"
            >
              New tip
            </button>
          </div>
        </div>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="dragon-companion-float relative grid h-16 w-16 place-items-center rounded-[1.35rem] border border-white/50 bg-gradient-to-br from-emerald-300 via-violet-400 to-rose-300 shadow-magic transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={open ? "Hide dragon companion tip" : "Show dragon companion tip"}
        >
          <CompanionDragon />
          <span className="absolute -left-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-background text-primary shadow-md ring-1 ring-border">
            <MessageCircle className="h-3.5 w-3.5" />
          </span>
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-card text-muted-foreground shadow-md ring-1 ring-border transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Dismiss dragon companion"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </aside>
  );
}

function CompanionDragon() {
  return (
    <svg viewBox="0 0 120 120" className="h-14 w-14" aria-hidden="true">
      <defs>
        <linearGradient id="companionBody" x1="20" x2="100" y1="18" y2="104">
          <stop stopColor="#7dd3fc" />
          <stop offset="0.48" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#fb7185" />
        </linearGradient>
      </defs>
      <path d="M35 58 C18 34 38 20 57 44 C73 20 100 29 84 58" fill="#fef3c7" opacity="0.72" />
      <path
        d="M27 66 C39 40 78 38 91 67 C101 89 78 104 58 100 C37 104 17 88 27 66Z"
        fill="url(#companionBody)"
      />
      <path
        d="M36 42 L43 22 L51 45 M69 45 L80 23 L82 48"
        fill="none"
        stroke="#fff7ed"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
      />
      <path
        d="M40 68 C47 59 69 59 78 68"
        fill="none"
        stroke="#312e81"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <circle cx="47" cy="67" r="5" fill="#111827" />
      <circle cx="76" cy="67" r="5" fill="#111827" />
      <circle cx="49" cy="65" r="1.8" fill="white" />
      <circle cx="78" cy="65" r="1.8" fill="white" />
      <path
        d="M56 79 Q62 84 69 79"
        fill="none"
        stroke="#111827"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <path
        d="M84 82 C100 83 106 95 95 104"
        fill="none"
        stroke="#a78bfa"
        strokeLinecap="round"
        strokeWidth="8"
      />
      <path d="M30 76 L14 83 L31 88" fill="#fef3c7" opacity="0.78" />
      <path d="M90 76 L108 83 L90 88" fill="#fef3c7" opacity="0.78" />
    </svg>
  );
}
