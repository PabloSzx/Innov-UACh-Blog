export const IS_BROWSER = typeof window !== "undefined";

export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const IS_DEVELOPMENT = !IS_PRODUCTION;

export const ONE_WEEK_SECONDS = 604800;

export const ONE_DAY_MS = 86400000;

export const UNAUTHORIZED_ERROR = "Unauthorized operation!";

export const SITE_URL = process.env.VERCEL_URL || "http://localhost:3000";
