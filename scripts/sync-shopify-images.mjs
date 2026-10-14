// Refresh the local, responsive copies without changing source provenance.
import fs from 'node:fs/promises';
import sharp from 'sharp';
const path = 'src/data/asset-manifest.json';
const manifest = JSON.parse(await fs.readFile(path, 'utf8'));
await fs.mkdir('public/media/images', { recursive: true });
for (const asset of manifest.assets) {
  const url = new URL(asset.original_url);
  url.searchParams.set('width', '2400');
  url.searchParams.set('format', 'jpg');
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${asset.id}: HTTP ${response.status}`);
  const source = Buffer.from(await response.arrayBuffer());
  const metadata = await sharp(source).metadata();
  const widths = [...new Set([240, 480, 800, 1200, 1800, 2400].map(w => Math.min(w, metadata.width)))];
  asset.variants = [];
  for (const width of widths) {
    const src = `/media/images/${asset.id}-${width}.webp`;
    await sharp(source).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 84 }).toFile(`public${src}`);
    asset.variants.push({ width, src });
  }
  asset.local_file = asset.variants.at(-1).src;
  asset.inspection = 'Fetched and decoded from Shopify CDN on 2026-10-14';
  console.log(asset.id, metadata.width, metadata.height);
}
manifest.media_mode = 'local-optimized';
manifest.media_count = manifest.assets.length;
await fs.writeFile(path, JSON.stringify(manifest, null, 2) + '\n');
