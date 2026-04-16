# Design Standards — algorithms.technology

> This file is the design agent's evolving knowledge base. It is read at the start of every review and updated at the end. Each review cycle refines these standards based on what was found, what was fixed, and what the best sites in the world are doing.

## Last reviewed
2026-04-10

## Review history

### 2026-04-10 — Review cycle 1 (full site audit)
**Scope:** All 10 local source pages + 11 live pages audited against reference bar.
**Key findings:**
- **Live/local drift discovered.** Live site at schools.algorithms.technology has 3 pages not in local source (facebook-in-schools.html, what-you-can-do.html, what-government-can-do.html) and 2 local pages 404 on live (how-it-works.html, take-action.html). Nav links in local source point to take-action.html which 404s on live.
- **Zero static assets.** No favicon, no OG images, no robots.txt, no sitemap.xml. Catastrophic for shareability and SEO.
- **Mobile nav completely broken.** Nav links hidden at 768px with no hamburger menu, making the site unnavigable on mobile.
- **No skip-nav link, no `<main>` landmark, no prefers-reduced-motion handling.** Accessibility fundamentals missing.
- **Excessive inline styles.** Style attributes scattered across every page (84+ instances in index.html alone) instead of using CSS classes.
- **No OG/Twitter meta tags on any page.** When shared on social media, the site renders with no image, no description preview.
- **No JavaScript at all.** Good for performance, but means no mobile nav, no smooth-scroll TOC, no active state tracking.
- **Design system CSS is strong.** Token system, type scale, colour palette, card components, and section patterns are well-built and consistent.
- **Content quality is exceptional.** Every claim sourced, tone of voice followed precisely, emotional arc well-executed across pages.
**Standards updated:** Added mobile nav as critical gap. Added OG/meta as mandatory. Added `<main>` landmark requirement. Added inline style prohibition. Added sitemap/robots.txt to performance targets. Refined responsive breakpoint targets.

---

## 1. Reference bar

The standard this site is measured against is not "good enough for a school project." It is:

- **The Markup** (themarkup.org) — investigative tech journalism, data-driven, impeccable typography and information design
- **ProPublica** (propublica.org) — advocacy journalism, powerful storytelling with evidence, clean design
- **Electronic Frontier Foundation** (eff.org) — digital rights advocacy, clear visual hierarchy, action-oriented
- **Human Rights Watch** (hrw.org) — evidence-based advocacy, authoritative visual presence
- **Dark Patterns Tip Line** (darkpatterns.org) — consumer tech advocacy, modern minimal design
- **Australian eSafety Commissioner** (esafety.gov.au) — government advocacy, accessible, trustworthy
- **Markup's Citizen Browser project** — interactive data storytelling

These sites represent the tier. Not aspirational — the actual standard.

## 2. Layout & composition

### Principles
- **Purposeful whitespace.** Every gap communicates hierarchy, not emptiness. Generous padding between sections signals "new thought." Tight spacing within a section signals "related."
- **Content width discipline.** Prose text at 60-75 characters per line (720px max). Stats and cards can go wider. Never let text sprawl across the full viewport.
- **Visual rhythm.** Alternating section treatments (light/dark/accent) should feel like breathing, not jarring. The pattern should support the emotional arc.
- **Grid integrity.** Card grids should snap to consistent column counts at each breakpoint. No orphaned single cards in a row unless intentional.
- **Vertical spacing hierarchy.** Section gaps > block gaps > element gaps > inline gaps. Each level should be clearly distinct (at least 1.5x the level below).

### Current targets
- Section padding: 96px (6rem) vertical minimum
- Card grid gaps: 32px (2rem)
- Container hierarchy: 720px (prose) → 960px (cards) → 1200px (max)

## 3. Typography

### Principles
- **Type pairing.** DM Serif Display (headlines) + Inter (body) + JetBrains Mono (data/labels) is a strong system. Serif for authority and emotion. Sans for clarity. Mono for precision and evidence.
- **Scale discipline.** Each step in the type scale should serve a clear purpose. If two sizes look similar, one is redundant.
- **Headline hierarchy.** H1 = page thesis. H2 = section thesis. H3 = topic. H4 = sub-topic. Never skip levels. Every heading should be scannable as a standalone statement.
- **Line height.** Body at 1.7 is excellent. Headlines at 1.2 is tight enough for impact. Pull quotes can go to 1.4.
- **Measure.** Body text max 75 characters. Never wider.

### Current targets
- H1: 4rem (64px) on desktop, 2.75rem mobile
- H2: 2.5rem (40px)
- Body: 1.0625rem (17px) — slightly above default for readability
- Label/mono: 0.75rem uppercase

## 4. Colour & contrast

### Principles
- **Emotional palette.** Red (#e74c3c) = urgency/danger/alarm. Blue (#2980b9) = trust/evidence. Orange (#e67e22) = warning/attention. Teal (#16a085) = safety/solution. Dark (#0f1419) = authority/gravitas.
- **Contrast ratios.** WCAG AA minimum (4.5:1 body, 3:1 large text). Target AAA (7:1) for body text where possible.
- **Colour as information.** Every use of colour should communicate meaning, not just decoration. Red cards = direct threat. Blue cards = evidence/data. Teal cards = protection/action.
- **Dark mode integrity.** The dark sections (#0f1419) need sufficient contrast for text (#8899aa is 4.4:1 — borderline). Muted text on dark backgrounds is a known weak point.

### Current targets
- Primary dark text: #0f1419 on white (21:1 — excellent)
- Muted text: #5a6a7a on white (5.6:1 — passes AA)
- Light text on dark: #8899aa on #0f1419 (4.4:1 — check this)
- Accent text: #e74c3c on white (4.6:1 — passes AA barely)

## 5. Interaction & motion

### Principles
- **Purposeful transitions.** Hover effects should communicate "this is interactive." Decorative animation without purpose is noise.
- **Performance.** transform and opacity only for animations. Never animate layout properties.
- **Card hover.** translateY(-2px) + shadow is appropriate for content cards. It says "there's more here."
- **Progressive disclosure.** Navigation dropdowns, expandable sections — these should feel instant (under 200ms) or deliberately smooth (300-400ms). Nothing in between.

### Current targets
- Card hover: translateY(-2px), shadow-lg, 200ms ease
- Link transitions: 200ms colour change
- Button hover: translateY(-1px) with shadow

## 6. Imagery & visual evidence

### Principles
- **Evidence over decoration.** An advocacy site should show evidence, not stock photography. Screenshots of Senate testimony, data visualisations, document excerpts. Every image should prove something.
- **Data visualisation.** Statistics should be visualised, not just stated. The stat cards are a start, but charts, comparisons, and timelines can do more work.
- **Favicon and OG images.** Essential for shareability. This site will be shared on social media — the OG image is the first impression.

### Current targets
- OG image: branded, clear text, dark background to match site
- Favicon: monogram or symbol that works at 16x16
- Evidence screenshots: bordered, slightly shadowed, clearly sourced

## 7. Responsive design

### Principles
- **Mobile-first, not mobile-afterthought.** The responsive breakpoints should feel intentional, not like the desktop version broke.
- **Navigation.** Hidden nav links on mobile with no hamburger menu = invisible navigation. This is a critical gap.
- **Touch targets.** 44px minimum for all interactive elements on mobile.
- **Reading experience.** Mobile should feel like reading a well-typeset article, not a shrunk desktop page.

### Current targets
- Breakpoints: 768px (tablet), 480px (phone)
- Mobile nav: hamburger menu with full nav access (CRITICAL — currently missing entirely)
- Card grid: single column on mobile
- Stats: 2-up on tablet, 1-up on phone
- Touch targets: 44px minimum on all interactive elements
- Page header padding: must account for fixed nav height on all breakpoints

## 8. Accessibility

### Principles
- **Semantic HTML.** Landmarks, headings hierarchy, ARIA where needed. Screen readers should navigate this site as effectively as sighted users.
- **Focus indicators.** Every interactive element needs visible focus state. Default browser outline is fine — don't remove it.
- **Alt text.** Every image needs descriptive alt text. Decorative SVGs get aria-hidden.
- **Skip navigation.** Link at top of page to skip to main content.
- **Reduced motion.** Respect prefers-reduced-motion media query.

### Confirmed gaps (review cycle 1)
- SVG icons in cards: **NO aria-hidden.** Every SVG in card icons needs `aria-hidden="true"` and cards need accessible text.
- Focus states: **Not tested** — no interactive elements visible on mobile (nav hidden), so focus testing is blocked by nav fix.
- Skip nav link: **Does not exist.** Must be added to every page.
- prefers-reduced-motion: **Not handled.** No `@media (prefers-reduced-motion)` query in CSS.
- `<main>` landmark: **Missing from every page.** Content sections are not wrapped in `<main>`.
- Card links: Cards on index.html and evidence.html are `<a>` tags wrapping block content — needs review for screen reader announcement.
- Tables: No `scope` attributes on `<th>` elements. comparison-table and risk-table both need semantic headers.

## 9. Performance

### Principles
- **Fast first paint.** No JavaScript blocking render. CSS is small. Fonts preconnected.
- **Font loading.** display=swap is correct. Consider subsetting if total font weight exceeds 200KB.
- **No JavaScript dependencies.** This site is static HTML + CSS. Keep it that way. JS only for progressive enhancement (smooth scroll, active TOC, etc.).

### Current targets
- Lighthouse Performance: 95+
- First Contentful Paint: under 1.5s
- Total page weight: under 500KB
- Zero render-blocking JS
- robots.txt: must exist, allow all crawlers (MISSING — 404)
- sitemap.xml: must exist with all pages (MISSING — 404)
- Font subsetting: audit total font weight (3 families loaded, potentially >300KB)

## 10. Meta & SEO

### Principles
- **Every page needs:** title, description, OG title, OG description, OG image, canonical URL, twitter:card meta
- **Structured data.** Article schema for evidence pages. Organization schema for the site.
- **Sitemap.** XML sitemap for all pages. (MISSING — must create)
- **Robots.** Allow indexing — this content should be findable. (MISSING — must create)
- **Favicon.** At minimum: favicon.ico + apple-touch-icon. (MISSING — none exist)
- **OG image.** Branded, dark background, clear text. One default + per-page where possible. (MISSING — none exist)

---

## Inline style policy

**No inline styles.** All styling must use CSS classes from the design system. Inline `style=""` attributes are prohibited except for truly one-off layout overrides that would pollute the class namespace. Current codebase has 80+ inline style instances that must be refactored into utility classes or component variants.

## Live/local sync policy

The local source files in `algorithms-technology/` must match what is deployed to `schools.algorithms.technology`. Any page rename, addition, or removal must be reflected in both locations. Navigation links across all pages must be updated atomically when page structure changes.

---

## Evolution notes

This section is updated by the design agent after each review cycle. It captures what was learned, what standards were refined, and what the agent should pay more attention to next time.

### Cycle 1 — 2026-04-10

**Self-calibration:** The initial standards document was well-structured but entirely theoretical. It anticipated many of the right gaps (mobile nav, skip-nav, prefers-reduced-motion, OG tags) but had not verified any of them. Every "gap to check" turned out to be a confirmed gap. Next cycle should include automated Lighthouse testing.

**What I missed initially:** The live/local drift was the biggest surprise. The standards document should have included a deployment sync check from the start. Three pages exist on the live site that don't exist in local source. This means any fixes applied to local files won't reach those pages unless the deployment pipeline is understood and documented.

**What the reference sites do that this site doesn't:**
1. **The Markup** uses a custom JS scroll-linked TOC on long evidence pages. This site has the CSS for a sidebar TOC (`.toc` class) but doesn't use it on any page. The evidence pages are long enough (1800-2300 words) to benefit from it.
2. **EFF** has a prominent, ever-present "Take Action" sticky CTA on advocacy pages. This site buries the action link in the nav (which is invisible on mobile).
3. **ProPublica** provides structured data (Article schema) on every investigation page, making them appear as rich results in Google. This site has zero structured data.
4. **Human Rights Watch** uses breadcrumb navigation on report pages. This site has prev/next navigation at the bottom of evidence pages but no breadcrumbs, making it hard to know where you are in the hierarchy.

**What to prioritise for next cycle:**
1. Mobile nav implementation (blocks all mobile usage)
2. OG tags and favicon (blocks all social sharing)
3. Inline style refactoring (blocks maintainability)
4. Accessibility audit with actual screen reader testing
5. Live/local sync resolution
