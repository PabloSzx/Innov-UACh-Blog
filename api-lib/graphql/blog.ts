import { enumType, inputObjectType, objectType } from "@nexus/schema";

import type { NexusGenRootTypes } from "../../src/graphql/generated/apiTypings";

export const BlogFilter = inputObjectType({
  name: "BlogFilter",
  definition(t) {
    t.string("urlSlug", { nullable: true });
    t.dateTime("minDate", { nullable: true });
    t.dateTime("maxDate", { nullable: true });
  },
});

export const SortDirection = enumType({
  name: "SortDirection",
  members: ["ASC", "DESC"],
});

export const BlogSortField = enumType({
  name: "BlogSortField",
  members: ["createdAt", "updatedAt", "title", "urlSlug"] as Array<
    keyof NexusGenRootTypes["Blog"]
  >,
});

export const BlogSortValue = inputObjectType({
  name: "BlogSortValue",
  definition(t) {
    t.field("field", {
      type: "BlogSortField",
    });
    t.field("direction", {
      type: "SortDirection",
    });
  },
});

export const BlogCreate = inputObjectType({
  name: "BlogCreate",
  definition(t) {
    t.string("title");
    t.string("lead", { nullable: true });
    t.string("content");
    t.string("urlSlug");
    t.url("mainImage", { nullable: true });
    t.string("mainImageAlt", { nullable: true });
    t.string("author", { nullable: true });
    t.string("metaDescription", { nullable: true });
    t.string("metaSection", { nullable: true });
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
    t.url("mainImage", { nullable: true });
    t.string("mainImageAlt", { nullable: true });
    t.string("author", { nullable: true });
    t.string("metaDescription", { nullable: true });
    t.string("metaSection", { nullable: true });
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
    t.url("mainImage", { nullable: true });
    t.string("mainImageAlt", { nullable: true });
    t.string("author", { nullable: true });
    t.string("metaDescription", { nullable: true });
    t.string("metaSection", { nullable: true });

    t.dateTime("updatedAt");
    t.dateTime("createdAt");
  },
});

export const BlogNodes = objectType({
  name: "BlogNodes",
  definition(t) {
    t.field("pageInfo", {
      type: "PageInfo",
    });
    t.list.field("nodes", {
      type: "Blog",
    });
  },
});
