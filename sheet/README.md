# The Marketing Sheet

**Live sheet:** https://docs.google.com/spreadsheets/d/1lqpTD7c6FtfCr5W0B-UoFagw-j6lABuomlHeunv6Kms/edit (built 22 Oct 2026 through the Sheets connector; tab gids are Calendar 0, Spend 1, Budgets 2, Facts 3, Assets 4, Pain log 5).

One Google Sheet, six tabs, shared with the Executive and Elliot. It is the record for every post, every dollar, every fact and every asset. Claude reads and writes it through the Google Sheets connector; Elliot approves in it from a phone.

Build it either way:

- **Apps Script.** Open a new Sheet → Extensions → Apps Script → paste `apps-script/Code.gs` → run `buildMarketingSheet`. It creates the six tabs with headers, dropdowns, date formats, frozen headers and status colours.
- **By hand.** Create the six tabs and paste the header row from each file in `headers/`.

Then paste the Sheet's link into each brand's `PROJECT.md`.

## Tabs

### Calendar

One row per post per platform. Status moves forward only.

| Column | Type | Notes |
|---|---|---|
| `id` | text | `CAL-0001`, assigned on insert |
| `date` | date | Planned publish date, Australia/Adelaide |
| `time` | time | Blank = use Metricool's best slot |
| `brand` | dropdown | `APN`, `Me2`, `Courage` |
| `platform` | dropdown | `Facebook`, `Instagram`, `LinkedIn`, `TikTok`, `YouTube Shorts`, `YouTube`, `GBP` |
| `format` | dropdown | `tile`, `carousel`, `story`, `video`, `text`, `gbp` |
| `template` | text | `listing-tile`, `pm-hero`, `quote-card`, `me2-post` or blank |
| `copy` | text | The angle at Idea; the final caption from In review on |
| `alt_text` | text | |
| `asset` | URL | Drive link to the rendered folder or video |
| `facts_used` | text | Facts IDs, comma-separated |
| `checklist` | text | `Pass` or `Fail: S1, A6 — reason` |
| `status` | dropdown | `Idea` → `In review` → `Approved` → `Scheduled` → `Published`; also `Rejected`, `Cancelled` |
| `notes` | text | Approver notes, reasons |
| `created_by` | text | |
| `drafted_on` | date | Set when status becomes In review |
| `approved_by` | text | Must be filled for the skill to schedule |
| `approved_on` | date | |
| `scheduled_by` | text | |
| `scheduled_on` | datetime | |
| `post_link` | URL | Metricool post link or ID, then the live URL once published |
| `published_on` | datetime | Written by the Monday brief from Metricool |

### Spend

One row per receipt or invoice, ex-GST with GST separate.

| Column | Type | Notes |
|---|---|---|
| `id` | text | `SP-0001` |
| `date` | date | Invoice or charge date |
| `brand` | dropdown | `APN`, `Me2`, `Courage`, `Shared` |
| `vendor` | text | Meta, Google, Metricool, Canva, printer... |
| `category` | dropdown | `Ads`, `Tools`, `Creative`, `Print`, `Other` |
| `channel` | text | For ads: Facebook, Instagram, Google... |
| `description` | text | |
| `amount_ex_gst` | currency | AUD |
| `gst` | currency | AUD; 0 for overseas vendors with no GST |
| `amount_inc_gst` | currency | Formula: ex + GST |
| `currency_original` | text | If billed in USD etc., note original currency and amount in `description` |
| `receipt_link` | URL | Drive link to the receipt |
| `month` | text | `2026-11`, formula from date |
| `logged_by` | text | |
| `logged_on` | date | |

### Budgets

| Column | Type | Notes |
|---|---|---|
| `brand` | dropdown | |
| `month` | text | `2026-11` |
| `category` | dropdown | Same list as Spend, plus `Total` |
| `budget_ex_gst` | currency | AUD |
| `notes` | text | |

### Facts

Claude only uses rows whose `expires_on` is today or later.

| Column | Type | Notes |
|---|---|---|
| `id` | text | `F-0001` |
| `brand` | dropdown | |
| `fact` | text | The claim as it may be used |
| `source` | text or URL | Where it came from |
| `verified_on` | date | |
| `verified_by` | text | |
| `expires_on` | date | Default: verified_on + 90 days for market data, + 365 for standing facts |
| `notes` | text | |

### Assets

The skill will not use a person's image or name without a row here with `consent_recorded = Yes`.

| Column | Type | Notes |
|---|---|---|
| `id` | text | `A-0001` |
| `brand` | dropdown | |
| `file` | text | File name |
| `drive_link` | URL | |
| `type` | dropdown | `Photo`, `Video`, `Logo`, `Stock`, `Headshot`, `Other` |
| `people_pictured` | text | Names, or `None` |
| `consent_recorded` | dropdown | `Yes`, `No`, `N/A` (no people) |
| `consent_link` | URL | Signed form, email or message |
| `licence` | text | For stock: licence name and scope |
| `captured_on` | date | |
| `notes` | text | |

### Pain log

Every blocker, wait or workaround. This decides what gets built at week 8.

| Column | Type | Notes |
|---|---|---|
| `id` | text | `P-0001` |
| `date` | date | |
| `brand` | dropdown | |
| `who` | text | Who hit it |
| `what_happened` | text | |
| `category` | dropdown | `Compliance miss`, `Waited on Elliot`, `Template`, `Connector`, `Spend`, `Usage limit`, `Other` |
| `minutes_lost` | number | |
| `outcome` | text | How it was resolved |
| `build_trigger` | dropdown | `Compliance hard block`, `Self-serve renderer`, `Spend module`, `Full hub`, `None` |

## Conventions

- Dates are `YYYY-MM-DD`. Times are 24-hour Australia/Adelaide.
- IDs are assigned by whoever inserts the row (Claude uses the next free number).
- Never delete rows. Use `Cancelled` or `Rejected` on the Calendar and leave Spend rows in place with a note.
- Protect `approved_by` and `approved_on` so only Elliot (and the backup approver, once decided) can edit them. The Apps Script does this for the owner.
