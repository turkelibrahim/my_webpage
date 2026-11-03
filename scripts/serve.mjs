import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');
const requestedRoot = process.argv[2] || '.';
const siteRoot = path.resolve(root, requestedRoot);
const port = Number(process.argv[3] || 5173);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.webmanifest': 'application/manifest+json',
};

// Security headers applied to all responses
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://formspree.io; object-src 'none'; base-uri 'self'; frame-ancestors 'none';",
  'Cross-Origin-Opener-Policy': 'same-origin',
};

if (!fs.existsSync(siteRoot)) {
  console.error(`Site directory does not exist: ${siteRoot}`);
  process.exit(1);
}

function safePath(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath.split('?')[0]);
  } catch {
    return null;
  }

  // Prevent null byte injections
  if (decoded.includes('\0')) return null;

  const clean = decoded === '/' ? '/index.html' : decoded;

  // Block hidden/dot files (e.g. .git, .env, .gitignore)
  const segments = clean.split(/[/\\]/);
  if (segments.some(seg => seg.startsWith('.') && seg !== '.' && seg !== '..')) {
    return null;
  }

  // In dev mode (serving root '.'), restrict access strictly to web assets
  if (requestedRoot === '.') {
    const isAllowedRootFile = clean === '/index.html';
    const isSrc = clean.startsWith('/src/');
    const isPublic = clean.startsWith('/public/');
    
    // Check if file exists inside public/ (fallback resolution)
    const publicPath = path.resolve(root, 'public', `.${clean}`);
    const isExistingPublicAsset = publicPath.startsWith(`${path.resolve(root, 'public')}${path.sep}`) && fs.existsSync(publicPath);

    if (!isAllowedRootFile && !isSrc && !isPublic && !isExistingPublicAsset) {
      return null;
    }

    if (isExistingPublicAsset && !isSrc && !isAllowedRootFile) {
      return publicPath;
    }
  }

  const resolved = path.resolve(siteRoot, `.${clean}`);
  if (resolved !== siteRoot && !resolved.startsWith(`${siteRoot}${path.sep}`)) {
    return null;
  }
  return resolved;
}

const server = http.createServer((request, response) => {
  // Enforce HTTP methods (GET and HEAD only for static portfolio)
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Allow': 'GET, HEAD',
      ...securityHeaders,
    });
    response.end('Method Not Allowed');
    return;
  }

  const pathname = new URL(request.url, `http://${request.headers.host || 'localhost'}`).pathname;
  let file = safePath(pathname);
  if (!file) {
    response.writeHead(400, {
      'Content-Type': 'text/plain; charset=utf-8',
      ...securityHeaders,
    });
    response.end('Bad request');
    return;
  }

  // During development, expose the public/ folder at the web root like Vite does.
  if (!fs.existsSync(file) && requestedRoot === '.') {
    const publicFile = path.resolve(root, 'public', `.${pathname}`);
    if (publicFile.startsWith(`${path.resolve(root, 'public')}${path.sep}`)) {
      file = publicFile;
    }
  }

  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    response.writeHead(404, {
      'Content-Type': 'text/plain; charset=utf-8',
      ...securityHeaders,
    });
    response.end('Not found');
    return;
  }

  const extension = path.extname(file).toLowerCase();
  response.writeHead(200, {
    'Content-Type': mimeTypes[extension] || 'application/octet-stream',
    'Cache-Control': 'no-cache',
    ...securityHeaders,
  });

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  fs.createReadStream(file).pipe(response);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Portfolio running at http://127.0.0.1:${port}`);
  console.log(`Serving: ${siteRoot}`);
});
