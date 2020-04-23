import { MongooseFilterQuery } from "mongoose";
import slugify from "slugify";

import { arg, queryType, stringArg } from "@nexus/schema";

import { BlogModel, BlogProps } from "../models";

export const Query = queryType({
  definition(t) {
    t.boolean("currentUser", {
      resolve(_root, _args, { isAdmin, loginOrRefresh }) {
        const wasAdmin = isAdmin();
        if (wasAdmin) loginOrRefresh();

        return wasAdmin;
      },
    });
    t.list.string("slugUrls", {
      async resolve() {
        return (await BlogModel.find({}, "urlSlug")).map(
          ({ urlSlug }) => urlSlug
        );
      },
    });
    t.field("blog", {
      args: {
        slug: stringArg({
          nullable: true,
        }),
        _id: arg({
          type: "ObjectId",
          nullable: true,
        }),
      },
      nullable: true,
      type: "Blog",
      resolve(_root, { slug, _id }) {
        if (_id) {
          return BlogModel.findById(_id);
        }
        if (slug) {
          return BlogModel.findOne({
            urlSlug: slugify(slug, {
              strict: true,
            }),
          });
        }

        return null;
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
        sort: arg({
          type: "BlogSortValue",
          list: true,
          nullable: true,
        }),
      },
      type: "Blog",
      list: true,
      resolve(_root, { limit, skip, filter, sort }) {
        limit = limit ?? 5;
        skip = skip ?? 0;
        if (limit <= 0) return [];

        if (limit > 50) limit = 50;
        if (skip < 0) skip = 0;

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
          .sort(
            (() => {
              if (!sort?.length) {
                return {
                  updatedAt: "DESC",
                };
              }

              return sort.reduce<
                { [P in keyof BlogProps]?: typeof sort[number]["direction"] }
              >((acum, { field, direction }) => {
                acum[field] = direction;
                return acum;
              }, {});
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
