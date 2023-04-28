import { PlaysContent } from "../../../components/PlaysContent";
import { assasindieDotaTables } from "../../../consts/players";
import { AppData } from "../../../types/app";

const All: React.FunctionComponent<{
  data: AppData;
}> = ({ data }) => <PlaysContent data={data} tables={assasindieDotaTables} />;

export default All;
