import {
  BulbOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  HeartOutlined,
  HomeOutlined,
  SyncOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Col,
  ConfigProvider,
  Divider,
  Layout,
  Menu,
  MenuProps,
  Row,
  Skeleton,
  Space,
  Tag,
  theme,
} from "antd";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import "reset-css/reset.css";
import useSWR from "swr";
import useLocalStorage from "use-local-storage-state";
import "video-react/dist/video-react.css";
import { Template } from "../components/Template";
import { MOOSHY_DB_META_URI } from "../consts/mooshy";
import { assasindie, jz, mushy } from "../consts/players";
import { AppData, MooshyMetaTransformData } from "../types/app";
import { MooshyDbMeta } from "../types/mooshy";

const { defaultAlgorithm, darkAlgorithm } = theme;
const { Content, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const deserialise = (
  data: MooshyDbMeta,
  transform: MooshyMetaTransformData,
  playerName: string
) => {
  return {
    [transform.tableLookupKey]: data[transform.tableLookupKey].map(
      ({ meta, ...rest }) => {
        return {
          ...rest,
          tableLookupKey: transform.tableLookupKey,
          playerName,
          meta: {
            ...meta,
            title: meta.title ?? "Untitled",
            createdAt: new Date(meta.createdAt),
            tags: meta.tags
              ? [...meta.tags, ...transform.customTags]
              : transform.customTags,
          },
        };
      }
    ),
  };
};

const deserialiseAll = (
  data: MooshyDbMeta,
  transformers: Record<string, MooshyMetaTransformData>,
  playerName: string
) =>
  Object.values(transformers).reduce(
    (acc, transform) => ({
      ...acc,
      ...deserialise(data, transform, playerName),
    }),
    {} as AppData
  );

const ComponentContainer: React.FunctionComponent<{
  Component: React.FunctionComponent<{ data: AppData }>;
  data: MooshyDbMeta;
}> = ({ Component, data }) => {
  const appData = useMemo(() => {
    return {
      ...deserialise(data, jz.csgo, jz.playerName),
      ...deserialise(data, assasindie.csgo, assasindie.playerName),
      ...deserialiseAll(data, assasindie.dota, assasindie.playerName),
      ...deserialiseAll(data, mushy.dota, mushy.playerName),
    };
  }, [data]);

  return <Component data={appData} />;
};

const fetcher = (input: string): Promise<MooshyDbMeta | undefined> =>
  fetch(input).then((res) => res.json());

export default function App({
  Component,
}: {
  Component: React.FunctionComponent<{ data: AppData }>;
}) {
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean | undefined>(
    "dark-mode",
    {
      defaultValue: undefined,
    }
  );

  useEffect(() => {
    if (isDarkMode === undefined) {
      setIsDarkMode(
        typeof window !== "undefined" &&
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
  }, [isDarkMode, setIsDarkMode]);

  const [collapsed, setCollapsed] = useState(false);

  const router = useRouter();

  const { data, error, isLoading, isValidating } = useSWR(
    MOOSHY_DB_META_URI,
    fetcher
  );

  const items: MenuProps["items"] = useMemo(
    () => [
      getItem("Home", "home", <HomeOutlined />),
      getItem("Favorites", "/favorites", <HeartOutlined />),
      getItem("Assasindie", "assasindie", <UserOutlined />, [
        getItem("Profile", "/assasindie/profile"),
        getItem("Resources", "/assasindie/resources"),
        getItem(
          "CSGO",
          "csgo",
          undefined,
          [getItem("All Plays", "/assasindie/csgo")],
          "group"
        ),
        getItem(
          "DOTA",
          "dota",
          undefined,
          [
            getItem("All Plays", "/assasindie/dota"),
            getItem("By Heros", "/assasindie/dota/heros"),
          ],
          "group"
        ),
      ]),
      getItem("Mushy", "mushy", <UserOutlined />, [
        getItem("Profile", "/mushy/profile"),
        getItem("Resources", "/mushy/resources"),
        getItem(
          "DOTA",
          "dota",
          undefined,
          [
            getItem("All Plays", "/mushy/dota"),
            getItem("By Heros", "/mushy/dota/heros"),
          ],
          "group"
        ),
      ]),
      getItem("JZ", "jz", <UserOutlined />, [
        getItem("Profile", "/jz/profile"),
        getItem("Resources", "/jz/resources"),
        getItem(
          "CSGO",
          "csgo",
          undefined,
          [getItem("All Plays", "/jz/csgo")],
          "group"
        ),
      ]),
      getItem(
        isDarkMode ? "Enable Light Mode" : "Enable Dark Mode",
        "dark-mode-toggle",
        <BulbOutlined />
      ),
    ],
    [isDarkMode]
  );

  const statusComponent = () => {
    if (error) {
      return (
        <Tag icon={<CloseCircleOutlined />} color="danger">
          Mooshy.db error
        </Tag>
      );
    } else if (isLoading || isValidating) {
      return (
        <Tag icon={<SyncOutlined spin />} color="processing">
          Mooshy.db loading
        </Tag>
      );
    } else {
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          Mooshy.db online
        </Tag>
      );
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <Template title="Mooshy">
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            theme="light"
          >
            <div
              style={{
                height: 16,
                margin: 16,
                color: isDarkMode ? "white" : "black",
                textAlign: "center",
              }}
            >
              🅼🤡🤡🆂🅷🆈
            </div>
            <Menu
              mode="inline"
              items={items}
              theme="light"
              onClick={({ key }) => {
                if (key === "dark-mode-toggle") {
                  setIsDarkMode((v) => !v);
                } else if (key === "home") {
                  router.push("/");
                } else {
                  router.push(key);
                }
              }}
            />
            <Divider />
            <Space
              direction="vertical"
              size="large"
              style={{ display: "flex", alignItems: "center" }}
            >
              {!collapsed && statusComponent()}
            </Space>
          </Sider>
          <Content style={{ margin: "16px 16px" }}>
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <Breadcrumb
                  items={router.pathname
                    .split("/")
                    .map((path) => ({ title: path }))}
                  style={{ textTransform: "capitalize" }}
                ></Breadcrumb>
              </Col>
              <Col span={24}>
                {data ? (
                  <ComponentContainer Component={Component} data={data} />
                ) : (
                  <Skeleton active />
                )}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Template>
    </ConfigProvider>
  );
}
