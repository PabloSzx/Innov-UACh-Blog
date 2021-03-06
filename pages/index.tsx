import { DocumentNode, gql } from "graphql-schema-query";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FC } from "react";

import {
  Divider,
  Grid,
  Heading,
  Image,
  PseudoBox,
  Stack,
  Text,
} from "@chakra-ui/core";

import { executeFromSchema } from "../api-lib/schema";
import { initialNBlogs } from "../constants";
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

const FirstBlogPost: FC<{
  blog: BlogProps["blogList"]["nodes"][number];
}> = ({
  blog: { _id, urlSlug, title, createdAt, lead, mainImage, mainImageAlt },
}) => {
  {
    return (
      <PseudoBox
        alignSelf="center"
        key={_id}
        width={["90vw", "90vw", "600px", "900px"]}
        margin="10px"
        padding="20px"
        fontSize={["1rem", "1.2rem", "1.3rem", "1.4rem"]}
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
            fontSize={["1.8rem", "2rem", "2.2rem", "2.3rem"]}
            cursor="pointer"
            as="a"
            userSelect="none"
          >
            {title}
          </Heading>
        </Link>
        <br />
        {lead ? (
          <Markdown fontSize="1.1rem" marginTop="10px" children={lead} />
        ) : null}
        <Text marginTop="10px" fontSize="0.8rem">
          {dateToBlogDateString(createdAt)}
        </Text>
      </PseudoBox>
    );
  }
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
      width={["80vw", "70vw", "350px", "550px"]}
      borderRadius="10px"
      transition="all 0.5s"
      _hover={{
        boxShadow: "0px 0px 5px 5px #888",
      }}
      alignSelf="center"
      fontSize={["0.9rem", "1.1rem", "1.2rem", "1.3rem"]}
    >
      <BlogImage image={mainImage} alt={mainImageAlt || title} slug={urlSlug} />
      <Link href="/blog/[slug]" as={`/blog/${urlSlug}`} passHref>
        <Heading
          userSelect="none"
          cursor="pointer"
          as="a"
          paddingBottom="10px"
          wordBreak="normal"
          fontSize={["1.6rem", "1.8rem", "1.9rem", "2.1rem"]}
        >
          {title}
        </Heading>
      </Link>
      <br />
      {lead ? (
        <Markdown marginTop="10px" fontSize="1rem" children={lead} />
      ) : null}
      <Text marginTop="10px" fontSize="0.8rem">
        {dateToBlogDateString(createdAt)}
      </Text>
    </PseudoBox>
  );
};

const IndexPage: NextPage<PageProps> = ({ blogList: { nodes }, isPreview }) => {
  const firstBlog = nodes[0];
  const afterFirstBlogNodes = nodes.slice(1, initialNBlogs);

  return (
    <>
      <Head key={1}>
        <title>Noticias - Comunidades Práctica INFO</title>
      </Head>
      {isPreview && <PreviewIndicator />}
      <Stack margin="15px" padding="25px">
        {firstBlog && <FirstBlogPost blog={nodes[0]} />}

        {afterFirstBlogNodes.length ? (
          <>
            <Divider />
            <Heading textAlign="center" fontSize="3rem" paddingBottom="20px">
              Más noticias
            </Heading>
            <Grid
              alignSelf="center"
              gridRowGap="20px"
              gridColumnGap={["0px", "0px", "0px", "20px"]}
              transition="all 0.5s"
              gridTemplateColumns={[
                "repeat(1, 1fr)",
                "repeat(1, 1fr)",
                "repeat(2, 1fr)",
                "repeat(2, 1fr)",
              ]}
              justifyContent="space-around"
            >
              {afterFirstBlogNodes.map((blog) => {
                return <ExtraBlogPost key={blog._id} blog={blog} />;
              })}

              {nodes.length > initialNBlogs && (
                <MoreBlogPosts blogPosts={nodes} />
              )}
            </Grid>
          </>
        ) : null}
      </Stack>
    </>
  );
};

export default IndexPage;
