// This file is used to provide type definitions for Vite's `import.meta.env`.
// By defining it here, we can get type-checking and IntelliSense for our environment variables.

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  // Add other environment variables here. For example:
  // readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
