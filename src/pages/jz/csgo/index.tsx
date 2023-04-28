import { PlaysContent } from "../../../components/PlaysContent";
import { jzCsgoTables } from "../../../consts/players";
import { AppData } from "../../../types/app";

const All: React.FunctionComponent<{
  data: AppData;
}> = ({ data }) => <PlaysContent data={data} tables={jzCsgoTables} />;

export default All;
