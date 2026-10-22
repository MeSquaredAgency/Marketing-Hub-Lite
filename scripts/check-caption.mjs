#!/usr/bin/env node
/**
 * check-caption.mjs — deterministic pre-check for a caption before the compliance checklist.
 *
 *   node scripts/check-caption.mjs <brand> <platform> [caption.txt]      (reads stdin if no file)
 *   node scripts/check-caption.mjs apn instagram caption.txt --json
 *
 * brand:    apn | me2 | courage
 * platform: facebook | instagram | linkedin | tiktok | shorts | youtube | gbp
 *
 * Prints one line per check: PASS, WARN or FAIL. Exit code 1 if anything FAILs.
 * This catches the mechanical misses (legal line, length, hashtags, banned claims). It does not
 * replace the checklist in skills/brand-post/compliance-checklist.md: facts, consent and vendor
 * rules still need the Sheet.
 */
import { readFileSync } from 'node:fs';

const PLATFORMS = {
  facebook:  { max: 1500, fold: 300, hashtags: [0, 2],  links: 'ok' },
  instagram: { max: 2200, fold: 125, hashtags: [5, 10], links: 'none' },
  linkedin:  { max: 1300, fold: 150, hashtags: [3, 5],  links: 'one' },
  tiktok:    { max: 2200, fold: 150, hashtags: [3, 5],  links: 'none' },
  shorts:    { max: 300,  fold: 300, hashtags: [3, 3],  links: 'ok', requireTag: '#shorts' },
  youtube:   { max: 5000, fold: 150, hashtags: [3, 5],  links: 'ok' },
  gbp:       { max: 1500, fold: 300, hashtags: [0, 0],  links: 'ok' },
};

const APN_LEGAL = 'Adelaide Property Network | RLA 255336';
const HYPE = ['stunning', 'dream home', "won't last", 'wont last', 'must see', 'must-see', 'once in a lifetime', 'rare opportunity', 'hurry'];
const ACL = [/\bguarantee[ds]?\b/i, /\bbest (agent|agency|in adelaide|in sa|price)\b/i, /\blowest (fees?|commission|price)\b/i, /\b#\s?1\b/, /\bnumber one\b/i, /\brisk[- ]free\b/i];
const URGENCY = [/\blimited time\b/i, /\bends (soon|today|tonight)\b/i, /\bonly \d+ (left|remaining)\b/i, /\blast chance\b/i];
const AI_TELLS = [/in today'?s fast-paced world/i, /\bunlock\b/i, /\bgame[- ]changer\b/i, /\belevate your\b/i, /\bseamless(ly)?\b/i, /\bdelve\b/i, /\bit'?s not just .+, it'?s\b/i];
const ME2_RESULTS = [/\d+(\.\d+)?\s?%/, /\$\s?\d/, /\b\d+\s?(hours?|hrs)\b.*\b(saved|back|freed)\b/i, /\b(saved|freed up)\b.*\b\d+\s?(hours?|hrs)\b/i, /\b\d+\s?x\b/i, /\b(leads|revenue|sales|growth|roi)\b.*\b\d/i, /\bfrom \$/i];
const ME2_CLIENT_HINTS = [/\bapn\b/i, /adelaide property network/i, /\bcourage\b/i, /\breal estate agency\b/i, /\bgym\b/i];
const ME2_LOCATION = [/\baustralian[- ]based\b/i, /\blocal team\b/i, /\bbased in (adelaide|australia|sydney|melbourne)\b/i];
const HEALTH = [/\blose \d+\s?(kg|kilos|pounds)\b/i, /\bweight[- ]loss\b/i, /\bbefore and after\b/i, /\bcure[sd]?\b/i, /\bburn \d+ calories\b/i, /\bguaranteed results\b/i];

function parseArgs(argv) {
  const a = { json: false, positional: [] };
  for (const x of argv) { if (x === '--json') a.json = true; else if (x === '-h' || x === '--help') { console.log('usage: node scripts/check-caption.mjs <brand> <platform> [caption.txt] [--json]'); process.exit(0); } else a.positional.push(x); }
  return a;
}

export function check(brand, platform, text) {
  const out = [];
  const add = (level, id, msg) => out.push({ level, id, msg });
  const p = PLATFORMS[platform];
  if (!p) { add('FAIL', 'platform', `Unknown platform "${platform}". Use: ${Object.keys(PLATFORMS).join(', ')}`); return out; }
  const t = text.replace(/\r\n/g, '\n').trim();
  const words = t.split(/\s+/).filter(Boolean);
  const hashtags = t.match(/(^|\s)#[\p{L}\p{N}_]+/gu)?.map(s => s.trim()) ?? [];
  const links = t.match(/https?:\/\/\S+|\bwww\.\S+/gi) ?? [];

  // Shared
  if (!t) add('FAIL', 'S0', 'Caption is empty');
  if (t.length > p.max) add('FAIL', 'S7', `Length ${t.length} chars is over the ${platform} working limit of ${p.max}`); else add('PASS', 'S7', `Length ${t.length} chars (fold at ${p.fold})`);
  const firstLine = t.split('\n')[0];
  if (firstLine.length > p.fold) add('WARN', 'S7', `First line is ${firstLine.length} chars; the hook should land before the ${p.fold}-char fold`);
  const [hMin, hMax] = p.hashtags;
  if (hashtags.length < hMin || hashtags.length > hMax) add(hashtags.length > hMax + 3 ? 'FAIL' : 'WARN', 'S7', `${hashtags.length} hashtags; ${platform} uses ${hMin}–${hMax}`); else add('PASS', 'S7', `${hashtags.length} hashtags`);
  if (p.requireTag && !hashtags.some(h => h.toLowerCase() === p.requireTag)) add('WARN', 'S7', `Add ${p.requireTag}`);
  if (p.links === 'none' && links.length) add('WARN', 'S7', `${platform} captions have no clickable links; say "link in bio" instead`);
  if (p.links === 'one' && links.length > 1) add('WARN', 'S7', `${links.length} links; LinkedIn posts carry one link, or put it in the first comment`);
  if (platform === 'gbp' && hashtags.length) add('WARN', 'S7', 'No hashtags on Google Business Profile');
  const acl = ACL.filter(r => r.test(t)); if (acl.length) add('FAIL', 'S5', `Unqualified claim: ${acl.map(r => t.match(r)[0]).join(', ')} (needs a Fact and a qualifier, or remove)`); else add('PASS', 'S5', 'No unqualified superlatives');
  const urg = URGENCY.filter(r => r.test(t)); if (urg.length) add('WARN', 'S5', `Urgency wording (${urg.map(r => t.match(r)[0]).join(', ')}): only with a real end date or count`);
  const tells = AI_TELLS.filter(r => r.test(t)); if (tells.length) add('WARN', 'S8', `Reads generated: ${tells.map(r => t.match(r)[0]).join(', ')}`);
  const hype = HYPE.filter(h => t.toLowerCase().includes(h)); if (hype.length) add(brand === 'apn' ? 'FAIL' : 'WARN', 'S8', `Hype words: ${hype.join(', ')}`);
  if (/\b(color|realtor|neighborhood|center)\b/i.test(t)) add('WARN', 'S9', 'US spelling or term (colour, agent, neighbourhood, centre)');
  if (/\b\d{4} \d{3} \d{3}\b|\b1300 \d{3} \d{3}\b/.test(t) && brand === 'apn' && !t.includes('1300 123 276')) add('WARN', 'S9', 'Phone number differs from 1300 123 276');

  // Brand
  if (brand === 'apn') {
    if (t.includes(APN_LEGAL)) add('PASS', 'A1', 'Legal line present');
    else if (/rla\s*255336/i.test(t)) add('FAIL', 'A1', `Legal line wording is wrong; use exactly "${APN_LEGAL}"`);
    else add('FAIL', 'A1', `Legal line missing: "${APN_LEGAL}"`);
    const addrs = t.match(/\b\d+[a-z]?(?:\/\d+)?\s+[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\s(?:Street|St|Road|Rd|Avenue|Ave|Court|Ct|Drive|Dr|Place|Pl|Crescent|Cres|Lane|Terrace|Tce|Way|Parade|Pde|Grove|Close)\b/g) ?? [];
    if (new Set(addrs).size > 1) add('WARN', 'A2', `Mentions ${new Set(addrs).size} addresses (${[...new Set(addrs)].join('; ')}); one vendor per post`);
    if (/\b(sold|under contract|leased)\b/i.test(t)) add('WARN', 'A4', 'Says sold/under contract/leased: confirm it is true and the vendor agreed to any price shown');
    if (/\b(tenant|arrears|eviction)\b/i.test(t)) add('WARN', 'A5', 'Mentions tenants: check privacy rule');
    if (/\b(vacancy rate|days on market|median|average rent|\d+\s?% (of|more))\b/i.test(t)) add('WARN', 'A6', 'Market or PM statistic: needs a Facts row dated within 90 days');
  }
  if (brand === 'me2') {
    const res = ME2_RESULTS.filter(r => r.test(t)); if (res.length) add('FAIL', 'M2/M3', `Numbers that read as results or prices: ${res.map(r => t.match(r)[0]).join(', ')}`); else add('PASS', 'M2/M3', 'No results claims or prices');
    const cl = ME2_CLIENT_HINTS.filter(r => r.test(t)); if (cl.length) add('FAIL', 'M1', `Identifies a client: ${cl.map(r => t.match(r)[0]).join(', ')}`); else add('PASS', 'M1', 'No client identified');
    const loc = ME2_LOCATION.filter(r => r.test(t)); if (loc.length) add('FAIL', 'M6', `Implies an Australian-based team: ${loc.map(r => t.match(r)[0]).join(', ')}`);
    const STOP = /^(Our|The|We|Your|This|That|Say|A|An|It|In|On|For|Why|What|How|When|Where|Who|Every|Most|Some|Here|There|Then|And|But|So|If|No|Yes|New|Me|South|Western|Northern)$/;
    const names = (t.match(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g) ?? []).filter(n => { const [a, b] = n.split(' '); return !STOP.test(a) && !/^(Squared|Penh|Sheets|Drive|Australia|Australian|Wales|Territory|Office)$/.test(b) && n !== 'Elliot Crabb'; });
    if (names.length) add('WARN', 'M4', `Possible named individuals: ${[...new Set(names)].join(', ')}`);
    if (/\bsay a\b|\bimagine a\b|\bfor example\b/i.test(t)) add('PASS', 'M5', 'Example is labelled hypothetical'); else if (/\b(a client|one client|our client)\b/i.test(t)) add('WARN', 'M5', 'Talks about a client without labelling it hypothetical');
  }
  if (brand === 'courage') {
    const h = HEALTH.filter(r => r.test(t)); if (h.length) add('FAIL', 'C1', `Health outcome claim: ${h.map(r => t.match(r)[0]).join(', ')}`); else add('PASS', 'C1', 'No health outcome claims');
    if (/\$\s?\d|\bfree (week|trial|class)\b|\bjoin(ing)? fee\b/i.test(t)) add('WARN', 'C3', 'Price or offer: needs a Facts row, an end date and conditions in the post');
  }
  if (!['apn', 'me2', 'courage'].includes(brand)) add('FAIL', 'brand', `Unknown brand "${brand}". Use apn, me2 or courage`);
  return out;
}

const isMain = process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop());
if (isMain) {
  const { json, positional } = parseArgs(process.argv.slice(2));
  const [brand, platform, file] = positional;
  if (!brand || !platform) { console.error('usage: node scripts/check-caption.mjs <brand> <platform> [caption.txt] [--json]'); process.exit(2); }
  const text = file ? readFileSync(file, 'utf8') : readFileSync(0, 'utf8');
  const results = check(brand.toLowerCase(), platform.toLowerCase(), text);
  const fails = results.filter(r => r.level === 'FAIL').length, warns = results.filter(r => r.level === 'WARN').length;
  if (json) console.log(JSON.stringify({ brand, platform, fails, warns, results }, null, 2));
  else {
    for (const r of results) console.log(`${r.level.padEnd(4)} ${r.id.padEnd(6)} ${r.msg}`);
    console.log(`\n${fails ? `FAIL: ${fails} failing, ${warns} warnings` : warns ? `PASS with ${warns} warning${warns > 1 ? 's' : ''}` : 'PASS'}`);
  }
  process.exit(fails ? 1 : 0);
}
