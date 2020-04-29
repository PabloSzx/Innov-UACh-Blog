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
  ({
    blog: { title, lead, content, updatedAt, createdAt, mainImage, author },
  }) => {
    const marginSides = ["10px", "20px", "100px", "150px"];

    const createdAtString = dateToBlogDateString(createdAt);
    const updatedAtString = dateToBlogDateString(updatedAt);

    return (
      <Stack fontSize="1.2em">
        {mainImage ? (
          <Image src={mainImage} objectFit="contain" maxHeight="60vh" />
        ) : null}
        <Heading
          wordBreak="normal"
          margin={["10px", "20px", "30px"]}
          fontSize={["2.5rem", "2.5rem", "4rem", "5.5rem"]}
          as="h1"
        >
          {title}
        </Heading>
        <Text
          marginTop="20px"
          marginLeft={["10px", "20px", "20px"]}
          paddingBottom="20px"
        >
          {createdAtString}
        </Text>
        {author ? (
          <Text paddingBottom="20px" marginLeft={["10px", "20px"]}>
            Por <b>{author}</b>
          </Text>
        ) : null}
        {lead ? (
          <Markdown
            textAlign="justify"
            marginLeft={marginSides}
            marginRight={marginSides}
            children={lead}
          />
        ) : null}
        <Box padding="15px" />

        <Markdown
          textAlign="justify"
          marginLeft={marginSides}
          marginRight={marginSides}
          children={content}
        />

        {updatedAtString !== createdAtString && (
          <Text margin={["10px", "20px", "20px"]} marginTop="20px">
            Última modificación {updatedAtString}
          </Text>
        )}
      </Stack>
    );
  }
);
