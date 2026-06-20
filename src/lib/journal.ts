export type JournalQuizResult = {
  tribe: string;
  tribeName: string;
  date: string;
};

export type JournalStory = {
  title: string;
  tribe: string;
  theme: string;
  date: string;
};

export type JournalData = {
  visitedTribes: string[];
  openedMaps: string[];
  viewedPics: string[];
  quizResults: JournalQuizResult[];
  stories: JournalStory[];
  updatedAt: string;
};

const JOURNAL_KEY = "wof-journal";

const EMPTY_JOURNAL: JournalData = {
  visitedTribes: [],
  openedMaps: [],
  viewedPics: [],
  quizResults: [],
  stories: [],
  updatedAt: new Date(0).toISOString(),
};

export function readJournal(): JournalData {
  if (typeof window === "undefined") return EMPTY_JOURNAL;

  try {
    const raw = window.localStorage.getItem(JOURNAL_KEY);
    if (!raw) return EMPTY_JOURNAL;
    const parsed = JSON.parse(raw) as Partial<JournalData>;

    return {
      visitedTribes: asStrings(parsed.visitedTribes),
      openedMaps: asStrings(parsed.openedMaps),
      viewedPics: asStrings(parsed.viewedPics),
      quizResults: Array.isArray(parsed.quizResults) ? parsed.quizResults : [],
      stories: Array.isArray(parsed.stories) ? parsed.stories : [],
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
    };
  } catch (error) {
    console.warn("Unable to read explorer journal.", error);
    return EMPTY_JOURNAL;
  }
}

export function writeJournal(journal: JournalData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(JOURNAL_KEY, JSON.stringify(journal));
}

export function trackJournalItem(
  key: "visitedTribes" | "openedMaps" | "viewedPics",
  value: string,
) {
  if (!value) return;

  const journal = readJournal();
  const next = {
    ...journal,
    [key]: unique([...journal[key], value]),
    updatedAt: new Date().toISOString(),
  };

  writeJournal(next);
}

export function trackQuizResult(result: Omit<JournalQuizResult, "date">) {
  const journal = readJournal();
  const next: JournalData = {
    ...journal,
    quizResults: [{ ...result, date: new Date().toISOString() }, ...journal.quizResults].slice(
      0,
      8,
    ),
    updatedAt: new Date().toISOString(),
  };

  writeJournal(next);
}

export function trackStory(story: Omit<JournalStory, "date">) {
  const journal = readJournal();
  const next: JournalData = {
    ...journal,
    stories: [{ ...story, date: new Date().toISOString() }, ...journal.stories].slice(0, 12),
    updatedAt: new Date().toISOString(),
  };

  writeJournal(next);
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function asStrings(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}
