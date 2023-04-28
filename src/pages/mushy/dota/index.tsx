import { PlaysContent } from "../../../components/PlaysContent";
import { assasindieDotaTables, mushyDotaTables } from "../../../consts/players";
import { AppData } from "../../../types/app";

const All: React.FunctionComponent<{
  data: AppData;
}> = ({ data }) => <PlaysContent data={data} tables={mushyDotaTables} />;

export default All;
