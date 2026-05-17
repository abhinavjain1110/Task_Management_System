import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages project site: https://abhinavjain1110.github.io/Task_Management_System/
const repoName = 'Task_Management_System';

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : `/${repoName}/`,
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
}));
