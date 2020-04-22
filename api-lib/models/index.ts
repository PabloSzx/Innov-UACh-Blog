import mongoose from "mongoose";

export const mongooseConection = mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost:27017/uachInnovBlog",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

export * from "./blog";
