import { Modal } from "antd";
import { Player } from "video-react";
import { createResourceSrc } from "../utils/create-resource-src";

export const VideoModal: React.FunctionComponent<{
  modalData?: {
    url: string;
    title: string;
  };
  onCancel?: () => void;
}> = ({ modalData, onCancel }) => {
  return (
    <Modal
      centered
      width="80%"
      title={modalData?.title}
      open={modalData !== undefined}
      onCancel={onCancel}
      okButtonProps={{
        hidden: true,
      }}
      cancelText="Close"
      destroyOnClose
    >
      <Player>
        {modalData && <source src={createResourceSrc(modalData.url)} />}
      </Player>
    </Modal>
  );
};
