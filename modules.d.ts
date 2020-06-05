declare namespace NodeJS {
  export interface ProcessEnv {
    MONGO_URI: string;
    PORT: string;
    NODE_ENV: string;
    TWITCH_TOKEN: string;
    TWITCH_USERNAME: string;
  }
}
