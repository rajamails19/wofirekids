import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

const PATHS = [
  "/",
  "/tribes",
  "/characters",
  "/map",
  "/builder",
  "/quiz",
  "/story",
  "/cards",
  "/academy",
  "/achievements",
  "/parents",
  "/tribes/nightwing",
  "/tribes/skywing",
  "/tribes/rainwing",
  "/tribes/seawing",
  "/tribes/icewing",
  "/tribes/sandwing",
  "/tribes/mudwing",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...PATHS.map(
            (p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`,
          ),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
