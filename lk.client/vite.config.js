import { fileURLToPath, URL } from 'node:url';
import compression from 'vite-plugin-compression';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
//import fs from 'fs';
//import path from 'path';
//import child_process from 'child_process';
import { env } from 'process';
//const baseFolder =
//    env.APPDATA !== undefined && env.APPDATA !== ''
//        ? `${env.APPDATA}/ASP.NET/https`
//        : `${env.HOME}/.aspnet/https`;
const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:44300';
export default defineConfig({
    plugins: [
        plugin(),
        {
            name: 'destroy-client-error-sockets',
            configureServer(server) {
                server.httpServer?.on('clientError', (_error, socket) => {
                    socket.destroy();
                });
            },
        },
        compression({
            threshold: 10240,
            algorithm: 'gzip',
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '/api/Authorization/login': {
                target,
                secure: false,
            },
        },
        port: 5173,
    }
});
