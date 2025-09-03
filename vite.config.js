import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: "./", // ✅ relative paths for assets
  build: {
    outDir: "dist",
  },
  server: {
    proxy: {
      "/api": "http://localhost:1000" // local testing ke liye
    }
  }
});
