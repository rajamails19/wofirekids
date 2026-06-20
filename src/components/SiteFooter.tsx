import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-magic">🐉</div>
            <span className="font-display text-lg font-bold">DragonHub</span>
          </div>
          <p className="text-sm text-muted-foreground">
            A magical home for young dragon explorers. Discover tribes, create dragons, and write
            your own legends.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/tribes" className="hover:text-foreground">
                Tribes
              </Link>
            </li>
            <li>
              <Link to="/characters" className="hover:text-foreground">
                Characters
              </Link>
            </li>
            <li>
              <Link to="/map" className="hover:text-foreground">
                World Map
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider">Create</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/builder" className="hover:text-foreground">
                Dragon Builder
              </Link>
            </li>
            <li>
              <Link to="/story" className="hover:text-foreground">
                Story Generator
              </Link>
            </li>
            <li>
              <Link to="/cards" className="hover:text-foreground">
                Card Collection
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider">
            Grown-ups
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/parents" className="hover:text-foreground">
                Parent Dashboard
              </Link>
            </li>
            <li>
              <Link to="/achievements" className="hover:text-foreground">
                Achievements
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        Made with 🔥 for young dragon hearts. © {new Date().getFullYear()} DragonHub.
      </div>
    </footer>
  );
}
