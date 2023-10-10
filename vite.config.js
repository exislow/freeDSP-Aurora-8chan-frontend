import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [
    svelte({
      emitCss: false
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/variables.scss" as *;'
      }
    }
  },
  build: {
    assetsDir: "",
    sourcemap: true,
    lib: {
      entry: "src/app.html",
      formats: ["iife"],
      name: "SvelteMicroFrontend",
      fileName: "svelte-micro-frontend"
    }
  }
});
