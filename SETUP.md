# algorithms.technology — Setup Steps

**Google account:** `algorithms.technology1@gmail.com` — use this for ALL services below (GTM, GA4, GSC, Bing).

Everything Claude Code already did is marked ✅. Your steps are numbered.

---

## What's already done ✅

- ✅ Orphaned pages deleted (how-it-works, take-action, the-first-step)
- ✅ sitemap.xml updated — all 12 pages, dated 2026-04-16
- ✅ robots.txt updated — explicit Allow for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bytespider, CCBot
- ✅ GTM snippets on all 12 pages (`GTM-KSTF45HK` — live)
- ✅ JSON-LD schema on all 12 pages (Article with Person author: Ben Fitzpatrick, WebSite + Organization on homepage)
- ✅ 3 redirect stubs (facebook-in-schools → the-system, what-you-can-do → for-your-school, what-government-can-do → for-government)
- ✅ Newsletter signup CTA on all 11 non-index pages ("Follow the investigation" + email field)
- ✅ "Last reviewed: April 2026" on all content pages
- ✅ `js/form.js` — handles newsletter form submission to Supabase edge function (both full form on index + compact forms on other pages)
- ✅ `js/consent.js` — lightweight cookie consent banner (Accept/Decline, stores in localStorage, pushes consent_update to dataLayer for GTM)
- ✅ form.js + consent.js loaded on all 12 pages
- ✅ `favicon.svg` created (dark background, "a." monogram)
- ✅ SVG favicon reference added to all pages
- ✅ IndexNow key file: `896229e3e4bc4522aeddfbb8abb0cdd2.txt`

---

## Your steps (in order)

### Step 1: Create GTM container

1. Go to [tagmanager.google.com](https://tagmanager.google.com)
2. Create Account
   - Account name: `algorithms.technology`
   - Country: Australia
3. Create Container
   - Container name: `schools.algorithms.technology`
   - Target platform: Web
4. Copy the Container ID (looks like `GTM-ABC1234`)
5. Come back to Claude Code and say: **"GTM ID is GTM-ABC1234"** (your real ID)
   - I'll find-and-replace across all 12 files instantly
6. In GTM, click **Submit → Publish** (publishes the empty container — it needs to be live)

### Step 2: Create GA4 property

1. Go to [analytics.google.com](https://analytics.google.com)
2. Admin → Create → Property
   - Property name: `algorithms.technology`
   - Time zone: Australian Eastern
   - Currency: AUD
3. Create a Web data stream
   - URL: `https://schools.algorithms.technology`
   - Stream name: `schools.algorithms.technology`
4. Toggle ON all Enhanced Measurement options (page views, scrolls, outbound clicks, form interactions)
5. Copy the Measurement ID (looks like `G-XXXXXXXXXX`)
6. **Deploy GA4 via GTM:**
   - In GTM → Tags → New
   - Tag type: **Google Tag** (formerly GA4 Configuration)
   - Tag ID: paste your `G-XXXXXXXXXX`
   - Trigger: **All Pages**
   - Save → Submit → Publish

### Step 3: Set up GA4 Consent Mode

The consent banner JS (`consent.js`) is already on every page. It pushes `consent_update` events to the dataLayer. Now tell GTM to respect it:

1. In GTM → Admin → Container Settings → check **Enable consent overview**
2. Go to Tags → your GA4 tag → Advanced Settings → Consent Settings
3. Set: Requires consent for `analytics_storage`
4. This means GA4 collects modelled data by default, full data after user clicks Accept

### Step 4: Create AI referrer channel in GA4

1. In GA4 → Admin → Data Display → Channel Groups
2. Click **Create new channel group**
3. Name: `AI Search`
4. Add channel rule:
   - Name: `AI Search`
   - Condition: Source matches regex
   - Value: `chatgpt\.com|chat\.openai\.com|perplexity\.ai|gemini\.google\.com|claude\.ai|copilot\.microsoft\.com`
5. Save — this auto-segments all AI-referred traffic in every report

### Step 5: Set up GA4 conversion event

1. In GTM → Triggers → New
   - Trigger type: Form Submission
   - Trigger fires on: Some Forms
   - Condition: Form ID equals `newsletter-form`
   - Name: `Newsletter Form Submit`
2. Tags → New
   - Tag type: Google Analytics: GA4 Event
   - Configuration tag: select your GA4 tag
   - Event name: `newsletter_signup`
   - Trigger: `Newsletter Form Submit`
   - Save → Submit → Publish
3. In GA4 → Admin → Events → mark `newsletter_signup` as a Key Event (conversion)

### Step 6: Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → URL prefix → `https://schools.algorithms.technology`
3. Verify via DNS TXT record:
   - Copy the verification string Google gives you
   - Go to [Cloudflare dashboard](https://dash.cloudflare.com) → algorithms.technology → DNS
   - Add record: Type `TXT`, Name `schools`, Content = Google's string
   - Wait 2-5 minutes, click Verify in GSC
4. After verified:
   - Sitemaps → Add → `sitemap.xml` → Submit
   - URL Inspection → paste each of the 12 page URLs → Request Indexing
   - Settings → International Targeting → Country → Australia

### Step 7: Bing Webmaster Tools

**This is critical for ChatGPT.** ChatGPT uses Bing's index — if you're not in Bing, ChatGPT can't cite you.

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Sign in with Microsoft account
3. Add site → `https://schools.algorithms.technology`
4. Option: **Import from GSC** (fastest if GSC is already verified)
   - Or verify via DNS (same Cloudflare process)
5. After verified:
   - Sitemaps → Submit → `https://schools.algorithms.technology/sitemap.xml`
   - URL Submission → submit all 12 page URLs
6. IndexNow is already set up — key file is `896229e3e4bc4522aeddfbb8abb0cdd2.txt` in the site root
   - After deploy, ping Bing to index immediately:
   ```
   curl "https://api.indexnow.org/indexnow?url=https://schools.algorithms.technology/&key=896229e3e4bc4522aeddfbb8abb0cdd2"
   ```
   - Come back to Claude Code and say **"ping IndexNow"** — I'll hit all 12 URLs

### Step 8: Create OG image + favicon.ico

The SVG favicon is done. You still need:

**favicon.ico** (for older browsers):
1. Go to [favicon.io/favicon-converter](https://favicon.io/favicon-converter/)
2. Upload `favicon.svg` from the repo
3. Download the package — extract `favicon.ico` and `apple-touch-icon.png`
4. Drop both files into `algorithms-technology/` root

**og-default.png** (1200x630):
This is the image that appears when anyone shares a link on LinkedIn, Twitter, Slack, etc. Options:
- Design in Figma/Canva: dark background (#1a1a2e), white text "algorithms.technology", subtitle "Our schools. Our children. Our responsibility."
- Or come back to Claude Code and say **"create the OG image"** — I can generate it as an HTML page and you screenshot it
- Save as `algorithms-technology/images/og-default.png`

### Step 9: Deploy

Come back to Claude Code and say: **"deploy"**

I'll:
- Verify all files are correct
- Commit with a descriptive message
- Push to GitHub
- The site will be live on schools.algorithms.technology via GitHub Pages

### Step 10: Post-deploy verification

After deploy, come back and say **"verify the deploy"**. I'll:
- Fetch every page and check it loads
- Validate schema markup
- Check sitemap and robots.txt are accessible
- Test the newsletter form
- Run Lighthouse
- Ping IndexNow for all 12 URLs

### Step 11: Post-deploy accounts (week 1)

**LinkedIn:**
1. Go to [linkedin.com/company/setup](https://www.linkedin.com/company/setup/new/)
2. Create company page: `algorithms.technology`
3. Add logo, description, website URL
4. Draft first article under [your profile](https://www.linkedin.com/in/ben-fitz/) — not the company page
   - Come back to Claude Code and say **"draft the LinkedIn article"** — I'll write it

**Reddit:**
1. Create a personal account (not branded)
2. Subscribe: r/australia, r/AustralianParents, r/AustralianTeachers, r/privacy
3. Comment genuinely on 10+ threads over 2 weeks before posting any links
4. Come back when ready and say **"draft Reddit posts"** — I'll write them for the right subreddits

**Wikipedia (week 2):**
1. Create account at [en.wikipedia.org](https://en.wikipedia.org/wiki/Special:CreateAccount)
2. Make 10+ small constructive edits on unrelated articles first (fix typos, add refs)
3. After building edit history:
   - Come back and say **"draft Wikipedia edits"**
   - I'll write the exact edits with sources for LAION, Clearview AI, and Meta AI articles
   - You apply them — Wikipedia edits must come from your account

---

## Quick reference: what to tell Claude Code

| When you're ready to... | Say... |
|---|---|
| Swap GTM placeholder | "GTM ID is GTM-XXXXX" |
| Swap GA4 measurement ID | "GA4 ID is G-XXXXXXXXXX" |
| Create OG image | "create the OG image" |
| Deploy the site | "deploy" |
| Verify after deploy | "verify the deploy" |
| Ping IndexNow | "ping IndexNow" |
| Draft LinkedIn article | "draft the LinkedIn article" |
| Draft Reddit posts | "draft Reddit posts" |
| Draft Wikipedia edits | "draft Wikipedia edits" |
| Start Phase 2 content | "start Phase 2" |
