import fs from 'fs';
import sharp from 'sharp';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <defs>
    <linearGradient id="vsBg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0E1342"/>
      <stop offset="50%" stop-color="#06082A"/>
      <stop offset="100%" stop-color="#030517"/>
    </linearGradient>
    <linearGradient id="vsBlue" x1="2" y1="6" x2="23" y2="36" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#3B66FF"/>
      <stop offset="100%" stop-color="#2144E1"/>
    </linearGradient>
    <linearGradient id="vsOrange" x1="23" y1="6" x2="24" y2="42" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FF8A4C"/>
      <stop offset="100%" stop-color="#F4773B"/>
    </linearGradient>
  </defs>

  <!-- Deep Midnight Navy Base with Glowing Border -->
  <rect width="64" height="64" rx="16" fill="url(#vsBg)"/>
  <rect x="1" y="1" width="62" height="62" rx="15" stroke="#403CFF" stroke-width="1.5" stroke-opacity="0.6"/>

  <!-- Centered VibeSpark Lightning Mark -->
  <g transform="translate(14, 10)">
    <!-- Electric Indigo Bar -->
    <polygon points="2,6 15,6 23,36 10,36" fill="url(#vsBlue)"/>
    <!-- VibeSpark Orange Bolt -->
    <polygon points="23,6 12,30 22,30 17,42 34,18 24,18" fill="url(#vsOrange)"/>
    <!-- Spark Dot -->
    <circle cx="36" cy="8" r="2.2" fill="#F4773B"/>
  </g>
</svg>`;

// Write public/favicon.svg
fs.writeFileSync('frontend/public/favicon.svg', svgContent, 'utf-8');
console.log('Written: frontend/public/favicon.svg');

const svgBuffer = Buffer.from(svgContent);

async function generateAll() {
  await sharp(svgBuffer).resize(16, 16).png().toFile('frontend/public/favicon-16x16.png');
  await sharp(svgBuffer).resize(32, 32).png().toFile('frontend/public/favicon-32x32.png');
  await sharp(svgBuffer).resize(48, 48).png().toFile('frontend/public/favicon-48x48.png');
  await sharp(svgBuffer).resize(180, 180).png().toFile('frontend/public/apple-touch-icon.png');
  await sharp(svgBuffer).resize(192, 192).png().toFile('frontend/public/android-chrome-192x192.png');
  await sharp(svgBuffer).resize(512, 512).png().toFile('frontend/public/android-chrome-512x512.png');
  
  // Also create a multi-resolution favicon.ico directly using png buffers
  // An ICO file with a single or multiple PNG frames:
  // A standard Windows ICO header with 32x32 PNG is supported by all browsers
  const p32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const p16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();

  // ICO header: 6 bytes (idReserved=0, idType=1 for icon, idCount=2)
  // Directory entry 1: 16 bytes (bWidth=32, bHeight=32, bColorCount=0, bReserved=0, wPlanes=1, wBitCount=32, dwBytesInRes, dwImageOffset)
  // Directory entry 2: 16 bytes (bWidth=16, bHeight=16, bColorCount=0, bReserved=0, wPlanes=1, wBitCount=32, dwBytesInRes, dwImageOffset)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Icon type
  header.writeUInt16LE(2, 4); // 2 images

  const dirOffset = 6;
  const img1Offset = dirOffset + 16 * 2;
  const img2Offset = img1Offset + p32.length;

  const dir1 = Buffer.alloc(16);
  dir1.writeUInt8(32, 0); // width
  dir1.writeUInt8(32, 1); // height
  dir1.writeUInt8(0, 2);  // colors
  dir1.writeUInt8(0, 3);  // reserved
  dir1.writeUInt16LE(1, 4); // color planes
  dir1.writeUInt16LE(32, 6); // bpp
  dir1.writeUInt32LE(p32.length, 8); // size
  dir1.writeUInt32LE(img1Offset, 12); // offset

  const dir2 = Buffer.alloc(16);
  dir2.writeUInt8(16, 0); // width
  dir2.writeUInt8(16, 1); // height
  dir2.writeUInt8(0, 2);  // colors
  dir2.writeUInt8(0, 3);  // reserved
  dir2.writeUInt16LE(1, 4); // color planes
  dir2.writeUInt16LE(32, 6); // bpp
  dir2.writeUInt32LE(p16.length, 8); // size
  dir2.writeUInt32LE(img2Offset, 12); // offset

  const icoBuffer = Buffer.concat([header, dir1, dir2, p32, p16]);
  fs.writeFileSync('frontend/public/favicon.ico', icoBuffer);
  console.log('Written: frontend/public/favicon.ico (Multi-size 32x32 & 16x16 ICO)');

  console.log('All favicon assets generated successfully!');
}

generateAll().catch(console.error);
