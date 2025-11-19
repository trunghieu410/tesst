/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', {}]],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    // Use jsdom environment for React components
    environment: 'jsdom',
    // Global test setup file
    setupFiles: ['./src/test/setup.ts'],
    // Include CSS in tests
    css: true,
    // Enable coverage reporting
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        'dist/',
        'coverage/',
        '**/*.stories.*',
        '**/__snapshots__/',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    // Mock file patterns
    globals: true,
    // Enable TypeScript support
    typecheck: {
      enabled: true,
      tsconfig: './tsconfig.test.json',
    },
  },
})
