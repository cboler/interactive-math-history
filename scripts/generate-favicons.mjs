import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

export function getFaviconSvg(size = 64) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
  <defs>
    <linearGradient id="sapphireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#sapphireGrad)" />
  <path d="M 47,15 L 17,15 L 17,20 L 29.5,32 L 17,44 L 17,49 L 47,49 L 47,42 L 42,42 L 42,44 L 24,44 L 34.5,33.5 L 34.5,30.5 L 24,20 L 42,20 L 42,22 L 47,22 Z" fill="#ffffff" />
</svg>`;
}

function createIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;

  const entries = [];
  for (const item of pngBuffers) {
    entries.push({
      width: item.width >= 256 ? 0 : item.width,
      height: item.height >= 256 ? 0 : item.height,
      size: item.buffer.length,
      offset: offset,
      buffer: item.buffer,
    });
    offset += item.buffer.length;
  }

  const out = Buffer.alloc(offset);
  out.writeUInt16LE(0, 0); // reserved
  out.writeUInt16LE(1, 2); // type 1 = ICO
  out.writeUInt16LE(count, 4); // count

  let entryPos = 6;
  for (const entry of entries) {
    out.writeUInt8(entry.width, entryPos);
    out.writeUInt8(entry.height, entryPos + 1);
    out.writeUInt8(0, entryPos + 2); // color count
    out.writeUInt8(0, entryPos + 3); // reserved
    out.writeUInt16LE(1, entryPos + 4); // color planes
    out.writeUInt16LE(32, entryPos + 6); // bits per pixel
    out.writeUInt32LE(entry.size, entryPos + 8); // image size
    out.writeUInt32LE(entry.offset, entryPos + 12); // offset
    entryPos += 16;

    entry.buffer.copy(out, entry.offset);
  }

  return out;
}

async function main() {
  const repoRoot = path.resolve(
    'C:/Users/chris/OneDrive/Documents/GitHub/interactive-math-history',
  );
  const publicDir = path.join(repoRoot, 'public');
  const iconsDir = path.join(publicDir, 'icons');

  // 1. Write SVG favicon
  const svgContent = getFaviconSvg(64);
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf8');
  console.log('Wrote public/favicon.svg');

  const browser = await chromium.launch();

  // Helper to render PNG of given size
  async function renderPng(size) {
    const page = await browser.newPage({ viewport: { width: size, height: size } });
    await page.setContent(
      `<!DOCTYPE html><html><head><style>*{margin:0;padding:0;overflow:hidden;}</style></head><body style="background:transparent;">${getFaviconSvg(size)}</body></html>`,
    );
    const buffer = await page.screenshot({ type: 'png', omitBackground: true });
    await page.close();
    return buffer;
  }

  // 2. Generate ICO with 16, 32, 48
  console.log('Generating favicon.ico (16, 32, 48)...');
  const ico16 = await renderPng(16);
  const ico32 = await renderPng(32);
  const ico48 = await renderPng(48);

  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: ico16 },
    { width: 32, height: 32, buffer: ico32 },
    { width: 48, height: 48, buffer: ico48 },
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Wrote public/favicon.ico (' + icoBuffer.length + ' bytes)');

  // 3. Generate PWA icons
  const pwaSizes = [72, 96, 128, 144, 152, 192, 384, 512];
  for (const size of pwaSizes) {
    console.log(`Generating icon-${size}x${size}.png...`);
    const buf = await renderPng(size);
    fs.writeFileSync(path.join(iconsDir, `icon-${size}x${size}.png`), buf);
  }
  console.log('All PWA icons generated.');

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
