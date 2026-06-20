import type { Character, Tribe, TribeSlug } from "@/lib/dragons";
import type { ReadingFactPanel } from "@/components/ReadingFactPanels";

const TRIBE_FACTS: Record<TribeSlug, ReadingFactPanel[]> = {
  mudwing: [
    {
      label: "Canon",
      title: "Sibling troops are everything",
      body: "MudWings hatch in groups called troops, and the oldest sibling is the bigwings. A troop is more than a family; it is a built-in team.",
    },
    {
      label: "Canon",
      title: "Built for marsh survival",
      body: "MudWings are strong, steady, fireproof, and able to hold their breath underwater for a long time. That makes wetland ambushes feel very natural for them.",
    },
  ],
  sandwing: [
    {
      label: "Canon",
      title: "The tail is the warning",
      body: "SandWings have a venomous barb at the end of their tails. In a desert duel, the tail can be just as dangerous as fire breath.",
    },
    {
      label: "Canon",
      title: "Queen Thorn changed history",
      body: "The SandWing war ended when Thorn became queen, which turned a long, messy succession battle into a new era for Pyrrhia.",
    },
  ],
  skywing: [
    {
      label: "Canon",
      title: "Born for the highest winds",
      body: "SkyWings have enormous wings and are known as some of the fastest, strongest fliers in Pyrrhia.",
    },
    {
      label: "Canon",
      title: "Firescales are rare and dangerous",
      body: "A firescales dragon like Peril burns anything she touches. It is amazing power, but also lonely and hard to control.",
    },
  ],
  seawing: [
    {
      label: "Canon",
      title: "Aquatic is a language of light",
      body: "SeaWings can flash glowing scale patterns to speak underwater. It is quiet, beautiful, and perfect for secret ocean messages.",
    },
    {
      label: "Canon",
      title: "Two palaces, two moods",
      body: "The Summer Palace feels bright and open, while the Deep Palace is hidden underwater where SeaWings are strongest.",
    },
  ],
  icewing: [
    {
      label: "Canon",
      title: "The ranking wall matters",
      body: "IceWings live with strict rankings from First Circle to Seventh Circle. It shapes how they think about honor, family, and success.",
    },
    {
      label: "Your World",
      title: "Royal frost style",
      body: "Your IceWing redesign leans into a colder, more regal look with extra spikes, a tiara, and heavy snowfall.",
      note: "In the actual books, IceWing royalty is important, but the exact tiara look is your version.",
    },
  ],
  rainwing: [
    {
      label: "Canon",
      title: "Color is emotion",
      body: "RainWing scales change color with mood and camouflage. A RainWing can show feelings on the outside before saying a word.",
    },
    {
      label: "Canon",
      title: "Fruit, sun, and venom",
      body: "RainWings may seem relaxed, but they have deadly venom and a rainforest lifestyle built around fruit, warmth, and trees.",
    },
  ],
  nightwing: [
    {
      label: "Canon",
      title: "Moonlight wakes the old gifts",
      body: "NightWing powers like mind reading and prophecy depend on hatching under moonlight, with stronger gifts under more moons.",
    },
    {
      label: "Your World",
      title: "Five-moon mystery",
      body: "Your NightWing rainforest sky has five moons, which makes the scene feel extra magical and powerful.",
      note: "In the actual books, there are only 3 moons.",
    },
  ],
  silkwing: [
    {
      label: "Canon",
      title: "Metamorphosis changes everything",
      body: "SilkWings hatch without wings and transform at age six. After metamorphosis, they gain four wings and can fly.",
    },
    {
      label: "Canon",
      title: "Flamesilk is legendary",
      body: "A rare SilkWing can spin glowing, burning silk. That makes flamesilks incredibly important and dangerous to control.",
    },
  ],
  hivewing: [
    {
      label: "Canon",
      title: "Not every weapon is the same",
      body: "HiveWings can have different powers: wrist stingers, tail barbs, acid, paralyzing venom, or extra armor. Every HiveWing can be a surprise.",
    },
    {
      label: "Canon",
      title: "The Hives are giant cities",
      body: "HiveWing homes rise above Pantala like huge dragon-built cities, connected by rules, patrols, and secrets.",
    },
  ],
  leafwing: [
    {
      label: "Canon",
      title: "Leafspeak listens back",
      body: "Some LeafWings can communicate with plants and command vines, roots, and trees. In the Poison Jungle, that is a superpower.",
    },
    {
      label: "Canon",
      title: "Hidden, not gone",
      body: "LeafWings were believed extinct after the Tree Wars, but many survived in secret inside the Poison Jungle.",
    },
  ],
};

const CHARACTER_EXTRA_FACTS: Record<string, ReadingFactPanel[]> = {
  clay: [
    {
      label: "Canon",
      title: "Clay is unusual for a prophecy hero",
      body: "Clay wins hearts by being gentle, hungry, loyal, and protective instead of trying to look scary all the time.",
    },
  ],
  moonwatcher: [
    {
      label: "Canon",
      title: "Two moons, two gifts",
      body: "Moonwatcher hatched under two full moons, which is why she has both mind reading and prophecy.",
    },
  ],
  darkstalker: [
    {
      label: "Canon",
      title: "Power can become a trap",
      body: "Darkstalker has huge magic and prophecy power, but his story warns that being powerful is not the same as being right.",
    },
  ],
};

export function getTribeReadingFacts(tribe: Tribe): ReadingFactPanel[] {
  return TRIBE_FACTS[tribe.slug];
}

export function getCharacterReadingFacts(character: Character, tribe: Tribe): ReadingFactPanel[] {
  const extras = CHARACTER_EXTRA_FACTS[character.slug] ?? [];
  return [
    ...extras,
    {
      label: "Canon",
      title: `${character.name}'s tribe clue`,
      body: `${character.name} is connected to the ${tribe.name}, whose world includes ${tribe.habitat.toLowerCase()}.`,
    },
    {
      label: "Explorer Tip",
      title: "Read the power list like a clue",
      body: `${character.name}'s powers point toward the kind of challenge this dragon is built for: ${character.powers.slice(0, 3).join(", ")}.`,
    },
    ...(character.tribe === "nightwing"
      ? [
          {
            label: "Your World" as const,
            title: "Extra-moon version",
            body: "Some NightWing scenes on this site use your five-moon idea to make the sky feel more mysterious.",
            note: "In the actual books, there are only 3 moons.",
          },
        ]
      : []),
  ];
}

export const MAIN_MAP_READING_FACTS: ReadingFactPanel[] = [
  {
    label: "Canon",
    title: "Pyrrhia is shaped by tribe territories",
    body: "The Ice Kingdom, Kingdom of Sand, Sky Kingdom, Mud Kingdom, Sea Kingdom, and rainforest all shape how dragons travel and fight.",
  },
  {
    label: "Explorer Tip",
    title: "Tap markers like quest clues",
    body: "Each glowing map marker leads to a tribe page, so the map can become a reading path through the dragon world.",
  },
];

export function getKidMapReadingFacts(title: string, facts: string[]): ReadingFactPanel[] {
  return facts.map((fact, index) => ({
    label: index === 0 ? "Your World" : "Explorer Tip",
    title: `${title} clue ${index + 1}`,
    body: fact,
  }));
}
