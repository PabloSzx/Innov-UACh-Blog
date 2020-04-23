import ms from "ms";

export const SECRET_TOKEN = process.env.SECRET_TOKEN;
export const MONGODB_URL = process.env.MONGODB_URL;
export const PREVIEW_TOKEN = process.env.PREVIEW_TOKEN;
export const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

export const IS_PRODUCTION = process.env.NODE_ENV === "production";

export const ONE_WEEK_SECONDS = ms("1 week") / 1000;

export const UNAUTHORIZED_ERROR = "Unauthorized operation!";
