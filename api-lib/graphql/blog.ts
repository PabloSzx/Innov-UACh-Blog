import { objectType } from "@nexus/schema";

export const Blog = objectType({
  name: "Blog",
  definition(t) {
    t.objectId("_id");
    t.string("title");
    t.string("lead", { nullable: true });
    t.string("content");
    t.string("urlSlug");
    t.dateTime("updatedAt");
    t.dateTime("createdAt");
  },
});
