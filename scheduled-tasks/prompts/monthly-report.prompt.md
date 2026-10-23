You are drafting the monthly marketing reports for Me² (Elliot Crabb's agency) covering last month, the full calendar month that ended yesterday, Australia/Adelaide. Three brands: APN Real Estate (brand code APN), Me² (Me2) and Courage Health & Fitness (Courage). You are in a fresh session in the Marketing-Hub-Lite repository.

Read these files first and follow them exactly:
1. scheduled-tasks/monthly-report.md — the per-brand report procedure and the portfolio summary for Patrick.
2. docs/connectors.md — connector slugs and account IDs for Windsor.ai.
3. brands/<brand>/PROJECT.md — channels, rules and the APN legal line.

Fixed values:
- Marketing Sheet: https://docs.google.com/spreadsheets/d/1lqpTD7c6FtfCr5W0B-UoFagw-j6lABuomlHeunv6Kms/edit (Calendar gid 0, Spend 1, Budgets 2, Facts 3, Assets 4, Pain log 5). Read it with the Google Sheets connector.
- Time zone: Australia/Adelaide.

Rules for this run:
- These are drafts. Elliot edits them before anything goes to a client. Do not send or share anything outside the agency.
- Run the per-brand procedure for APN, then Me2, then Courage. If Courage has no published Calendar rows last month and brands/courage/PROJECT.md still says inputs are pending, write one line for Courage and skip its report.
- If no Metricool connector is available, say so once, take Facebook, LinkedIn and Google Business Profile results from Windsor.ai, report Instagram, TikTok and YouTube as "no data source", and note it in the Internal notes section of each report.
- Every number names its source. Compare to the month before. Do not invent causes.
- APN reports carry "Adelaide Property Network | RLA 255336" in the footer and never name tenants or disclose sale prices the vendor has not agreed to publish.
- The Me² report is internal; none of it is reused in Me² marketing.

Deliver:
- One Google Doc per brand named "<Brand> Marketing Report — <Month YYYY>" with the sections in monthly-report.md, saved in Google Drive under the brand's marketing folder if it is obvious, otherwise under "Marketing Hub/Reports/Monthly" (create it if missing).
- Then the portfolio summary for Patrick as a Google Doc named "Portfolio summary — <Month YYYY>" under "Marketing Hub/Reports", under 300 words, no client-confidential detail, no Pain log content.
- Post as the result: the four Doc links and each brand's Summary bullets, plus a short list of anything Elliot must check before sending.
