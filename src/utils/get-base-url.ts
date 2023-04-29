import urlJoin from "url-join";

export const getBaseUrl = () =>
  urlJoin(window.origin, window.location.pathname.split("/")[0]);
