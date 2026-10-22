# Portfolio dashboard

One page for Elliot. An **Overview** tab with the needs-attention list, a card per brand and the week-8 decision tracker, then one tab per brand with the full detail. It is a snapshot: the Monday brief task writes the data, the page shows it.

## What is on it

| Where | What |
|---|---|
| Overview · Needs attention | Every flag from every brand: Metricool posts with no Approved row, facts about to expire, budget lines, stale In review rows, setup gaps. Each links to its brand tab |
| Overview · Brand cards | Three headline numbers, this week's plan, how many posts wait on Elliot (and the oldest wait), spend against budget with an on-pace pill |
| Overview · Week-8 tracker | Which week of the lite setup it is, the pain log count, and a counter per build trigger from the plan. A trigger lights up when its threshold is met |
| Brand · This week | Seven-day strip from the snapshot date. Each post is colour-coded by status and links to its Calendar row in the Sheet |
| Brand · Last week | Five stats with change on the prior week and a seven-week sparkline (hover for values) |
| Brand · By platform | Posts, reach, engagements, engagement rate and follower change per platform |
| Brand · Top posts, approval queue, facts expiring | Queue rows link straight to the Sheet row so Elliot can approve from a phone |
| Brand · Spend vs budget | Bars to one scale per brand: bar is spend, solid tick is budget, dashed tick is where spend should be today. Amber at 80%, red over 100%, and an on-pace / ahead / under pill |
| Brand · Search movers | Queries whose position moved most, with clicks |

Keys 1 to 4 switch tabs. The chosen tab is kept in the browser and in the URL hash, so `…#apn` opens straight to APN.

## Publishing

1. In Claude, publish `index.html` as an artifact with `data/portfolio.json` as a supporting file. Start from `data/portfolio.sample.json` (copy it to `data/portfolio.json`) so the page has something to show.
2. Pin the artifact.
3. Give the artifact's URL to the Monday brief task. Each Monday it republishes `data/portfolio.json` with that week's numbers.

Without a `data/portfolio.json`, the page falls back to the built-in example and shows an **Example data** flag.

## Snapshot schema

`data/portfolio.json`. Everything is optional except `snapshot_date` and `brands`; a missing section renders as an empty state.

| Field | Meaning |
|---|---|
| `snapshot_date` | ISO date the Monday task ran. The week strip starts here |
| `week_label`, `period.last_week`, `period.month` | Labels for the header |
| `started_on` | ISO date the lite setup began; drives the week counter |
| `sheet_url`, `calendar_gid` | Marketing Sheet link and the Calendar tab's gid, used to deep-link rows |
| `history_weeks[]` | Labels for the sparkline points, oldest first |
| `sample` | `true` only for example data; the Monday task leaves it out |
| `pain_log` | `{ total, by_trigger: { "<build trigger>": n }, recent: [{ date, brand, what_happened, build_trigger }] }` |
| `brands[]` | One object per brand, in display order |
| `brands[].links` | `{ project, drive, metricool }` URLs for the brand header |
| `brands[].attention[]` | `{ kind, text }`; `kind` is `unapproved`, `fact`, `budget`, `stale` or `setup` |
| `brands[].results` | Keyed stats, each `{ label, value, prior, source, history[] }`; `history` is the last seven weeks, oldest first, ending in `value` |
| `brands[].platforms[]` | `{ name, posts, reach, engagement, followers_delta }` for last week |
| `brands[].spend` | `{ month, categories: [{ name, spent, budget }] }`, AUD ex-GST, month to date |
| `brands[].this_week` | `{ planned, scheduled, in_review, idea }` counts from the Calendar |
| `brands[].calendar_week[]` | Every Calendar row dated in the seven days from `snapshot_date`: `{ id, date, platform, status, copy, row }`; `row` is the Sheet row number for the deep link |
| `brands[].queue[]` | `In review` rows: `{ id, row, date, platform, format, copy, since_days }` |
| `brands[].facts_expiring[]` | `{ id, fact, expires_on }` within 14 days |
| `brands[].top_posts[]` | Up to 3 of `{ platform, copy, engagement, link }` |
| `brands[].search_movers[]` | `{ query, position, prior_position, clicks }`, biggest moves first |
