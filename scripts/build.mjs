import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'docs');
const required = [
  'index.html',
  'src/site.css',
  'src/site.js',
  'public/profile.jpg',
  'public/Ibrahim_Turkel_tr_CV.pdf',
  'public/Ibrahim_Turkel_en_CV.pdf',
  'public/aurahome-dashboard.webp',
  'public/ottoman-project.webp',
  'public/robots.txt',
  'public/sitemap.xml',
  'public/CNAME',
  'public/contact-config.js',
];

for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) {
    throw new Error(`Required site file is missing: ${file}`);
  }
}

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
fs.copyFileSync(path.join(root, 'index.html'), path.join(output, 'index.html'));
fs.cpSync(path.join(root, 'src'), path.join(output, 'src'), { recursive: true });
fs.cpSync(path.join(root, 'public'), output, { recursive: true });
fs.writeFileSync(path.join(output, '.nojekyll'), '');

const expected = [
  'index.html', 'src/site.css', 'src/site.js', 'profile.jpg',
  'Ibrahim_Turkel_tr_CV.pdf', 'Ibrahim_Turkel_en_CV.pdf', 'aurahome-dashboard.webp',
  'ottoman-project.webp', 'robots.txt', 'sitemap.xml', 'CNAME',
  'contact-config.js', 'og-image.jpg',
];
const missing = expected.filter((file) => !fs.existsSync(path.join(output, file)));
if (missing.length) throw new Error(`Build output is incomplete: ${missing.join(', ')}`);

console.log(`Static site built successfully: ${path.relative(root, output)}`);
console.log(`Copied ${expected.length} checked production files plus public assets.`);
