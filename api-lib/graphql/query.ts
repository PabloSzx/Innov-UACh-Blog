import { queryType } from "@nexus/schema";
import { Blog } from "./blog";
import { BlogModel } from "../models";

export const Query = queryType({
  definition(t) {
    t.field("blog", {
      type: Blog,
      nullable: true,
      async resolve() {
        return BlogModel.findOne();
      },
    });
    t.dateTime("dateNow", {
      resolve() {
        return new Date();
      },
    });
  },
});
