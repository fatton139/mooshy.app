import { allTables } from "../consts/players";

export type AppEntryMeta = {
  createdAt: Date;
  size: number;
  tags: string[];
  title: string;
  description?: string;
};

export type AppEntry = {
  url: string;
  name: string;
  tableLookupKey: string;
  playerName: string;
  meta: AppEntryMeta;
};

export type AppData = Record<(typeof allTables)[number], AppEntry[]>;

export type MooshyMetaTransformData = {
  tableLookupKey: string;
  customTags: string[];
};
