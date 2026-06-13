#!/bin/bash
# Run from the root of your gitateknoloji.com repo clone

cd "$(dirname "$0")"

git add \
  src/components/PartnerGrid.astro \
  src/pages/tr/ortaklar.astro \
  src/pages/en/partners.astro \
  src/pages/tr/index.astro \
  src/pages/en/index.astro

git commit -m "feat: partner logos in PartnerGrid

- PartnerGrid now accepts { name, logo, mono? } objects
- Logos served via cdn.simpleicons.org/ffffff (white SVG) for:
  HPE, Dell, IBM, Cisco, Juniper, Citrix, Fortinet, CheckPoint,
  Proxmox, VMware, Veeam, Acronis, Microsoft, Azure, AWS, Cloudflare
- Colour logos for XenServer, NetScaler, LogSenth (external URLs)
- Mono logos: filter brightness+invert → white, dim at rest / full on hover
- Colour logos: slight opacity, full on hover
- Updated tr/ortaklar.astro, en/partners.astro, tr/index.astro, en/index.astro"

git push

echo ""
echo "Done. Visit https://gitateknoloji.com/tr/ortaklar to verify after Cloudflare deployment."
