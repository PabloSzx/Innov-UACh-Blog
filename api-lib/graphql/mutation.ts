import slugify from "slugify";

import { mutationType } from "@nexus/schema";

import { BlogModel } from "../models";
import { ADMIN_TOKEN, UNAUTHORIZED_ERROR } from "../../constants";

export const Mutation = mutationType({
  definition(t) {
    t.boolean("logout", {
      resolve(_root, _args, { isAdmin, logout }) {
        logout();

        return isAdmin();
      },
    });
    t.boolean("login", {
      args: {
        token: "String",
      },
      resolve(_root, { token }, { loginOrRefresh, checkToken }) {
        const isValid = checkToken(token);
        if (isValid) loginOrRefresh();

        return isValid;
      },
    });
    t.field("createBlog", {
      type: "Blog",
      args: {
        blog: "BlogCreate",
      },
      async resolve(_root, { blog: { urlSlug, ...blog } }, { isAdmin }) {
        if (!isAdmin) throw Error(UNAUTHORIZED_ERROR);

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
      async resolve(
        _root,
        { blog: { _id, lead, urlSlug, ...blog } },
        { isAdmin }
      ) {
        if (!isAdmin) throw Error(UNAUTHORIZED_ERROR);

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
