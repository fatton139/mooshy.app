import {
  DeleteOutlined,
  DesktopOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Button, Divider, List, Skeleton } from "antd";
import { format } from "date-fns";
import Link from "next/link";
import prettyBytes from "pretty-bytes";
import { useCallback, useState } from "react";
import { useFavorites } from "../hooks/use-favorites";
import { createResourceSrc } from "../utils/create-resource-src";
import { ColouredTags } from "./ColouredTags";
import { CopyButton } from "./CopyButton";
import { DownloadButton } from "./DownloadButton";
import { VideoModal } from "./VideoModal";
import urlJoin from "url-join";
import { getBaseUrl } from "../utils/get-base-url";

type Props = {
  listData: {
    key: any;
    href: string;
    tableLookupKey: string;
    url: string;
    title: string;
    description: string | undefined;
    tags: string[];
    createdAt: Date;
    size: number;
    playerName: string;
  }[];
};

const PlaceholderVideo: React.FunctionComponent<{ url: string }> = ({
  url,
}) => {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && <Skeleton style={{ height: 124 }} active />}
      <video
        width={250}
        height={ready ? 140 : 0}
        onCanPlay={() => {
          setReady(true);
        }}
      >
        <source src={createResourceSrc(url)} type="video/mp4" />
      </video>
    </>
  );
};

export const EntriesList: React.FunctionComponent<Props> = ({ listData }) => {
  const { favorites, updateFavorites, contextHolder } = useFavorites();

  const [modalData, setModalData] = useState<{
    url: string;
    title: string;
  }>();

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 4,
          position: "top",
          align: "center",
        }}
        dataSource={listData}
        renderItem={({
          key,
          title,
          href,
          tableLookupKey,
          description,
          url,
          tags,
          createdAt,
          size,
        }) => {
          const resourcesHref = urlJoin("/resources", href);
          return (
            <List.Item
              key={key}
              extra={<PlaceholderVideo url={url} />}
              actions={[
                <Button
                  key="watch"
                  type="text"
                  icon={<DesktopOutlined />}
                  onClick={() => {
                    setModalData({
                      url,
                      title,
                    });
                  }}
                >
                  Watch
                </Button>,
                <DownloadButton
                  key="download"
                  type="text"
                  href={createResourceSrc(url)}
                />,
                <CopyButton
                  key="copy"
                  type="text"
                  text={urlJoin(getBaseUrl(), resourcesHref)}
                />,
                favorites[`${tableLookupKey}/${url}`] === undefined ? (
                  <Button
                    type="text"
                    icon={<HeartOutlined />}
                    onClick={() => updateFavorites(tableLookupKey, url)}
                  >
                    Favorite
                  </Button>
                ) : (
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => updateFavorites(tableLookupKey, url)}
                  >
                    Unfavorite
                  </Button>
                ),
              ]}
            >
              <List.Item.Meta
                title={<Link href={resourcesHref}>{title}</Link>}
                description={
                  <>
                    {format(createdAt, "yyyy-MM-dd hh:mm:ss")}
                    <Divider type="vertical" />
                    {prettyBytes(size)}
                    <Divider type="vertical" />
                    <ColouredTags tags={tags} />
                  </>
                }
              />
              {description ?? "No description"}
            </List.Item>
          );
        }}
      />
      <VideoModal
        modalData={modalData}
        onCancel={useCallback(() => setModalData(undefined), [])}
      />
      {contextHolder}
    </>
  );
};
