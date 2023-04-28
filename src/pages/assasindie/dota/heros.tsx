import { HerosContent } from "../../../components/HerosContent";
import { assasindie } from "../../../consts/players";
import { AppData } from "../../../types/app";
import { createTabItem } from "../../../utils/create-tab-item";

const Heros: React.FunctionComponent<{
  data: AppData;
}> = ({ data }) => {
  const items = [
    createTabItem(
      "Earthshaker",
      data,
      assasindie.dota.earthshaker.tableLookupKey
    ),
    createTabItem("Sven", data, assasindie.dota.sven.tableLookupKey),
  ];

  return <HerosContent items={items} />;
};

export default Heros;
