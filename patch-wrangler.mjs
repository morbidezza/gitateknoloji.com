// Strips Worker-only and invalid-for-Pages fields from dist/server/wrangler.json.
// @astrojs/cloudflare generates these for Workers; Cloudflare Pages rejects them.
import { readFileSync, writeFileSync } from 'fs';

const path = 'dist/server/wrangler.json';
const config = JSON.parse(readFileSync(path, 'utf8'));

config.kv_namespaces = (config.kv_namespaces ?? []).filter(kv => kv.binding !== 'SESSION');
delete config.images;
delete config.assets;
delete config.previews;

for (const key of ['main', 'rules', 'no_bundle', 'jsx_factory', 'jsx_fragment', 'triggers', 'migrations']) {
  delete config[key];
}

writeFileSync(path, JSON.stringify(config));
console.log('[patch-wrangler] dist/server/wrangler.json cleaned.');
