import urljoin from "url-join";
import { v4 as uuid } from "uuid";
import { EntriesList } from "../components/EntriesList";
import { allTables } from "../consts/players";
import { AppData } from "../types/app";
import { selectTables } from "./select-tables";

const Tab: React.FunctionComponent<{
  data: AppData;
  table: (typeof allTables)[number];
}> = ({ data, table }) => {
  const listData = Object.values(selectTables(data, [table])).flatMap(
    (entry) => {
      return entry.map(({ meta, playerName, url, tableLookupKey, name }) => {
        return {
          key: uuid(),
          href: urljoin(tableLookupKey, name),
          url,
          tableLookupKey,
          title: meta.title,
          description: meta.description,
          tags: meta.tags,
          createdAt: meta.createdAt,
          size: meta.size,
          playerName: playerName,
        };
      });
    }
  );

  return <EntriesList listData={listData} />;
};

export const createTabItem = (
  label: string,
  data: AppData,
  table: (typeof allTables)[number]
) => {
  return {
    key: table,
    label,
    children: <Tab data={data} table={table} />,
  };
};
