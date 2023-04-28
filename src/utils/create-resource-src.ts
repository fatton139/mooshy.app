import urlJoin from "url-join";
import { MOOSHY_DB_URI } from "../consts/mooshy";

export const createResourceSrc = (url: string) => {
  const mutable = new URL(urlJoin(MOOSHY_DB_URI, url));

  mutable.searchParams.set("raw", "true");

  return mutable.toString();
};
