export type MooshyDbTableEntryMeta = {
  createdAt: string;
  size: number;
  title?: string;
  description?: string;
  tags?: string[];
};

export type MooshyDbTableEntry = {
  url: string;
  name: string;
  meta: MooshyDbTableEntryMeta;
};

export type MooshyDbTableEntries = MooshyDbTableEntry[];

export type MooshyDbMeta = Record<string, MooshyDbTableEntries>;
