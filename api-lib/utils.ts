import { Query } from "mongoose";
import PLazy from "p-lazy";

import { MaybePromise } from "@nexus/schema/dist/core";

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
