import MarkdownToJSX, { MarkdownOptions } from "markdown-to-jsx";
import { Box, Heading, Image, Stack, Text } from "@chakra-ui/core";
import { FC, memo } from "react";

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

export const Markdown: FC<{ children: string }> = memo(({ children }) => {
  return <MarkdownToJSX options={markdownOptions} children={children} />;
});
