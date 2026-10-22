# Approved templates

Four HTML/CSS templates. The `brand-post` skill fills them and renders them to PNG at the sizes in `skills/brand-post/platforms.md`. Changing a template is a brand decision: Elliot approves, then the new version is committed here and re-uploaded to the Project.

| Template | Brand | Fields | Formats |
|---|---|---|---|
| `listing-tile.html` | APN | status, open_time, address, suburb, price, beds, baths, cars, land, agent, agent_phone, photo | square, portrait, story, landscape, gbp |
| `pm-hero.html` | APN | kicker, headline, body, cta, photo | square, portrait, story, landscape, gbp |
| `quote-card.html` | APN | kicker, quote, name, role, photo (optional) | square, portrait, story, landscape |
| `me2-post.html` | Me² | kicker, headline, body, footer | square, portrait, story, landscape |

## Conventions

- `{{field}}` is HTML-escaped on insert. `{{{field}}}` is inserted raw; `me2-post` uses it so `headline` can carry `<em>` and `body` can carry `<br>`.
- `{{format}}` is set by the renderer and selects the size through `body[data-format]`.
- The APN legal line `Adelaide Property Network | RLA 255336` is hard-coded in every APN template in a `.legal` element. The renderer checks it is visible in every output. Do not move it into a field.
- Fonts load from Google Fonts (Playfair Display and Figtree for APN, Instrument Sans for Me²). Offline, the fallbacks are Georgia and the system sans.
- Logos: add SVG or PNG files under `templates/assets/<brand>/` and swap the `.wordmark` block for an `<img>`. Until then the templates use a typeset wordmark.

## Rendering

```bash
cd scripts && npm install          # once; installs Playwright
node render-tile.mjs listing-tile ../templates/samples/listing-tile.json --formats square,portrait --out ../out
npm run samples                     # renders every sample at every size into out/samples
```

Each line of output is `ok` or `CHECK`. `CHECK` means an element overflowed the canvas or the legal line is not visible; fix the copy length or the data before using the tile.

Inside Claude without the script: open the template, replace the placeholders, set `data-format`, and screenshot at the exact pixel size. Apply the same two checks by eye.

## Sizes

| Format | Pixels | Used for |
|---|---|---|
| square | 1080×1080 | IG/FB feed, LinkedIn |
| portrait | 1080×1350 | IG/FB feed (default) |
| story | 1080×1920 | IG/FB stories, TikTok and Shorts cover or end card |
| landscape | 1200×628 | FB/LinkedIn link preview |
| gbp | 1200×900 | Google Business Profile |
