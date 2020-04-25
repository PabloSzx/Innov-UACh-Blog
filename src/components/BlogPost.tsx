import { format, utcToZonedTime } from "date-fns-tz";
import esLocale from "date-fns/locale/es";
import Markdown, { MarkdownOptions } from "markdown-to-jsx";
import { FC, memo } from "react";

import { Box, Heading, Image, Stack, Text } from "@chakra-ui/core";

import { Blog } from "../graphql";

export type BlogPostProps = {
  blog: Pick<Blog, "content" | "lead" | "title" | "updatedAt" | "createdAt">;
};

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

export const BlogPost: FC<BlogPostProps> = memo(
  ({ blog: { title, lead, content, updatedAt, createdAt } }) => {
    return (
      <Stack margin="30px" fontSize="1.2em">
        <Heading
          margin="30px"
          fontSize={["3rem", "4rem", "5rem", "6rem"]}
          as="h1"
        >
          {title}
        </Heading>
        <Text margin="15px" paddingBottom="30px">
          {format(
            utcToZonedTime(createdAt, "America/Santiago"),
            "dd MMMM, yyyy. O",
            {
              locale: esLocale,
            }
          )}
        </Text>
        {lead && (
          <Box textAlign="justify" marginLeft="100px" marginRight="100px">
            <Markdown options={markdownOptions} children={lead} />
          </Box>
        )}
        <Box padding="15px" />
        <Box textAlign="justify" marginLeft="100px" marginRight="100px">
          <Markdown options={markdownOptions} children={content} />
        </Box>

        {updatedAt !== createdAt && (
          <Text margin="10px" marginTop="20px">
            Last updated{" "}
            {format(
              utcToZonedTime(updatedAt, "America/Santiago"),
              "dd MMMM, yyyy. O",
              {
                locale: esLocale,
              }
            )}
          </Text>
        )}
      </Stack>
    );
  }
);
