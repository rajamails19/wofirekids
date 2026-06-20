import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Trophy, Map, BookOpen, Compass, Brain } from "lucide-react";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — DragonHub" },
      {
        name: "description",
        content: "Earn dragon badges as you explore, learn, create and adventure.",
      },
    ],
  }),
  component: AchievementsPage,
});

function AchievementsPage() {
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
      console.warn("Unable to load achievement stats.", error);
    }
  }, []);

  const badges = [
    {
      name: "Explorer",
      desc: "Visit the world map",
      icon: <Map />,
      unlocked: true,
      color: "rainwing",
    },
    {
      name: "Story Master",
      desc: "Create your first dragon",
      icon: <BookOpen />,
      unlocked: stats.dragons >= 1,
      color: "skywing",
    },
    {
      name: "Dragon Expert",
      desc: "Favorite 3 dragons",
      icon: <Compass />,
      unlocked: stats.favs >= 3,
      color: "seawing",
    },
    {
      name: "Cartographer",
      desc: "Tap every kingdom on the map",
      icon: <Trophy />,
      unlocked: false,
      color: "sandwing",
    },
    {
      name: "Quiz Champion",
      desc: "Finish the dragon quiz",
      icon: <Brain />,
      unlocked: false,
      color: "nightwing",
    },
    {
      name: "Scholar",
      desc: "Read 5 academy lessons",
      icon: <BookOpen />,
      unlocked: stats.lessons >= 5,
      color: "mudwing",
    },
  ];

  const unlocked = badges.filter((b) => b.unlocked).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="text-center">
        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
          Achievements
        </div>
        <h1 className="font-display text-4xl font-black sm:text-6xl">
          <span className="text-gradient-magic">Earn Your Badges</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          You've unlocked <strong>{unlocked}</strong> of {badges.length} badges.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {badges.map((b, i) => (
          <div
            key={b.name}
            className={`relative overflow-hidden rounded-3xl border border-border/60 p-6 shadow-magic animate-fade-up ${b.unlocked ? "bg-card" : "bg-card/40"}`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div
              className={`mb-3 grid h-16 w-16 place-items-center rounded-2xl text-2xl text-white shadow-glow ${b.unlocked ? "" : "opacity-40 grayscale"}`}
              style={{ background: `var(--${b.color})` }}
            >
              {b.icon}
            </div>
            <h3 className="font-display text-xl font-bold">{b.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
            <div
              className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${b.unlocked ? "bg-gradient-magic text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
            >
              {b.unlocked ? "Unlocked ✦" : "Locked"}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl bg-gradient-magic p-8 text-center text-primary-foreground shadow-magic">
        <h2 className="font-display text-2xl font-bold">Keep exploring!</h2>
        <p className="mt-2 opacity-90">
          Every adventure brings you closer to mastering all seven tribes.
        </p>
        <Link
          to="/builder"
          className="mt-5 inline-flex rounded-full bg-background px-6 py-3 font-bold text-foreground"
        >
          Create another dragon →
        </Link>
      </div>
    </div>
  );
}
