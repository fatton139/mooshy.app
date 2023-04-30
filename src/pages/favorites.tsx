import { Card } from "antd";
import { useMemo } from "react";
import useLocalStorage from "use-local-storage-state";
import { v4 as uuid } from "uuid";
import { EntriesList } from "../components/EntriesList";
import { AppData, AppEntry } from "../types/app";

type Props = {
  data: AppData;
};

const Favorites: React.FunctionComponent<Props> = ({ data }) => {
  const [favorites] = useLocalStorage<
    Record<string, { tableLookupKey: string; url: string }>
  >("mooshy.app.favourites", { defaultValue: {} });

  const listData = useMemo(() => {
    return Object.values(favorites).flatMap(
      ({ tableLookupKey, url: persistedUrl }) => {
        const unknownData: Record<string, AppEntry[]> = data;

        if (unknownData[tableLookupKey] === undefined) {
          return [];
        }

        return unknownData[tableLookupKey]
          .filter(({ url }) => url === persistedUrl)
          .map(({ meta, playerName, url, tableLookupKey, name }) => {
            return {
              key: uuid(),
              url,
              table: tableLookupKey,
              name,
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
  }, [data, favorites]);

  return (
    <>
      <Card>
        <EntriesList listData={listData} />
      </Card>
    </>
  );
};

export default Favorites;
