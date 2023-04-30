import { DesktopOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Statistic, Table, message } from "antd";
import { compareAsc } from "date-fns";
import Link from "next/link";
import prettyBytes from "pretty-bytes";
import { useCallback, useMemo, useState } from "react";
import CountUp from "react-countup";
import urljoin from "url-join";
import useLocalStorage from "use-local-storage-state";
import { v4 as uuid } from "uuid";
import { ColouredTags } from "../components/ColouredTags";
import { DownloadButton } from "../components/DownloadButton";
import { VideoModal } from "../components/VideoModal";
import { assasindie, jz, mushy } from "../consts/players";
import { AppData } from "../types/app";
import { createResourceSrc } from "../utils/create-resource-src";
import { formatDate } from "../utils/format-date";

type Props = {
  data: AppData;
};

const formatter = (value: number | string) => (
  <CountUp end={Number(value)} separator="," />
);

const Index: React.FunctionComponent<Props> = ({ data }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [modalData, setModalData] = useState<{
    url: string;
    title: string;
  }>();

  const [favorites, setFavorites] = useLocalStorage<
    Record<string, { tableLookupKey: string; url: string }>
  >("mooshy.app.favourites", { defaultValue: {} });

  const tableData = useMemo(() => {
    return Object.values(data).flatMap((entry) => {
      return entry.map(({ url, name, tableLookupKey, playerName, meta }) => {
        return {
          key: uuid(),
          view: {
            table: tableLookupKey,
            name,
          },
          "video-data": { url, title: meta.title, tableLookupKey },
          title: meta.title,
          "player-name": playerName,
          "created-at": meta.createdAt,
          size: meta.size,
          tags: meta.tags,
          description: meta.description,
        };
      });
    });
  }, [data]);

  const allTags = useMemo(() => {
    const tags = tableData.reduce<string[]>((acc, { tags }) => {
      return [...acc, ...tags];
    }, []);

    const unique = new Set(tags);

    return Array.from(unique.keys());
  }, [tableData]);

  const columns = useMemo(
    () => [
      {
        title: "",
        dataIndex: "view",
        key: "view",
        render: ({ name, table }: { name: string; table: string }) => (
          <Link
            href={{
              pathname: "resources",
              query: {
                table,
                file: name,
              },
            }}
          >
            View
          </Link>
        ),
      },
      {
        title: "Gamer",
        dataIndex: "player-name",
        key: "player-name",
        filters: [
          {
            text: "Assasindie",
            value: assasindie.playerName,
          },
          {
            text: "Mushy",
            value: mushy.playerName,
          },
          {
            text: "JZ",
            value: jz.playerName,
          },
        ],
        render: (name: string) => (
          <Link
            href={urljoin(name, "profile")}
            style={{ textTransform: "capitalize" }}
          >
            {name}
          </Link>
        ),
        sorter: (a: (typeof tableData)[0], b: (typeof tableData)[0]) =>
          a["player-name"].localeCompare(b["player-name"]),
        onFilter: (
          value: string | number | boolean,
          record: (typeof tableData)[0]
        ) => record["player-name"] === value,
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        sorter: (a: { title: string }, b: { title: string }) =>
          a.title.localeCompare(b.title),
      },
      {
        title: "Created at",
        dataIndex: "created-at",
        key: "created-at",
        sortDirections: ["ascend" as const, "descend" as const],
        defaultSortOrder: "ascend" as const,
        render: formatDate,
        sorter: (a: { "created-at": Date }, b: { "created-at": Date }) =>
          compareAsc(a["created-at"], b["created-at"]),
      },
      {
        title: "Size",
        dataIndex: "size",
        key: "size",
        render: (value: number) => prettyBytes(value),
        sorter: (a: { size: number }, b: { size: number }) => a.size - b.size,
        sortDirections: ["ascend" as const, "descend" as const],
      },
      {
        title: "Tags",
        dataIndex: "tags",
        key: "tags",
        filters: allTags.map((tag) => {
          return {
            text: tag,
            value: tag,
          };
        }),
        filterSearch: true,
        render: (tags: string[]) => <ColouredTags tags={tags} />,
        onFilter: (
          value: string | number | boolean,
          record: (typeof tableData)[0]
        ) => record.tags.some((tag) => tag === value),
      },
      {
        title: "Actions",
        dataIndex: "video-data",
        key: "video-data",
        render: ({
          tableLookupKey,
          url,
          title,
        }: {
          tableLookupKey: string;
          url: string;
          title: string;
        }) => (
          <Space direction="horizontal">
            <Button
              icon={<DesktopOutlined />}
              onClick={() => {
                setModalData({
                  url,
                  title,
                });
              }}
            >
              Watch
            </Button>
            <DownloadButton href={createResourceSrc(url)} />
            <Button
              icon={
                favorites[`${tableLookupKey}/${url}`] === undefined ? (
                  <HeartOutlined />
                ) : (
                  <HeartFilled color="pink" />
                )
              }
              onClick={() => {
                setFavorites((state) => {
                  const key = `${tableLookupKey}/${url}`;
                  if (state) {
                    if (state[key] === undefined) {
                      messageApi.success("Added to favorites!");
                      return {
                        ...state,
                        [key]: { tableLookupKey, url },
                      };
                    } else {
                      messageApi.info("Removed from favorites!");
                      const mutable = { ...state };

                      delete mutable[key];

                      return mutable;
                    }
                  }
                  return {
                    [key]: { tableLookupKey, url },
                  };
                });
              }}
            ></Button>
          </Space>
        ),
      },
    ],
    [allTags, favorites, messageApi, setFavorites]
  );

  const totalSize = useMemo(() => {
    return tableData.reduce((acc, { size }) => {
      return (acc += size);
    }, 0);
  }, [tableData]);

  const latestEntry = useMemo(() => {
    return tableData.sort((a, b) => {
      return compareAsc(a["created-at"], b["created-at"]);
    })[0]!;
  }, [tableData]);

  return (
    <>
      <Row gutter={[10, 10]}>
        <Col span={16}>
          <Card>
            <Row>
              <Col span={8}>
                <Statistic
                  title="Total Tables"
                  value={Object.keys(data).length}
                  formatter={formatter}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Total Entries"
                  value={tableData.length}
                  formatter={formatter}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Total Size"
                  value={totalSize}
                  formatter={(value) => prettyBytes(Number(value))}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Last updated at"
              value={latestEntry["created-at"].getTime()}
              formatter={(value) => formatDate(new Date(value))}
            />
          </Card>
        </Col>
        <Col span={24}>
          <Table
            dataSource={tableData}
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.description}</p>
              ),
              rowExpandable: (record) => record.description !== undefined,
            }}
          />
        </Col>
      </Row>
      <VideoModal
        modalData={modalData}
        onCancel={useCallback(() => setModalData(undefined), [])}
      />
      {contextHolder}
    </>
  );
};

export default Index;
