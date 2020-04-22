import { DocumentNode, gql } from "graphql-schema-query";
import { GetStaticProps, NextPage } from "next";

import { executeFromSchema } from "../api-lib/schema";

import type { Query, Blog } from "../src/graphql/generated";

type BlogProps = {
  blogList: {
    _id: Blog["_id"];
    title: Blog["title"];
    content: Blog["content"];
    urlSlug: Blog["urlSlug"];
  }[];
  dateNow: Query["dateNow"];
};

const BlogListGql: DocumentNode<BlogProps, never> = gql`
  query {
    blogList(limit: 5, skip: 0) {
      _id
      title
      content
      urlSlug
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
  return <div>{JSON.stringify(props.blogList)}</div>;
};

export default IndexPage;
