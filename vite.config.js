import { sveltekit } from "@sveltejs/kit/vite";
import htmlPurge from "vite-plugin-purgecss";
import { viteSingleFile } from "vite-plugin-singlefile";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    htmlPurge(),
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
    minify: false
  }
};

// Try to install
// https://github.com/vbenjs/vite-plugin-html / https://vuejsexamples.com/a-vite-plugin-for-index-html-that-provides-minify-and-ejs-template-based-functionality/
// https://github.com/richardtallent/vite-plugin-singlefile
// https://www.npmjs.com/package/html-minifier-terser

export default config;
