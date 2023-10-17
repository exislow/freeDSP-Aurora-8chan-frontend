import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    dev: true
  },
  kit: {
    adapter: adapter({
      fallback: "index.html"
    })
    //prerender: { entries: ['/'] }
  },
  trailingSlash: "always",

  preprocess: [
    preprocess({
      scss: {
        prependData: '@use "src/variables.scss" as *;'
      }
    })
  ]
};

export default config;
