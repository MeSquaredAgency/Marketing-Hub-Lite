# Compliance checklist

Run the shared section on every post, then the section for the brand. Record each item as **Pass** or **Fail** with a one-line reason. A row moves to `In review` only when every item passes. A fail that cannot be fixed keeps the row at `Idea` with the reason in `notes`.

These are checks, not locks. The approver reads the result; the Monday brief audits what actually got scheduled.

## Shared (every brand, every post)

| # | Check | How to check |
|---|---|---|
| S1 | **Every factual claim has a source.** Statistics, prices, dates, counts, awards, comparisons | Each maps to a Facts row for this brand with `expires_on` ≥ today, or to the Executive's written brief for plain descriptive copy. List the row IDs in `facts_used`. |
| S2 | **No expired facts.** | No Facts row used has `expires_on` < today. |
| S3 | **Consent for every person pictured or named.** | Every asset with a person is in the Assets tab with `consent_recorded = Yes`. Anyone named in copy is either a team member listed in the Project or has a consent row. |
| S4 | **Asset licence.** Stock or third-party images and music | Assets row shows `licence` and it covers social use for this brand. |
| S5 | **No misleading or deceptive wording.** (Australian Consumer Law s18) | No "guaranteed", "best in Adelaide", "lowest fees" or superlatives without a Fact and a qualifier. No fake urgency or invented scarcity. |
| S6 | **Testimonials are real and attributed with permission.** | Quote matches a Facts or Assets row with the source and consent. No composite or edited-for-meaning quotes. |
| S7 | **Platform fit.** | Length, hashtags, link placement and image sizes per `platforms.md`. Alt text present. |
| S8 | **Brand voice.** | Matches the Project's voice rules and reads like the last 10 approved examples. No emoji walls, no AI tells ("In today's fast-paced world"). |
| S9 | **Spelling and locale.** | Australian English. Suburb and street names checked against the brief. Phone numbers and links resolve. |
| S10 | **Right brand, right account.** | The row's `brand` matches the Project and the Metricool brand you would schedule to. |

## APN Real Estate (Adelaide Property Network)

| # | Check | How to check |
|---|---|---|
| A1 | **Legal line present on every asset:** `Adelaide Property Network \| RLA 255336` | On every rendered tile (the templates carry it; confirm it is visible after render), in every caption, in every ad's primary text or description, in video descriptions and on video end cards. Exact wording, pipe included. |
| A2 | **One vendor per post.** | A tile, carousel, story or caption shows properties from one vendor only. A "just sold this week" roundup across vendors is not allowed unless each vendor has consented in writing (Facts row). |
| A3 | **Vendor consent to market.** | The listing is live under an agency agreement, or the Executive's brief says the vendor approved the post. Off-market teasers need the vendor's written OK (Facts row). |
| A4 | **Price and status accuracy.** (Land and Business (Sale and Conveyancing) Act 1994 SA, price advertising rules) | Price matches the current listing. No price range wider than the agency agreement allows. "Sold", "Under contract", "Leased" only once that is true. Sale prices published only if the vendor has agreed. |
| A5 | **Tenant privacy.** | No tenant names, no interior photos of tenanted properties without the tenant's consent row, no rent arrears or dispute references. |
| A6 | **Property management claims.** | Vacancy rates, days-on-market, rent achieved and fee comparisons each trace to a Facts row dated within 90 days. |
| A7 | **Photos are of the property as it is.** | No renders presented as photos. Virtual staging labelled as such. Drone shots show the property, not neighbours' homes as the focus. |
| A8 | **Agent named is licensed.** | Any agent named appears in the Project's team list with their registration. |

## Me²

| # | Check | How to check |
|---|---|---|
| M1 | **No client names.** | No client business name, logo, product or identifiable description ("an Adelaide real estate agency" is too close; "a professional services client" is fine). This includes APN and Courage. |
| M2 | **No results claims.** | No percentages, dollar figures, hours saved, leads generated, revenue or growth numbers attributed to Me²'s work, even anonymised. |
| M3 | **No prices.** | No fees, rates, packages or "from $" figures. Pricing is a conversation, not a post. |
| M4 | **No named individuals.** | No staff, contractor or client individuals named or pictured, except Elliot and anyone listed in the Project as public-facing with a consent row. |
| M5 | **Describe the way of working, not the client.** | Posts explain how Me² works (a dedicated person, specialists behind them, AI agents built around how the business works, everything checked before it goes out). Examples are hypothetical and labelled as such. |
| M6 | **Location honesty.** | Say the team is in Phnom Penh if the post mentions where the team is. Never imply Australian-based staff. |

## Courage Health & Fitness

Rules are not yet set. Until Elliot supplies them, apply the shared checklist and these holding rules:

| # | Check | How to check |
|---|---|---|
| C1 | **No health outcome claims.** | No weight-loss figures, "lose X kg", before-and-after images, injury-recovery or medical claims. (Therapeutic Goods Advertising Code and ACL.) |
| C2 | **Member consent.** | Any member pictured, named or quoted has an Assets row with consent. Minors need a guardian's consent noted. |
| C3 | **Pricing and offers.** | Membership prices, trials and promotions only from a Facts row with an expiry, and the offer's end date and conditions stated in the post. |
| C4 | **Qualified staff.** | Trainers named are listed in the Project with their qualification. |

## Recording the result

Write the result in the Calendar row's `checklist` column as `Pass` or `Fail: <item IDs>`, and put any reason the approver needs in `notes`. Example: `Fail: S1, A6 — PM vacancy rate has no Facts row`.
