# Scheduled tasks

Two tasks. Each starts a fresh Claude session in the Marketing-Hub-Lite environment, so its prompt is standalone and points at the procedure files in this folder.

| Task | Schedule (Australia/Adelaide) | Prompt file | Needs |
|---|---|---|---|
| Monday marketing brief | Mondays 6:39am | [`prompts/monday-brief.prompt.md`](prompts/monday-brief.prompt.md) | Google Sheets, Google Drive, Google Docs, Windsor.ai (and Metricool once connected) |
| Monthly marketing reports | 1st of the month 6:36am | [`prompts/monthly-report.prompt.md`](prompts/monthly-report.prompt.md) | Same |

Times are a few minutes before the hour on purpose; on-the-hour schedules queue behind everyone else's.

## Creating them

Create both from the claude.ai scheduled tasks (routines) UI, not from a Claude Code session: tasks created from inside a session in this organisation store no connectors, so the session they start has no Sheets, Drive or Windsor tools and cannot run the brief. Two such tasks were created on 23 Oct 2026 and left **disabled** as a reference; delete them once the UI versions exist.

For each task in the UI:

1. New scheduled task, fresh session each run, environment: the Marketing-Hub-Lite environment.
2. Schedule as above, time zone Australia/Adelaide.
3. Paste the prompt file's contents as the prompt.
4. Attach the connectors: Google Sheets, Google Drive, Google Docs, Windsor.ai. Add Metricool when it exists.
5. Turn on push notifications so the brief lands on a phone.

## Testing before Monday

Run the Monday task once by hand after creating it. Expect the first run to say Metricool is not connected, report Instagram, TikTok and YouTube as "no data source", and add one Connector row to the Pain log. That is correct behaviour until Metricool is added.
