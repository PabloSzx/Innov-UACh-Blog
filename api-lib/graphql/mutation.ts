import slugify from "slugify";

import { mutationType } from "@nexus/schema";

import { BlogModel } from "../models";
import { UNAUTHORIZED_ERROR } from "../../constants";

export const Mutation = mutationType({
  definition(t) {
    t.boolean("enablePreviewMode", {
      resolve(_root, _args, { isAdmin, setPreviewData }) {
        if (isAdmin()) {
          setPreviewData("");
          return true;
        }
        return false;
      },
    });
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
      async resolve(
        _root,
        { blog: { urlSlug, ...blog } },
        { isAdmin, setPreviewData }
      ) {
        if (!isAdmin()) throw Error(UNAUTHORIZED_ERROR);

        const createdBlog = await BlogModel.create({
          urlSlug: slugify(urlSlug, {
            strict: true,
          }),
          ...blog,
        });

        setPreviewData("");

        return createdBlog;
      },
    });
    t.field("deleteBlog", {
      type: "Boolean",
      args: {
        blog: "ObjectId",
      },
      async resolve(_root, { blog }, { isAdmin }) {
        if (!isAdmin()) throw Error(UNAUTHORIZED_ERROR);

        const removedBlog = await BlogModel.findByIdAndRemove(blog);

        return Boolean(removedBlog);
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
        {
          blog: {
            _id,
            lead,
            urlSlug,
            author,
            mainImage,
            mainImageAlt,
            metaDescription,
            metaSection,
            ...blog
          },
        },
        { isAdmin, setPreviewData }
      ) {
        if (!isAdmin()) throw Error(UNAUTHORIZED_ERROR);

        const updatedBlog = await BlogModel.findByIdAndUpdate(
          _id,
          {
            ...blog,
            mainImage: mainImage ?? undefined,
            mainImageAlt: mainImageAlt ?? undefined,
            metaDescription: metaDescription ?? undefined,
            metaSection: metaSection ?? undefined,
            author: author ?? undefined,
            lead: lead ?? undefined,
            urlSlug: slugify(urlSlug, {
              strict: true,
            }),
          },
          {
            new: true,
          }
        );

        if (updatedBlog) {
          setPreviewData("");
        }

        return updatedBlog;
      },
    });
  },
});
