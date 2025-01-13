/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HOST: string,
    readonly VITE_WEB_PORT: string,
    readonly VITE_API_PORT: string,
    readonly VITE_ADMIN_USER: string,
    readonly VITE_ADMIN_PSWD: string,    
}

interface ImportMeta {
    readonly env: ImportMetaEnv,
}
