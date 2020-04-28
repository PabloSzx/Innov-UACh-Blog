import { DocumentNode, gql } from "graphql-schema-query";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { Stack } from "@chakra-ui/core";

import { executeFromSchema } from "../../api-lib/schema";
import { SITE_URL } from "../../constants";
import { BlogPost, BlogPostProps } from "../../src/components/BlogPost";
import { PreviewIndicator } from "../../src/components/DynamicImports";
import { BlogMetaDataHead } from "../../src/components/MetaTags";

import type { Query } from "../../src/graphql/generated";
const BlogGql: DocumentNode<
  BlogPostProps,
  {
    slug: string;
  }
> = gql`
  query($slug: String!) {
    blog(slug: $slug) {
      title
      lead
      content
      mainImage
      updatedAt
      createdAt
      mainImage
      mainImageAlt
      author
      metaDescription
      metaSection
    }
  }
`;

const PathsGql: DocumentNode<
  {
    slugUrls: Query["slugUrls"];
  },
  never
> = gql`
  query {
    slugUrls
  }
`;

interface PageProps extends BlogPostProps {
  slug: string;
  isPreview: boolean;
}

export const getStaticProps: GetStaticProps<PageProps> = async ({
  params,
  preview,
}) => {
  const slug = params?.slug;

  if (typeof slug !== "string") throw Error("Wrong slug param!");

  const props = await executeFromSchema(BlogGql, {
    variables: {
      slug,
    },
  });

  return {
    props: {
      ...props,
      slug,
      isPreview: !!preview,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { slugUrls } = await executeFromSchema(PathsGql);

  return {
    paths: slugUrls.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

const BlogPage: NextPage<PageProps> = ({ blog, slug, isPreview }) => {
  if (!blog) return null;

  return (
    <>
      {isPreview && <PreviewIndicator />}
      <BlogMetaDataHead blog={blog} url={`${SITE_URL}/blog/${slug}`} />
      <Stack margin="10px">
        <BlogPost blog={blog} />
      </Stack>
    </>
  );
};

export default BlogPage;
