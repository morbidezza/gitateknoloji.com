#!/bin/bash
# Run from the root of your gitateknoloji.com repo clone
# Commits all image integration changes

cd "$(dirname "$0")"

git add \
  src/pages/tr/index.astro \
  src/pages/en/index.astro \
  src/pages/tr/hizmetler.astro \
  src/pages/en/services.astro \
  src/pages/tr/cozumler.astro \
  src/pages/en/solutions.astro

git commit -m "feat: integrate all 19 images into site components

- ServiceCards (MSP, Software, R&D): add card-msp/software/rnd images
  in tr/index.astro and en/index.astro
- SolutionCards (Cabling, Network, Enterprise, Cybersecurity): add images
  in tr/index.astro, en/index.astro, tr/cozumler.astro, en/solutions.astro
- Network SD-WAN card: card-network-alt.jpeg in cozumler + solutions pages
- Section backgrounds with 0.90 dark overlay (no layout change):
    #kurumsal-ag / #network     → card-network.jpeg
    #sistem / #systems          → bg-server-room.jpeg
    #siber-guvenlik / #cyber    → bg-cyber-shield.jpeg
    #ai-ml                      → bg-brain-circuit.jpeg
    #yazilim / #software        → bg-code-streams.jpeg
- CTA banner on homepage: bg-tech-office.jpeg with brand gradient overlay"

git push

echo ""
echo "Done. Visit https://gitateknoloji.com to verify after Cloudflare deployment."
