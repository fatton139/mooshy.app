import { PlaysContent } from "../../../components/PlaysContent";
import { assasindieCsgoTables } from "../../../consts/players";
import { AppData } from "../../../types/app";

const All: React.FunctionComponent<{
  data: AppData;
}> = ({ data }) => <PlaysContent data={data} tables={assasindieCsgoTables} />;

export default All;
