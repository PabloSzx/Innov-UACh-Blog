import { MongooseFilterQuery } from "mongoose";

import { arg, queryType } from "@nexus/schema";

import { BlogModel, BlogProps } from "../models";

export const Query = queryType({
  definition(t) {
    t.field("blog", {
      args: {
        id: "ObjectId",
      },
      nullable: true,
      type: "Blog",
      async resolve(_root, { id }) {
        return BlogModel.findById(id);
      },
    });
    t.field("blogList", {
      args: {
        skip: arg({
          type: "Int",
          nullable: true,
        }),
        limit: arg({
          type: "Int",
          nullable: true,
        }),
        filter: arg({
          type: "BlogFilter",
          nullable: true,
        }),
      },
      type: "Blog",
      list: true,
      async resolve(_root, { limit, skip, filter }) {
        limit = limit ?? 5;
        skip = skip ?? 0;
        if (limit <= 0) return [];

        return BlogModel.find(
          (() => {
            const queryFilter: MongooseFilterQuery<BlogProps> = {};
            if (!filter) return queryFilter;

            const { minDate, maxDate, urlSlug } = filter;

            if (urlSlug) {
              queryFilter.$text = {
                $search: urlSlug,
                $caseSensitive: false,
              };
            }
            if (minDate && maxDate) {
              queryFilter.createdAt = {
                $lte: maxDate,
                $gte: minDate,
              };
            } else if (minDate) {
              queryFilter.createdAt = {
                $gte: minDate,
              };
            } else if (maxDate) {
              queryFilter.createdAt = {
                $lte: maxDate,
              };
            }

            return queryFilter;
          })()
        )
          .limit(limit)
          .skip(skip);
      },
    });
    t.dateTime("dateNow", {
      resolve() {
        return new Date();
      },
    });
  },
});
