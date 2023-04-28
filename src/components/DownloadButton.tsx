import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

export const DownloadButton: React.FunctionComponent<{
  href: string;
  type?: "text";
}> = ({ href, type }) => {
  const [loading, setLoading] = useState(false);

  return (
    <a download href={href}>
      <Button
        icon={<DownloadOutlined />}
        loading={loading}
        type={type}
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 1000);
        }}
      >
        Download
      </Button>
    </a>
  );
};
