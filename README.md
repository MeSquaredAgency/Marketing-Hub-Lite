# Me² Marketing Hub — Lite

Everything needed to run marketing for **APN Real Estate**, **Me²** and **Courage Health & Fitness** inside Claude for the first six months, without building the full hub.

Claude does the drafting, checking, rendering and reporting. Two connectors do the plumbing (Metricool for publishing and social data, Windsor.ai for GA4 and Search Console). Google Sheets and Drive hold the records. Nothing reaches a platform until a Calendar row says **Approved**.

The plan this repo implements is in [`docs/lite-plan.md`](docs/lite-plan.md).

## What is in here

| Folder | What it is | Where it is used |
|---|---|---|
| [`skills/brand-post/`](skills/brand-post/) | The shared `brand-post` skill: draft per platform, run the compliance checklist, render tiles, save to Drive, add the Calendar row | Uploaded to each brand's Claude Project |
| [`brands/`](brands/) | One folder per brand: Project instructions, brand kit (`brand.json`), compliance rules, channel list | Pasted into the Project's instructions and knowledge |
| [`templates/`](templates/) | The four approved HTML/CSS tile templates: listing tile, PM hero, quote card, Me² post | Rendered by the skill and by `scripts/render-tile.mjs` |
| [`scripts/`](scripts/) | `render-tile.mjs` renders a template plus a JSON file to PNG at platform sizes | Local rendering and the week-1 test |
| [`sheet/`](sheet/) | The Marketing Sheet: six tabs, their columns, status values, and an Apps Script that builds it | Google Sheets |
| [`scheduled-tasks/`](scheduled-tasks/) | Prompts for the Monday brief (per brand) and the monthly report (1st of the month) | Claude scheduled tasks |
| [`dashboard/`](dashboard/) | The portfolio dashboard page and the JSON snapshot it reads | Published as a Claude artifact, refreshed by the Monday task |

## How it fits together

```
Marketing Exec ──► Claude (brand Project + brand-post skill) ──► Metricool ──► FB / IG / LinkedIn / TikTok / YouTube / GBP
                        │                                   ──► Windsor.ai (GA4, Search Console)
                        │                                   ──► Google Drive (images, video, tiles, reports)
                        └──────────────────────────────────► Google Sheets (Calendar, Spend, Budgets, Facts, Assets, Pain log)
                                                                   ▲
Elliot ── reviews In review rows, sets Approved (works from a phone) ──┘
```

## The weekly loop

1. **Monday brief (automatic).** A scheduled task posts each brand's brief: last week's results, spend vs budget, this week's Calendar, Facts expiring within 14 days, and any Metricool post with no Approved row.
2. **Plan.** In the brand's Project, the Executive asks for the week's posts. Claude adds them to the Calendar as **Idea**.
3. **Draft and render.** The `brand-post` skill drafts each platform's version, runs the checklist, renders tiles, saves to Drive and moves the row to **In review**.
4. **Video.** The Executive edits vertical video in Descript; Claude writes hook, title and caption.
5. **Review.** Elliot sets **Approved** or leaves a note.
6. **Schedule.** Claude re-checks each row's status, schedules through Metricool and writes back **Scheduled** with the post link.
7. **Spend.** Receipts go into Drive; Claude logs them in the Spend tab, ex-GST with GST separate.
8. **Month end (automatic).** On the 1st, a scheduled task drafts each brand's monthly report.

## Week-1 setup

About two to three days, most of it loading brand material.

- [ ] Claude seat for the Marketing Executive
- [ ] Three Projects created (APN, Me², Courage), each loaded from `brands/<brand>/` plus the last 10 approved posts
- [ ] Marketing Sheet built from `sheet/` (six tabs), Facts and Assets filled for each brand
- [ ] `brand-post` skill uploaded to each Project and tested on one post per brand
- [ ] Metricool: three brands created, every channel connected, connector added in Claude
- [ ] Windsor.ai: GA4 and Search Console connected per site, connector added in Claude
- [ ] Scheduled tasks created from `scheduled-tasks/`
- [ ] Portfolio dashboard published from `dashboard/`
- [ ] End-to-end test through the connector: one Facebook post, one LinkedIn post, one TikTok and one YouTube Short, each going Idea → Approved → Scheduled
- [ ] Pain log tab started

## Open decisions

- [ ] **Metricool logins.** Starter is one login. Either the Executive owns the account and Elliot keeps admin access through the connector, or pay for Advanced to get separate roles.
- [ ] **Courage Health & Fitness inputs.** Contact, channels, logo and brand rules are still needed before its Project can be built. See `brands/courage/`.
- [ ] **Backup approver.** Decide who approves when Elliot is away, or which templated post types can go out on the checklist alone.
- [ ] **Cross-border privacy.** Counsel to confirm the position before the Executive in Phnom Penh handles Australian clients' personal information.

## Week-8 decision

Read the Pain log and build only what it justifies:

| Pain log shows | Then build |
|---|---|
| A non-compliant post reached approval or went live | The compliance checker as a hard block |
| The Executive waits on Elliot for tiles more than twice a week | The creative renderer as a self-serve tool |
| Month-end spend takes more than an hour to reconcile | The portfolio spend module |
| A fourth or fifth client signs | The full hub, from the build plan |
