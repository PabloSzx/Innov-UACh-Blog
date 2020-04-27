import { DocumentNode, gql } from "graphql-schema-query";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FC } from "react";

import { Heading, Image, PseudoBox, Stack, Text } from "@chakra-ui/core";

import { executeFromSchema } from "../api-lib/schema";
import {
  MoreBlogPosts,
  PreviewIndicator,
} from "../src/components/DynamicImports";
import { Markdown } from "../src/components/Markdown";
import { dateToBlogDateString } from "../src/utils";

import type { Query, Blog } from "../src/graphql/generated";

export type BlogProps = {
  blogList: {
    pageInfo: {
      hasNextPage: Query["blogList"]["pageInfo"]["hasNextPage"];
    };
    nodes: Array<{
      _id: Blog["_id"];
      title: Blog["title"];
      lead: Blog["lead"];
      mainImage: Blog["mainImage"];
      mainImageAlt: Blog["mainImageAlt"];
      urlSlug: Blog["urlSlug"];
      updatedAt: Blog["updatedAt"];
      createdAt: Blog["updatedAt"];
    }>;
  };
  dateNow: Query["dateNow"];
};

export const initialNBlogs = 5;

const BlogListGql: DocumentNode<BlogProps, never> = gql`
  query {
    blogList(pagination: { limit: ${initialNBlogs}, skip: 0 }) {
      pageInfo {
        hasNextPage
      }
      nodes {
        _id
        title
        lead
        mainImage
        urlSlug
        updatedAt
        createdAt
      }
    }
    dateNow
  }
`;

interface PageProps extends BlogProps {
  isPreview: boolean;
}

export const getStaticProps: GetStaticProps<PageProps> = async ({
  preview,
}) => {
  const props = await executeFromSchema(BlogListGql);

  return {
    props: {
      ...props,
      isPreview: !!preview,
    },
  };
};

const BlogImage: FC<{
  alt: string;
  slug: string;
  image?: string | null;
}> = ({ alt, slug, image }) => {
  if (image == null) return null;

  return (
    <Link href="/blog/[slug]" as={`/blog/${slug}`} passHref>
      <a>
        <Image alt={alt} objectFit="contain" src={image} />
      </a>
    </Link>
  );
};

export const ExtraBlogPost: FC<{
  blog: BlogProps["blogList"]["nodes"][number];
}> = ({
  blog: { _id, mainImage, mainImageAlt, title, urlSlug, lead, createdAt },
}) => {
  return (
    <PseudoBox
      key={_id}
      padding="20px"
      width="600px"
      marginLeft="100px"
      marginRight="100px"
      marginTop="30px"
      marginBottom="30px"
      borderRadius="10px"
      transition="all 0.5s"
      _hover={{
        boxShadow: "0px 0px 5px 5px #888",
      }}
    >
      <BlogImage image={mainImage} alt={mainImageAlt || title} slug={urlSlug} />
      <Link href="/blog/[slug]" as={`/blog/${urlSlug}`} passHref>
        <Heading cursor="pointer" as="a" paddingBottom="10px">
          {title}
        </Heading>
      </Link>
      <br />
      {lead ? (
        <Markdown marginTop="10px" textAlign="justify" children={lead} />
      ) : null}
      <Text marginTop="10px">{dateToBlogDateString(createdAt)}</Text>
    </PseudoBox>
  );
};

const IndexPage: NextPage<PageProps> = ({
  blogList: {
    nodes,
    pageInfo: { hasNextPage },
  },
  isPreview,
}) => {
  return (
    <>
      <Head key={1}>
        <title>Comunidades UACh</title>
      </Head>
      <Stack marginTop="15px" marginBottom="15px">
        {isPreview && <PreviewIndicator />}
        {nodes
          .slice(0, 1)
          .map(
            ({
              _id,
              urlSlug,
              title,
              createdAt,
              lead,
              mainImage,
              mainImageAlt,
            }) => {
              return (
                <PseudoBox
                  alignSelf="center"
                  key={_id}
                  width="fit-content"
                  padding="20px"
                  maxW="900px"
                  fontSize="1.3rem"
                  transition="all 0.5s"
                  borderRadius="10px"
                  _hover={{
                    boxShadow: "0px 0px 5px 5px #888",
                  }}
                >
                  <BlogImage
                    image={mainImage}
                    alt={mainImageAlt || title}
                    slug={urlSlug}
                  />

                  <Link href="/blog/[slug]" as={`/blog/${urlSlug}`} passHref>
                    <Heading fontSize="3em" cursor="pointer" as="a">
                      {title}
                    </Heading>
                  </Link>
                  <br />
                  {lead ? (
                    <Markdown
                      marginTop="10px"
                      textAlign="justify"
                      children={lead}
                    />
                  ) : null}
                  <Text marginTop="10px">
                    {dateToBlogDateString(createdAt)}
                  </Text>
                </PseudoBox>
              );
            }
          )}
        <Stack
          shouldWrapChildren
          isInline
          flexWrap="wrap"
          justifyContent="space-around"
          spacing={0}
        >
          {nodes.slice(1).map((blog) => {
            return <ExtraBlogPost key={blog._id} blog={blog} />;
          })}
        </Stack>

        {hasNextPage && <MoreBlogPosts />}
      </Stack>
    </>
  );
};

export default IndexPage;
