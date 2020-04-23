declare namespace NodeJS {
  export interface ProcessEnv {
    MONGODB_URL: string;
    SECRET_TOKEN: string;
    PREVIEW_TOKEN: string;
    ADMIN_TOKEN: string;
    REBUILD_HOOK_URL: string;
  }
}
