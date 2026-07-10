// Compress oversized JPEGs in public/images in place: resize to a sane web
// width and re-encode. Originals are copied to data/image-originals/ once,
// so the operation is reversible. Run: node scripts/compress-images.mjs
import sharp from "sharp";
import { readdir, stat, mkdir, copyFile, rename } from "fs/promises";
import path from "path";

const DIR = new URL("../public/images", import.meta.url).pathname;
const BACKUP = new URL("../data/image-originals", import.meta.url).pathname;
const MAX_WIDTH = 2400;
const MIN_BYTES = 400 * 1024; // only touch files bigger than this
const QUALITY = 80;

await mkdir(BACKUP, { recursive: true });
const files = (await readdir(DIR)).filter((f) => /\.(jpe?g)$/i.test(f));

let saved = 0;
for (const f of files) {
  const file = path.join(DIR, f);
  const before = (await stat(file)).size;
  if (before < MIN_BYTES) continue;

  const backup = path.join(BACKUP, f);
  try {
    await stat(backup); // already backed up on a previous run
  } catch {
    await copyFile(file, backup);
  }

  const tmp = file + ".tmp";
  await sharp(file)
    .rotate() // apply EXIF orientation before stripping metadata
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(tmp);

  const after = (await stat(tmp)).size;
  if (after < before) {
    await rename(tmp, file);
    saved += before - after;
    console.log(`${f}: ${(before / 1024).toFixed(0)}K -> ${(after / 1024).toFixed(0)}K`);
  } else {
    const { rm } = await import("fs/promises");
    await rm(tmp);
  }
}
console.log(`Total saved: ${(saved / 1024 / 1024).toFixed(1)} MB`);
