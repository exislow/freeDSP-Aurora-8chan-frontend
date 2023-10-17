import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    dev: true
  },
  trailingSlash: "always",

  preprocess: vitePreprocess()
};

export default config;
