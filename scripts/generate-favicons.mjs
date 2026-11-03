import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const svgPath = path.join(publicDir, 'favicon.svg');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const targets = [
  { file: 'favicon-512x512.png', size: 512 },
  { file: 'favicon-192x192.png', size: 192 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'favicon-96x96.png', size: 96 },
  { file: 'favicon-48x48.png', size: 48 },
];

console.log('Generating crisp modern favicon PNGs from SVG...');

for (const { file, size } of targets) {
  const outPath = path.join(publicDir, file);
  const cmd = `"${edgePath}" --headless --disable-gpu --default-background-color=00000000 --window-size=${size},${size} --screenshot="${outPath}" "file:///${svgPath.replace(/\\/g, '/')}"`;
  execSync(cmd, { stdio: 'pipe' });
  console.log(`Generated ${file} (${size}x${size})`);
}

// Generate valid modern PNG-in-ICO favicon.ico from favicon-48x48.png
const png48 = fs.readFileSync(path.join(publicDir, 'favicon-48x48.png'));
const icoHeader = Buffer.alloc(22);
icoHeader.writeUInt16LE(0, 0); // Reserved
icoHeader.writeUInt16LE(1, 2); // Type 1 = Icon
icoHeader.writeUInt16LE(1, 4); // Count = 1

icoHeader.writeUInt8(48, 6);   // Width
icoHeader.writeUInt8(48, 7);   // Height
icoHeader.writeUInt8(0, 8);    // Color count
icoHeader.writeUInt8(0, 9);    // Reserved
icoHeader.writeUInt16LE(1, 10); // Color planes
icoHeader.writeUInt16LE(32, 12); // Bits per pixel
icoHeader.writeUInt32LE(png48.length, 14); // Size of image data
icoHeader.writeUInt32LE(22, 18); // Offset of image data

const icoBuffer = Buffer.concat([icoHeader, png48]);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
console.log('Generated favicon.ico (48x48 PNG-compressed ICO)');
