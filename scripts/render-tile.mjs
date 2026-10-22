#!/usr/bin/env node
/**
 * render-tile.mjs — render an approved HTML template plus a JSON data file to PNG.
 *
 *   node scripts/render-tile.mjs <template> <data.json> [--formats square,portrait] [--out dir] [--name prefix]
 *
 *   <template>   a name in templates/ (listing-tile, pm-hero, quote-card, me2-post) or a path to an .html file
 *   <data.json>  the fields; keys match {{placeholders}} in the template
 *   --formats    comma list of square | portrait | story | landscape | gbp (default: square,portrait)
 *   --out        output folder (default: ./out)
 *   --name       file prefix (default: <brand>_<template>_<YYYY-MM-DD>)
 *
 * Placeholders: {{key}} is HTML-escaped, {{{key}}} is inserted raw (for <br> or <em>).
 * {{format}} is set by this script. Missing keys render as empty strings.
 *
 * Requires Playwright (npm install in scripts/, or a global install). Uses the bundled Chromium
 * or PLAYWRIGHT_CHROMIUM_PATH if set.
 */
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '..');

const SIZES = {
  square:    { width: 1080, height: 1080 },
  portrait:  { width: 1080, height: 1350 },
  story:     { width: 1080, height: 1920 },
  landscape: { width: 1200, height: 628 },
  gbp:       { width: 1200, height: 900 },
};

function parseArgs(argv) {
  const args = { formats: ['square', 'portrait'], out: path.resolve('out'), name: null, positional: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--formats') args.formats = argv[++i].split(',').map(s => s.trim()).filter(Boolean);
    else if (a === '--out') args.out = path.resolve(argv[++i]);
    else if (a === '--name') args.name = argv[++i];
    else if (a === '-h' || a === '--help') { console.log(usage()); process.exit(0); }
    else args.positional.push(a);
  }
  return args;
}

function usage() {
  return 'usage: node scripts/render-tile.mjs <template> <data.json> [--formats square,portrait,story,landscape,gbp] [--out dir] [--name prefix]';
}

const escapeHtml = s => String(s)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#39;');

export function fill(template, data) {
  return template
    .replace(/\{\{\{\s*([\w.-]+)\s*\}\}\}/g, (_, k) => (data[k] ?? ''))
    .replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (_, k) => escapeHtml(data[k] ?? ''));
}

async function loadPlaywright() {
  try { return await import('playwright'); } catch {}
  try {
    const globalRoot = execFileSync('npm', ['root', '-g'], { encoding: 'utf8' }).trim();
    const req = createRequire(path.join(globalRoot, 'noop.js'));
    return req('playwright');
  } catch {}
  throw new Error('Playwright not found. Run `npm install` in scripts/ or `npm i -g playwright`.');
}

function resolveTemplate(name) {
  if (name.endsWith('.html') && existsSync(name)) return path.resolve(name);
  const p = path.join(repo, 'templates', `${name}.html`);
  if (!existsSync(p)) throw new Error(`Template not found: ${name} (looked in ${p})`);
  return p;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const [templateArg, dataArg] = args.positional;
  if (!templateArg || !dataArg) { console.error(usage()); process.exit(1); }

  const templatePath = resolveTemplate(templateArg);
  const templateName = path.basename(templatePath, '.html');
  const data = JSON.parse(await readFile(dataArg, 'utf8'));
  const html = await readFile(templatePath, 'utf8');

  for (const f of args.formats) if (!SIZES[f]) throw new Error(`Unknown format "${f}". Use: ${Object.keys(SIZES).join(', ')}`);

  // Relative photo paths in the data file resolve against the data file's folder.
  if (data.photo && !/^(https?:|data:|file:)/.test(data.photo)) {
    const abs = path.resolve(path.dirname(dataArg), data.photo);
    data.photo = existsSync(abs) ? pathToFileURL(abs).href : '';
  }

  const date = new Date().toISOString().slice(0, 10);
  const prefix = args.name ?? `${data.brand ?? 'brand'}_${templateName}_${date}`;
  await mkdir(args.out, { recursive: true });

  const { chromium } = await loadPlaywright();
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
  });
  try {
    for (const format of args.formats) {
      const size = SIZES[format];
      const page = await browser.newPage({ viewport: size, deviceScaleFactor: 1 });
      await page.goto(pathToFileURL(templatePath).href); // sets base URL so relative assets resolve
      await page.setContent(fill(html, { ...data, format }), { waitUntil: 'load' });
      await page.evaluate(() => document.fonts?.ready);
      await page.waitForTimeout(150);
      const overflow = await page.evaluate(() => {
        const tile = document.querySelector('.tile') ?? document.body;
        const bad = [];
        for (const el of tile.querySelectorAll('*')) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          if (r.right > innerWidth + 1 || r.bottom > innerHeight + 1) bad.push(el.className || el.tagName);
        }
        return bad.slice(0, 5);
      });
      const legalOk = await page.evaluate(() => {
        const el = document.querySelector('.legal');
        if (!el) return null; // template has no legal line (Me²)
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && r.bottom <= innerHeight && el.textContent.includes('RLA 255336');
      });
      const file = path.join(args.out, `${prefix}_${size.width}x${size.height}.png`);
      await page.screenshot({ path: file, type: 'png', fullPage: false });
      await page.close();
      const flags = [];
      if (overflow.length) flags.push(`overflow: ${overflow.join(', ')}`);
      if (legalOk === false) flags.push('LEGAL LINE NOT VISIBLE');
      console.log(`${flags.length ? 'CHECK ' : 'ok    '}${path.relative(process.cwd(), file)}${flags.length ? '  (' + flags.join('; ') + ')' : ''}`);
    }
  } finally {
    await browser.close();
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(err => { console.error(err.message); process.exit(1); });
}
