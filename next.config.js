const webpack = require("webpack");
const { URL } = require("url");

// const imgDomains = ["media.boundless-commerce.com"];
// if (process.env.BOUNDLESS_MEDIA_SERVER) {
//   const imgUrl = new URL(process.env.BOUNDLESS_MEDIA_SERVER);
//   imgDomains.push(imgUrl.host);
// }

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This matches all hostnames for HTTPS
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "**", // This matches all hostnames for HTTP
        port: "",
        pathname: "**",
      },
    ],
  },
  webpack: (config) => {
    const defineMap = {};

    [
      "BOUNDLESS_BASE_URL",
      "BOUNDLESS_API_BASE_URL",
      "BOUNDLESS_API_PERMANENT_TOKEN",
      "BOUNDLESS_S3_PREFIX",
      "BOUNDLESS_INSTANCE_ID",
      "BOUNDLESS_PRODUCTS_IMAGE_PROPORTION",
      "BOUNDLESS_MEDIA_SERVER",
      "API_URL",
    ].forEach(
      (key) =>
        (defineMap[`process.env.${key}`] = JSON.stringify(process.env[key]))
    );

    config.plugins.push(new webpack.DefinePlugin(defineMap));

    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  transpilePackages: ["mui-one-time-password-input"],
};

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true'
// });

// module.exports = withBundleAnalyzer({});
