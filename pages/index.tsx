import { DocumentNode, gql } from "graphql-schema-query";
import { GetStaticProps, NextPage } from "next";

import { executeFromSchema } from "../api-lib/schema";

import type { Query, Blog } from "../src/graphql/generated";

type BlogProps = {
  blogList: {
    nodes: Array<{
      _id: Blog["_id"];
      title: Blog["title"];
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
    blogList(pagination: { limit: 5, skip: 0 }) {
      nodes {
        _id
        title
        content
        urlSlug
        updatedAt
        createdAt
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

const IndexPage: NextPage<BlogProps> = (props) => {
  return <div>{JSON.stringify(props.blogList, null, 4)}</div>;
};

export default IndexPage;
