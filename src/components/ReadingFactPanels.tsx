import { BookOpen, ChevronDown, Sparkles } from "lucide-react";

export type ReadingFactPanel = {
  title: string;
  body: string;
  note?: string;
  label?: "Canon" | "Your World" | "Explorer Tip";
};

export function ReadingFactPanels({
  eyebrow = "Reading Mode",
  title = "Did You Know?",
  panels,
  variant = "framed",
}: {
  eyebrow?: string;
  title?: string;
  panels: ReadingFactPanel[];
  variant?: "framed" | "embedded";
}) {
  if (panels.length === 0) return null;

  return (
    <section
      className={
        variant === "framed" ? "rounded-3xl border border-border/60 bg-card p-5 shadow-magic" : ""
      }
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-magic text-primary-foreground shadow-glow">
          <BookOpen className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs font-black uppercase tracking-[0.25em] text-accent">
            {eyebrow}
          </div>
          <h2 className="font-display text-2xl font-black">
            <span className="text-gradient-magic">{title}</span>
          </h2>
        </div>
      </div>

      <div className="space-y-3">
        {panels.map((panel) => (
          <details
            key={panel.title}
            className="group rounded-2xl border border-border/60 bg-background/55 p-4 transition open:bg-secondary/45"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
              <span>
                <span className="mb-1 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-accent" />
                  {panel.label ?? "Canon"}
                </span>
                <span className="font-display text-lg font-black">{panel.title}</span>
              </span>
              <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{panel.body}</p>
            {panel.note && (
              <p className="mt-2 text-xs italic leading-6 text-muted-foreground/75">
                ({panel.note})
              </p>
            )}
          </details>
        ))}
      </div>
    </section>
  );
}
