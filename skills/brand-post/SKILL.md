---
name: brand-post
description: Take a post from idea to In review for APN, Me² or Courage. Drafts each platform's version in the brand's voice, runs the compliance checklist, renders tiles from the approved templates, saves files to the brand's Drive folder and adds or updates the Calendar row in the Marketing Sheet. Use whenever the Executive asks for a post, a week of posts, a caption for a video, or to schedule Approved rows. Never publishes anything that is not Approved in the Calendar.
---

# brand-post

One procedure for every post, for every brand. The brand's Project supplies the kit, voice rules, compliance rules and channel list. This skill supplies the steps. Follow them in order and do not skip the checklist.

## Before you start

Read, in this order, and stop if any is missing:

1. **The brand's Project instructions** (brand kit, voice, compliance rules, channel list). If the chat is not inside a brand Project, ask which brand and stop.
2. **The Marketing Sheet.** You need the `Calendar`, `Facts` and `Assets` tabs. The sheet is linked in the Project instructions.
3. **The Metricool brand** that matches the Project. Confirm the brand name before scheduling anything.

The Marketing Sheet is the record. A chat is not. Everything you draft ends up in a Calendar row.

## Modes

The Executive will ask for one of these. Pick the matching section.

| Ask | Mode |
|---|---|
| "Plan this week", "what should we post" | **Plan** |
| "Draft the listing post", "write this up for LinkedIn", "do row 14" | **Draft and render** |
| "Caption this video", "hook for this Short" | **Video copy** |
| "Schedule the approved rows", "push Monday's posts" | **Schedule** |

## Plan

1. Pull from Metricool the brand's best posting times for the last 90 days and the posts already scheduled.
2. Read the Calendar for the next 14 days for this brand. Note gaps against the channel list's weekly cadence.
3. Read the Facts tab. Use only rows for this brand whose `expires_on` is today or later. Prefer facts expiring within 14 days (they are flagged in the Monday brief for a reason).
4. Propose the week's posts: date, platform, format, one-line angle, which Fact or Asset it uses. Keep to the cadence in the channel list; do not propose more than the Executive can produce.
5. On a yes, append one Calendar row per post with `status = Idea`, `created_by` = the Executive, and the angle in `copy`. Report the row numbers.

## Draft and render

Work one Calendar row at a time. If the Executive gives several, loop.

1. **Load the row.** Read `brand`, `platform`, `format`, `copy` (the angle), `asset`, `facts_used`, `template`. If the row's status is `Scheduled` or `Published`, stop and say so.
2. **Gather facts.** Every claim in the post must trace to a Facts row for this brand with a valid expiry, or to the Executive's brief for plain descriptive copy (a listing's suburb and bedroom count come from the listing brief; a market statistic needs a Facts row). List the Facts row IDs you will use.
3. **Check the asset.** If the post uses a photo or video with people in it, find it in the Assets tab. `consent_recorded` must be `Yes`. If the asset is not in the tab, or consent is blank or `No`, do not use it. Say what is missing and offer a template-only tile instead.
4. **Draft per platform.** Write the version for each platform in the row (one row per platform, so usually one). Follow `platforms.md` for length, hashtags, link handling and format. Follow the Project's voice rules. Write the caption, the alt text, and for video the hook, title and description.
5. **Run the caption checker, then the compliance checklist.** If the repo's `scripts/check-caption.mjs` is available, run it on each caption (`node scripts/check-caption.mjs <brand> <platform> caption.txt`) and fix every FAIL before going on; WARNs are judgement calls, note them. Then run `compliance-checklist.md`: the shared section, then the brand's section. Record pass or fail per item. On any fail, fix and re-run. If it cannot be fixed (the claim has no Fact, the person has no consent), stop the row at `Idea` and leave a note in `notes`.
6. **Render tiles** if the row's `format` is `tile`, `carousel` or `story`:
   - Pick the template named in the row, or the default for the brand and post type (see "Template defaults" below).
   - Fill the template's fields from the draft. The legal line on APN templates is fixed in the template; never remove or restyle it.
   - Render at each size the platform needs (see `platforms.md`). Use the render script in `scripts/` if available, otherwise render the HTML and screenshot it at the exact pixel size.
   - Check the render: text fits, no overflow, legal line visible, image not stretched.
7. **Save to Drive.** Put rendered tiles and the caption text file in the brand's marketing folder under `Posts/YYYY-MM-DD <platform> <slug>/`. Name files `brand_platform_YYYY-MM-DD_size.png`.
8. **Update the row.** Set `copy` to the final caption, `alt_text`, `asset` to the Drive link of the rendered folder, `facts_used` to the Facts row IDs, `checklist` to `Pass`, `status = In review`, `drafted_on` = today. Add anything the approver should know to `notes`.
9. **Report.** Give the Executive the row number, platform, a preview of the caption, the Drive link and the checklist result. Say plainly that it now waits on approval.

### Template defaults

| Brand | Post type | Template |
|---|---|---|
| APN | Listing, open home, sold, leased | `listing-tile` |
| APN | Property management, landlord, tenant, appraisal | `pm-hero` |
| APN | Testimonial, team quote, market comment | `quote-card` |
| APN | One verified number from the Facts tab | `market-stat` |
| Me² | Everything | `me2-post` |
| Courage | Not yet set. Ask Elliot before rendering. | — |

## Video copy

The Executive edits the video in Descript and saves it to Drive. You write the words.

1. Confirm the Drive link and that any person in the video is in the Assets tab with consent recorded.
2. Write for each of TikTok, YouTube Shorts and Instagram Reels: a spoken-or-on-screen hook (first 3 seconds, under 10 words), a title (YouTube: under 70 characters), a caption, and hashtags per `platforms.md`.
3. Run the compliance checklist on all of it. For APN, the legal line goes in the caption and the description, and on the end card if the Executive is adding one.
4. Update the row as in Draft and render step 8, with `format = video`.

## Schedule

Only this mode touches Metricool's scheduler. Never schedule from any other mode.

1. The Executive names the rows (or "all Approved for this week"). For each row, re-read the row from the Sheet now. Do not rely on an earlier read.
2. Schedule a row only if `status` is exactly `Approved` and `approved_by` is filled. Skip any other row and say why.
3. For each eligible row: confirm the Metricool brand matches, schedule the post for `date` and `time` on `platform` with the final `copy` and the Drive asset, in the brand's time zone (Australia/Adelaide).
4. Write back `status = Scheduled`, `scheduled_on` = now, `post_link` = Metricool's post link or ID, `scheduled_by` = the Executive.
5. Report: which rows scheduled, which skipped and why. If Metricool refuses a platform (TikTok and YouTube Shorts need checking), say so and log it in the Pain log tab.

## Rules that apply in every mode

- **Nothing publishes without approval.** Only the Schedule mode reaches Metricool, and only for `Approved` rows re-read at the moment of scheduling.
- **Only verified facts.** A claim without a Facts row with valid expiry does not go in the post.
- **Consent for every person pictured.** No Assets row with consent, no asset.
- **One vendor per post** for APN. Never combine properties from different vendors in one tile, carousel or caption.
- **Me² never names clients, results, prices or individuals.** See the Me² section of the checklist.
- **Status moves forward only** through Idea → In review → Approved → Scheduled → Published, and never past In review without the approver. If something needs to go back, set `In review` to `Idea` and say why in `notes`.
- **Log pain.** Any time a step is blocked, a template does not fit, a connector refuses, or the Executive has to wait on Elliot, add a row to the Pain log tab. That log decides what gets built at week 8.

## Files in this skill

- `SKILL.md` (this file): the procedure
- `compliance-checklist.md`: the checks, shared and per brand
- `platforms.md`: per-platform lengths, sizes, hashtags, link handling
- Templates live in the repo's `templates/` folder and in each Project's knowledge
