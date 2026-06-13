#!/bin/bash
# Run from the root of your gitateknoloji.com repo clone

cd "$(dirname "$0")"

git add \
  src/components/SolutionCard.astro \
  src/pages/tr/index.astro \
  src/pages/en/index.astro \
  src/pages/tr/hizmetler.astro \
  src/pages/en/services.astro

git commit -m "feat: transparent solution cards, 4-column service/solution grids, remove section numbering

- SolutionCard: background transparent (was --color-bg-2)
- tr/index + en/index: add 4th ServiceCard (Microsoft Solutions) with 4-col grid
- tr/index + en/index: add Cloudflare, Infra Software, AI/ML SolutionCards (7 total)
- tr/hizmetler + en/services: remove numbered spans (01-04) and .service-block__num CSS"

git push

echo ""
echo "Done. Visit https://gitateknoloji.com/tr/ and https://gitateknoloji.com/tr/hizmetler to verify."
