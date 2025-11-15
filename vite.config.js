import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/'),
        },
    },
    build: {
        minify: 'esbuild',
        cssCodeSplit: true,
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    // Окремий chunk для React
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    // Окремий chunk для Firebase (найбільша бібліотека)
                    'firebase-vendor': ['firebase/app', 'firebase/firestore', 'firebase/storage'],
                    // Admin панель окремо (рідко використовується)
                    'admin': ['/src/admin/AdminPanel.jsx'],
                },
                // Оптимізація імен файлів
                chunkFileNames: 'assets/[name]-[hash].js',
                entryFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]',
            },
        },
        // Збільшуємо ліміт попередження до 1000kb
        chunkSizeWarningLimit: 1000,
    },
    base: '/',
});
