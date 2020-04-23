import "./models";

import schemaQuery from "graphql-schema-query";
import { resolve } from "path";

import { makeSchema } from "@nexus/schema";

import * as types from "./graphql";

export const schema = makeSchema({
  types,
  outputs:
    process.env.NODE_ENV !== "production"
      ? {
          schema: resolve(
            process.env.PWD ?? "",
            "./src/graphql/generated/schema.graphql"
          ),
          typegen: resolve(
            process.env.PWD ?? "",
            "./src/graphql/generated/apiTypings.ts"
          ),
        }
      : false,

  typegenAutoConfig: {
    headers: ['import { ObjectId } from "mongodb";'],
    sources: [],
    backingTypeMap: {
      ObjectId: "ObjectId",
      DateTime: "Date",
      NonNegativeInt: "number",
      PositiveInt: "number",
    },
  },
  nonNullDefaults: {
    output: true,
    input: true,
  },
  prettierConfig: {},
});

export const executeFromSchema = schemaQuery(schema);
