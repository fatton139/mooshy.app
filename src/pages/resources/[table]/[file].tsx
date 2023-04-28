import { Card, Descriptions, Empty } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import prettyBytes from "pretty-bytes";
import React from "react";
import urljoin from "url-join";
import { Player } from "video-react";
import { ColouredTags } from "../../../components/ColouredTags";
import { MOOSHY_DB_URI } from "../../../consts/mooshy";
import { AppData, AppEntry } from "../../../types/app";
import { formatDate } from "../../../utils/format-date";

const FilePage: React.FunctionComponent<{
  data: AppData;
}> = ({ data }) => {
  const router = useRouter();

  const table = router.query["table"] as string;
  const file = router.query["file"] as string;

  const unknownTable: Record<string, AppEntry[]> = data;

  const entry = unknownTable[table]?.find(({ name }) => name === file);

  if (entry) {
    const href = urljoin(MOOSHY_DB_URI, entry.url);

    return (
      <>
        <Card>
          <Descriptions title="Resource Information">
            <Descriptions.Item label="Title">
              {entry.meta.title}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {entry.meta.description ?? "No Description"}
            </Descriptions.Item>
            <Descriptions.Item label="Created at">
              {formatDate(entry.meta.createdAt)}
            </Descriptions.Item>
            <Descriptions.Item label="File size">
              {prettyBytes(entry.meta.size)}
            </Descriptions.Item>
            <Descriptions.Item label="Tags">
              <ColouredTags tags={entry.meta.tags} />
            </Descriptions.Item>
            <Descriptions.Item label="Source">
              <Link href={href}>{href}</Link>
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Card style={{ display: "flex", justifyContent: "center" }}>
          <Player fluid={false} height={600}>
            {<source src={href} />}
          </Player>
        </Card>
      </>
    );
  }

  return <Empty />;
};

export default FilePage;
