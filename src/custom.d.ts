declare module "*.svg" {
  const content: string;
  export default content;
}

declare module '@pages/*' {
  const content: string;
  export default content;
}

declare module '@src/*' {
  const content: string;
  export default content;
}

declare module '@home/*' {
  const content: string;
  export default content;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    BASE_URL: string;
  }
}
