import { useMemo } from "react";
import { HerosContent } from "../../../components/HerosContent";
import { assasindie, mushy } from "../../../consts/players";
import { AppData } from "../../../types/app";
import { createTabItem } from "../../../utils/create-tab-item";

const Heros: React.FunctionComponent<{
  data: AppData;
}> = ({ data }) => {
  const items = useMemo(
    () => [
      createTabItem("Bloodseeker", data, mushy.dota.bloodseeker.tableLookupKey),
      createTabItem("Bristleback", data, mushy.dota.bristleback.tableLookupKey),
      createTabItem(
        "Chaos Knight",
        data,
        mushy.dota["chaos-knight"].tableLookupKey
      ),
      createTabItem("Clinkz", data, mushy.dota.clinkz.tableLookupKey),
      createTabItem("Clockwerk", data, mushy.dota.clockwerk.tableLookupKey),
      createTabItem(
        "Crystal Maiden",
        data,
        mushy.dota["crystal-maiden"].tableLookupKey
      ),
      createTabItem("Dark Seer", data, mushy.dota["dark-seer"].tableLookupKey),
      createTabItem(
        "Dark Willow",
        data,
        mushy.dota["dark-willow"].tableLookupKey
      ),
      createTabItem("Dawnbreaker", data, mushy.dota.dawnbreaker.tableLookupKey),
      createTabItem("Dazzle", data, mushy.dota.dazzle.tableLookupKey),
      createTabItem("Disrupter", data, mushy.dota.disrupter.tableLookupKey),
      createTabItem(
        "Faceless Void",
        data,
        mushy.dota["faceless-void"].tableLookupKey
      ),
      createTabItem("Gyrocopter", data, mushy.dota.gyrocopter.tableLookupKey),
      createTabItem("Jakiro", data, mushy.dota.jakiro.tableLookupKey),
      createTabItem("Juggernaut", data, mushy.dota.juggernaut.tableLookupKey),
      createTabItem(
        "Legion Commander",
        data,
        mushy.dota["legion-commander"].tableLookupKey
      ),
      createTabItem("Lifestealer", data, mushy.dota.lifestealer.tableLookupKey),
      createTabItem("Lion", data, mushy.dota.lion.tableLookupKey),
      createTabItem("Luna", data, mushy.dota.luna.tableLookupKey),
      createTabItem("Marci", data, mushy.dota.marci.tableLookupKey),
      createTabItem("Mars", data, mushy.dota.mars.tableLookupKey),
      createTabItem(
        "Naga Siren",
        data,
        mushy.dota["naga-siren"].tableLookupKey
      ),
      createTabItem(
        "Nature's Prophet",
        data,
        mushy.dota["natures-prophet"].tableLookupKey
      ),
      createTabItem("Necrophos", data, mushy.dota.necrophos.tableLookupKey),
      createTabItem(
        "Phantom Assasin",
        data,
        mushy.dota["phantom-assasin"].tableLookupKey
      ),
      createTabItem(
        "Phantom Lancer",
        data,
        mushy.dota["phantom-lancer"].tableLookupKey
      ),
      createTabItem("Razer", data, mushy.dota.razer.tableLookupKey),
      createTabItem(
        "Shadow Demon",
        data,
        mushy.dota["shadow-demon"].tableLookupKey
      ),
      createTabItem("Slardar", data, mushy.dota.slardar.tableLookupKey),
      createTabItem("Slark", data, mushy.dota.slark.tableLookupKey),
      createTabItem("Spectre", data, mushy.dota.spectre.tableLookupKey),
      createTabItem("Sven", data, mushy.dota.sven.tableLookupKey),
      createTabItem("Terrorblade", data, mushy.dota.terrorblade.tableLookupKey),
      createTabItem(
        "Troll Warlord",
        data,
        mushy.dota["troll-warlord"].tableLookupKey
      ),
      createTabItem("Warlock", data, mushy.dota.warlock.tableLookupKey),
    ],
    [data]
  );

  return <HerosContent items={items} />;
};

export default Heros;
