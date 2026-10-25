import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const errors = [];
let count = 0;
async function reference(url, source) {
  if (!url || /^(https?:|mailto:|tel:|data:|#)/.test(url)) return;
  const relative = decodeURIComponent(url.split(/[?#]/)[0]);
  const file = path.resolve(path.dirname(source), relative);
  if (!file.startsWith(root + path.sep)) { errors.push(`Path escapes project: ${url}`); return; }
  try { await stat(file); count++; } catch { errors.push(`${path.relative(root, source)}: missing ${url}`); }
}
for (const name of ['index.html','about.html']) {
  const file = path.join(root, name);
  const html = await readFile(file, 'utf8');
  for (const match of html.matchAll(/\b(?:src|href|data-poster-url)="([^"]+)"/g)) await reference(match[1], file);
  for (const match of html.matchAll(/\bsrcset="([^"]+)"/g)) for (const variant of match[1].split(',')) await reference(variant.trim().split(/\s+/)[0], file);
  for (const match of html.matchAll(/<script[^>]+type="application\/json"[^>]*>(.*?)<\/script>/gs)) {
    for (const item of JSON.parse(match[1]).items || []) await reference(item.url, file);
  }
  const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m => m[1]);
  const order = ['js/jquery-3.5.1.min.js','js/webflow.js','js/custom.js'].map(s => scripts.indexOf(s));
  if (order.some(i => i < 0) || order[0] > order[1] || order[1] > order[2]) errors.push(`${name}: incorrect runtime order`);
  if (/https:\/\/fitness-5cdfee\.webflow\.io|https:\/\/(?:cdn\.prod\.website-files\.com|uploads-ssl\.webflow\.com)/.test(html)) errors.push(`${name}: unlocalized site asset`);
  if (name === 'index.html' && !/<form[^>]*method="dialog"[^>]*action="#"/.test(html)) errors.push('Demo form is not isolated from network submissions');
}
for (const name of ['normalize.css','webflow.css','fitness-5cdfee.webflow.css']) {
  const file = path.join(root,'css',name);
  const css = await readFile(file, 'utf8');
  for (const match of css.matchAll(/url\(["']?([^\s)"']+)["']?\)/g)) await reference(match[1], file);
}
const jquery = await readFile(path.join(root,'js/jquery-3.5.1.min.js'));
if (createHash('sha256').update(jquery).digest('base64') !== '9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=') errors.push('jQuery SRI mismatch');
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`PASS: ${count} local references, original CSS/runtime, script order, gallery assets and demo form.`);
