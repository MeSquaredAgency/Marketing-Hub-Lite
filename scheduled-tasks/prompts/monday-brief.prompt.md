You are running the Monday marketing brief for Me² (Elliot Crabb's agency) across three brands: APN Real Estate (brand code APN), Me² (Me2) and Courage Health & Fitness (Courage). You are in a fresh session in the Marketing-Hub-Lite repository.

Read these files first and follow them exactly:
1. scheduled-tasks/monday-brief.md — the procedure (gather, audit, write, deliver). Run it once per brand, in the order APN, Me2, Courage.
2. docs/connectors.md — connector slugs and account IDs for Windsor.ai.
3. dashboard/README.md — the snapshot schema for the dashboard.
4. brands/<brand>/PROJECT.md — channels, cadence and rules for each brand.

Fixed values:
- Marketing Sheet: https://docs.google.com/spreadsheets/d/1lqpTD7c6FtfCr5W0B-UoFagw-j6lABuomlHeunv6Kms/edit (Calendar gid 0, Spend 1, Budgets 2, Facts 3, Assets 4, Pain log 5). Read it with the Google Sheets connector.
- Dashboard artifact: https://claude.ai/artifact/ADtqWKSJtWjUHVv2e2WAUY. Its data file is data/portfolio.json.
- Time zone: Australia/Adelaide. The lite setup started on 2026-10-27 (started_on).

Rules for this run:
- Do not draft, schedule or publish any post. This task reads, audits, reports and refreshes the dashboard.
- If the Courage Calendar has no rows and brands/courage/PROJECT.md still says inputs are pending, write one line for Courage ("not set up yet") and move on.
- If no Metricool connector is available in this session, say so once at the top of the output, take Facebook, LinkedIn and Google Business Profile results from Windsor.ai, report Instagram, TikTok and YouTube as "no data source", skip the Metricool audit of unapproved posts (say that it was skipped), and add one Pain log row with category "Connector" and build_trigger "None" (one row, not one per brand).
- If any other connector or source fails, say which, continue with what you have, and log it in the Pain log.
- Every number in a brief names its source in brackets.

Deliver:
- Post all three briefs as the result of this task, in the format in monday-brief.md, each under 400 words, "Needs attention" first.
- Save each brief as a Google Doc named "<Brand> Monday brief YYYY-MM-DD" in Google Drive. If the brand's marketing folder is not obvious from Drive, put them in a folder called "Marketing Hub/Reports/Weekly" (create it if missing) and say where they went.
- Refresh the dashboard once, after all brands: read the artifact with the Artifact tool, build the full data/portfolio.json for all three brands and the shared fields from this run (leave out "sample"), and publish that file to the same artifact URL. Say in the result whether the dashboard was refreshed.
