import MarkdownToJSX, { MarkdownOptions } from "markdown-to-jsx";
import { FC, memo } from "react";

import { Box, BoxProps, Heading, Image, Stack, Text } from "@chakra-ui/core";

const markdownOptions: MarkdownOptions = {
  overrides: {
    Text,
    Stack,
    Image,
    Box,
    Heading,
    p: Text,
    img: Image,
  },
};

export const Markdown: FC<
  BoxProps & {
    children: string;
  }
> = memo(({ children, ...boxProps }) => {
  return (
    <Box {...boxProps}>
      <MarkdownToJSX options={markdownOptions} children={children} />
    </Box>
  );
});
