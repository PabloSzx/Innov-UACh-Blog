import ms from "ms";

export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const IS_DEVELOPMENT = !IS_PRODUCTION;

export const ONE_WEEK_SECONDS = ms("1 week") / 1000;

export const UNAUTHORIZED_ERROR = "Unauthorized operation!";
