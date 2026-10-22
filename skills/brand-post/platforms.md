# Platform specs

Lengths are working limits, not the platform's hard maximum. Sizes are the pixel sizes the templates render to. Hashtag counts are what we use, not what the platform allows.

| Platform | Caption length | Hashtags | Links | Image sizes (px) | Video | Notes |
|---|---|---|---|---|---|---|
| **Facebook** | Up to 300 chars before "See more"; full post up to 1,500 | 0–2, at the end | Links in the post body are fine; one link per post | Feed: 1080×1350 portrait or 1080×1080 square. Link preview: 1200×628 | Reels 1080×1920, under 60 s | Lead with the point. Use first-person agency voice. |
| **Instagram** | First 125 chars show in feed; up to 2,200 | 5–10 on the last line, after a line break; brand tag first (`#apnrealestate`, `#mesquared`) | No clickable links in captions; say "link in bio". Stories use the link sticker | Feed: 1080×1350 portrait (default), 1080×1080 square. Carousel: up to 10 slides, same size. Story: 1080×1920 | Reels 1080×1920, 15–60 s | Alt text required (platform field). Carousel first slide carries the hook. |
| **LinkedIn** | 150 chars before "See more"; up to 1,300 | 3–5, at the end | Put the link in the first comment or as the post's single link preview; never two links in body | Single image: 1200×627 landscape or 1080×1080 square. Document post: PDF, 1080×1350 pages | 1080×1080 or 1920×1080, under 2 min | Company page voice. No hashtag spam. Me² primary channel. |
| **TikTok** | Up to 150 chars shows cleanly; up to 2,200 | 3–5 inline | No links | Cover: 1080×1920 | 1080×1920, 9:16, 15–60 s. Hook in first 2 s, captions burned in | Casual, direct. Speak the hook. |
| **YouTube Shorts** | Title ≤ 70 chars; description ≤ 300 chars shown | 3 in description, include `#Shorts` | Links in description | Thumbnail is auto; end card 1080×1920 | 1080×1920, 9:16, under 60 s | APN legal line in description and end card. |
| **YouTube (long)** | Title ≤ 70 chars; description first 150 chars matter | 3–5 in description | Links in description | Thumbnail 1280×720 | 1920×1080, 16:9 | Property walkthroughs, Me² explainers. |
| **Google Business Profile** | Up to 1,500; keep under 300 | None | One CTA button (Learn more / Call / Book) with a URL | 1200×900 (4:3) | Not used | APN only. Listings, open homes, office updates. No hashtags. |

## Formats in the Calendar

| `format` | Meaning | What the skill renders |
|---|---|---|
| `tile` | Single image post | One PNG per size the platform needs |
| `carousel` | Multi-image post (IG, LinkedIn document, FB) | One PNG per slide, numbered `01`, `02`... |
| `story` | IG or FB story | 1080×1920 PNG |
| `video` | Executive-made video | No render; hook, title, caption, description, end-card text |
| `text` | LinkedIn or FB text-only | No render |
| `gbp` | Google Business Profile update | 1200×900 PNG |

## Alt text

Every image gets alt text: one sentence, what is in the picture, no hashtags, no "image of". For a listing tile: "Front of a two-storey brick home at 12 Example Street, Blair Athol, with a lime APN banner reading For Sale."

## Scheduling time zone

All dates and times in the Calendar are Australia/Adelaide. Metricool brands are set to the same zone. Best times come from Metricool's "best times to post" for the brand over the last 90 days; when the Calendar's `time` is blank the skill uses the best slot on that date.
