# Me² Marketing — Lite Plan (run in Claude)

*Oct 22, 2026 · Elliot Crabb*

## Summary

For the first six months I run marketing for APN, Me² and Courage Health & Fitness inside Claude instead of building the full hub. Claude does the drafting, checking, rendering and reporting; two connectors do the plumbing; Google Sheets and Drive hold the records. It costs about **US$40–45 a month** plus a Claude seat for the Marketing Executive, and the Executive can start in week 1 instead of week 7.

The pieces:

- **Metricool** publishes to the social platforms and pulls organic and ads data. Its official MCP connector works with Claude on any Metricool plan, including free, so we don't need the API tier.
- **Windsor.ai** brings GA4 and Search Console into Claude for website and SEO reporting.
- **Claude Projects, a brand skill and scheduled tasks** hold the brand knowledge, run the compliance checklist, render tiles from our templates and send the weekly and monthly reports.

The full hub plan stays on the shelf. At week 8 I review the pain log and decide whether to build any of it.

## How it fits together

Claude does the work; connectors do the plumbing.

- **Marketing Exec** drafts, schedules, logs spend, working through Claude.
- **Claude** holds Brand Projects ×3 (kit, rules, approved examples), the `brand-post` skill (draft, check, render tiles), scheduled tasks (Monday brief, monthly report) and the portfolio dashboard (snapshot, refreshed weekly).
- **Metricool** posts to FB, IG, LinkedIn, TikTok, YouTube, GBP; organic + ads data.
- **Windsor.ai** GA4 and Search Console.
- **Google Drive** images, video, reports.
- **Google Sheets** Calendar, Spend, Facts, Assets.
- **Elliot** reviews and approves in the Calendar, setting rows to Approved.

The Executive works through Claude; Claude reaches the platforms only through Metricool, and approvals live in the Calendar sheet where I can act from a phone. The Executive reports to me; Patrick stays hands-off and only sees the monthly summary.

## Workspace setup

Eight pieces, all inside Claude or tools Claude already reaches. Records live in Google, so nothing is trapped in a chat.

| Piece | What it holds or does | Used by |
|---|---|---|
| Claude Projects ×3 (APN, Me², Courage) | Brand kit, voice rules, compliance rules, channel list, the last 10 approved posts as examples | Marketing Executive, me |
| `brand-post` skill (shared) | The steps for every post: draft per platform, run the compliance checklist, render tiles from our approved HTML/CSS templates, save to Drive, add the Calendar row | Marketing Executive |
| Marketing Sheet (Google Sheets) | Tabs: **Calendar** (date, brand, platform, copy, asset link, status, approver), **Spend**, **Budgets**, **Facts** (fact, source, verified on, expires on), **Assets** (file, people pictured, consent), **Pain log** | Everyone |
| Google Drive | Images, video, rendered tiles and monthly reports, in each brand's existing marketing folder | Everyone |
| Metricool connector | Schedules posts and pulls organic and ads data for all three brands | Claude, on the Executive's request |
| Windsor.ai connector | GA4 and Search Console data for each website | Claude |
| Scheduled tasks | Monday weekly brief per brand; monthly report draft on the 1st | Runs on its own |
| Portfolio dashboard (artifact) | Results, spend vs budget and the approval queue for all three brands on one page, refreshed by the Monday task | Me |

## The weekly workflow

One loop per week, the same for every brand. Nothing reaches a platform until a Calendar row says Approved.

1. **Monday brief (automatic).** A scheduled task posts each brand's brief: last week's results from Metricool and Windsor, spend against budget, this week's Calendar, and any Facts expiring within 14 days.
2. **Plan.** In the brand's Project, the Executive asks Claude for the week's posts using Metricool's best posting times and gaps in the Calendar. Claude adds them to the Calendar as **Idea**.
3. **Draft and render.** The `brand-post` skill drafts each platform's version, runs the compliance checklist, renders tiles from the approved templates, saves files to Drive and moves the row to **In review** with links.
4. **Video.** The Executive edits vertical video in Descript and saves it to Drive; Claude writes the hook, title and caption for TikTok, Shorts and Reels.
5. **Review.** I open the Calendar, check the In review rows and set **Approved** or leave a note. This works from a phone.
6. **Schedule.** The Executive asks Claude to schedule the Approved rows. Claude checks each row's status first, schedules through Metricool and writes back **Scheduled** with the post link.
7. **Spend.** Receipts and invoices go into Drive; Claude reads each one and logs it in the Spend tab, ex-GST with GST separate.
8. **Month end (automatic).** On the 1st, a scheduled task drafts each brand's monthly report as a doc. I edit it before anything goes to a client, and Patrick gets a short portfolio summary, nothing more.

## Guardrails

In this setup the rules are checks Claude runs, not locks. Claude follows them every time it's used, but nothing stops someone posting straight from Metricool. The Monday brief closes that gap by flagging anything scheduled in Metricool that has no Approved row.

| Rule | How it's handled | Strength |
|---|---|---|
| "Adelaide Property Network \| RLA 255336" on every APN asset | Built into every APN template, so rendered tiles always carry it; Claude checks captions and ad copy | Strong for tiles, checked for copy |
| Separate vendors never combined | Compliance checklist plus the approver's review | Checked |
| Me²: no client names, results claims, prices, or named individuals | Compliance checklist in the Me² Project | Checked |
| Only verified facts | Claude only uses rows from the Facts tab whose expiry date hasn't passed | Checked |
| Consent for every person pictured | The skill won't use an asset unless the Assets tab says consent is recorded | Checked |
| Nothing publishes without approval | Claude schedules only Approved rows; the Monday brief flags any Metricool post without one | Checked and audited weekly |

## Running costs

About **US$40–45 a month** for the two connectors, plus a Claude seat for the Marketing Executive. All figures USD, ex-GST.

| Item | Monthly | Notes |
|---|---|---|
| Metricool Starter, up to 5 brands | ~$20 billed annually | Starter adds LinkedIn, unlimited posts and unlimited analytics history; the free plan caps scheduling at 20 posts, too few for three brands |
| Windsor.ai Basic, 3 data sources | ~$19–23 | Basic covers three sources, e.g. GA4 plus two others; we need GA4 and Search Console |
| Claude seat for the Marketing Executive | Per our Claude plan | I already have a seat |
| Google Workspace, Descript | $0 extra | Already paid for |
| Upgrade if needed: Metricool Advanced | ~$53 billed annually | Team and role management and approval workflow sit on Advanced; only if we need separate Metricool logins |

Over six months that's roughly US$240–270 plus the Claude seat, against about US$420–510 for the full hub's running costs alone.

## Week-1 setup

About two to three days of my time, most of it loading brand material.

- [ ] Claude seat for the Marketing Executive
- [ ] Three Projects created, each loaded with its brand kit, compliance rules, channel list and 10 approved posts
- [ ] Marketing Sheet built with its six tabs, Facts and Assets filled for each brand
- [ ] `brand-post` skill built with the approved templates (listing tile, PM-hero, quote card, Me² post) and tested on one post per brand
- [ ] Metricool: three brands created, every channel connected, connector added in Claude
- [ ] Windsor.ai: GA4 and Search Console connected for each site, connector added in Claude
- [ ] Scheduled tasks set up for the Monday brief and the monthly report
- [ ] Portfolio dashboard published
- [ ] End-to-end test through the connector: one Facebook post, one LinkedIn post, one TikTok and one YouTube Short, each going Idea → Approved → Scheduled
- [ ] Pain log tab started

## Limits and the week-8 decision

What a Claude-only setup can't do:

- **No hard locks.** Rules are checked, not enforced; the weekly audit catches misses after the fact.
- **No live single screen.** The dashboard is a snapshot from Monday's run; for anything newer the Executive asks Claude.
- **Sheets is the audit trail.** Version history shows who changed what, but there's no per-action log.
- **Seat limits.** A heavy content week can hit the Executive's Claude usage limits.
- **Connector coverage to confirm.** Metricool's connector must schedule to every platform we use, TikTok and YouTube Shorts included. That's what the week-1 end-to-end test is for.

At week 8 I read the pain log and build only what it justifies:

| Pain log shows | Then build |
|---|---|
| A non-compliant post reached approval or went live | The compliance checker as a hard block |
| The Executive waits on me for tiles more than twice a week | The creative renderer as a self-serve tool |
| Month-end spend takes more than an hour to reconcile | The portfolio spend module |
| A fourth or fifth client signs | The full hub, from the build plan |

If none of those happen, the lite setup stays and the build plan stays on the shelf.

## Open decisions

- [ ] **Metricool logins.** Starter is one login, so the Executive and I would share it. Either the Executive owns the account and I keep admin access through the connector, or we pay for Advanced to get separate roles.
- [ ] **Courage Health & Fitness inputs.** Contact, channels, logo and brand rules are still needed before its Project can be built.
- [ ] **Backup approver.** Every post waits on me. Decide who approves when I'm away, or which templated post types can go out on the checklist alone.
- [ ] **Cross-border privacy.** Same as the build plan: counsel to confirm our position before the Executive in Phnom Penh handles Australian clients' personal information.

## Sources

- Metricool MCP limits and plan requirements; Metricool MCP overview
- Metricool alternatives and pricing (PostFast); Metricool pricing (SocialKit)
- Windsor.ai pricing (Metric Nexus); Windsor MCP
