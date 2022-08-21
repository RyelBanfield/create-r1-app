/* eslint-disable import/no-extraneous-dependencies */
// @ts-nocheck
import eslint from '@rollup/plugin-eslint';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    { ...eslint({ include: 'src/**/*.+(js|jsx|ts|tsx)' }), enforce: 'pre' },
    react(),
  ],
});
