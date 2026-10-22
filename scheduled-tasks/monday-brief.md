# Scheduled task: Monday brief

Create one scheduled task per brand in Claude, or one task that loops over the three brands. Runs every Monday at 7:00am Australia/Adelaide (cron `0 7 * * 1` with `CRON_TZ=Australia/Adelaide`). Needs the Google Sheets, Google Drive, Metricool and Windsor.ai connectors.

Replace `{{BRAND}}` with `APN`, `Me2` or `Courage` and `{{SHEET_URL}}` with the Marketing Sheet link.

---

## Prompt

You are preparing the Monday marketing brief for **{{BRAND}}**. Read everything, write the brief, post it, then refresh the dashboard snapshot. Do not draft, schedule or publish any post.

Today is Monday. "Last week" is the previous Monday to Sunday, Australia/Adelaide. "This week" is today to Sunday.

### 1. Gather

From the Marketing Sheet at {{SHEET_URL}}:
- **Calendar**: every row for this brand with `date` in this week, and every row with status `In review` regardless of date.
- **Spend**: this brand's rows for the current month, summed ex-GST by category.
- **Budgets**: this brand's rows for the current month.
- **Facts**: this brand's rows with `expires_on` within the next 14 days, and any already expired that are still referenced in a Calendar row dated this week.
- **Pain log**: rows for this brand added last week.

From Metricool, for this brand:
- Last week's organic results per platform: posts published, reach, impressions, engagement, follower change, best-performing post with its link.
- Last week's ads results if any campaigns ran: spend, impressions, clicks, leads or results, cost per result.
- Every post currently scheduled in Metricool for this week, with its scheduled time and platform.
- Best posting times for the next 7 days.

From Windsor.ai, for this brand's website:
- GA4: sessions, users, new users, top 5 landing pages, top 5 sources, conversions or key events, each with the change on the prior week.
- Search Console: clicks, impressions, average position, top 5 queries, with the change on the prior week.

### 2. Audit

- **Unapproved posts in Metricool.** For every Metricool post scheduled this week, find a Calendar row with the same brand, platform and date whose status is `Scheduled` or `Approved`. List every Metricool post with no such row. This is the most important line in the brief.
- **Published writeback.** For every Calendar row with status `Scheduled` whose Metricool post has gone live, set `status = Published`, `published_on` and `post_link` to the live URL.
- **Spend vs budget.** Flag any category over 80% of its monthly budget before the 20th, or over 100% at any time.
- **Expiring facts.** List each with its expiry date and which Calendar rows use it.

### 3. Write the brief

Keep it under 400 words. Plain language, no hype. Use this shape:

**{{BRAND}} — week of [date]**

1. **Needs attention** (unapproved Metricool posts, over-budget lines, expired facts in use, In review rows older than 3 days). If nothing, say "Nothing needs attention."
2. **Last week** (3–5 lines: what went out, what did best and why you think so, website and search in one line each, ads in one line if they ran)
3. **This week** (the Calendar rows by day with status; gaps against the brand's cadence; the best posting slots Metricool suggests)
4. **Spend** (month to date by category against budget, one line per category)
5. **Facts expiring** within 14 days
6. **Pain log** from last week, one line each, or "none"

### 4. Deliver

- Save the brief as a Google Doc named `{{BRAND}} Monday brief YYYY-MM-DD` in the brand's Drive marketing folder under `Reports/Weekly/`.
- Post the brief as the result of this task so Elliot and the Executive see it in Claude.
- Update the portfolio dashboard snapshot: read `dashboard/data/portfolio.json` from the Drive folder `Marketing Hub/Dashboard/`, replace this brand's section with this week's numbers (the schema is in the file), and save it back. The dashboard artifact reads that file.

If a connector is unavailable, say which one, write the brief with what you have, and add a Pain log row with category `Connector`.
