import { DocumentNode, gql } from "graphql-schema-query";
import { GetStaticProps, NextPage } from "next";

import { executeFromSchema } from "../api-lib/schema";

import type { Query } from "../src/graphql/generated";
interface BlogProps {
  blog: string | undefined;
}

const DateNowGql: DocumentNode<{
  dateNow: Query["dateNow"];
}> = gql`
  query {
    dateNow
  }
`;

export const getStaticProps: GetStaticProps<BlogProps> = async (ctx) => {
  return {
    props: {
      blog: (await executeFromSchema(DateNowGql))?.dateNow,
    },
  };
};

const IndexPage: NextPage<BlogProps> = (props) => {
  return <div>{props.blog}</div>;
};

export default IndexPage;
