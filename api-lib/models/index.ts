import mongoose from "mongoose";

import { MONGODB_URL } from "../../constants/tokens";

export const mongooseConection = mongoose.connect(
  MONGODB_URL || "mongodb://localhost:27017/uachInnovBlog",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 1,
  }
);

export * from "./blog";
