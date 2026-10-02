// Cuts the single pictures the page needs out of the artwork in ../images, and makes
// them light enough for a phone.
//
// The images folder does not use the names the brief expects (logo, profile, working,
// speaking, shot-1..6). It holds a 2x2 contact sheet of founder scenes, a stacked logo,
// and six single-concept squares. This script records exactly which crop became which
// page asset, so the mapping is auditable rather than guessed.
//
// Run:  node tools/make-assets.mjs
// Sharp is borrowed from the neighbouring project's install; override with SHARP_ROOT.

import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';
import url from 'node:url';

const here = path.dirname(url.fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, '..');
const IMAGES = path.resolve(projectRoot, '..', 'images');
const OUT = path.join(projectRoot, 'assets');

const sharpRoot =
  process.env.SHARP_ROOT ?? path.resolve(projectRoot, '..', 'sweet-ginger-studio');
const require = createRequire(path.join(sharpRoot, 'package.json'));
const sharp = require('sharp');

const SRC = {
  sheet: 'Founder_portraits_for_order_desk_20260919142833.jpeg',
  logo: 'Logo_design_prompt_for_Hyderabad_20260919142745.jpeg',
  portrait: 'Gemini_Generated_Image_k5l88ak5l88ak5l8 (2).png',
  beforeAfter: 'Gemini_Generated_Image_k5l88ak5l88ak5l8 (5).png',
  board: 'Gemini_Generated_Image_k5l88ak5l88ak5l8 (4).png',
  everyOrder: 'Gemini_Generated_Image_k5l88ak5l88ak5l8 (3).png',
};

// The sheet is 1376x768: four panels of 688x384.
const CROPS = [
  {
    out: 'logo-mark.png',
    src: SRC.logo,
    box: { left: 540, top: 118, width: 300, height: 302 },
    resize: 120,
    format: 'png',
    note: 'Wheat-sheaf mark alone, from the stacked logo. Sits on the dark header.',
  },
  {
    out: 'profile.webp',
    src: SRC.sheet,
    box: { left: 168, top: 16, width: 356, height: 356 },
    resize: 220,
    format: 'webp',
    note: 'Head and shoulders from the contact sheet (top-left panel). Round avatar.',
  },
  {
    out: 'speaking.webp',
    src: SRC.portrait,
    box: { left: 0, top: 0, width: 1024, height: 1024 },
    format: 'webp',
    note: 'Founder portrait on warm cream. Fills the first screen beside the headline.',
  },
  {
    out: 'working.webp',
    src: SRC.sheet,
    box: { left: 688, top: 0, width: 688, height: 384 },
    format: 'webp',
    note: 'At the order desk screen in the shop (top-right panel). Beside the about section.',
  },
  {
    out: 'shot-before-after.webp',
    src: SRC.beforeAfter,
    box: { left: 0, top: 0, width: 1024, height: 1024 },
    format: 'webp',
    note: 'Before: paper slips, chat orders, a falling chart. After: the order desk screen.',
  },
  {
    out: 'shot-board.webp',
    src: SRC.board,
    box: { left: 0, top: 0, width: 1024, height: 1024 },
    format: 'webp',
    note: 'The four cards: New, Packed, Delivered, Unpaid, on the shop counter.',
  },
  {
    out: 'shot-every-order.webp',
    src: SRC.everyOrder,
    box: { left: 0, top: 0, width: 1024, height: 1024 },
    format: 'webp',
    note: 'Shop scene carrying the Order Desk Hyderabad logo and the baked headline "Every order caught". This is the service shot that runs as its own full-width band.',
  },
];

// Deliberately NOT used: Gemini_Generated_Image_k5l88ak5l88ak5l8 (1).png.
// It is a strong shop picture, but the laptop screen inside it has invented figures
// painted on (366 New, 1,328 Packed, 3,418 Delivered, "Daily ROAS"). Requirement 11
// allows no number that did not come from the brief, and a picture is still a claim.
//
// No logo-lockup asset either: the stacked lockup is unreadable at footer size and its
// own dark field shows as a panel on the Night Ledger band, so the page sets the mark
// plus the business name as text, in the header and the footer alike.

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  // Start clean so a removed crop cannot linger as a stale file.
  for (const file of fs.readdirSync(OUT)) fs.rmSync(path.join(OUT, file));

  const lines = [];

  for (const crop of CROPS) {
    const source = path.join(IMAGES, crop.src);
    if (!fs.existsSync(source)) {
      lines.push(`SKIP ${crop.out} - missing source ${crop.src}`);
      continue;
    }

    let pipeline = sharp(source).extract(crop.box);
    if (crop.resize) pipeline = pipeline.resize({ width: crop.resize, withoutEnlargement: true });
    pipeline =
      crop.format === 'webp'
        ? pipeline.webp({ quality: crop.quality ?? 80, effort: 6 })
        : pipeline.png({ compressionLevel: 9 });

    const info = await pipeline.toFile(path.join(OUT, crop.out));
    const kb = (info.size / 1024).toFixed(0);
    lines.push(`${crop.out.padEnd(24)} ${info.width}x${info.height}  ${kb.padStart(5)} KB  <- ${crop.src}`);
  }

  const mark = path.join(OUT, 'logo-mark.png');
  if (fs.existsSync(mark)) {
    const info = await sharp(mark)
      .resize(64, 64, { fit: 'contain', background: '#1C2B2A' })
      .png()
      .toFile(path.join(OUT, 'favicon.png'));
    lines.push(`${'favicon.png'.padEnd(24)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0).padStart(5)} KB  <- logo-mark.png`);
  }

  const total = fs
    .readdirSync(OUT)
    .reduce((sum, f) => sum + fs.statSync(path.join(OUT, f)).size, 0);

  console.log(lines.join('\n'));
  console.log(`\n${lines.length} asset(s), ${(total / 1024 / 1024).toFixed(2)} MB total, in ${OUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
