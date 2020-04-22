declare namespace NodeJS {
  export interface ProcessEnv {
    MONGODB_URL: string;
    SECRET_TOKEN: string;
    PREVIEW_TOKEN: string;
  }
}
