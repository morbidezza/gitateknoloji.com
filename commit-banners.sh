#!/bin/bash
# Run from the root of your gitateknoloji.com repo clone

cd "$(dirname "$0")"

git add \
  public/images/banner-enterprise.jpeg \
  public/images/banner-cloudflare.jpeg \
  public/images/banner-infra-software.jpeg \
  public/images/banner-ai-ml.jpeg \
  src/pages/tr/cozumler.astro \
  src/pages/en/solutions.astro

git commit -m "feat: section banner images for solutions page

- Add 4 new banner images to public/images/:
    banner-enterprise.jpeg, banner-cloudflare.jpeg,
    banner-infra-software.jpeg, banner-ai-ml.jpeg
- Replace/add section-level background images (sol-section--bg):
    #sistem / #systems          → banner-enterprise.jpeg
    #cloudflare                 → banner-cloudflare.jpeg
    #altyapi-yazilim / #infra   → banner-infra-software.jpeg
    #ai-ml                      → banner-ai-ml.jpeg
    #zayif-akim / #low-voltage  → card-cabling.jpeg
    #kurumsal-ag / #network     → card-network.jpeg (unchanged)
    #siber-guvenlik / #cyber    → bg-cyber-shield.jpeg (unchanged)
- Remove individual card-level image= props from solutions pages
  (one image per section, not per card)"

git push

echo ""
echo "Done. Visit https://gitateknoloji.com/tr/cozumler to verify after Cloudflare deployment."
