import { objectType, inputObjectType } from "@nexus/schema";

export const BlogFilter = inputObjectType({
  name: "BlogFilter",
  definition(t) {
    t.string("urlSlug", { nullable: true });
    t.dateTime("minDate", { nullable: true });
    t.dateTime("maxDate", { nullable: true });
  },
});

export const BlogCreate = inputObjectType({
  name: "BlogCreate",
  definition(t) {
    t.string("title");
    t.string("lead", { nullable: true });
    t.string("content");
    t.string("urlSlug");
  },
});

export const BlogUpdate = inputObjectType({
  name: "BlogUpdate",
  definition(t) {
    t.objectId("_id");
    t.string("title");
    t.string("lead", { nullable: true });
    t.string("content");
    t.string("urlSlug");
  },
});

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
