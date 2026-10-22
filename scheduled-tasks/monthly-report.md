# Scheduled task: monthly report

One scheduled task per brand, plus a short portfolio summary for Patrick. Runs on the 1st of each month at 7:00am Australia/Adelaide (cron `0 7 1 * *` with `CRON_TZ=Australia/Adelaide`). Needs the Google Sheets, Google Drive, Google Docs, Metricool and Windsor.ai connectors.

The report is a **draft**. Elliot edits it before anything goes to a client. Nothing is sent to a client by this task.

Replace `{{BRAND}}` and `{{SHEET_URL}}`.

---

## Prompt (per brand)

You are drafting the monthly marketing report for **{{BRAND}}** covering last month (the full calendar month that ended yesterday, Australia/Adelaide). Elliot will edit it before it goes to the client, so write it to be edited: clear sections, every number sourced, no padding.

### 1. Gather

From the Marketing Sheet at {{SHEET_URL}}:
- **Calendar**: rows for this brand with `published_on` in last month. Count by platform and format.
- **Spend**: rows for last month, by category, ex-GST, with GST shown separately in a total line.
- **Budgets**: last month's budget by category.
- **Pain log**: rows for last month (for Elliot's eyes, not the client's).

From Metricool, for this brand, last month vs the month before:
- Per platform: posts, reach, impressions, engagement, engagement rate, follower change.
- Top 5 posts by engagement with links.
- Ads, if any ran: spend, impressions, clicks, results, cost per result, per campaign.

From Windsor.ai, for this brand's website, last month vs the month before:
- GA4: sessions, users, new users, engaged sessions, conversions or key events, top 10 landing pages, top sources and mediums.
- Search Console: clicks, impressions, CTR, average position, top 10 queries, top 10 pages, queries that moved into or out of the top 10.

### 2. Rules

- Every number has a source (Metricool, GA4, Search Console, Spend tab). Put the source in brackets after the table.
- Compare to the previous month. Show the change as a number and a direction, not a judgement, then add one sentence of plain interpretation.
- Do not invent causes. If a change has no clear explanation, say so.
- For APN: include `Adelaide Property Network | RLA 255336` in the footer. Do not name tenants or disclose sale prices unless the Calendar row shows the vendor agreed.
- For Me²: this report is internal. Do not reuse any of it in Me² marketing.
- Reader is the client's owner. No jargon without a one-line gloss.

### 3. Write the report as a Google Doc

Title: `{{BRAND}} Marketing Report — [Month YYYY]`. Save in the brand's Drive marketing folder under `Reports/Monthly/`. Sections:

1. **Summary** (5 bullets, the month in plain words)
2. **What we published** (count by platform and format; the top 5 posts with one line each on why they worked)
3. **Social results** (table per platform, this month vs last; one paragraph of reading)
4. **Website** (GA4 table; top landing pages; what brought people in)
5. **Search** (Search Console table; queries that moved; one paragraph)
6. **Ads** (only if any ran: table per campaign, cost per result, one paragraph)
7. **Spend** (table by category vs budget, ex-GST, GST line, total inc GST)
8. **Next month** (3–5 proposed focuses, each tied to something in the data; marked as proposals for Elliot to confirm)
9. **Internal notes for Elliot** (Pain log summary, anything that should not go to the client; Elliot deletes this section before sending)

### 4. Deliver

Post the Doc link and the Summary bullets as the result of this task. Do not share the Doc with anyone outside the agency.

---

## Prompt (portfolio summary for Patrick)

Run after the three brand reports exist. Read last month's three monthly report Docs from each brand's `Reports/Monthly/` folder. Write a one-page Google Doc titled `Portfolio summary — [Month YYYY]` in `Marketing Hub/Reports/`:

- One paragraph per brand: what went out, the one number that mattered most, spend against budget.
- One line on the total marketing spend across the portfolio, ex-GST.
- No client-confidential detail, no tenant or vendor names, no Pain log content.
- Under 300 words.

Post the link as the result. Elliot forwards it to Patrick; this task does not send it.
