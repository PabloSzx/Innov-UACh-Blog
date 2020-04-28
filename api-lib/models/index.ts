import mongoose from "mongoose";

import { MONGODB_URL } from "../../constants/tokens";

export const mongooseConection = mongoose.connect(
  MONGODB_URL || "mongodb://localhost:27017/uachInnovBlog",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    reconnectInterval: 500,
    reconnectTries: 1000,
    autoReconnect: true,
    poolSize: 1,
  }
);

export * from "./blog";
