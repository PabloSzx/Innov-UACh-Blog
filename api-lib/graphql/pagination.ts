import { Query } from "mongoose";
import PLazy from "p-lazy";

import { inputObjectType, objectType } from "@nexus/schema";
import { MaybePromise } from "@nexus/schema/dist/core";

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

export const pageInfoResolver = ({
  totalCount,
  nodes,
  limit,
  skip,
}: {
  nodes: Query<unknown[]>;
  totalCount: Query<number>;
  limit: number;
  skip: number;
}) => {
  return new PLazy<{
    hasNextPage: MaybePromise<boolean>;
    pageCount: MaybePromise<number>;
    totalCount: MaybePromise<number>;
    totalPages: MaybePromise<number>;
  }>((resolve) => {
    const pageCount = new PLazy<number>((resolve, reject) => {
      nodes
        .then(({ length }) => {
          resolve(length);
        })
        .catch(reject);
    });

    const hasNextPage = new PLazy<boolean>((resolve, reject) => {
      Promise.all([totalCount, pageCount])
        .then(([nTotalCount, nPageCount]) => {
          resolve(nPageCount + skip < nTotalCount);
        })
        .catch(reject);
    });

    const totalPages = new PLazy<number>((resolve, reject) => {
      totalCount
        .then((nTotalCount) => {
          resolve(Math.ceil(nTotalCount / limit));
        })
        .catch(reject);
    });

    resolve({
      hasNextPage,
      pageCount,
      totalCount,
      totalPages,
    });
  });
};
