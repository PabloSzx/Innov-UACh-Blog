const withPrefresh = require("@prefresh/next");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE !== undefined,
});

module.exports = withPrefresh(
  withBundleAnalyzer({
    poweredByHeader: false,
  })
);
