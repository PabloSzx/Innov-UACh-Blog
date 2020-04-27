import dynamic from "next/dynamic";

import { Spinner } from "@chakra-ui/core";

export const PreviewIndicator = dynamic(
  () => import("./PreviewModeIndicator"),
  {
    ssr: false,
  }
);

export const MoreBlogPosts = dynamic(() => import("./MoreBlogPosts"), {
  ssr: false,
  loading: () => {
    return <Spinner alignSelf="center" size="lg" />;
  },
});
