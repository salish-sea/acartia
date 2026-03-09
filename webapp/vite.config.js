import { resolve } from "node:path";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
// import { tanstackRouter } from "@tanstack/router-plugin/vite";
// TODO: Do we want to use file-based routing?

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // tanstackRouter({ target: "react", autoCodeSplitting: true, routesDirectory: "src/app/routes" }),
    viteReact(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/v1": "http://localhost:8080/"
    }
  }
});
