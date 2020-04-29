import MarkdownToJSX, { MarkdownOptions } from "markdown-to-jsx";
import { FC, memo } from "react";

import {
  Box,
  Divider,
  BoxProps,
  Heading,
  Image,
  Stack,
  Text,
  Link,
  Icon,
} from "@chakra-ui/core";

const markdownOptions: MarkdownOptions = {
  overrides: {
    Text,
    Stack,
    Divider,
    Image,
    Box,
    Icon,
    Heading,
    p: Text,
    img: Image,
    Link,
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
