import { DocumentNode, gql } from "graphql-schema-query";
import Maybe from "graphql/tsutils/Maybe";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { executeFromSchema } from "../../api-lib/schema";

import type { Blog, Query } from "../../src/graphql/generated";

type BlogProps = {
  blog: Maybe<{
    _id: Blog["_id"];
    title: Blog["title"];
    content: Blog["content"];
    updatedAt: Blog["updatedAt"];
    createdAt: Blog["updatedAt"];
  }>;
};

const BlogGql: DocumentNode<
  BlogProps,
  {
    slug: string;
  }
> = gql`
  query($slug: String!) {
    blog(slug: $slug) {
      _id
      title
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

export const getStaticProps: GetStaticProps<BlogProps> = async ({ params }) => {
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

const BlogPage: NextPage<BlogProps> = ({ blog }) => {
  return <div>{JSON.stringify(blog, null, 2)}</div>;
};

export default BlogPage;
