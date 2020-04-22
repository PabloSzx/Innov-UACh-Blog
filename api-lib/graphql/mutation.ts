import { mutationType } from "@nexus/schema";

export const Mutation = mutationType({
  definition(t) {
    t.boolean("ok", {
      resolve() {
        return true;
      },
    });
  },
});
