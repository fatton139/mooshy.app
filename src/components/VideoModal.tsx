import { Modal } from "antd";
import urljoin from "url-join";
import { Player } from "video-react";
import { MOOSHY_DB_URI } from "../consts/mooshy";

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
        {modalData && <source src={urljoin(MOOSHY_DB_URI, modalData.url)} />}
      </Player>
    </Modal>
  );
};
