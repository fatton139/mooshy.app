import { Card } from "antd";
import { useMemo } from "react";
import urljoin from "url-join";
import { v4 as uuid } from "uuid";
import { allTables } from "../consts/players";
import { AppData } from "../types/app";
import { selectTables } from "../utils/select-tables";
import { EntriesList } from "./EntriesList";

type Props = {
  data: AppData;
  tables: readonly (typeof allTables)[number][];
};

export const PlaysContent: React.FunctionComponent<Props> = ({
  data,
  tables,
}) => {
  const listData = useMemo(() => {
    return Object.values(selectTables(data, tables)).flatMap((entry) => {
      return entry.map(({ meta, playerName, url, tableLookupKey, name }) => {
        return {
          key: uuid(),
          href: urljoin(tableLookupKey, name),
          tableLookupKey,
          url,
          title: meta.title,
          description: meta.description,
          tags: meta.tags,
          createdAt: meta.createdAt,
          size: meta.size,
          playerName: playerName,
        };
      });
    });
  }, [data, tables]);

  return (
    <Card>
      <EntriesList listData={listData} />
    </Card>
  );
};
