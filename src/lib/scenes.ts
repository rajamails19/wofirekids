import skywing from "@/assets/scene-skywing.jpg";
import seawing from "@/assets/scene-seawing.jpg";
import mudwing from "@/assets/scene-mudwing.jpg";
import silkwing from "@/assets/scene-silkwing.jpg";
import hivewing from "@/assets/scene-hivewing.jpg";
import leafwing from "@/assets/scene-leafwing.jpg";
import kidIcewing from "@/assets/fan/scene-icewing-kid.jpg";
import kidNightwing from "@/assets/fan/scene-nightwing-five-moons.jpg";
import kidRainwing from "@/assets/fan/scene-rainwing-kid.jpg";
import kidSandwing from "@/assets/fan/scene-sandwing-kid.jpg";
import type { TribeSlug } from "./dragons";

export const SCENES: Record<TribeSlug, string> = {
  nightwing: kidNightwing,
  skywing,
  rainwing: kidRainwing,
  seawing,
  icewing: kidIcewing,
  sandwing: kidSandwing,
  mudwing,
  silkwing,
  hivewing,
  leafwing,
};
