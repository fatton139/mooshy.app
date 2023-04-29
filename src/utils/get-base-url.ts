import urlJoin from "url-join";

export const getBaseUrl = () =>
  typeof window === "undefined"
    ? ""
    : urlJoin(window.origin, window.location.pathname.split("/")[1]);
