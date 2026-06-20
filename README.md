# WingsOfFire

A Wings of Fire fan experience built with TanStack Start, React, Vite, and Tailwind CSS.

## Local Development

```bash
npm install
npm run dev
```

The local app starts on port `8080` when available. If that port is busy, Vite will choose the next open port.

## Production Build

```bash
npm run build
```

This project is configured with Nitro's `vercel` preset in `vite.config.ts`, so Vercel can build and serve the TanStack Start SSR output.

## Vercel

Recommended settings:

- Framework preset: `Other`
- Install command: `npm install`
- Build command: `npm run build`

No environment variables are required for the current app.
