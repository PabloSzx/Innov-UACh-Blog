import "../public/nprogress.css";

import { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";

import { CSSReset, theme, ThemeProvider } from "@chakra-ui/core";

const customTheme: typeof theme = {
  ...theme,
};

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function ({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
