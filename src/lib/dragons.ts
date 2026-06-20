// Canon Wings of Fire data — tribes, abilities, characters, geography.
// References: Wings of Fire by Tui T. Sutherland (Arcs 1–3) + Wings of Fire Wiki.

export type TribeSlug =
  | "nightwing"
  | "skywing"
  | "rainwing"
  | "seawing"
  | "icewing"
  | "sandwing"
  | "mudwing"
  | "silkwing"
  | "hivewing"
  | "leafwing";

export type Continent = "Pyrrhia" | "Pantala";

export interface Tribe {
  slug: TribeSlug;
  name: string;
  continent: Continent;
  tagline: string;
  description: string;
  habitat: string;
  abilities: string[]; // canon powers
  personality: string[];
  history: string;
  funFacts: string[];
  emoji: string;
  colorVar: string;
  glowVar: string;
  // legacy alias used by older components
  powers: string[];
}

const t = (data: Omit<Tribe, "powers"> & { abilities: string[] }): Tribe => ({
  ...data,
  powers: data.abilities,
});

export const TRIBES: Tribe[] = [
  t({
    slug: "mudwing",
    name: "MudWings",
    continent: "Pyrrhia",
    tagline: "Bound by sibling troops, fierce when their family is threatened",
    description:
      "Brown and amber dragons of the marshes. MudWings hatch in groups called troops, led by the firstborn 'bigwings' — the strongest and most protective sibling.",
    habitat: "The wetlands and mud kingdom east of the Diamond Spray River",
    abilities: [
      "Fireproof scales (immune to fire, including their own and others')",
      "Can hold breath underwater for a long time",
      "Exceptional strength and stamina",
      "Strong sense of smell, second only to SeaWings",
    ],
    personality: ["Loyal", "Steady", "Protective", "Family-first"],
    history:
      "MudWings are raised together by their bigwings sibling. Queen Moorhen rules the Mud Kingdom from her stronghold in the marshes.",
    funFacts: [
      "Bigwings have a slight golden gleam on their wing membranes.",
      "MudWings rely on strength, stamina, and fireproof scales instead of elemental breath.",
      "Troops share everything: food, sleeping nests, and battles.",
    ],
    emoji: "🪨",
    colorVar: "mudwing",
    glowVar: "mudwing-glow",
  }),
  t({
    slug: "sandwing",
    name: "SandWings",
    continent: "Pyrrhia",
    tagline: "Venomous tails, desert minds, ruled by Queen Thorn",
    description:
      "Pale gold dragons with venomous barbed tails. SandWings survive the harshest sun and the longest journeys across the Kingdom of Sand.",
    habitat: "The desert kingdom — the Scorpion Den, the Stronghold, and the great oasis",
    abilities: [
      "Venomous barbed tail (deadly sting)",
      "Fire breath",
      "Survive without water for weeks",
      "Bury themselves in sand to ambush",
    ],
    personality: ["Resilient", "Cunning", "Independent", "Watchful"],
    history:
      "The War of SandWing Succession tore Pyrrhia apart for twenty years until Queen Thorn took the throne with the help of the Dragonets of Destiny.",
    funFacts: [
      "Their forked black tongues taste scent on the air.",
      "Old SandWings hide treasure in secret desert caches.",
      "The Scorpion Den is the rowdiest market in Pyrrhia.",
    ],
    emoji: "🜨",
    colorVar: "sandwing",
    glowVar: "sandwing-glow",
  }),
  t({
    slug: "skywing",
    name: "SkyWings",
    continent: "Pyrrhia",
    tagline: "The fastest, fiercest fliers in all of Pyrrhia",
    description:
      "Massive red-and-orange dragons with the largest wings of any tribe. Their queen rules from a palace carved into the Sky Kingdom's mountain peaks.",
    habitat: "The Claws of the Clouds Mountains and the SkyWing Palace",
    abilities: [
      "Exceptionally hot fire breath",
      "Huge wingspan for high-altitude flight",
      "Powerful diving attacks",
      "A rare few are born 'firescales' — like Peril",
    ],
    personality: ["Proud", "Bold", "Competitive", "Honorable"],
    history:
      "Ruled by Queen Ruby after she challenged her mother, the cruel Queen Scarlet. Home to the deadly arena where Peril once fought champions to their death.",
    funFacts: [
      "SkyWing eggs must be kept perfectly warm — too hot and a firescales hatches.",
      "Their wings span longer than any other tribe.",
      "Champion fliers race around the highest peaks at sunset.",
    ],
    emoji: "🜂",
    colorVar: "skywing",
    glowVar: "skywing-glow",
  }),
  t({
    slug: "seawing",
    name: "SeaWings",
    continent: "Pyrrhia",
    tagline: "Bioluminescent royals of the deep, speakers of Aquatic",
    description:
      "Blue and green dragons with webbed talons and glowing stripes used to speak Aquatic — a silent language of light beneath the waves.",
    habitat: "The Kingdom of the Sea — the Summer Palace and the Deep Palace",
    abilities: [
      "Breathe underwater (gills hidden behind their jaws)",
      "Bioluminescent stripes (Aquatic light language)",
      "Powerful tails for swimming",
      "See clearly in deep dark water",
    ],
    personality: ["Loyal", "Disciplined", "Family-bound", "Brave"],
    history:
      "Queen Coral has ruled the Sea Kingdom for decades. Her daughter Tsunami is one of the Dragonets of Destiny.",
    funFacts: [
      "SeaWings can't breathe fire — only the rare hybrid does.",
      "Aquatic uses flashing scale patterns instead of sound.",
      "The Royal Hatchery is the most protected place in the sea.",
    ],
    emoji: "🜄",
    colorVar: "seawing",
    glowVar: "seawing-glow",
  }),
  t({
    slug: "icewing",
    name: "IceWings",
    continent: "Pyrrhia",
    tagline: "Frost breath, ranked First Circle to Seventh Circle",
    description:
      "Silver-white dragons of the frozen north. Every IceWing is ranked in their circle, and the seven gifts of an IceWing's birth define their destiny.",
    habitat: "The Ice Kingdom and the Great Ice Cliff",
    abilities: [
      "Freezing-cold frostbreath",
      "Serrated icy claws",
      "Immunity to cold; vulnerable to heat",
      "Sharp eyesight in starlight",
    ],
    personality: ["Disciplined", "Proud", "Loyal", "Reserved"],
    history:
      "Queen Snowfall took the throne after her grandmother Queen Glacier. The IceWings live by the Seven Gifts and the strict Circle ranking.",
    funFacts: [
      "Each IceWing earns or loses standing on the ranking wall.",
      "They breathe out clouds of cold even when calm.",
      "Their tails end in delicate, deadly serrated tips.",
    ],
    emoji: "❅",
    colorVar: "icewing",
    glowVar: "icewing-glow",
  }),
  t({
    slug: "rainwing",
    name: "RainWings",
    continent: "Pyrrhia",
    tagline: "Color-changing peace-lovers with deadly venom",
    description:
      "Scales shift with mood and surroundings: bright pink for joy, deep black for danger. RainWings are easygoing — until provoked.",
    habitat: "The rainforest canopy and Queen Glory's village",
    abilities: [
      "Color-changing camouflage scales",
      "Acidic venom spit (melts almost anything)",
      "Prehensile tails for swinging through trees",
      "Sleep through the hottest hours",
    ],
    personality: ["Kind", "Playful", "Loyal", "Underestimated"],
    history:
      "Queen Glory united the RainWings and the rescued NightWings into the Rainforest Kingdom after exposing the NightWings' lies.",
    funFacts: [
      "A frightened RainWing turns oily yellow.",
      "Their venom can strip armor in seconds.",
      "Sun-time naps are sacred — don't wake them.",
    ],
    emoji: "🜁",
    colorVar: "rainwing",
    glowVar: "rainwing-glow",
  }),
  t({
    slug: "nightwing",
    name: "NightWings",
    continent: "Pyrrhia",
    tagline: "Shadow scales and silver stars — once readers of minds and fate",
    description:
      "Black-scaled dragons with silver scales like stars beneath their wings. Once feared for mind reading and prophecy, both gifts are now extremely rare.",
    habitat:
      "The rainforest village shared with the RainWings (after fleeing their volcanic island)",
    abilities: [
      "Fire breath",
      "Hidden in darkness (scales blend with night)",
      "Powers (mind reading and/or foretelling) only awaken if hatched under moonlight — strength depends on how many moons were visible (see Three Moons page)",
    ],
    personality: ["Thoughtful", "Secretive", "Curious", "Brave"],
    history:
      "The NightWings hid for centuries on a dying volcanic island. After it erupted, Queen Glory granted them refuge in the rainforest.",
    funFacts: [
      "Silver teardrop scales by their eyes mark powerful seers.",
      "Moonwatcher is the rare NightWing born with both gifts.",
      "Their fire is faintly purple-tinted.",
    ],
    emoji: "🌙",
    colorVar: "nightwing",
    glowVar: "nightwing-glow",
  }),
  // ───── Pantala ─────
  t({
    slug: "silkwing",
    name: "SilkWings",
    continent: "Pantala",
    tagline: "Four wings, gentle hearts, threads of starlight silk",
    description:
      "Beautiful four-winged dragons of Pantala. Born as wingless flamesilks first, they Metamorphose at age six into shimmering moths of the sky.",
    habitat: "The Hives of Pantala (controlled by the HiveWings) and Cicada Hive",
    abilities: [
      "Spin strong silk from wrist spinnerets",
      "Four delicate wings for graceful flight",
      "Antennae that sense vibrations and scents",
      "Rare flamesilks spin glowing, burning silk",
    ],
    personality: ["Gentle", "Artistic", "Patient", "Quietly brave"],
    history:
      "Once ruled by Queen Monarch, the SilkWings were enslaved by Queen Wasp after the Tree Wars. Luna, Blue, and Swordtail helped spark the resistance.",
    funFacts: [
      "Their wing patterns are unique — like butterfly fingerprints.",
      "Metamorphosis takes five days inside a silk cocoon.",
      "Flamesilks are born once a generation.",
    ],
    emoji: "🦋",
    colorVar: "silkwing",
    glowVar: "silkwing-glow",
  }),
  t({
    slug: "hivewing",
    name: "HiveWings",
    continent: "Pantala",
    tagline: "Wasp-bodied builders of the great Hives",
    description:
      "Black, orange, and yellow dragons with hardened plates and a wasp's arsenal of weapons. Ruled for generations by the terrifying Queen Wasp.",
    habitat: "The nine Hives that rise from the savanna of Pantala",
    abilities: [
      "Venomous stingers in their wrists",
      "Boiling acid spray from their fangs",
      "Paralysing barb at their tail tip (varies per dragon)",
      "Tough armored scales",
    ],
    personality: ["Industrious", "Strict", "Cunning", "Some kind, like Cricket"],
    history:
      "Queen Wasp controlled all HiveWings through the breath of evil, forcing them to act as one mind. Cricket and her friends helped break the spell.",
    funFacts: [
      "Each HiveWing has a different weapon — not all are venomous.",
      "Cricket can resist Wasp's mind-control thanks to her unique scales.",
      "Bumblebee is the cutest tiny HiveWing dragonet in Pantala.",
    ],
    emoji: "🐝",
    colorVar: "hivewing",
    glowVar: "hivewing-glow",
  }),
  t({
    slug: "leafwing",
    name: "LeafWings",
    continent: "Pantala",
    tagline: "Hidden in the Poison Jungle, listening to the plants",
    description:
      "Green dragons believed extinct, who survived in secret deep in the Poison Jungle. They speak to plants and ride into battle on living vines.",
    habitat: "The Poison Jungle on the southern edge of Pantala",
    abilities: [
      "Leafspeak — command plants to grow, twist, and attack",
      "Camouflage among leaves and vines",
      "Tough scales that resist plant venom",
      "Some can breathe fire (rare since the Tree Wars)",
    ],
    personality: ["Wild", "Determined", "Resourceful", "Protective of the wild"],
    history:
      "Believed wiped out in the Tree Wars, the LeafWings hid in the Poison Jungle for fifty years until Sundew helped lead them back into the light.",
    funFacts: [
      "Leafspeak is strongest in dragons descended from the SapWing royal line.",
      "They tend gardens of healing herbs and deadly traps alike.",
      "Sundew can call vines from across the jungle.",
    ],
    emoji: "🌿",
    colorVar: "leafwing",
    glowVar: "leafwing-glow",
  }),
];

export const getTribe = (slug: string) => TRIBES.find((t) => t.slug === slug);

export interface Character {
  slug: string;
  name: string;
  tribe: TribeSlug;
  role: string;
  powers: string[];
  bio: string;
  personality: string;
  strengths: string[];
  weaknesses: string[];
  relationships: { name: string; bond: string }[];
  trivia: string[];
  timeline: { year: string; event: string }[];
}

const c = (
  slug: string,
  name: string,
  tribe: TribeSlug,
  role: string,
  bio: string,
  personality: string,
  powers: string[],
  strengths: string[],
  weaknesses: string[],
  relationships: { name: string; bond: string }[],
  trivia: string[],
  timeline: { year: string; event: string }[],
): Character => ({
  slug,
  name,
  tribe,
  role,
  bio,
  personality,
  powers,
  strengths,
  weaknesses,
  relationships,
  trivia,
  timeline,
});

export const CHARACTERS: Character[] = [
  // Dragonets of Destiny
  c(
    "clay",
    "Clay",
    "mudwing",
    "Dragonet of Destiny — the Bigwings",
    "A kind, hungry MudWing who would do anything for his friends. Raised in secret under the mountain to fulfill the Dragonet Prophecy.",
    "Warm, loyal, brave, gentle.",
    ["Fireproof scales", "Powerful jaws", "MudWing strength"],
    ["Protective of his troop", "Calm under pressure"],
    ["Always hungry", "Bad at lying"],
    [
      { name: "Tsunami", bond: "Sister-in-arms" },
      { name: "Peril", bond: "Loyal friend" },
      { name: "Sunny", bond: "Closest friend" },
    ],
    ["Loves cows more than almost anything.", "Found his real MudWing troop later in life."],
    [
      { year: "Hatching", event: "Hatched in the Talons of Peace cave" },
      { year: "Brightest Night", event: "Helped end the SandWing war" },
    ],
  ),
  c(
    "tsunami",
    "Tsunami",
    "seawing",
    "Dragonet of Destiny — Princess of the Sea",
    "A fearless SeaWing princess, daughter of Queen Coral. Sharp-tongued and quick to fight, but fiercely loyal.",
    "Bold, fierce, protective, impatient.",
    ["Underwater breathing", "Aquatic light language", "Strong swimmer"],
    ["Natural leader", "Unshakeable courage"],
    ["Hot-tempered", "Stubborn"],
    [
      { name: "Clay", bond: "Best friend" },
      { name: "Coral", bond: "Mother (Queen)" },
      { name: "Riptide", bond: "Beloved" },
    ],
    ["Helped run the Jade Mountain Academy.", "Smashed Queen Coral's biographies."],
    [
      { year: "Hatching", event: "Stolen from the Royal Hatchery" },
      { year: "Brightest Night", event: "Fought for the dragonets" },
    ],
  ),
  c(
    "glory",
    "Glory",
    "rainwing",
    "Queen of the Rainforest Kingdom",
    "A sharp, sarcastic RainWing who proved her tribe was anything but lazy. Became queen of both RainWings and NightWings.",
    "Witty, fierce, sharp-eyed, deeply caring.",
    ["Color-changing scales", "Deadly venom spit", "Prehensile tail"],
    ["Strategic thinker", "Unafraid of authority"],
    ["Sarcastic", "Slow to trust"],
    [
      { name: "Deathbringer", bond: "Bodyguard turned beloved" },
      { name: "Kinkajou", bond: "Loyal friend" },
    ],
    ["Her venom can melt steel.", "Brought solar tunnels and reform to the RainWings."],
    [
      { year: "Hatching", event: "Raised as a replacement dragonet" },
      { year: "Throne", event: "Crowned Queen of the rainforest" },
    ],
  ),
  c(
    "starflight",
    "Starflight",
    "nightwing",
    "Dragonet of Destiny — Scholar",
    "A NightWing who loves books more than battle. Quiet, careful, and brilliant — now librarian at Jade Mountain Academy.",
    "Thoughtful, anxious, gentle, brave when it matters.",
    ["Fire breath", "Night camouflage", "Encyclopedic memory"],
    ["Brilliant scholar", "Patient teacher"],
    ["Blinded since the volcano", "Prone to worry"],
    [
      { name: "Sunny", bond: "Closest friend" },
      { name: "Fatespeaker", bond: "Beloved" },
    ],
    ["Memorized nearly every scroll in the cave.", "Lost his sight saving others."],
    [
      { year: "Hatching", event: "Hatched the night of the comet" },
      { year: "Academy", event: "Became Jade Mountain's librarian" },
    ],
  ),
  c(
    "sunny",
    "Sunny",
    "sandwing",
    "Dragonet of Destiny — Heart of the Five",
    "A small, golden SandWing-NightWing hybrid with a hopeful heart and a stubborn streak. The kindest of the dragonets.",
    "Hopeful, kind, sunny, surprisingly fierce.",
    ["Heat resistance", "Sharp eyesight", "Small but quick"],
    ["Endless optimism", "Sees the best in everyone"],
    ["No venom barb", "Underestimated"],
    [
      { name: "Starflight", bond: "Closest friend" },
      { name: "Thorn", bond: "Mother" },
    ],
    ["The only dragonet without a 'proper' tribe match.", "Co-founded Jade Mountain Academy."],
    [
      { year: "Hatching", event: "Hatched on the Brightest Night" },
      { year: "Reunion", event: "Found her mother Thorn" },
    ],
  ),

  // Arc 2 — Jade Mountain
  c(
    "moonwatcher",
    "Moonwatcher",
    "nightwing",
    "Two-Moon Seer",
    "A shy NightWing born under two full moons, gifted with both mind reading and prophecy. Raised in secret in the rainforest.",
    "Gentle, observant, careful, brave.",
    ["Mind reading", "Prophecy", "Fire breath", "Night camouflage"],
    ["Deeply empathetic", "Visions of the future"],
    ["Overwhelmed by other minds", "Easily startled"],
    [
      { name: "Qibli", bond: "Beloved" },
      { name: "Winter", bond: "Close friend" },
      { name: "Kinkajou", bond: "Best friend" },
    ],
    ["The first NightWing seer in a generation.", "Met Darkstalker before anyone else."],
    [
      { year: "Two-Moon Hatching", event: "Hatched beneath two full moons" },
      { year: "Jade Mountain", event: "Joined the Academy" },
    ],
  ),
  c(
    "qibli",
    "Qibli",
    "sandwing",
    "Quickest Mind at Jade Mountain",
    "A clever SandWing from the Scorpion Den who thinks his way out of every problem. Reads situations like maps.",
    "Witty, observant, kind, anxious to be loved.",
    ["Venomous tail barb", "Fire breath", "Strategic brilliance"],
    ["Sees ten moves ahead", "Reads emotion like a book"],
    ["Fears being unloved", "Overthinks"],
    [
      { name: "Moonwatcher", bond: "Beloved" },
      { name: "Thorn", bond: "Mentor and queen" },
    ],
    ["Carries an earring from his grandfather Six-Claws.", "Best friend of Winter."],
    [
      { year: "Scorpion Den", event: "Grew up in the harshest part of the desert" },
      { year: "Academy", event: "Chosen for the Jade Winglet" },
    ],
  ),
  c(
    "winter",
    "Winter",
    "icewing",
    "Prince of the IceWings",
    "A proud IceWing prince determined to restore his ranking. Slowly learns that warmth isn't weakness.",
    "Cold on the outside, fiercely loyal underneath.",
    ["Frostbreath", "Sharp claws", "IceWing nobility"],
    ["Disciplined", "Fierce protector"],
    ["Prejudice from his upbringing", "Easily ashamed"],
    [
      { name: "Qibli", bond: "Best friend" },
      { name: "Moonwatcher", bond: "Close friend" },
      { name: "Kinkajou", bond: "Friend he saved" },
    ],
    ["Adopted Bandit, a tiny scavenger.", "Searched for his lost brother Hailstorm."],
    [
      { year: "First Circle", event: "Born to high IceWing rank" },
      { year: "Jade Mountain", event: "Learned what friendship really means" },
    ],
  ),
  c(
    "peril",
    "Peril",
    "skywing",
    "Firescales Champion",
    "A SkyWing born with firescales — every scale burns. Once Queen Scarlet's champion, now a loyal friend of Clay.",
    "Loyal, blunt, surprisingly funny.",
    ["Firescales (touch ignites)", "Powerful flight", "Arena-tested fighter"],
    ["Cannot be hurt easily", "Fiercely loyal to Clay"],
    ["Cannot touch anyone safely", "Manipulated for years by Scarlet"],
    [
      { name: "Clay", bond: "Best friend" },
      { name: "Turnsoul", bond: "Twin brother" },
    ],
    ["Has to wear a copper bracelet that dulls her flames.", "Hated Queen Scarlet by the end."],
    [
      { year: "Hatching", event: "Hatched too hot — firescales" },
      { year: "Freedom", event: "Left the SkyWing arena forever" },
    ],
  ),
  c(
    "darkstalker",
    "Darkstalker",
    "nightwing",
    "Ancient Animus — Three-Moon Seer",
    "A legendary NightWing hatched under three full moons with animus magic, mind reading, and prophecy. Sealed for two thousand years.",
    "Charming, brilliant, dangerously certain he's right.",
    ["Animus magic (warps the soul)", "Mind reading", "Prophecy", "Fire breath"],
    ["Unmatched intellect", "Centuries of knowledge"],
    ["Lost his soul to magic", "Believes the ends justify the means"],
    [
      { name: "Clearsight", bond: "Lost love" },
      { name: "Fathom", bond: "Best friend long ago" },
    ],
    [
      "Wrote the original Darkstalker scroll.",
      "Buried alive beneath a mountain by his own friends.",
    ],
    [
      { year: "Three Moons", event: "Hatched under all three full moons" },
      { year: "Return", event: "Released in the modern age" },
    ],
  ),

  // Queens of Pyrrhia
  c(
    "snowfall",
    "Snowfall",
    "icewing",
    "Queen of the IceWings",
    "Young Queen of the IceWings, raised to distrust every other tribe. Slowly learning to lead through change instead of fear.",
    "Sharp, suspicious, secretly uncertain.",
    ["Frostbreath", "First Circle ranking", "Royal serrated tail"],
    ["Strategic", "Devoted to her tribe"],
    ["Distrustful", "Stubborn"],
    [
      { name: "Lynx", bond: "Friend who challenges her" },
      { name: "Glacier", bond: "Beloved grandmother (deceased)" },
    ],
    ["Took the throne very young.", "Fears the breath of evil reaching her tribe."],
    [
      { year: "Throne", event: "Crowned after Queen Glacier" },
      { year: "Lost Continent", event: "Faced the threat from Pantala" },
    ],
  ),
  c(
    "coral",
    "Coral",
    "seawing",
    "Queen of the SeaWings",
    "Long-reigning queen of the Sea Kingdom. A prolific writer of dramatic scrolls and fiercely protective mother to Tsunami.",
    "Loving, dramatic, ruthless when threatened.",
    ["Underwater breathing", "Aquatic language", "Royal tail strength"],
    ["Beloved by her tribe", "Fearless ruler"],
    ["Smothers her daughters", "Holds long grudges"],
    [
      { name: "Tsunami", bond: "Daughter" },
      { name: "Auklet", bond: "Younger daughter" },
    ],
    ["Has written hundreds of biographies of herself.", "Carries a pouch of pearls everywhere."],
    [
      { year: "Crowned", event: "Took the throne from her mother" },
      { year: "Royal Hatchery", event: "Built the most guarded place in the sea" },
    ],
  ),
  c(
    "ruby",
    "Ruby",
    "skywing",
    "Queen of the SkyWings",
    "Daughter of cruel Queen Scarlet. Took the throne and tried to make the Sky Kingdom kinder.",
    "Thoughtful, brave, weary of her mother's legacy.",
    ["Hot fire breath", "Powerful wings", "Royal SkyWing strength"],
    ["Fair-minded", "Wants peace"],
    ["Haunted by Scarlet", "Sometimes too gentle for the throne"],
    [
      { name: "Scarlet", bond: "Mother (deposed)" },
      { name: "Cliff", bond: "Son" },
    ],
    ["Goes by 'Tourmaline' in the Talons of Peace.", "Closed the SkyWing arena forever."],
    [
      { year: "Challenge", event: "Took the throne from Scarlet" },
      { year: "Reform", event: "Ended the arena fights" },
    ],
  ),
  c(
    "thorn",
    "Thorn",
    "sandwing",
    "Queen of the SandWings",
    "Once the Outclaw leader of the Scorpion Den. Crowned Queen of the SandWings with the help of the Dragonets of Destiny.",
    "Tough, fair, deeply maternal.",
    ["Venomous tail", "Fire breath", "Desert survival mastery"],
    ["Beloved leader of outcasts", "Strategic and just"],
    ["Slow to forgive Burn's loyalists"],
    [
      { name: "Sunny", bond: "Daughter" },
      { name: "Qibli", bond: "Trusted advisor" },
      { name: "Smolder", bond: "Brother-in-law and friend" },
    ],
    [
      "Founded the Outclaws to protect the powerless.",
      "Reunited with her daughter Sunny after years apart.",
    ],
    [
      { year: "Scorpion Den", event: "Built the Outclaws" },
      { year: "Brightest Night", event: "Crowned Queen of the SandWings" },
    ],
  ),
  c(
    "moorhen",
    "Moorhen",
    "mudwing",
    "Queen of the MudWings",
    "Steady, strong queen of the Mud Kingdom. Fought for her tribe through the SandWing war and the years of rebuilding after.",
    "Practical, calm, tireless.",
    ["MudWing fireproof scales", "Bigwings strength", "Trained warrior"],
    ["Trusted by her troops", "Hard-working ruler"],
    ["Reserved", "Slow to celebrate"],
    [{ name: "Cattail", bond: "Sibling troop member" }],
    [
      "Allied with Queen Glory and Queen Thorn after the war.",
      "Rebuilt MudWing villages along the river.",
    ],
    [
      { year: "War", event: "Led MudWings through the SandWing war" },
      { year: "Peace", event: "Helped rebuild Pyrrhia" },
    ],
  ),

  // Pantala
  c(
    "blue",
    "Blue",
    "silkwing",
    "Quiet Flamesilk of Cicada Hive",
    "A gentle SilkWing dragonet who only wanted to follow the rules — until he discovered he was a flamesilk and his sister Luna started the Tree Wars rebellion.",
    "Sweet, anxious, brave when it counts.",
    ["Silk spinning", "Flamesilk (rare burning silk)", "Four delicate wings"],
    ["Kind-hearted", "Loyal to family"],
    ["Avoids conflict", "Self-doubting"],
    [
      { name: "Luna", bond: "Sister" },
      { name: "Cricket", bond: "Best friend" },
      { name: "Swordtail", bond: "Older friend / brother-figure" },
    ],
    ["Glowing flamesilk weeps from his wrists.", "Loves Cicada Hive's history library."],
    [
      { year: "Hatching", event: "Hatched in Cicada Hive" },
      { year: "Metamorphosis", event: "Became a flamesilk dragon" },
    ],
  ),
  c(
    "cricket",
    "Cricket",
    "hivewing",
    "HiveWing Free of Wasp's Mind",
    "A curious, bookish HiveWing who isn't controlled by Queen Wasp. Helped Blue, Luna, and the LeafWings save Pantala.",
    "Brilliant, talkative, endlessly curious.",
    ["Venomous stinger", "HiveWing armored scales", "Immune to Wasp's mind control"],
    ["Loves science and books", "Quick problem-solver"],
    ["Talks too much when nervous", "Trusts easily"],
    [
      { name: "Blue", bond: "Best friend" },
      { name: "Bumblebee", bond: "Adopted dragonet" },
      { name: "Sundew", bond: "Reluctant ally turned friend" },
    ],
    ["Carries a tiny dragonet, Bumblebee, in a sling.", "Reads with five scrolls open at once."],
    [
      { year: "Awakening", event: "Realized she was free of Wasp" },
      { year: "Resistance", event: "Joined the rebellion" },
    ],
  ),
  c(
    "sundew",
    "Sundew",
    "leafwing",
    "Leafspeaker of the Poison Jungle",
    "A fierce LeafWing trained from hatching to destroy the HiveWings. Learns the world is bigger than revenge.",
    "Sharp, angry, loyal, slowly softening.",
    ["Leafspeak (commands plants)", "Camouflage in foliage", "Plant venom resistance"],
    ["Tactical fighter", "Powerful leafspeak"],
    ["Quick to anger", "Distrusts outsiders"],
    [
      { name: "Willow", bond: "Beloved" },
      { name: "Cricket", bond: "Unlikely friend" },
    ],
    ["Carries a pouch of seed-bombs.", "Descended from the SapWing royal line."],
    [
      { year: "Hidden Village", event: "Raised in the Poison Jungle" },
      { year: "Mission", event: "Sent to destroy the Hives" },
    ],
  ),
  c(
    "luna",
    "Luna",
    "silkwing",
    "First New Flamesilk in Generations",
    "Blue's brave older sister. Her surprise metamorphosis into a flamesilk lit the spark of the Pantala rebellion.",
    "Brave, fiery, determined, loving.",
    ["Flamesilk", "Strong four-winged flight", "Silk spinning"],
    ["Bold leader", "Fierce sister"],
    ["Reckless", "Acts first, plans later"],
    [
      { name: "Blue", bond: "Brother" },
      { name: "Swordtail", bond: "Beloved" },
    ],
    ["Glowing silk lights her wherever she goes.", "Crossed the sea to find the lost LeafWings."],
    [
      { year: "Metamorphosis", event: "Hatched flamesilk during the ceremony" },
      { year: "Crossing", event: "Flew to Pyrrhia" },
    ],
  ),
  c(
    "swordtail",
    "Swordtail",
    "silkwing",
    "Rebel of Cicada Hive",
    "A brash, loyal SilkWing who would do anything for Luna and Blue. Quick with a joke, quicker with his fists.",
    "Bold, funny, fiercely protective.",
    ["Silk spinning", "Strong four-winged flight", "Surprising fighter"],
    ["Brave", "Devoted friend"],
    ["Impulsive", "Bad listener"],
    [
      { name: "Luna", bond: "Beloved" },
      { name: "Blue", bond: "Brother-figure" },
    ],
    [
      "Locked up in Misbehaver's Way before the rebellion.",
      "Would jump into any fight to save Luna.",
    ],
    [
      { year: "Cicada Hive", event: "Grew up with Blue and Luna" },
      { year: "Rebellion", event: "Joined the fight for Pantala" },
    ],
  ),
];

export const getCharacter = (slug: string) => CHARACTERS.find((c) => c.slug === slug);

export interface Kingdom {
  slug: string;
  name: string;
  tribe: TribeSlug;
  continent: Continent;
  x: number;
  y: number;
  desc: string;
}

export const KINGDOMS: Kingdom[] = [
  // Pyrrhia
  {
    slug: "ice",
    name: "Ice Kingdom",
    tribe: "icewing",
    continent: "Pyrrhia",
    x: 18,
    y: 18,
    desc: "Frozen tundra and the Great Ice Cliff. Ruled by Queen Snowfall.",
  },
  {
    slug: "sky",
    name: "Sky Kingdom",
    tribe: "skywing",
    continent: "Pyrrhia",
    x: 38,
    y: 30,
    desc: "Mountain palace of the SkyWings. Ruled by Queen Ruby.",
  },
  {
    slug: "sea",
    name: "Kingdom of the Sea",
    tribe: "seawing",
    continent: "Pyrrhia",
    x: 22,
    y: 50,
    desc: "Underwater palaces and the Deep Palace. Ruled by Queen Coral.",
  },
  {
    slug: "mud",
    name: "Mud Kingdom",
    tribe: "mudwing",
    continent: "Pyrrhia",
    x: 40,
    y: 56,
    desc: "Wetlands and warm marshes. Ruled by Queen Moorhen.",
  },
  {
    slug: "sand",
    name: "Kingdom of Sand",
    tribe: "sandwing",
    continent: "Pyrrhia",
    x: 30,
    y: 78,
    desc: "Vast desert with the Scorpion Den and the Stronghold. Ruled by Queen Thorn.",
  },
  {
    slug: "rainforest",
    name: "Rainforest Kingdom",
    tribe: "rainwing",
    continent: "Pyrrhia",
    x: 48,
    y: 88,
    desc: "Shared by RainWings and NightWings. Ruled by Queen Glory.",
  },
  {
    slug: "nightisland",
    name: "Old Night Kingdom",
    tribe: "nightwing",
    continent: "Pyrrhia",
    x: 12,
    y: 70,
    desc: "A dying volcanic island the NightWings fled long ago.",
  },
  // Pantala (right side of the map)
  {
    slug: "hives",
    name: "The Hives",
    tribe: "hivewing",
    continent: "Pantala",
    x: 72,
    y: 38,
    desc: "Nine towering Hives across the Pantalan savanna.",
  },
  {
    slug: "silkhomes",
    name: "SilkWing Homes",
    tribe: "silkwing",
    continent: "Pantala",
    x: 78,
    y: 56,
    desc: "SilkWings live within HiveWing-controlled Hives.",
  },
  {
    slug: "jungle",
    name: "Poison Jungle",
    tribe: "leafwing",
    continent: "Pantala",
    x: 86,
    y: 78,
    desc: "The deadly jungle where the LeafWings hid for fifty years.",
  },
];

// Canon abilities reference — used by /abilities page
export const ABILITY_GROUPS: { tribe: TribeSlug; abilities: string[] }[] = TRIBES.map((tr) => ({
  tribe: tr.slug,
  abilities: tr.abilities,
}));
