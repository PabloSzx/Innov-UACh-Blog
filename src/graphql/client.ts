import { createUseMutation, createUseQuery } from "gqless-hooks";

import { IS_BROWSER } from "../../constants";
import { Mutation, Query, schema } from "./generated";

const endpoint = IS_BROWSER
  ? "/api/graphql"
  : "https://innov-uach-blog.now.sh/api/graphql";

export const useQuery = createUseQuery<Query>({
  schema,
  endpoint,
  creationHeaders: {
    Accept: "application/json",
  },
});

export const useMutation = createUseMutation<Mutation>({
  schema,
  endpoint,
  creationHeaders: {
    Accept: "application/json",
  },
});
