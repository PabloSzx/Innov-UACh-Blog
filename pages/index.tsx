import { DocumentNode, gql } from "graphql-schema-query";
import { GetStaticProps, NextPage } from "next";

import { Stack, Heading, Text, Box } from "@chakra-ui/core";
import Link from "next/link";

import { executeFromSchema } from "../api-lib/schema";

import type { Query, Blog } from "../src/graphql/generated";
import { dateToBlogDateString } from "../src/utils";
import { Markdown } from "../src/components/Markdown";

type BlogProps = {
  blogList: {
    nodes: Array<{
      _id: Blog["_id"];
      title: Blog["title"];
      lead: Blog["lead"];
      content: Blog["content"];
      urlSlug: Blog["urlSlug"];
      updatedAt: Blog["updatedAt"];
      createdAt: Blog["updatedAt"];
    }>;
  };
  dateNow: Query["dateNow"];
};

const BlogListGql: DocumentNode<BlogProps, never> = gql`
  query {
    blogList(pagination: { limit: 50, skip: 0 }) {
      nodes {
        _id
        title
        content
        urlSlug
        updatedAt
        createdAt
        lead
      }
    }
    dateNow
  }
`;

export const getStaticProps: GetStaticProps<BlogProps> = async (ctx) => {
  const props = await executeFromSchema(BlogListGql);

  return {
    props,
  };
};

const IndexPage: NextPage<BlogProps> = ({ blogList: { nodes } }) => {
  return (
    <Stack shouldWrapChildren spacing="20px" margin="15px">
      {nodes.map(({ _id, urlSlug, title, createdAt, lead }) => {
        return (
          <Box
            key={_id}
            borderRadius="10px"
            border="1px solid black"
            width="fit-content"
            padding="10px"
            maxW="600px"
          >
            <Link href="/blog/[slug]" as={`/blog/${urlSlug}`} passHref>
              <Heading cursor="pointer" as="a">
                {title}
              </Heading>
            </Link>
            <br />
            {lead ? <Markdown children={lead} /> : null}
            <Text marginTop="10px">{dateToBlogDateString(createdAt)}</Text>
          </Box>
        );
      })}
    </Stack>
  );
};

export default IndexPage;
