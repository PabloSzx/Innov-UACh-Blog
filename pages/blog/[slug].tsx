import { DocumentNode, gql } from "graphql-schema-query";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { executeFromSchema } from "../../api-lib/schema";
import { BlogPost, BlogPostProps } from "../../src/components/BlogPost";

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
      updatedAt
      createdAt
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

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({
  params,
}) => {
  const slug = params?.slug;

  if (typeof slug !== "string") throw Error("Wrong slug param!");

  const props = await executeFromSchema(BlogGql, {
    variables: {
      slug,
    },
  });

  return {
    props,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { slugUrls } = await executeFromSchema(PathsGql);

  return {
    paths: slugUrls.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

const BlogPage: NextPage<BlogPostProps> = ({ blog }) => {
  if (!blog) return null;

  return <BlogPost blog={blog} />;
};

export default BlogPage;
