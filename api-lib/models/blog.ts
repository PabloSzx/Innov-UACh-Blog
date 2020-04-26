import mongoose from "mongoose";
import {
  createSchema,
  ExtractDoc,
  ExtractProps,
  Type,
  typedModel,
} from "ts-mongoose";

const BlogSchema = createSchema(
  {
    title: Type.string({
      required: true,
      unique: true,
    }),
    lead: Type.string({}),
    content: Type.string({
      required: true,
    }),
    urlSlug: Type.string({
      unique: true,
      required: true,
    }),
  },
  {
    timestamps: true,
  }
);

BlogSchema.index({
  urlSlug: "text",
});

export type BlogDoc = ExtractDoc<typeof BlogSchema>;
export type BlogProps = ExtractProps<typeof BlogSchema>;

const BlogModelName = "Blog";
delete mongoose.models[BlogModelName];

export const BlogModel = typedModel(BlogModelName, BlogSchema);
