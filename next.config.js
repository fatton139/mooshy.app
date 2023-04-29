const getAssetPrefix = () => {
  if (process.env.CI) {
    return "https://fatton139.github.io/mooshy.app";
  } else if (process.env.NODE_ENV === "production") {
    return "http://127.0.0.1:5500";
  } else {
    return undefined;
  }
};

const getBaseUrl = () => {
  if (process.env.CI) {
    return "/mooshy.app";
  } else {
    return undefined;
  }
};

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",
  distDir: "dist-web",
  assetPrefix: getAssetPrefix(),
  basePath: getBaseUrl(),
};

module.exports = nextConfig;
