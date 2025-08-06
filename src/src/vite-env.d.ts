// This file is used to provide type definitions for environment variables.
// By defining them here, we get type-checking and IntelliSense.

// For variables exposed via `import.meta.env`
interface ImportMetaEnv {
  // e.g. readonly VITE_SOME_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


// For variables exposed via `process.env` through Vite's `define` config
declare namespace NodeJS {
  interface ProcessEnv {
    readonly API_KEY: string;
  }
}