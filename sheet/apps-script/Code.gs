/**
 * Marketing Sheet builder.
 * Open the Sheet → Extensions → Apps Script → paste this file → run buildMarketingSheet().
 * Safe to re-run: existing tabs are kept, headers and validations are re-applied.
 */

const BRANDS = ['APN', 'Me2', 'Courage'];
const PLATFORMS = ['Facebook', 'Instagram', 'LinkedIn', 'TikTok', 'YouTube Shorts', 'YouTube', 'GBP'];
const FORMATS = ['tile', 'carousel', 'story', 'video', 'text', 'gbp'];
const STATUSES = ['Idea', 'In review', 'Approved', 'Scheduled', 'Published', 'Rejected', 'Cancelled'];
const SPEND_CATEGORIES = ['Ads', 'Tools', 'Creative', 'Print', 'Other'];
const ASSET_TYPES = ['Photo', 'Video', 'Logo', 'Stock', 'Headshot', 'Other'];
const CONSENT = ['Yes', 'No', 'N/A'];
const PAIN_CATEGORIES = ['Compliance miss', 'Waited on Elliot', 'Template', 'Connector', 'Spend', 'Usage limit', 'Other'];
const BUILD_TRIGGERS = ['Compliance hard block', 'Self-serve renderer', 'Spend module', 'Full hub', 'None'];

const TABS = {
  'Calendar': {
    headers: ['id','date','time','brand','platform','format','template','copy','alt_text','asset','facts_used','checklist','status','notes','created_by','drafted_on','approved_by','approved_on','scheduled_by','scheduled_on','post_link','published_on'],
    lists: { brand: BRANDS, platform: PLATFORMS, format: FORMATS, status: STATUSES },
    dates: ['date','drafted_on','approved_on'],
    datetimes: ['scheduled_on','published_on'],
    widths: { copy: 420, alt_text: 220, notes: 260 },
    protect: ['approved_by','approved_on'],
  },
  'Spend': {
    headers: ['id','date','brand','vendor','category','channel','description','amount_ex_gst','gst','amount_inc_gst','currency_original','receipt_link','month','logged_by','logged_on'],
    lists: { brand: BRANDS.concat(['Shared']), category: SPEND_CATEGORIES },
    dates: ['date','logged_on'],
    currency: ['amount_ex_gst','gst','amount_inc_gst'],
    formulas: { amount_inc_gst: '=IF(ISNUMBER({amount_ex_gst}), {amount_ex_gst}+N({gst}), "")', month: '=IF({date}="", "", TEXT({date}, "yyyy-mm"))' },
    widths: { description: 320 },
  },
  'Budgets': {
    headers: ['brand','month','category','budget_ex_gst','notes'],
    lists: { brand: BRANDS.concat(['Shared']), category: SPEND_CATEGORIES.concat(['Total']) },
    currency: ['budget_ex_gst'],
  },
  'Facts': {
    headers: ['id','brand','fact','source','verified_on','verified_by','expires_on','notes'],
    lists: { brand: BRANDS },
    dates: ['verified_on','expires_on'],
    widths: { fact: 420, source: 260 },
  },
  'Assets': {
    headers: ['id','brand','file','drive_link','type','people_pictured','consent_recorded','consent_link','licence','captured_on','notes'],
    lists: { brand: BRANDS, type: ASSET_TYPES, consent_recorded: CONSENT },
    dates: ['captured_on'],
  },
  'Pain log': {
    headers: ['id','date','brand','who','what_happened','category','minutes_lost','outcome','build_trigger'],
    lists: { brand: BRANDS.concat(['Shared']), category: PAIN_CATEGORIES, build_trigger: BUILD_TRIGGERS },
    dates: ['date'],
    widths: { what_happened: 420, outcome: 300 },
  },
};

const ROWS = 1000;

function buildMarketingSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(TABS).forEach(name => buildTab_(ss, name, TABS[name]));
  const first = ss.getSheetByName('Sheet1');
  if (first && first.getLastRow() === 0) ss.deleteSheet(first);
  ss.setActiveSheet(ss.getSheetByName('Calendar'));
}

function buildTab_(ss, name, spec) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  const h = spec.headers;
  const col = key => h.indexOf(key) + 1;
  const colLetter = key => columnToLetter_(col(key));

  sh.getRange(1, 1, 1, h.length).setValues([h]).setFontWeight('bold').setBackground('#f5f4f1');
  sh.setFrozenRows(1);
  if (sh.getMaxRows() < ROWS + 1) sh.insertRowsAfter(sh.getMaxRows(), ROWS + 1 - sh.getMaxRows());

  Object.keys(spec.lists || {}).forEach(key => {
    const rule = SpreadsheetApp.newDataValidation().requireValueInList(spec.lists[key], true).setAllowInvalid(false).build();
    sh.getRange(2, col(key), ROWS, 1).setDataValidation(rule);
  });
  (spec.dates || []).forEach(key => sh.getRange(2, col(key), ROWS, 1).setNumberFormat('yyyy-mm-dd'));
  (spec.datetimes || []).forEach(key => sh.getRange(2, col(key), ROWS, 1).setNumberFormat('yyyy-mm-dd hh:mm'));
  (spec.currency || []).forEach(key => sh.getRange(2, col(key), ROWS, 1).setNumberFormat('$#,##0.00'));
  Object.keys(spec.widths || {}).forEach(key => sh.setColumnWidth(col(key), spec.widths[key]));

  Object.keys(spec.formulas || {}).forEach(key => {
    const tmpl = spec.formulas[key];
    const formulas = [];
    for (let r = 2; r <= ROWS + 1; r++) {
      formulas.push([tmpl.replace(/\{(\w+)\}/g, (_, k) => colLetter(k) + r)]);
    }
    sh.getRange(2, col(key), ROWS, 1).setFormulas(formulas);
  });

  if (name === 'Calendar') {
    const statusRange = sh.getRange(2, col('status'), ROWS, 1);
    const colours = { 'Idea': '#eeeeee', 'In review': '#fff3cd', 'Approved': '#eef6dc', 'Scheduled': '#cde59a', 'Published': '#8dc600', 'Rejected': '#fdecea', 'Cancelled': '#dddddd' };
    const rules = Object.keys(colours).map(s =>
      SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(s).setBackground(colours[s]).setRanges([statusRange]).build());
    sh.setConditionalFormatRules(rules);
    sh.getRange(2, col('copy'), ROWS, 1).setWrap(true);
  }

  (spec.protect || []).forEach(key => {
    const range = sh.getRange(2, col(key), ROWS, 1);
    const existing = sh.getProtections(SpreadsheetApp.ProtectionType.RANGE).find(p => p.getDescription() === 'approver:' + key);
    const p = existing || range.protect();
    p.setDescription('approver:' + key).setRange(range);
    // Owner keeps edit rights; everyone else is removed. Add the backup approver here once decided.
    p.removeEditors(p.getEditors().map(u => u.getEmail()).filter(e => e !== Session.getEffectiveUser().getEmail()));
    if (p.canDomainEdit()) p.setDomainEdit(false);
  });
}

function columnToLetter_(column) {
  let temp, letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}
