import { DownloadOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useState } from "react";

export const CopyButton: React.FunctionComponent<{
  text: string;
  type?: "text";
}> = ({ text, type }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Button
        icon={<DownloadOutlined />}
        loading={loading}
        type={type}
        onClick={() => {
          setLoading(true);
          navigator.clipboard.writeText(text).then(() => {
            setLoading(false);
            messageApi.success("Copied");
          });
        }}
      >
        Copy Link
      </Button>
      {contextHolder}
    </>
  );
};
