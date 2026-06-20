import hivewingArt from "@/assets/fan/character-hivewing.jpg";
import leafwingArt from "@/assets/fan/character-leafwing.jpg";
import silkwingArt from "@/assets/fan/character-silkwing.jpg";
import type { TribeSlug } from "./dragons";

export const CHARACTER_ART: Partial<Record<TribeSlug, string>> = {
  hivewing: hivewingArt,
  leafwing: leafwingArt,
  silkwing: silkwingArt,
};
