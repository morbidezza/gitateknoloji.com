// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'server',                 // hybrid removed in Astro 5+; server = static+SSR via prerender flags
  adapter: cloudflare({ prerenderEnvironment: 'node', imageService: 'compile' }),
  integrations: [sitemap()],
  site: 'https://gitateknoloji.com',
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
