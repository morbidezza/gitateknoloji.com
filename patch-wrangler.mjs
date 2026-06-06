// Strips Worker-only fields from dist/server/wrangler.json so Cloudflare
// Pages accepts the config. The adapter generates these for Workers but
// Pages rejects them.
import { readFileSync, writeFileSync } from 'fs';

const path = 'dist/server/wrangler.json';
const config = JSON.parse(readFileSync(path, 'utf8'));

// Bindings Pages cannot provision automatically
config.kv_namespaces = (config.kv_namespaces ?? []).filter(kv => kv.binding !== 'SESSION');
delete config.images;    // Cloudflare Images — not used
delete config.assets;    // "ASSETS" is reserved; Pages serves assets natively
delete config.previews;

// Worker-only keys that Pages explicitly rejects
for (const key of ['main', 'rules', 'no_bundle', 'jsx_factory', 'jsx_fragment', 'triggers', 'migrations']) {
  delete config[key];
}

writeFileSync(path, JSON.stringify(config));
console.log('[patch-wrangler] dist/server/wrangler.json cleaned.');
