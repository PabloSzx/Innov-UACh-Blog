import dynamic from "next/dynamic";

export const PreviewIndicator = dynamic(
  () => import("./PreviewModeIndicator"),
  {
    ssr: false,
  }
);
