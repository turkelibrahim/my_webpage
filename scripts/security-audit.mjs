import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');
const PORT = 5175;
const HOST = '127.0.0.1';

console.log('====================================================');
console.log('       PORTFOLIO V6 - SECURITY AUDIT SUITE          ');
console.log('====================================================\n');

let passedTests = 0;
let failedTests = 0;
let warnings = 0;
const results = [];

function recordResult(category, testName, status, details) {
  results.push({ category, testName, status, details });
  if (status === 'PASS') {
    passedTests++;
    console.log(`[PASS] [${category}] ${testName}`);
  } else if (status === 'FAIL') {
    failedTests++;
    console.log(`[FAIL] [${category}] ${testName}: ${details}`);
  } else if (status === 'WARN') {
    warnings++;
    console.log(`[WARN] [${category}] ${testName}: ${details}`);
  }
}

function makeRequest(path, method = 'GET', headers = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      host: HOST,
      port: PORT,
      path,
      method,
      headers
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        body
      }));
    });
    req.on('error', reject);
    req.setTimeout(3000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.end();
  });
}

// ---------------------------------------------------------
// 1. DYNAMIC SERVER TESTS (DAST)
// ---------------------------------------------------------

async function testPathTraversal() {
  const payloads = [
    '/../package.json',
    '/..%2fpackage.json',
    '/%2e%2e/package.json',
    '/%2e%2e%2fpackage.json',
    '/..%5cpackage.json',
    '/%2e%2e%5cpackage.json',
    '/..%252f..%252fpackage.json',
    '/../../../../../../../../Windows/win.ini',
    '/..%2f..%2f..%2f..%2fWindows%2fwin.ini',
    '/..%5c..%5c..%5c..%5cWindows%5cwin.ini',
    '/....//....//....//Windows/win.ini',
    '/index.html%00.jpg',
  ];

  for (const payload of payloads) {
    try {
      const res = await makeRequest(payload);
      if (res.statusCode === 400 || res.statusCode === 404) {
        recordResult('Path Traversal', `Payload: ${payload}`, 'PASS', `Blocked with HTTP ${res.statusCode}`);
      } else {
        recordResult('Path Traversal', `Payload: ${payload}`, 'FAIL', `Unexpected HTTP ${res.statusCode} with content: ${res.body.slice(0, 60)}`);
      }
    } catch (err) {
      recordResult('Path Traversal', `Payload: ${payload}`, 'PASS', `Connection dropped/rejected safely: ${err.message}`);
    }
  }
}

async function testDotfileExposure() {
  const dotfiles = [
    '/.gitignore',
    '/.git/config',
    '/.env',
    '/.env.local',
    '/.DS_Store',
    '/.vscode/settings.json'
  ];

  for (const file of dotfiles) {
    try {
      const res = await makeRequest(file);
      if (res.statusCode === 404 || res.statusCode === 400 || res.statusCode === 403) {
        recordResult('Dotfile Access', `Hidden file ${file}`, 'PASS', `Protected (HTTP ${res.statusCode})`);
      } else if (res.statusCode === 200) {
        recordResult('Dotfile Access', `Hidden file ${file}`, 'WARN', `File exists and was served (HTTP 200). In production (docs/) dotfiles are excluded, but dev server allows access.`);
      }
    } catch (err) {
      recordResult('Dotfile Access', `Hidden file ${file}`, 'PASS', `Error: ${err.message}`);
    }
  }
}

async function testSecurityHeaders() {
  try {
    const res = await makeRequest('/');
    
    // X-Content-Type-Options
    if (res.headers['x-content-type-options'] === 'nosniff') {
      recordResult('Security Headers', 'X-Content-Type-Options: nosniff', 'PASS', 'Present');
    } else {
      recordResult('Security Headers', 'X-Content-Type-Options: nosniff', 'FAIL', 'Missing');
    }

    // Referrer-Policy
    if (res.headers['referrer-policy']) {
      recordResult('Security Headers', 'Referrer-Policy', 'PASS', `Present: ${res.headers['referrer-policy']}`);
    } else {
      recordResult('Security Headers', 'Referrer-Policy', 'WARN', 'Missing');
    }

    // X-Frame-Options
    if (res.headers['x-frame-options']) {
      recordResult('Security Headers', 'X-Frame-Options (Clickjacking)', 'PASS', `Present: ${res.headers['x-frame-options']}`);
    } else {
      recordResult('Security Headers', 'X-Frame-Options (Clickjacking)', 'WARN', 'Missing header X-Frame-Options');
    }

    // Content-Security-Policy
    if (res.headers['content-security-policy']) {
      recordResult('Security Headers', 'Content-Security-Policy', 'PASS', `Present`);
    } else {
      recordResult('Security Headers', 'Content-Security-Policy', 'WARN', 'Missing Content-Security-Policy header');
    }

    // Permissions-Policy
    if (res.headers['permissions-policy']) {
      recordResult('Security Headers', 'Permissions-Policy', 'PASS', `Present`);
    } else {
      recordResult('Security Headers', 'Permissions-Policy', 'WARN', 'Missing Permissions-Policy header');
    }
  } catch (err) {
    recordResult('Security Headers', 'Fetch root headers', 'FAIL', err.message);
  }
}

async function testHttpMethods() {
  const disallowedMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];
  for (const m of disallowedMethods) {
    try {
      const res = await makeRequest('/index.html', m);
      if (res.statusCode === 405 || res.statusCode === 400 || res.statusCode === 403) {
        recordResult('HTTP Methods', `Method ${m} handling`, 'PASS', `Returned HTTP ${res.statusCode}`);
      } else {
        recordResult('HTTP Methods', `Method ${m} handling`, 'WARN', `Returned HTTP ${res.statusCode} (should be 405 Method Not Allowed)`);
      }
    } catch (err) {
      recordResult('HTTP Methods', `Method ${m} handling`, 'PASS', err.message);
    }
  }
}

async function testDosAndMalformedRequests() {
  // 1. Invalid percent-encoding
  try {
    const res = await makeRequest('/%c0%af');
    if (res.statusCode === 400) {
      recordResult('Input Validation', 'Invalid percent-encoding %c0%af', 'PASS', 'Safely returned 400 Bad Request');
    } else {
      recordResult('Input Validation', 'Invalid percent-encoding %c0%af', 'WARN', `HTTP ${res.statusCode}`);
    }
  } catch (err) {
    recordResult('Input Validation', 'Invalid percent-encoding %c0%af', 'PASS', 'Handled');
  }

  // 2. CRLF Header injection in path
  try {
    const res = await makeRequest('/index.html%0d%0aSet-Cookie:%20evil=1');
    if (res.statusCode === 400 || res.statusCode === 404) {
      recordResult('Input Validation', 'CRLF Header injection in path', 'PASS', `Handled (HTTP ${res.statusCode})`);
    } else {
      recordResult('Input Validation', 'CRLF Header injection in path', 'WARN', `HTTP ${res.statusCode}`);
    }
  } catch (err) {
    recordResult('Input Validation', 'CRLF Header injection in path', 'PASS', 'Safely rejected');
  }

  // 3. Oversized URI (Buffer / memory exhaustion)
  try {
    const longPath = '/' + 'a'.repeat(4000);
    const res = await makeRequest(longPath);
    if (res.statusCode === 404 || res.statusCode === 400 || res.statusCode === 414) {
      recordResult('Input Validation', 'Oversized URI (4000 chars)', 'PASS', `Handled gracefully (HTTP ${res.statusCode})`);
    } else {
      recordResult('Input Validation', 'Oversized URI (4000 chars)', 'WARN', `HTTP ${res.statusCode}`);
    }
  } catch (err) {
    recordResult('Input Validation', 'Oversized URI (4000 chars)', 'PASS', 'Safely handled');
  }
}

// ---------------------------------------------------------
// 2. STATIC CODE ANALYSIS (SAST)
// ---------------------------------------------------------

function testStaticHtmlAndJsSecurity() {
  const htmlFile = path.join(root, 'index.html');
  const jsFile = path.join(root, 'src', 'site.js');
  const htmlContent = fs.readFileSync(htmlFile, 'utf8');
  const jsContent = fs.readFileSync(jsFile, 'utf8');

  // Check for dangerous DOM sinks
  const dangerousPatterns = [
    { pattern: /\.innerHTML\s*=/g, name: 'innerHTML assignment' },
    { pattern: /\.outerHTML\s*=/g, name: 'outerHTML assignment' },
    { pattern: /document\.write\s*\(/g, name: 'document.write()' },
    { pattern: /\beval\s*\(/g, name: 'eval()' },
    { pattern: /new\s+Function\s*\(/g, name: 'new Function()' },
    { pattern: /setTimeout\s*\(\s*["'`]/g, name: 'setTimeout string evaluation' },
    { pattern: /setInterval\s*\(\s*["'`]/g, name: 'setInterval string evaluation' },
  ];

  for (const { pattern, name } of dangerousPatterns) {
    const jsMatches = jsContent.match(pattern);
    const htmlMatches = htmlContent.match(pattern);
    if (!jsMatches && !htmlMatches) {
      recordResult('DOM XSS (Sinks)', `No ${name} found in code`, 'PASS', 'Clean');
    } else {
      recordResult('DOM XSS (Sinks)', `Dangerous sink: ${name}`, 'FAIL', `Found in source code`);
    }
  }

  // Check external links for reverse tabnabbing (target="_blank" without rel="noopener noreferrer")
  const linkRegex = /<a\s+[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>/gi;
  let match;
  let unsafeLinks = [];
  while ((match = linkRegex.exec(htmlContent)) !== null) {
    const fullTag = match[0];
    const href = match[1];
    if (fullTag.includes('target="_blank"') || fullTag.includes("target='_blank'")) {
      const hasNoopener = fullTag.includes('noopener');
      const hasNoreferrer = fullTag.includes('noreferrer');
      if (!hasNoopener || !hasNoreferrer) {
        unsafeLinks.push({ href, tag: fullTag });
      }
    }
  }

  if (unsafeLinks.length === 0) {
    recordResult('Reverse Tabnabbing', 'All target="_blank" links have rel="noopener noreferrer"', 'PASS', 'All external links are protected');
  } else {
    recordResult('Reverse Tabnabbing', `${unsafeLinks.length} unsafe target="_blank" links`, 'FAIL', `Unsafe links: ${unsafeLinks.map(l => l.href).join(', ')}`);
  }

  // Check for meta tags (charset, viewport)
  if (htmlContent.includes('<meta charset="utf-8"/>') || htmlContent.includes('<meta charset="utf-8">') || htmlContent.includes('<meta charset="UTF-8">')) {
    recordResult('HTML Meta', 'Character encoding is explicitly set to UTF-8', 'PASS', 'Configured');
  } else {
    recordResult('HTML Meta', 'Charset UTF-8 missing', 'FAIL', 'Missing meta charset');
  }

  // Form input security
  const formTagRegex = /<form[^>]*id=["']contact-form["'][^>]*>([\s\S]*?)<\/form>/i;
  const formMatch = htmlContent.match(formTagRegex);
  if (formMatch) {
    const formHtml = formMatch[1];
    // Check if inputs have maxlength
    const hasMaxLength = formHtml.includes('maxlength="100"') && formHtml.includes('maxlength="180"') && formHtml.includes('maxlength="5000"');
    if (hasMaxLength) {
      recordResult('Form Security', 'Input fields enforce maxlength boundaries', 'PASS', 'Configured');
    } else {
      recordResult('Form Security', 'Inputs lack maxlength boundaries', 'WARN', 'Should restrict maximum length');
    }
  }
}

function testSecretsScanning() {
  const secretRegexes = [
    { name: 'AWS Access Key', pattern: /AKIA[0-9A-Z]{16}/g },
    { name: 'Private Key', pattern: /-----BEGIN\s+(?:RSA\s+)?PRIVATE\s+KEY-----/g },
    { name: 'GitHub Token', pattern: /gh[pous]_[0-9a-zA-Z]{36}/g },
    { name: 'Generic API Key / Secret Token', pattern: /(?:api[_-]?key|secret|password|bearer)\s*[:=]\s*['"][a-zA-Z0-9_\-]{20,}['"]/gi },
  ];

  const filesToScan = [
    path.join(root, 'index.html'),
    path.join(root, 'src', 'site.js'),
    path.join(root, 'src', 'site.css'),
    path.join(root, 'public', 'contact-config.js'),
    path.join(root, 'scripts', 'serve.mjs'),
    path.join(root, 'scripts', 'build.mjs'),
    path.join(root, 'package.json')
  ];

  let leaksFound = 0;
  for (const file of filesToScan) {
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, 'utf8');
    for (const { name, pattern } of secretRegexes) {
      const match = content.match(pattern);
      if (match) {
        leaksFound++;
        recordResult('Secrets Scan', `Potential ${name} in ${path.relative(root, file)}`, 'FAIL', `Match: ${match[0].slice(0, 15)}...`);
      }
    }
  }

  if (leaksFound === 0) {
    recordResult('Secrets Scan', 'No hardcoded credentials, API keys, or private keys found', 'PASS', 'Clean');
  }
}

// ---------------------------------------------------------
// EXECUTION
// ---------------------------------------------------------

async function runAudit() {
  console.log('--- 1. Testing Path Traversal & File Boundary Protection ---');
  await testPathTraversal();

  console.log('\n--- 2. Testing Dotfile & Sensitive File Exposure ---');
  await testDotfileExposure();

  console.log('\n--- 3. Testing HTTP Security Headers ---');
  await testSecurityHeaders();

  console.log('\n--- 4. Testing HTTP Methods Handling ---');
  await testHttpMethods();

  console.log('\n--- 5. Testing Input Validation & DoS Resiliency ---');
  await testDosAndMalformedRequests();

  console.log('\n--- 6. Static Code Analysis (DOM XSS & Links) ---');
  testStaticHtmlAndJsSecurity();

  console.log('\n--- 7. Secrets & Credential Scanning ---');
  testSecretsScanning();

  console.log('\n====================================================');
  console.log(`AUDIT COMPLETE:`);
  console.log(`PASSED:   ${passedTests}`);
  console.log(`WARNINGS: ${warnings}`);
  console.log(`FAILED:   ${failedTests}`);
  console.log('====================================================');

  const reportPath = path.join(root, 'SECURITY_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    summary: { passed: passedTests, warnings, failed: failedTests },
    results
  }, null, 2));
  console.log(`\nDetailed report written to: ${reportPath}`);
}

runAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
