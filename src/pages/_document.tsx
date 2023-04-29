import { Html, Head, Main, NextScript } from "next/document";
import { getBaseUrl } from "../utils/get-base-url";
import urlJoin from "url-join";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" href={urlJoin(getBaseUrl(), "favicon.ico")} />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={urlJoin(getBaseUrl(), "favicon-32x32.png")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={urlJoin(getBaseUrl(), "favicon-16x16.png")}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
