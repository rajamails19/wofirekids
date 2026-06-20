import type { TribeSlug } from "@/lib/dragons";

const TRIBE_THEME: Record<
  TribeSlug,
  {
    sky: string;
    glow: string;
    horizon: string;
    ground: string;
    accent: string;
    pattern: string;
  }
> = {
  mudwing: {
    sky: "linear-gradient(180deg, rgba(87,58,32,0.9) 0%, rgba(146,100,54,0.72) 38%, rgba(62,39,24,0.98) 100%)",
    glow: "radial-gradient(circle at 50% 28%, rgba(255,202,120,0.28), transparent 38%)",
    horizon: "rgba(80,55,28,0.82)",
    ground: "rgba(37,25,15,0.94)",
    accent: "rgba(255,214,138,0.9)",
    pattern:
      "radial-gradient(circle at 20% 80%, rgba(255,220,170,0.16) 0 2px, transparent 3px), radial-gradient(circle at 72% 76%, rgba(255,220,170,0.14) 0 2px, transparent 3px)",
  },
  sandwing: {
    sky: "linear-gradient(180deg, rgba(231,146,62,0.92) 0%, rgba(205,108,37,0.72) 42%, rgba(73,36,15,1) 100%)",
    glow: "radial-gradient(circle at 50% 24%, rgba(255,224,156,0.38), transparent 35%)",
    horizon: "rgba(191,108,40,0.72)",
    ground: "rgba(88,47,19,0.92)",
    accent: "rgba(255,233,168,0.92)",
    pattern:
      "radial-gradient(circle at 18% 70%, rgba(255,230,170,0.12) 0 2px, transparent 3px), radial-gradient(circle at 80% 64%, rgba(255,230,170,0.12) 0 2px, transparent 3px)",
  },
  skywing: {
    sky: "linear-gradient(180deg, rgba(120,58,28,0.96) 0%, rgba(232,118,58,0.72) 34%, rgba(41,20,16,0.96) 100%)",
    glow: "radial-gradient(circle at 50% 22%, rgba(255,214,144,0.3), transparent 34%)",
    horizon: "rgba(121,55,31,0.8)",
    ground: "rgba(35,17,14,0.94)",
    accent: "rgba(255,216,155,0.95)",
    pattern:
      "radial-gradient(circle at 24% 26%, rgba(255,250,255,0.13) 0 2px, transparent 3px), radial-gradient(circle at 72% 18%, rgba(255,250,255,0.11) 0 2px, transparent 3px)",
  },
  seawing: {
    sky: "linear-gradient(180deg, rgba(16,74,113,0.96) 0%, rgba(26,132,166,0.76) 40%, rgba(5,29,55,1) 100%)",
    glow: "radial-gradient(circle at 52% 26%, rgba(145,255,248,0.3), transparent 38%)",
    horizon: "rgba(18,84,106,0.8)",
    ground: "rgba(7,24,44,0.96)",
    accent: "rgba(172,246,255,0.95)",
    pattern:
      "radial-gradient(circle at 16% 22%, rgba(188,255,255,0.18) 0 2px, transparent 3px), radial-gradient(circle at 78% 30%, rgba(188,255,255,0.14) 0 2px, transparent 3px), radial-gradient(circle at 66% 74%, rgba(188,255,255,0.14) 0 2px, transparent 3px)",
  },
  rainwing: {
    sky: "linear-gradient(180deg, rgba(83,118,26,0.94) 0%, rgba(150,178,46,0.7) 34%, rgba(24,54,25,0.98) 100%)",
    glow: "radial-gradient(circle at 50% 28%, rgba(230,255,154,0.3), transparent 35%)",
    horizon: "rgba(66,109,39,0.8)",
    ground: "rgba(20,47,26,0.96)",
    accent: "rgba(248,255,186,0.94)",
    pattern:
      "radial-gradient(circle at 24% 20%, rgba(255,222,122,0.15) 0 2px, transparent 3px), radial-gradient(circle at 76% 18%, rgba(255,222,122,0.15) 0 2px, transparent 3px), radial-gradient(circle at 64% 54%, rgba(255,222,122,0.12) 0 2px, transparent 3px)",
  },
  icewing: {
    sky: "linear-gradient(180deg, rgba(34,71,131,0.96) 0%, rgba(92,184,234,0.74) 38%, rgba(6,32,70,1) 100%)",
    glow: "radial-gradient(circle at 50% 20%, rgba(232,247,255,0.38), transparent 32%)",
    horizon: "rgba(86,145,196,0.76)",
    ground: "rgba(9,30,63,0.97)",
    accent: "rgba(242,252,255,0.97)",
    pattern:
      "radial-gradient(circle at 20% 26%, rgba(255,255,255,0.24) 0 1.5px, transparent 3px), radial-gradient(circle at 78% 20%, rgba(255,255,255,0.2) 0 1.5px, transparent 3px), radial-gradient(circle at 62% 70%, rgba(255,255,255,0.18) 0 1.5px, transparent 3px)",
  },
  nightwing: {
    sky: "linear-gradient(180deg, rgba(18,20,52,0.98) 0%, rgba(54,46,109,0.72) 38%, rgba(8,9,20,1) 100%)",
    glow: "radial-gradient(circle at 50% 20%, rgba(177,150,255,0.32), transparent 32%)",
    horizon: "rgba(48,42,78,0.74)",
    ground: "rgba(8,9,19,0.98)",
    accent: "rgba(209,197,255,0.97)",
    pattern:
      "radial-gradient(circle at 16% 18%, rgba(255,255,255,0.22) 0 1.5px, transparent 3px), radial-gradient(circle at 42% 12%, rgba(255,255,255,0.16) 0 1.5px, transparent 3px), radial-gradient(circle at 72% 22%, rgba(255,255,255,0.18) 0 1.5px, transparent 3px), radial-gradient(circle at 82% 10%, rgba(255,255,255,0.12) 0 1.5px, transparent 3px)",
  },
  silkwing: {
    sky: "linear-gradient(180deg, rgba(126,71,145,0.95) 0%, rgba(230,150,200,0.7) 36%, rgba(46,24,52,0.98) 100%)",
    glow: "radial-gradient(circle at 50% 24%, rgba(255,224,247,0.32), transparent 35%)",
    horizon: "rgba(136,94,149,0.74)",
    ground: "rgba(44,24,49,0.97)",
    accent: "rgba(255,232,244,0.96)",
    pattern:
      "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.16) 0 2px, transparent 3px), radial-gradient(circle at 78% 16%, rgba(255,228,255,0.18) 0 2px, transparent 3px), radial-gradient(circle at 64% 64%, rgba(255,228,255,0.12) 0 2px, transparent 3px)",
  },
  hivewing: {
    sky: "linear-gradient(180deg, rgba(135,78,21,0.95) 0%, rgba(210,160,54,0.7) 38%, rgba(44,29,14,0.98) 100%)",
    glow: "radial-gradient(circle at 50% 24%, rgba(255,226,127,0.28), transparent 35%)",
    horizon: "rgba(147,102,33,0.76)",
    ground: "rgba(36,24,13,0.96)",
    accent: "rgba(255,234,151,0.95)",
    pattern:
      "radial-gradient(circle at 20% 18%, rgba(255,234,151,0.12) 0 2px, transparent 3px), radial-gradient(circle at 76% 16%, rgba(255,234,151,0.12) 0 2px, transparent 3px)",
  },
  leafwing: {
    sky: "linear-gradient(180deg, rgba(28,86,52,0.96) 0%, rgba(87,160,81,0.72) 36%, rgba(12,39,26,0.98) 100%)",
    glow: "radial-gradient(circle at 50% 26%, rgba(174,255,161,0.3), transparent 35%)",
    horizon: "rgba(44,104,57,0.78)",
    ground: "rgba(12,38,24,0.97)",
    accent: "rgba(205,255,188,0.94)",
    pattern:
      "radial-gradient(circle at 14% 18%, rgba(187,255,180,0.16) 0 2px, transparent 3px), radial-gradient(circle at 80% 22%, rgba(187,255,180,0.14) 0 2px, transparent 3px), radial-gradient(circle at 66% 64%, rgba(187,255,180,0.1) 0 2px, transparent 3px)",
  },
};

export function CanonBackdrop({
  tribe,
  className = "",
  poster = false,
  spotlight = true,
}: {
  tribe: TribeSlug;
  className?: string;
  poster?: boolean;
  spotlight?: boolean;
}) {
  const theme = TRIBE_THEME[tribe];

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute inset-0" style={{ background: theme.sky }} />
      <div className="absolute inset-0 opacity-80" style={{ background: theme.glow }} />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: theme.pattern,
          backgroundSize: poster ? "240px 240px" : "280px 280px",
          animation: "fog-drift 24s ease-in-out infinite alternate",
        }}
      />

      {spotlight && (
        <div
          className="absolute left-1/2 top-[22%] h-[44%] w-[44%] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: theme.accent, opacity: 0.18 }}
        />
      )}

      <svg
        viewBox="0 0 1200 800"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 560 C140 500 250 520 360 560 S580 625 720 560 970 470 1200 540 L1200 800 0 800 Z"
          fill={theme.horizon}
        />
        <path
          d="M0 640 C170 560 300 610 445 650 S730 730 930 650 1060 590 1200 650 L1200 800 0 800 Z"
          fill={theme.ground}
        />

        {tribe === "nightwing" && (
          <>
            <circle cx="470" cy="122" r="28" fill="rgba(255,255,255,0.88)" />
            <circle cx="590" cy="98" r="44" fill="rgba(226,220,255,0.94)" />
            <circle cx="720" cy="132" r="22" fill="rgba(255,255,255,0.78)" />
            <path d="M170 550 L285 360 L420 550 Z" fill="rgba(16,16,29,0.95)" />
            <path d="M640 545 L770 320 L930 545 Z" fill="rgba(10,10,20,0.95)" />
          </>
        )}

        {tribe === "icewing" && (
          <>
            <path d="M120 620 L240 380 L320 620 Z" fill="rgba(210,243,255,0.45)" />
            <path d="M835 610 L960 340 L1050 610 Z" fill="rgba(220,248,255,0.4)" />
            <path d="M240 650 L360 450 L440 650 Z" fill="rgba(172,228,255,0.32)" />
          </>
        )}

        {tribe === "rainwing" && (
          <>
            <path
              d="M105 760 C160 640 190 520 170 250 C245 380 285 520 300 760 Z"
              fill="rgba(43,92,40,0.88)"
            />
            <path
              d="M1035 760 C1000 620 970 500 980 270 C910 410 860 560 830 760 Z"
              fill="rgba(38,82,38,0.86)"
            />
          </>
        )}

        {tribe === "seawing" && (
          <>
            <path
              d="M0 465 C160 430 300 520 480 485 670 448 840 370 1200 448"
              fill="none"
              stroke="rgba(179,255,255,0.24)"
              strokeWidth="22"
            />
            <path
              d="M0 540 C180 500 320 590 490 552 655 514 880 450 1200 528"
              fill="none"
              stroke="rgba(179,255,255,0.16)"
              strokeWidth="18"
            />
          </>
        )}

        {tribe === "sandwing" && (
          <>
            <path
              d="M0 620 C180 520 260 600 430 620 S730 700 900 612 1080 540 1200 590"
              fill="none"
              stroke="rgba(255,214,138,0.28)"
              strokeWidth="34"
            />
            <path
              d="M0 690 C150 620 285 670 430 695 S720 760 930 700 1050 645 1200 675"
              fill="none"
              stroke="rgba(255,214,138,0.16)"
              strokeWidth="22"
            />
          </>
        )}

        {(tribe === "silkwing" || tribe === "hivewing") && (
          <>
            <rect x="220" y="280" width="85" height="265" rx="24" fill="rgba(37,24,18,0.46)" />
            <rect x="330" y="210" width="110" height="335" rx="26" fill="rgba(44,26,17,0.54)" />
            <rect x="765" y="190" width="126" height="355" rx="30" fill="rgba(44,26,17,0.54)" />
            <rect x="915" y="270" width="90" height="275" rx="24" fill="rgba(37,24,18,0.46)" />
          </>
        )}

        {tribe === "leafwing" && (
          <>
            <path
              d="M120 760 C210 680 245 520 225 240 C300 370 340 560 352 760 Z"
              fill="rgba(24,67,36,0.88)"
            />
            <path
              d="M1000 760 C930 640 900 480 915 240 C850 360 810 560 780 760 Z"
              fill="rgba(22,63,34,0.9)"
            />
            <path
              d="M320 710 C420 630 460 500 440 300"
              fill="none"
              stroke="rgba(132,227,132,0.34)"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </>
        )}

        <g
          transform={poster ? "translate(905 210) scale(0.8)" : "translate(910 200) scale(0.92)"}
          opacity="0.78"
        >
          <ellipse cx="0" cy="98" rx="74" ry="30" fill="rgba(0,0,0,0.22)" />
          <path
            d="M-18 54 C-4 20 26 5 66 18 C81 10 96 8 108 14 C95 20 86 26 82 40 C102 44 123 56 148 72 C104 78 69 84 38 88 C10 104 -16 124 -48 150 C-36 112 -28 87 -18 54 Z"
            fill="rgba(8,10,16,0.82)"
          />
          <path d="M8 94 C-28 78 -52 49 -78 11 C-16 29 28 52 58 79 Z" fill="rgba(8,10,16,0.82)" />
          <path d="M36 92 C62 62 97 26 140 -6 C120 42 96 72 64 99 Z" fill="rgba(8,10,16,0.82)" />
          <circle cx="112" cy="37" r="5" fill={theme.accent} opacity="0.7" />
        </g>
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.12) 42%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
