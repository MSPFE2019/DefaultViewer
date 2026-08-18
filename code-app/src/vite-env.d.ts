/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** "mock" (default) or "live". See src/services/index.ts. */
  readonly VITE_DATA_MODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
