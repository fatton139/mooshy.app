import { Card, Tabs } from "antd";
import { allTables } from "../consts/players";

type Props = {
  items: {
    key: (typeof allTables)[number];
    label: string;
    children: React.ReactNode;
  }[];
};

export const HerosContent: React.FunctionComponent<Props> = ({
  items = [],
}) => {
  return (
    <Card>
      <Tabs defaultActiveKey="1" items={items} />
    </Card>
  );
};
