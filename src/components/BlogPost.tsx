import { FC, memo } from "react";

import { Box, Heading, Image, Stack, Text } from "@chakra-ui/core";

import { Blog } from "../graphql";
import { dateToBlogDateString } from "../utils";
import { Markdown } from "./Markdown";

export type BlogPostProps = {
  blog: Pick<
    Blog,
    | "content"
    | "lead"
    | "title"
    | "mainImage"
    | "updatedAt"
    | "createdAt"
    | "mainImage"
    | "mainImageAlt"
    | "author"
    | "metaDescription"
    | "metaSection"
  >;
};

export const BlogPost: FC<BlogPostProps> = memo(
  ({ blog: { title, lead, content, updatedAt, createdAt, mainImage } }) => {
    return (
      <Stack margin="30px" fontSize="1.2em">
        {mainImage ? (
          <Image src={mainImage} objectFit="contain" maxHeight="60vh" />
        ) : null}
        <Heading
          margin="30px"
          fontSize={["3rem", "4rem", "5rem", "6rem"]}
          as="h1"
        >
          {title}
        </Heading>
        <Text margin="15px" paddingBottom="30px">
          {dateToBlogDateString(createdAt)}
        </Text>
        {lead ? (
          <Box textAlign="justify" marginLeft="150px" marginRight="150px">
            <Markdown children={lead} />
          </Box>
        ) : null}
        <Box padding="15px" />
        <Box textAlign="justify" marginLeft="150px" marginRight="150px">
          <Markdown children={content} />
        </Box>

        {updatedAt !== createdAt && (
          <Text margin="10px" marginTop="20px">
            Last updated {dateToBlogDateString(updatedAt)}
          </Text>
        )}
      </Stack>
    );
  }
);
