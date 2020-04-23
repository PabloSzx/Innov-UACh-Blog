import { inputObjectType, objectType } from "@nexus/schema";

export const PaginationArgs = inputObjectType({
  name: "PaginationArgs",
  definition(t) {
    t.nonNegativeInt("skip", {
      default: 0,
      nullable: true,
      description: "Amount of documents to skip for the current page",
    });
    t.positiveInt("limit", {
      default: 5,
      nullable: true,
      description: "Limit of documents on the page, the maximum is 50",
    });
  },
});

export const PageInfo = objectType({
  name: "PageInfo",
  definition(t) {
    t.boolean("hasNextPage", {
      description:
        "Helper to know if there is a next page based on filter, limit and skip",
    });
    t.nonNegativeInt("pageCount", {
      description: "Total amount of documents in the current page",
    });
    t.nonNegativeInt("totalCount", {
      description: "Total amount of documents available based on the filter",
    });
    t.nonNegativeInt("totalPages", {
      description: "Total amount of pages based on the filter and limit",
    });
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
