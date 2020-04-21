import { ApolloServer } from "apollo-server-micro";
import { PageConfig } from "next";

import { schema } from "../../../api/schema";

const server = new ApolloServer({
  schema,
});

export default server.createHandler({
  path: "/api/graphql",
});

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
