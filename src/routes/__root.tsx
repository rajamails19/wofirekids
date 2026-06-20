import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-3xl bg-gradient-magic text-4xl shadow-glow">
          🐉
        </div>
        <h1 className="font-display text-6xl font-black text-gradient-magic">404</h1>
        <h2 className="mt-3 font-display text-2xl font-bold">This path is uncharted</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Even the most curious dragons get lost sometimes. Let's fly back home.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-gradient-magic px-6 py-3 text-sm font-bold text-primary-foreground shadow-magic"
        >
          Return to the kingdom
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-bold">A dragon hiccuped</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went sideways. Try again, or fly home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-gradient-magic px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-magic"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-bold"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DragonHub — Wings of Fire Adventure" },
      {
        name: "description",
        content:
          "Explore dragon tribes, create your own dragon, take the tribe quiz, and embark on legendary adventures.",
      },
      { name: "theme-color", content: "#7c3aed" },
      { property: "og:title", content: "DragonHub — Wings of Fire Adventure" },
      {
        property: "og:description",
        content:
          "Explore dragon tribes, create your own dragon, take the tribe quiz, and embark on legendary adventures.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "DragonHub — Wings of Fire Adventure" },
      {
        name: "twitter:description",
        content:
          "Explore dragon tribes, create your own dragon, take the tribe quiz, and embark on legendary adventures.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/51782d25-94dd-450e-b1f0-032dae03d864/id-preview-effb3164--b20b9811-1cc2-4557-ba64-c97014b682d7.lovable.app-1781284526461.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/51782d25-94dd-450e-b1f0-032dae03d864/id-preview-effb3164--b20b9811-1cc2-4557-ba64-c97014b682d7.lovable.app-1781284526461.png",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Quicksand:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
