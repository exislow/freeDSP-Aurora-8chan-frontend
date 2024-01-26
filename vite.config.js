import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import htmlPurge from "vite-plugin-purgecss";
import { compression } from "vite-plugin-compression2";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    svelte(),
    htmlPurge(),
    compression({
      include: /\.(js)$/i,
      deleteOriginalAssets: true,
      filename: "aurora.jgz"
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
    cssMinify: "esbuild",
    assetsDir: "",
    assetsInlineLimit: 160000,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".css")) return "dark.css";
          return assetInfo.name;
        },
        entryFileNames: "aurora.js"
      }
    }
  }
}));

// Try to install
// https://github.com/vbenjs/vite-plugin-html / https://vuejsexamples.com/a-vite-plugin-for-index-html-that-provides-minify-and-ejs-template-based-functionality/
// https://github.com/richardtallent/vite-plugin-singlefile
// https://www.npmjs.com/package/html-minifier-terser

// https://sean.eulenberg.de/posts/single-file-applications-with-svelte/
