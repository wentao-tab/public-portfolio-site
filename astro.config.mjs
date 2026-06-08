// https://astro.build/config
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://yoursite.com/';
const BASE_PATH = process.env.PUBLIC_BASE_PATH || '/';
export default defineConfig({
  markdown: {
    shikiConfig: {
    theme: "github-dark",
    wrap: true,
    }
  },
  envPrefix: 'PUBLIC_',
  site: SITE_URL,
  base: BASE_PATH,
  integrations: [sitemap(), mdx()],
  css: {
    preprocessorOptions: {
      sass: {
        api: "modern",
      },
    },
  },
})
