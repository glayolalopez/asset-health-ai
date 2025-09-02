// /asset-health-ai/frontend/vite.config.js
// Configuration file for the Vite development server.

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Server configuration to fix network issues in corporate environments.
  server: {
    // This makes the server accessible via your computer's network IP address,
    // not just 'localhost'.
    host: true,
  }
});