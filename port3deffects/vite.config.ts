import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Fix invalid ComSpec pointing to non-executable installer
if (!process.env.ComSpec || !process.env.ComSpec.toLowerCase().endsWith('cmd.exe')) {
  process.env.ComSpec = process.env.SystemRoot ? `${process.env.SystemRoot}\\System32\\cmd.exe` : 'C:\\WINDOWS\\system32\\cmd.exe';
  process.env.COMSPEC = process.env.ComSpec;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
