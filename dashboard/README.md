# Portfolio dashboard

One page for Elliot: results, spend vs budget and the approval queue for all three brands, plus a "needs attention" strip at the top. It is a snapshot. The Monday brief task writes the data; the page just shows it.

## Publishing

1. In Claude, publish `index.html` as an artifact with `data/portfolio.json` as a supporting file. Start from `data/portfolio.sample.json` (copy it to `data/portfolio.json`) so the page has something to show.
2. Pin the artifact.
3. Give the artifact's URL to the Monday brief task. Each Monday it republishes `data/portfolio.json` with that week's numbers.

Without a `data/portfolio.json`, the page falls back to the built-in example and shows an **Example data** flag.

## Snapshot schema

`data/portfolio.json`:

| Field | Meaning |
|---|---|
| `snapshot_date` | ISO date the Monday task ran |
| `week_label`, `period.last_week`, `period.month` | Labels for the header |
| `sample` | `true` only for example data; the Monday task leaves it out |
| `brands[]` | One object per brand, in display order |
| `brands[].attention[]` | `{ kind, text }`; `kind` is `unapproved`, `fact`, `budget`, `stale` or `setup`. The whole point of the page |
| `brands[].results` | Keyed stats, each `{ label, value, prior, source }`; `prior` is the week before, used for the change |
| `brands[].spend` | `{ month, categories: [{ name, spent, budget }] }`, AUD ex-GST, month to date |
| `brands[].this_week` | `{ planned, scheduled, in_review, idea }` counts from the Calendar |
| `brands[].queue[]` | `In review` rows: `{ id, date, platform, format, copy, since_days }` |
| `brands[].facts_expiring[]` | `{ id, fact, expires_on }` within 14 days |
| `brands[].top_post` | `{ platform, copy, engagement, link }` or `null` |

Spend bars are drawn to one scale per brand: the bar is spend, the tick is budget. A bar turns amber at 80% of budget and red over 100%.
