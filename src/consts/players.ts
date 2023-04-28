export const assasindie = {
  playerName: "assasindie",
  csgo: {
    tableLookupKey: "assasindie-csgo" as const,
    customTags: ["CSGO"],
  },
  dota: {
    earthshaker: {
      tableLookupKey: "assasindie-dota-earthshaker" as const,
      customTags: ["DOTA", "EARTHSHAKER"],
    },
    sven: {
      tableLookupKey: "assasindie-dota-sven" as const,
      customTags: ["DOTA", "SVEN"],
    },
  },
};

export const assasindieCsgoTables = [assasindie.csgo.tableLookupKey] as const;

export const assasindieDotaTables = Object.values(assasindie.dota).map(
  ({ tableLookupKey }) => tableLookupKey
);

export const assasindieTables = [
  ...assasindieCsgoTables,
  ...assasindieDotaTables,
] as const;

export const mushy = {
  playerName: "mushy",
  dota: {
    bloodseeker: {
      tableLookupKey: "mushy-dota-bloodseeker" as const,
      customTags: ["DOTA", "BLOODSEEKER"],
    },
    bristleback: {
      tableLookupKey: "mushy-dota-bristleback" as const,
      customTags: ["DOTA", "BRISTLEBACK"],
    },
    "chaos-knight": {
      tableLookupKey: "mushy-dota-chaos-knight" as const,
      customTags: ["DOTA", "CHAOS KNIGHT"],
    },
    clinkz: {
      tableLookupKey: "mushy-dota-clinkz" as const,
      customTags: ["DOTA", "CLINKZ"],
    },
    clockwerk: {
      tableLookupKey: "mushy-dota-clockwerk" as const,
      customTags: ["DOTA", "CLOCKWERK"],
    },
    "crystal-maiden": {
      tableLookupKey: "mushy-dota-crystal-maiden" as const,
      customTags: ["DOTA", "CRYSTAL MAIDEN"],
    },
    "dark-seer": {
      tableLookupKey: "mushy-dota-dark-seer" as const,
      customTags: ["DOTA", "DARK SEER"],
    },
    "dark-willow": {
      tableLookupKey: "mushy-dota-dark-willow" as const,
      customTags: ["DOTA", "DARK WILLOW"],
    },
    dawnbreaker: {
      tableLookupKey: "mushy-dota-dawnbreaker" as const,
      customTags: ["DOTA", "DAWNBREAKER"],
    },
    dazzle: {
      tableLookupKey: "mushy-dota-dazzle" as const,
      customTags: ["DOTA", "DAZZLE"],
    },
    disrupter: {
      tableLookupKey: "mushy-dota-disrupter" as const,
      customTags: ["DOTA", "DISRUPTER"],
    },
    "faceless-void": {
      tableLookupKey: "mushy-dota-faceless-void" as const,
      customTags: ["DOTA", "FACELESS VOID"],
    },
    gyrocopter: {
      tableLookupKey: "mushy-dota-gyrocopter" as const,
      customTags: ["DOTA", "GYROCOPTER"],
    },
    jakiro: {
      tableLookupKey: "mushy-dota-jakiro" as const,
      customTags: ["DOTA", "JAKIRO"],
    },
    juggernaut: {
      tableLookupKey: "mushy-dota-juggernaut" as const,
      customTags: ["DOTA", "JUGGERNAUT"],
    },
    "legion-commander": {
      tableLookupKey: "mushy-dota-legion-commander" as const,
      customTags: ["DOTA", "LEGION COMMANDER"],
    },
    lifestealer: {
      tableLookupKey: "mushy-dota-lifestealer" as const,
      customTags: ["DOTA", "LIFESTEALER"],
    },
    lion: {
      tableLookupKey: "mushy-dota-lion" as const,
      customTags: ["DOTA", "LION"],
    },
    luna: {
      tableLookupKey: "mushy-dota-luna" as const,
      customTags: ["DOTA", "LUNA"],
    },
    marci: {
      tableLookupKey: "mushy-dota-marci" as const,
      customTags: ["DOTA", "MARCI"],
    },
    mars: {
      tableLookupKey: "mushy-dota-mars" as const,
      customTags: ["DOTA", "MARS"],
    },
    "naga-siren": {
      tableLookupKey: "mushy-dota-naga-siren" as const,
      customTags: ["DOTA", "NAGA SIREN"],
    },
    "natures-prophet": {
      tableLookupKey: "mushy-dota-natures-prophet" as const,
      customTags: ["DOTA", "NATURES PROPHET"],
    },
    necrophos: {
      tableLookupKey: "mushy-dota-necrophos" as const,
      customTags: ["DOTA", "NECROPHOS"],
    },
    "phantom-assasin": {
      tableLookupKey: "mushy-dota-phantom-assasin" as const,
      customTags: ["DOTA", "PHANTOM ASSASIN"],
    },
    "phantom-lancer": {
      tableLookupKey: "mushy-dota-phantom-lancer" as const,
      customTags: ["DOTA", "PHANTOM LANCER"],
    },
    razer: {
      tableLookupKey: "mushy-dota-razer" as const,
      customTags: ["DOTA", "RAZER"],
    },
    "shadow-demon": {
      tableLookupKey: "mushy-dota-shadow-demon" as const,
      customTags: ["DOTA", "SHADOW DEMON"],
    },
    slardar: {
      tableLookupKey: "mushy-dota-slardar" as const,
      customTags: ["DOTA", "SLARDAR"],
    },
    slark: {
      tableLookupKey: "mushy-dota-slark" as const,
      customTags: ["DOTA", "SLARK"],
    },
    spectre: {
      tableLookupKey: "mushy-dota-spectre" as const,
      customTags: ["DOTA", "SPECTRE"],
    },
    sven: {
      tableLookupKey: "mushy-dota-sven" as const,
      customTags: ["DOTA", "SVEN"],
    },
    terrorblade: {
      tableLookupKey: "mushy-dota-terrorblade" as const,
      customTags: ["DOTA", "TERRORBLADE"],
    },
    "troll-warlord": {
      tableLookupKey: "mushy-dota-troll-warlord" as const,
      customTags: ["DOTA", "TROLL WARLORD"],
    },
    warlock: {
      tableLookupKey: "mushy-dota-warlock" as const,
      customTags: ["DOTA", "WARLOCK"],
    },
  },
};

export const mushyDotaTables = Object.values(mushy.dota).map(
  ({ tableLookupKey }) => tableLookupKey
);

export const mushyTables = [...mushyDotaTables] as const;

export const jz = {
  playerName: "jz",
  csgo: {
    tableLookupKey: "jz-csgo" as const,
    customTags: ["CSGO"],
  },
};

export const jzCsgoTables = [jz.csgo.tableLookupKey] as const;

export const jzTables = [...jzCsgoTables];

export const allTables = [
  ...assasindieTables,
  ...mushyTables,
  ...jzTables,
] as const;
