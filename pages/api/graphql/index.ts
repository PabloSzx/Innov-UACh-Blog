import { ApolloServer } from "apollo-server-micro";
import { PageConfig } from "next";

import { schema } from "../../../api-lib/schema";

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
