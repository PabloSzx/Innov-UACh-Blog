import { Kind } from "graphql";
import { GraphQLDateTime } from "graphql-iso-date";
import {
  NonNegativeIntResolver,
  PositiveIntResolver,
  URLResolver,
} from "graphql-scalars";
import { ObjectId } from "mongodb";

import { asNexusMethod, scalarType } from "@nexus/schema";

export const ObjectIdScalar = scalarType({
  name: "ObjectId",
  asNexusMethod: "objectId",
  description: "Mongo object id scalar type",
  parseValue(value: string) {
    return new ObjectId(value); // value from the client input variables
  },
  serialize(value: ObjectId) {
    return value.toHexString(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value); // value from the client query
    }
    return null;
  },
});

export const DateTime = asNexusMethod(GraphQLDateTime, "dateTime");
export const NonNegativeInt = asNexusMethod(
  NonNegativeIntResolver,
  "nonNegativeInt"
);
export const PositiveInt = asNexusMethod(PositiveIntResolver, "positiveInt");
export const URLScalar = asNexusMethod(URLResolver, "url");
