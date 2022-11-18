import { sveltekit } from "@sveltejs/kit/vite";
import htmlPurge from "vite-plugin-purgecss";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), htmlPurge([htmlPurge()])],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/variables.scss" as *;'
      }
    }
  },
  build: {
    minify: "terser"
  }
};

// Try to install
// https://github.com/vbenjs/vite-plugin-html / https://vuejsexamples.com/a-vite-plugin-for-index-html-that-provides-minify-and-ejs-template-based-functionality/
// https://github.com/richardtallent/vite-plugin-singlefile
// https://www.npmjs.com/package/html-minifier-terser

export default config;
