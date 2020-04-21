import { resolve } from "path";

import { makeSchema } from "@nexus/schema";

import * as types from "./graphql";

export const schema = makeSchema({
  types,
  outputs: process.env.NODE_ENV !== "production" && {
    schema: resolve(process.env.PWD ?? "", "./generated/schema.graphql"),
    typegen: resolve(process.env.PWD ?? "", "./generated/typings.ts"),
  },
});
