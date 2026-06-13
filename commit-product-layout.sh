#!/bin/bash
# Run from the root of your gitateknoloji.com repo clone

cd "$(dirname "$0")"

git add \
  src/components/ProductCard.astro \
  src/pages/tr/urunler.astro \
  src/pages/en/products.astro

git commit -m "fix: standardise product card layout — text left, features right

- Remove flip prop and product-card--flip CSS from ProductCard.astro
- Remove all flip={true/false} from tr/urunler.astro and en/products.astro
- All product cards now consistently: text/description left, features panel right"

git push

echo ""
echo "Done. Visit https://gitateknoloji.com/tr/urunler to verify after Cloudflare deployment."
