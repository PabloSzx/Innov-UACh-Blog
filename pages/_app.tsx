import "../public/nprogress.css";
import "../public/style.css";

import { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";

import { CSSReset, theme, ThemeProvider } from "@chakra-ui/core";

import { Footer } from "../src/components/Footer";
import { Navigation } from "../src/components/Navigation";

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
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}
