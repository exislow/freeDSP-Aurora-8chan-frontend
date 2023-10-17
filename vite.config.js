import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import htmlPurge from "vite-plugin-purgecss";
import { viteSingleFile } from "vite-plugin-singlefile";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    svelte(),
    htmlPurge(),
    command === "build" &&
      viteSingleFile({
        removeViteModuleLoader: true
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
    minify: "terser",
    cssMinify: "esbuild"
  }
}));

// Try to install
// https://github.com/vbenjs/vite-plugin-html / https://vuejsexamples.com/a-vite-plugin-for-index-html-that-provides-minify-and-ejs-template-based-functionality/
// https://github.com/richardtallent/vite-plugin-singlefile
// https://www.npmjs.com/package/html-minifier-terser

// https://sean.eulenberg.de/posts/single-file-applications-with-svelte/
