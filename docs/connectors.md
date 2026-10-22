# Connectors

Status as checked on 22 Oct 2026 from Claude. Connector slugs and account IDs are what the scheduled-task prompts and the skill pass to each connector.

## Windsor.ai — connected

Account: elliot.crabb@mesquaredagency.com, **Trial plan** (not yet paid). Six sources are connected, which is more than the plan's "GA4 plus Search Console". Basic is priced per data source, so check the source count against the plan before the trial ends.

| Connector slug | Brand | Account ID | Account name |
|---|---|---|---|
| `googleanalytics4` | APN | `554168939` | APN Main Site |
| `searchconsole` | APN | `sc-domain:apnre.com.au` | |
| `searchconsole` | Me² | `sc-domain:mesquaredagency.com` | |
| `facebook_organic` | APN | `655291254590350` | APN Real Estate |
| `facebook_organic` | Me² | `1366226653240723` | Me² |
| `linkedin_organic` | APN | `7584509` | APN Real Estate |
| `linkedin_organic` | Me² | `143962129` | Me² |
| `google_my_business` | APN | `locations/17587897430204625804` | APN Real Estate - Sales & Property Management |
| `google_my_business` | APN | `locations/14665810204583882455` | APN Real Estate - Sales & Property Management |
| `google_my_business` | Me² | `locations/8754630511320158764` | Me² |
| `google_ads` | APN | `283-188-6380` | APN Real Estate |

The two APN Google Business Profile locations are presumably Blair Athol and Mount Gambier; confirm which is which in Windsor.

Verified pulls (22 Oct): GA4 daily sessions and key events for APN, Search Console daily clicks, impressions and position for both domains. Search Console lags about two days.

**Not yet connected in Windsor**

- GA4 for mesquaredagency.com (only the APN property is connected)
- Instagram organic (`instagram_public`), YouTube (`youtube`), TikTok organic (`tiktok_organic`) for either brand
- Anything for Courage Health & Fitness

**What this changes in the plan.** Windsor already carries organic data for Facebook, LinkedIn and Google Business Profile, plus Google Ads. The Monday brief reads those from Windsor and uses Metricool for Instagram, TikTok and YouTube results and for all scheduling. If Windsor's source count becomes a cost problem, drop the Windsor organic sources and take them from Metricool instead; GA4 and Search Console stay in Windsor.

## Metricool — not yet connected

Needed for scheduling to every platform and for Instagram, TikTok and YouTube results. Create the three brands in Metricool, connect every channel, then add the Metricool connector in Claude.

## Google Sheets and Drive — available in Claude

Used by the skill and the scheduled tasks once the Marketing Sheet exists.
