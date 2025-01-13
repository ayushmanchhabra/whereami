/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HOST: string,
    readonly VITE_WEB_PORT: string,
    readonly VITE_API_PORT: string,    
}

interface ImportMeta {
    readonly env: ImportMetaEnv,
}
