import urljoin from "url-join";
import { Redirect } from "../../components/Redirect";

const Index = () => <Redirect to={urljoin("assasindie", "profile")} />;

export default Index;
