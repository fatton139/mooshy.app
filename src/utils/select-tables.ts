import { allTables } from "../consts/players";
import { AppData, AppEntry } from "../types/app";

export const selectTables = (
  data: AppData,
  tables: readonly (typeof allTables)[number][]
) => {
  return tables.reduce<Record<string, AppEntry[]>>((acc, value) => {
    return {
      ...acc,
      [value]: data[value],
    };
  }, {});
};
