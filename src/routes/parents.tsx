import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Clock, BookOpen, Wand2, Heart, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/parents")({
  head: () => ({
    meta: [
      { title: "Parent Dashboard — DragonHub" },
      {
        name: "description",
        content:
          "A safe, kid-friendly overview of reading progress, created dragons, and favorite content.",
      },
    ],
  }),
  component: ParentsPage,
});

function ParentsPage() {
  const [stats, setStats] = useState({ dragons: 0, favs: 0, lessons: 0 });
  useEffect(() => {
    try {
      const dragons = JSON.parse(localStorage.getItem("wof-dragons") ?? "[]").length;
      const favs = Object.values(JSON.parse(localStorage.getItem("wof-favs") ?? "{}")).filter(
        Boolean,
      ).length;
      const lessons = Object.values(
        JSON.parse(localStorage.getItem("wof-progress") ?? "{}"),
      ).filter(Boolean).length;
      setStats({ dragons, favs, lessons });
    } catch (error) {
      console.warn("Unable to load parent dashboard stats.", error);
    }
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" /> Grown-ups area
        </div>
        <h1 className="font-display text-4xl font-black sm:text-6xl">
          <span className="text-gradient-magic">Parent Dashboard</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          A kid-safe overview of your young explorer's adventures.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={<Wand2 />} label="Dragons created" value={stats.dragons} />
        <Stat icon={<Heart />} label="Favorite dragons" value={stats.favs} />
        <Stat icon={<BookOpen />} label="Lessons read" value={stats.lessons} />
        <Stat
          icon={<Clock />}
          label="Adventure time"
          value={`${5 + stats.dragons * 3 + stats.lessons * 2}m`}
        />
      </div>

      <div className="mt-10 rounded-3xl border border-border/60 bg-card p-8 shadow-magic">
        <h2 className="font-display text-2xl font-bold">
          <span className="text-gradient-magic">Safe & kid-friendly</span>
        </h2>
        <ul className="mt-4 space-y-3 text-sm">
          <li>✦ No ads, no tracking, no chat with strangers.</li>
          <li>✦ All creations are saved locally on this device.</li>
          <li>✦ Future-ready support for sign-in, family plans, and AI-generated dragon art.</li>
        </ul>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Card
          title="Future: Sign in"
          desc="Save dragons across devices with a safe family account."
        >
          Coming soon
        </Card>
        <Card
          title="Future: Subscriptions"
          desc="Premium adventures, story packs and exclusive cards."
        >
          Coming soon
        </Card>
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/"
          className="rounded-full bg-gradient-magic px-6 py-3 font-bold text-primary-foreground shadow-magic"
        >
          Back to the kingdom
        </Link>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-magic">
      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-magic text-primary-foreground shadow-glow">
        {icon}
      </div>
      <div className="mt-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="font-display text-3xl font-black">{value}</div>
    </div>
  );
}
function Card({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-card p-6">
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      <div className="mt-3 inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-bold">
        {children}
      </div>
    </div>
  );
}
