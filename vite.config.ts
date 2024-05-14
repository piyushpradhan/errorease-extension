import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `react/[name].js`,
        chunkFileNames: `react/[name].js`,
        assetFileNames: `react/[name].[ext]`,
        manualChunks(id) {
          if (id.includes("background.ts")) {
            return "background";
          }
          if (id.includes("inject.ts")) {
            return "inject";
          }
        },
      },
    },
  },
});
