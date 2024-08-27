import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
    base: '/react-screaming-architecture-boilerplate/',
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@features': path.resolve(__dirname, './src/features'),
            '@shared': path.resolve(__dirname, './src/features/_shared'),
            '@todos': path.resolve(__dirname, './src/features/todos'),
        },
    },
});
