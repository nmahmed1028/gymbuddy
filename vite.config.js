import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
/*
 Default vite.config.js
 Vite looks for a vite.config.js file in the project root directory.
 If it exists, Vite will load the configuration from this file.
 https://vite.dev/config/
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
