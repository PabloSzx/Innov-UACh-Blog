import { DocumentNode, gql } from "graphql-schema-query";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FC } from "react";

import { Heading, Image, PseudoBox, Stack, Text } from "@chakra-ui/core";

import { executeFromSchema } from "../api-lib/schema";
import { initialNBlogs } from "../constants";
import {
  PreviewIndicator,
  MoreBlogPosts,
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

const BlogListGql: DocumentNode<BlogProps, { skip: number }> = gql`
  query($skip: NonNegativeInt) {
    blogList(pagination: { limit: 50, skip: $skip }) {
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
  let props = await executeFromSchema(BlogListGql);
  while (props.blogList.pageInfo.hasNextPage) {
    const newData = await executeFromSchema(BlogListGql, {
      variables: {
        skip: props.blogList.nodes.length,
      },
    });
    props.blogList.pageInfo = newData.blogList.pageInfo;
    props.blogList.nodes.push(...newData.blogList.nodes);
    props.dateNow = newData.dateNow;
  }

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
      height="fit-content"
      width={["70vw", "70vw", "70vw", "450px"]}
      marginTop="30px"
      marginBottom="30px"
      marginLeft={["0px", "0x", "50px", "100px"]}
      marginRight={["0px", "0x", "50px", "100px"]}
      borderRadius="10px"
      transition="all 0.5s"
      _hover={{
        boxShadow: "0px 0px 5px 5px #888",
      }}
    >
      <BlogImage image={mainImage} alt={mainImageAlt || title} slug={urlSlug} />
      <Link href="/blog/[slug]" as={`/blog/${urlSlug}`} passHref>
        <Heading userSelect="none" cursor="pointer" as="a" paddingBottom="10px">
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

const IndexPage: NextPage<PageProps> = ({ blogList: { nodes }, isPreview }) => {
  return (
    <>
      <Head key={1}>
        <title>Comunidades UACh</title>
      </Head>
      <Stack margin="15px" padding="25px">
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
                  width={["90vw", "90vw", "600px"]}
                  margin="10px"
                  padding="20px"
                  fontSize={["1rem", "1.2rem", "1.3rem"]}
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
                    <Heading
                      wordBreak="normal"
                      fontSize={["2.3rem", "2.5rem", "3rem"]}
                      cursor="pointer"
                      as="a"
                      userSelect="none"
                    >
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
          isInline
          flexWrap="wrap"
          justifyContent="space-around"
          spacing={0}
        >
          {nodes.slice(1, initialNBlogs).map((blog) => {
            return <ExtraBlogPost key={blog._id} blog={blog} />;
          })}
          {nodes.length > initialNBlogs && <MoreBlogPosts blogPosts={nodes} />}
        </Stack>
      </Stack>
    </>
  );
};

export default IndexPage;
