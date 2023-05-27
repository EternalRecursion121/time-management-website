import { vitePreprocess } from '@sveltejs/kit/vite';
import firebase from "svelte-adapter-firebase";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: firebase(),
  },
  preprocess: vitePreprocess()
};

export default config;