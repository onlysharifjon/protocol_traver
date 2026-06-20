// One-off generator for favicon + social-share (Open Graph) artwork.
// Run with: node scripts/gen-branding.mjs
// Produces, in app/: icon.svg, icon.png, apple-icon.png, favicon.ico,
// opengraph-image.png, twitter-image.png  — all auto-detected by Next.js.

import sharp from "sharp";
import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const APP = join(root, "app");
const PUBLIC = join(root, "public");

const INK = "#0a0a0a";
const GOLD = "#c9a84c";
const CREAM = "#f0ead6";

/* ---------- Favicon: gold serif "P" monogram on ink, hairline border ---------- */
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <rect width="256" height="256" rx="44" fill="${INK}"/>
  <rect x="10" y="10" width="236" height="236" rx="36" fill="none" stroke="${GOLD}" stroke-opacity="0.55" stroke-width="3"/>
  <text x="50%" y="50%" dy="0.02em" text-anchor="middle" dominant-baseline="central"
        font-family="DejaVu Serif, Liberation Serif, Georgia, serif" font-weight="700"
        font-size="170" fill="${GOLD}">P</text>
</svg>`;
writeFileSync(join(APP, "icon.svg"), iconSvg);

const iconBuf = Buffer.from(iconSvg);
await sharp(iconBuf).resize(256, 256).png().toFile(join(APP, "icon.png"));
await sharp(iconBuf).resize(180, 180).png().toFile(join(APP, "apple-icon.png"));

// favicon.ico — wrap a 48x48 PNG in a single-image ICO container (valid &
// universally supported; this is what modern .ico files actually contain).
const ico48 = await sharp(iconBuf).resize(48, 48).png().toBuffer();
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // image count
const entry = Buffer.alloc(16);
entry.writeUInt8(48, 0); // width
entry.writeUInt8(48, 1); // height
entry.writeUInt8(0, 2); // palette
entry.writeUInt8(0, 3); // reserved
entry.writeUInt16LE(1, 4); // colour planes
entry.writeUInt16LE(32, 6); // bits per pixel
entry.writeUInt32LE(ico48.length, 8); // size of image data
entry.writeUInt32LE(6 + 16, 12); // offset to image data
writeFileSync(join(APP, "favicon.ico"), Buffer.concat([header, entry, ico48]));

/* ---------- Open Graph / Twitter card: hero photo + brand lockup ---------- */
const W = 1200;
const H = 630;
const hero = await sharp(join(PUBLIC, "images", "hero-home.jpg"))
  .resize(W, H, { fit: "cover", position: "centre" })
  .toBuffer();

const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${INK}" stop-opacity="0.55"/>
      <stop offset="55%" stop-color="${INK}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="${INK}" stop-opacity="0.9"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none" stroke="${GOLD}" stroke-opacity="0.5" stroke-width="2"/>
  <text x="50%" y="44%" text-anchor="middle" font-family="DejaVu Serif, Liberation Serif, Georgia, serif"
        font-weight="400" font-size="96" letter-spacing="10" fill="${CREAM}">PROTOCOL</text>
  <text x="50%" y="55%" text-anchor="middle" font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif"
        font-weight="500" font-size="26" letter-spacing="14" fill="${GOLD}">TRAVEL SERVICES</text>
  <text x="50%" y="68%" text-anchor="middle" font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif"
        font-weight="400" font-size="24" letter-spacing="4" fill="#cfc9ba">Private Silk Road Journeys in Uzbekistan</text>
</svg>`;

const og = await sharp(hero)
  .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
  .png()
  .toBuffer();
writeFileSync(join(APP, "opengraph-image.png"), og);
writeFileSync(join(APP, "twitter-image.png"), og);

console.log("Branding assets written to app/:");
console.log("  icon.svg, icon.png, apple-icon.png, favicon.ico");
console.log("  opengraph-image.png, twitter-image.png");
