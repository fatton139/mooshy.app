const getAssetPrefix = () => {
  if (process.env.CI) {
    return "https://fatton139.github.io/mooshy.app";
  } else if (process.env.NODE_ENV === "production") {
    return "http://127.0.0.1:5500/mooshy.app";
  } else {
    return undefined;
  }
};

const getBaseUrl = () => {
  if (process.env.CI) {
    return "/mooshy.app";
  } else if (process.env.NODE_ENV === "production") {
    return "/mooshy.app";
  } else {
    return "/mooshy.app";
  }
};

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",
  distDir: "dist-web",
  assetPrefix: getAssetPrefix(),
  basePath: "/mooshy.app",
};

module.exports = nextConfig;
