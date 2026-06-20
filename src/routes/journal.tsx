import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookOpen, Brain, Compass, Heart, Map, Sparkles, Trophy } from "lucide-react";
import { TRIBES, type TribeSlug } from "@/lib/dragons";
import { readJournal, type JournalData } from "@/lib/journal";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Explorer Journal — DragonHub" },
      {
        name: "description",
        content:
          "A dragon explorer passport that remembers discovered tribes, opened maps, quiz results, created dragons, favorite cards and generated stories.",
      },
    ],
  }),
  component: JournalPage,
});

type SavedDragon = {
  name?: string;
  tribe?: TribeSlug;
  body?: string;
  ability?: string;
};

const MAP_CHAPTERS = ["The Dragon Kingdoms", "Map 1", "Map 2", "Map 3"];

function JournalPage() {
  const [journal, setJournal] = useState<JournalData>(() => readJournal());
  const [dragons, setDragons] = useState<SavedDragon[]>([]);
  const [favoriteCards, setFavoriteCards] = useState<string[]>([]);
  const [lessons, setLessons] = useState<string[]>([]);

  useEffect(() => {
    const load = () => {
      setJournal(readJournal());
      setDragons(readArray<SavedDragon>("wof-dragons"));
      setFavoriteCards(
        Object.entries(readRecord<boolean>("wof-favs"))
          .filter(([, favorite]) => favorite)
          .map(([slug]) => slug),
      );
      setLessons(
        Object.entries(readRecord<boolean>("wof-progress"))
          .filter(([, done]) => done)
          .map(([lesson]) => lesson),
      );
    };

    load();
    window.addEventListener("focus", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("focus", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  const latestQuiz = journal.quizResults[0];
  const visitedTribes = new Set(journal.visitedTribes);
  const openedMaps = new Set(journal.openedMaps);
  const discoveryCount =
    visitedTribes.size +
    openedMaps.size +
    journal.viewedPics.length +
    journal.stories.length +
    dragons.length +
    favoriteCards.length +
    lessons.length +
    (latestQuiz ? 1 : 0);
  const rank = getExplorerRank(discoveryCount);
  const tribeProgress = Math.round((visitedTribes.size / TRIBES.length) * 100);
  const mapProgress = Math.round((openedMaps.size / MAP_CHAPTERS.length) * 100);

  return (
    <div className="relative overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_at_top,_hsl(var(--accent)/.22),_transparent_62%)]" />

      <section className="mx-auto max-w-6xl">
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-accent shadow-magic backdrop-blur">
            <BookOpen className="h-4 w-4" />
            Academy Notebook
          </div>
          <h1 className="font-display text-4xl font-black sm:text-6xl">
            <span className="text-gradient-magic">Explorer Journal</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            A living dragon passport that remembers discoveries, creations, favorite cards, quiz
            results and story scrolls.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-magic sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-accent">
                  Current Rank
                </div>
                <h2 className="mt-2 font-display text-4xl font-black">{rank}</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                  Every tribe page, map, picture, quiz result, saved dragon and story adds another
                  mark to the scroll.
                </p>
              </div>
              <div className="grid h-24 w-24 place-items-center rounded-3xl bg-gradient-magic text-5xl text-primary-foreground shadow-glow">
                🐉
              </div>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <BigStat label="Discoveries" value={discoveryCount} />
              <BigStat label="Tribes Found" value={`${visitedTribes.size}/${TRIBES.length}`} />
              <BigStat label="Maps Opened" value={`${openedMaps.size}/${MAP_CHAPTERS.length}`} />
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-magic sm:p-8">
            <div className="text-xs font-bold uppercase tracking-widest text-accent">
              Next Quests
            </div>
            <div className="mt-4 space-y-4">
              <QuestRow
                icon={<Compass className="h-4 w-4" />}
                title="Visit every tribe"
                progress={tribeProgress}
                label={`${visitedTribes.size} of ${TRIBES.length}`}
                to="/tribes"
              />
              <QuestRow
                icon={<Map className="h-4 w-4" />}
                title="Open every map"
                progress={mapProgress}
                label={`${openedMaps.size} of ${MAP_CHAPTERS.length}`}
                to="/map"
              />
              <QuestRow
                icon={<Brain className="h-4 w-4" />}
                title="Take the tribe quiz"
                progress={latestQuiz ? 100 : 0}
                label={latestQuiz ? latestQuiz.tribeName : "Not taken yet"}
                to="/quiz"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <Panel title="Tribe Passport" icon={<Compass className="h-5 w-5" />}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {TRIBES.map((tribe) => {
              const unlocked = visitedTribes.has(tribe.slug);
              return (
                <Link
                  key={tribe.slug}
                  to="/tribes/$slug"
                  params={{ slug: tribe.slug }}
                  className={`rounded-2xl border p-3 transition hover:-translate-y-0.5 ${
                    unlocked
                      ? "border-border/60 bg-background shadow-magic"
                      : "border-border/40 bg-background/35 opacity-65"
                  }`}
                >
                  <div
                    className="grid h-10 w-10 place-items-center rounded-xl text-xl text-white"
                    style={{
                      background: unlocked ? `var(--${tribe.colorVar})` : "hsl(var(--muted))",
                    }}
                  >
                    {unlocked ? tribe.emoji : "?"}
                  </div>
                  <div className="mt-2 text-sm font-bold">{tribe.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {unlocked ? "Stamped" : "Undiscovered"}
                  </div>
                </Link>
              );
            })}
          </div>
        </Panel>

        <Panel title="Map Chapters" icon={<Map className="h-5 w-5" />}>
          <div className="grid gap-3 sm:grid-cols-2">
            {MAP_CHAPTERS.map((mapName) => {
              const unlocked = openedMaps.has(mapName);
              return (
                <Link
                  key={mapName}
                  to="/map"
                  className={`rounded-2xl border p-4 transition hover:-translate-y-0.5 ${
                    unlocked
                      ? "border-border/60 bg-background shadow-magic"
                      : "border-border/40 bg-background/35"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-display text-xl font-bold">{mapName}</div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {unlocked ? "Opened in large view" : "Tap a map to stamp this page"}
                      </p>
                    </div>
                    <span className="text-2xl">{unlocked ? "✦" : "○"}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Panel>
      </section>

      <section className="mx-auto mt-6 grid max-w-6xl gap-6 lg:grid-cols-3">
        <Panel title="Created Dragons" icon={<Sparkles className="h-5 w-5" />}>
          {dragons.length ? (
            <div className="space-y-3">
              {dragons
                .slice(-5)
                .reverse()
                .map((dragon, index) => {
                  const tribe = TRIBES.find((item) => item.slug === dragon.tribe);
                  return (
                    <div
                      key={`${dragon.name}-${index}`}
                      className="rounded-2xl bg-background/70 p-4"
                    >
                      <div className="text-xs font-bold uppercase tracking-widest text-accent">
                        {tribe?.name ?? "Mystery Tribe"}
                      </div>
                      <div className="font-display text-xl font-bold">
                        {dragon.name || "Unnamed Dragon"}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {dragon.body ?? "Mystic"} scales · {dragon.ability ?? "secret power"}
                      </p>
                    </div>
                  );
                })}
            </div>
          ) : (
            <EmptyNote to="/builder" text="Create a dragon to hatch the first journal entry." />
          )}
        </Panel>

        <Panel title="Quiz Result" icon={<Brain className="h-5 w-5" />}>
          {latestQuiz ? (
            <div className="rounded-2xl bg-gradient-magic p-5 text-primary-foreground shadow-glow">
              <div className="text-xs font-bold uppercase tracking-widest opacity-80">
                Latest result
              </div>
              <div className="mt-2 font-display text-3xl font-black">{latestQuiz.tribeName}</div>
              <p className="mt-2 text-sm opacity-90">
                Recorded {formatDate(latestQuiz.date)} after finishing the tribe quiz.
              </p>
            </div>
          ) : (
            <EmptyNote to="/quiz" text="Take the quiz to reveal a dragon identity stamp." />
          )}
        </Panel>

        <Panel title="Favorite Cards" icon={<Heart className="h-5 w-5" />}>
          {favoriteCards.length ? (
            <div className="flex flex-wrap gap-2">
              {favoriteCards.map((slug) => (
                <span key={slug} className="rounded-full bg-secondary px-3 py-1 text-sm font-bold">
                  {titleCase(slug)}
                </span>
              ))}
            </div>
          ) : (
            <EmptyNote to="/cards" text="Favorite dragon cards to fill this shelf." />
          )}
        </Panel>
      </section>

      <section className="mx-auto mt-6 grid max-w-6xl gap-6 lg:grid-cols-2">
        <Panel title="Story Scrolls" icon={<BookOpen className="h-5 w-5" />}>
          {journal.stories.length ? (
            <div className="space-y-3">
              {journal.stories.slice(0, 5).map((story) => (
                <div
                  key={`${story.title}-${story.date}`}
                  className="rounded-2xl bg-background/70 p-4"
                >
                  <div className="text-xs font-bold uppercase tracking-widest text-accent">
                    {story.tribe} · {story.theme}
                  </div>
                  <div className="mt-1 font-display text-xl font-bold">{story.title}</div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Written {formatDate(story.date)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyNote to="/story" text="Generate a story to add the first scroll." />
          )}
        </Panel>

        <Panel title="Picture Memories" icon={<Trophy className="h-5 w-5" />}>
          {journal.viewedPics.length ? (
            <div className="grid gap-2 sm:grid-cols-2">
              {journal.viewedPics
                .slice(-8)
                .reverse()
                .map((pic) => (
                  <Link
                    key={pic}
                    to="/pics"
                    className="rounded-2xl bg-background/70 px-4 py-3 text-sm font-bold transition hover:-translate-y-0.5 hover:shadow-magic"
                  >
                    {pic}
                  </Link>
                ))}
            </div>
          ) : (
            <EmptyNote to="/pics" text="Open gallery pictures to remember favorite scenes." />
          )}
        </Panel>
      </section>

      <section className="mx-auto mt-6 max-w-6xl">
        <div className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-magic sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-accent">
                Academy Reading
              </div>
              <h2 className="font-display text-2xl font-black">
                {lessons.length} lesson{lessons.length === 1 ? "" : "s"} completed
              </h2>
            </div>
            <Link
              to="/academy"
              className="rounded-full bg-gradient-magic px-5 py-3 text-sm font-bold text-primary-foreground shadow-magic"
            >
              Visit Academy →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[2rem] border border-border/60 bg-card p-5 shadow-magic sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-magic text-primary-foreground shadow-glow">
          {icon}
        </div>
        <h2 className="font-display text-2xl font-black">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function BigStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-background/70 p-4">
      <div className="font-display text-3xl font-black text-gradient-magic">{value}</div>
      <div className="mt-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function QuestRow({
  icon,
  title,
  progress,
  label,
  to,
}: {
  icon: React.ReactNode;
  title: string;
  progress: number;
  label: string;
  to: "/" | "/tribes" | "/map" | "/quiz";
}) {
  return (
    <Link to={to} className="block rounded-2xl bg-background/70 p-4 transition hover:shadow-magic">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-secondary">{icon}</div>
          <div>
            <div className="font-bold">{title}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        </div>
        <div className="font-display text-xl font-black text-gradient-magic">{progress}%</div>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full bg-gradient-magic transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </Link>
  );
}

function EmptyNote({
  to,
  text,
}: {
  to: "/builder" | "/quiz" | "/cards" | "/story" | "/pics";
  text: string;
}) {
  return (
    <Link
      to={to}
      className="block rounded-2xl border border-dashed border-border bg-background/45 p-5 text-sm font-semibold text-muted-foreground transition hover:border-primary hover:text-foreground"
    >
      {text}
    </Link>
  );
}

function getExplorerRank(points: number) {
  if (points >= 45) return "Legendary Dragon Scholar";
  if (points >= 25) return "Jade Mountain Explorer";
  if (points >= 12) return "Kingdom Cartographer";
  if (points >= 4) return "New Dragon Scout";
  return "Fresh Hatchling";
}

function readArray<T>(key: string): T[] {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch (error) {
    console.warn(`Unable to read ${key}.`, error);
    return [];
  }
}

function readRecord<T>(key: string): Record<string, T> {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Record<string, T>) : {};
  } catch (error) {
    console.warn(`Unable to read ${key}.`, error);
    return {};
  }
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(
    new Date(date),
  );
}

function titleCase(value: string) {
  return value.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
