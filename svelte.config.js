import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    dev: true
  },
  kit: {
    adapter: adapter({
      pages: "dist",
      assets: "dist",
      fallback: "bundle.html",
      precompress: false,
      strict: true
    })
    //prerender: { entries: ['/'] }
  },
  appDir: "build",
  trailingSlash: "always",
  preprocess: [
    preprocess({
      scss: {
        prependData: '@use "src/variables.scss" as *;'
      },
      postcss: false
    })
  ]
};

export default config;
