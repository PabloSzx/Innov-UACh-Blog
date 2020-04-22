import slugify from "slugify";

import { mutationType } from "@nexus/schema";

import { BlogModel } from "../models";

export const Mutation = mutationType({
  definition(t) {
    t.field("createBlog", {
      type: "Blog",
      args: {
        blog: "BlogCreate",
      },
      async resolve(_root, { blog: { urlSlug, ...blog } }) {
        return await BlogModel.create({
          urlSlug: slugify(urlSlug, {
            strict: true,
          }),
          ...blog,
        });
      },
    });
    t.field("updateBlog", {
      type: "Blog",
      nullable: true,
      args: {
        blog: "BlogUpdate",
      },
      async resolve(_root, { blog: { _id, lead, urlSlug, ...blog } }) {
        return await BlogModel.findByIdAndUpdate(
          _id,
          {
            ...blog,
            lead: lead ?? undefined,
            urlSlug: slugify(urlSlug, {
              strict: true,
            }),
          },
          {
            new: true,
          }
        );
      },
    });
  },
});
