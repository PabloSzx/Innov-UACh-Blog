import { ApolloServer } from "apollo-server-micro";

import { schema } from "../../api-lib/schema";

import type { PageConfig } from "next";

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
});

export default server.createHandler({
  path: "/api/graphql",
});

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
