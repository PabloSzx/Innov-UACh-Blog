import { MongooseFilterQuery } from "mongoose";
import slugify from "slugify";

import { arg, queryType, stringArg } from "@nexus/schema";

import { BlogModel, BlogProps } from "../models";
import { pageInfoResolver } from "./pagination";

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
        pagination: arg({
          type: "PaginationArgs",
          nullable: true,
          default: {
            limit: 5,
            skip: 0,
          },
        }),
        filter: arg({
          type: "BlogFilter",
          nullable: true,
        }),
        sort: arg({
          type: "BlogSortValue",
          list: true,
          nullable: true,
          default: {
            field: "createdAt",
            direction: "DESC",
          },
        }),
      },
      type: "BlogNodes",
      resolve(_root, { pagination, filter, sort }, _ctx) {
        let limit = pagination?.limit ?? 5;
        let skip = pagination?.skip ?? 0;

        if (limit > 50) limit = 50;

        const queryFilter = (() => {
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
        })();

        const sortQuery = (() => {
          if (!sort?.length) {
            return {
              createdAt: "DESC",
            };
          }

          return sort.reduce<
            { [P in keyof BlogProps]?: typeof sort[number]["direction"] }
          >((acum, { field, direction }) => {
            acum[field] = direction;
            return acum;
          }, {});
        })();

        const nodes = BlogModel.find(queryFilter)
          .sort(sortQuery)
          .limit(limit)
          .skip(skip);

        const totalCount = BlogModel.countDocuments(queryFilter);

        return {
          pageInfo: pageInfoResolver({
            nodes,
            totalCount,
            limit,
            skip,
          }),
          nodes,
        };
      },
    });
    t.dateTime("dateNow", {
      resolve() {
        return new Date();
      },
    });
  },
});
