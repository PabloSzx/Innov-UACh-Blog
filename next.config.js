const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE !== undefined,
});

module.exports = withBundleAnalyzer({
  poweredByHeader: false,
  experimental: {
    reactRefresh: true,
    jsconfigPaths: true,
  },
});
