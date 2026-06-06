// Removes bindings from dist/server/wrangler.json that are incompatible
// with Cloudflare Pages: SESSION (no id), ASSETS (reserved name).
import { readFileSync, writeFileSync } from 'fs';

const path = 'dist/server/wrangler.json';
const config = JSON.parse(readFileSync(path, 'utf8'));

config.kv_namespaces = (config.kv_namespaces ?? []).filter(kv => kv.binding !== 'SESSION');
delete config.images;
delete config.assets;
delete config.previews;

writeFileSync(path, JSON.stringify(config));
console.log('[patch-wrangler] dist/server/wrangler.json cleaned.');
