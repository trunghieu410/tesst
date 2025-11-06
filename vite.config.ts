import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [["babel-plugin-react-compiler", {}]],
    },
  }), tailwindcss(), flowbiteReact()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Production build optimizations
  build: {
    target: "es2020",
    sourcemap: false,
    cssCodeSplit: true,
    minify: "esbuild",
    modulePreload: true,
    rollupOptions: {
      treeshake: true,
      output: {
        // File name patterns to keep cache-friendly hashed assets
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        // Chunk splitting for major libraries to improve caching and parallel downloads
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("react-router")) return "router";
          if (id.includes("@tanstack/react-query")) return "react-query";
          if (id.includes("recharts")) return "charts";
          if (id.includes("date-fns")) return "date-fns";
          if (id.includes("zod")) return "zod";
          if (id.includes("axios")) return "axios";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("react")) return "react"; // react, react-dom
          return "vendor";
        },
      },
    },
  },
  // Strip dead code and comments via esbuild
  // esbuild: {
  //   drop: ["console", "debugger"],
  //   legalComments: "none",
  // },
});