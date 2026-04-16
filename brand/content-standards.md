# Content Standards — algorithms.technology

> This file is the content agent's evolving knowledge base. It is read at the start of every review and updated at the end. Each review cycle refines these standards based on what was found, what was fixed, and what the best advocacy writing in the world looks like.

## Last reviewed
2026-04-10 — Review cycle 1

## Review history

### 2026-04-10 — Review cycle 1
**Scope:** Full site audit of all 10 pages (index, evidence, ai-training, facial-recognition, deepfakes, training-datasets, no-consent, the-first-step, facebook-in-schools/how-it-works, what-you-can-do/take-action, what-government-can-do).

**Key findings:**
- Zero em dash violations. Perfect compliance with the most explicit TOV rule.
- Only two banned phrase violations found: "going forward" (the-first-step.html:59) and "best practice" (take-action.html:193).
- Hedging language ("may") used only where genuine uncertainty exists. No weasel words.
- No American English spelling violations.
- Voice consistency is strong across all pages, with one break: the live what-you-can-do.html switches from "we" to "you" framing.
- Data inconsistencies between local source files and live deployed content (Clearview AI 30B vs 50B, Facebook users 17M vs 19M).
- Homepage H1, the "irony" H2, the LAION response section, the consent form display, and the three-levels-of-protection tables are at or above the reference bar.
- Headline quality is strong overall. Several H2s use labels rather than arguments ("The Human Rights Watch investigation," "The academic evidence," "Clearview AI and Australia," "The global regulatory response").
- Missing: about/credibility section, social proof, direct Hansard link, counter-argument engagement.
- No 404 handling for old URL paths (how-it-works.html, take-action.html).

**Standards updated:**
- Added label-heading anti-pattern to Headlines section
- Added "going forward" and "best practice" to Words to avoid
- Added relief valve principle to Emotional calibration
- Added credibility/attribution to Information architecture
- Added local/live sync discipline to new section 11
- Updated Evolution notes with self-calibration reflection

---

## 1. Reference bar

The writing standard this site is measured against is not "acceptable web copy." It is:

- **The Markup** — investigative tech journalism that makes complex systems understandable to anyone. Evidence-led, precise, no waste.
- **ProPublica** — advocacy journalism that turns data into stories people care about. Masters of the emotional-factual balance.
- **The Conversation** (theconversation.com) — academic rigour made readable. Every claim sourced. Complex made clear.
- **Tim Urban / Wait But Why** — complex topics explained from first principles with genuine voice and zero condescension.
- **George Orwell's "Politics and the English Language"** — clarity, honesty, no pretension. Say what you mean. Cut what doesn't serve.
- **eSafety Commissioner reports** — government advocacy writing that actually lands. Plain language, specific actions.

These represent the tier. The writing should make people feel informed, concerned, and empowered — never confused, lectured, or hopeless.

## 2. Tone of voice compliance

The tone-of-voice document (`brand/tone-of-voice.md`) is the constitution. These standards build ON TOP of it, not instead of it.

### Non-negotiables from TOV
- **Straight.** Say what's happening. No hedging.
- **Clear.** Short sentences. Common words. One idea per paragraph.
- **Honest.** Don't oversimplify. Don't overpromise.
- **No judgement.** Never blame parents or schools.
- **Empathetic.** Acknowledge the emotional weight.
- **Hopeful.** End with action, not despair.
- **Direct.** Lead with the point. No throat-clearing.
- **No em dashes.** Ever.
- **Australian English.** Always.
- **Source everything.** Every claim needs a source.

## 3. Headlines & headings

### Principles
- **Headlines are arguments.** Every H2 should make a claim or pose a question that the section then proves. "What's happening to our children's photos" is a question that earns attention. "Overview" is dead weight.
- **Scannable narrative.** Reading only the H2s on any page should tell the complete story. If someone reads nothing else, the headings alone should inform them.
- **Emotional escalation.** Headlines should follow the emotional arc: awareness → understanding → concern → agency → action. Never jump from awareness straight to action.
- **Specificity over abstraction.** "362 Australian children found in AI training data" beats "Children at risk."
- **Present tense for current threats.** "Schools are posting photos on public Facebook" not "Schools have been posting."

### Anti-patterns
- **Label headings.** "The Human Rights Watch investigation" is a label. "What Human Rights Watch found in 0.0001% of one dataset" is an argument. Every H2 should make a claim, not name a topic.
- **Noun-phrase headings.** "The global regulatory response" reads like a government report. "Over 100 million in fines. Zero compliance." reads like advocacy.
- **"The X of Y" pattern.** "The scale of the problem" could be on any advocacy site about anything. Make it specific to this issue.

### Quality checks
- Does every H2 work as a standalone tweet?
- Would someone share this heading on its own?
- Does it make you want to read the section?
- Is it specific enough to distinguish from a generic child safety site?
- If you read only the H2s on a page, do they tell a complete story?

## 4. Opening lines

### Principles
- **First sentence = thesis.** The opening line of every page and every section should tell you what you're about to learn. Not background. Not context. The point.
- **The 5-second test.** If someone reads only the first sentence, do they know what this page is about and why it matters?
- **No warm-ups.** "In recent years, there has been growing concern..." is death. "Meta scrapes every public Facebook post to train AI" is alive.
- **Hook with the unexpected.** Lead with the thing people don't know, not the thing they do.

### Anti-patterns
- Starting with dates or history ("Since 2007...")
- Starting with definitions ("AI training refers to...")
- Starting with qualifications ("While there are many aspects to consider...")
- Starting with "In this section, we will..."

## 5. Evidence presentation

### Principles
- **Claim → evidence → source.** Every factual assertion follows this pattern. The claim is in body text. The evidence supports it. The source proves it.
- **Quantify everything possible.** "30 billion photos" not "billions." "362 children" not "hundreds." "Since 2007" not "for years." Numbers create credibility.
- **Name names.** Meta, Clearview AI, LAION-5B, Senator David Shoebridge. Specificity is authority.
- **Primary sources over secondary.** Link to the Senate transcript, not the article about the Senate transcript. Link to the HRW report, not the coverage of it.
- **Attribution formatting.** Sources should be visually distinct but not intrusive. Footnote-style or inline with clear citation.

### Quality checks
- Is every factual claim sourced?
- Could a sceptic verify every claim by following the sources?
- Are sources primary where possible?
- Are statistics current (or clearly dated if historical)?

## 6. Emotional calibration

### Principles
- **Controlled intensity.** The content should be alarming where the facts are alarming, and measured where the facts are measured. Never manufacture urgency — the real urgency is enough.
- **Show, don't tell.** Don't say "this is terrifying." Present the evidence and let the reader feel it. "362 children identified from a 0.0001% sample" is more terrifying than any adjective.
- **The parent test.** Read every sentence imagining a parent of a 6-year-old reading it for the first time. Does it inform without paralysing? Does it empower without minimising?
- **Relief valves.** After every heavy section, provide either an action the reader can take or a sign that progress is being made. Never leave readers stuck in fear.

### Relief valve discipline
- **After every heavy section, provide either an action or a sign of progress.** The deepfakes page is the most emotionally intense content on the site. It needs a relief valve after the pipeline section, before escalating to scale. Even one sentence: "This is why the first step matters."
- **Relief valves are not disclaimers.** They don't soften the message. They redirect the reader's emotional energy from fear to agency.
- **Test:** If a reader stops mid-page, do they feel informed and empowered, or just alarmed?

### Forbidden emotional manipulation
- Graphic descriptions of child exploitation
- Fear without agency ("and there's nothing you can do")
- Guilt-tripping ("and YOU signed the form")
- Catastrophising beyond what evidence supports
- Emotional language where factual language is stronger

## 7. Calls to action

### Principles
- **Specific over vague.** "Email your school's P&C president this template" beats "Get involved."
- **Low barrier first.** Start with what someone can do in 60 seconds. Escalate from there.
- **Social proof.** "Join 47 schools who've already made this change" is more compelling than "Be the first."
- **Button text = outcome.** "See what we found" tells you what happens when you click. "Learn more" tells you nothing.
- **Two CTAs max per section.** More than two creates decision paralysis.

### Quality checks
- Does every CTA tell you exactly what happens when you click?
- Is the primary CTA the most important action?
- Are CTAs positioned after the reader has enough context to want to act?

## 8. Information architecture

### Principles
- **Progressive depth.** Homepage = headlines and stats. Evidence pages = detailed arguments. Each page should satisfy a different depth of curiosity.
- **Cross-linking as narrative.** Links between pages should feel like "and here's the proof" not "see also." Every cross-link earns its place.
- **Completeness per page.** Each page should work as a standalone argument. Someone landing on "AI Training" from Google should not need to read the homepage first.
- **Redundancy where it serves.** Key statistics can appear on multiple pages if they're relevant to each argument. Don't force people to jump around.
- **Credibility signals.** An advocacy site without an "About" section or any indication of who made it is asking readers to trust anonymous content. Add a minimal credibility statement. It doesn't need names. "Created by parents at an Australian public school" is enough.
- **Primary source priority.** Link to the Hansard transcript, not the news article about the hearing. Link to the HRW report, not the coverage. The content standards already say this; the site doesn't fully do it yet.

### Quality checks
- Can someone land on any page from a search engine and understand the argument?
- Does the navigation reflect how people think about this issue (not how we organised our research)?
- Are the most important pages the easiest to find?

## 9. Readability metrics

### Targets
- **Flesch-Kincaid grade level:** 8-10 (readable by a 14-year-old). This is not dumbing down — it's writing clearly.
- **Average sentence length:** 15-20 words. Mix short punchy sentences with occasional longer ones for rhythm.
- **Paragraph length:** 2-3 sentences max in body copy. 4 max in evidence sections.
- **Page length:** Evidence pages can be long (2000-3000 words) if well-structured with clear sections. Homepage should be under 800 words.

## 10. Language patterns

### Preferred constructions
- Active voice: "Meta scrapes photos" not "Photos are scraped"
- Present tense for current threats: "This is happening" not "This has been happening"
- Direct address: "our children" not "children"
- Collective framing: "we" not "you" — this is a community, not a lecture
- Concrete over abstract: "photos on Facebook" not "digital content on social platforms"

### Words to avoid
- "Stakeholders" (say who you mean)
- "Leverage" (use, apply, or nothing)
- "Utilise" (use)
- "Robust" (strong, thorough, or nothing)
- "Going forward" (now, from here, from this point) -- **found in the-first-step.html:59**
- "Touch base" (talk, meet)
- "Best practice" (what works, what's proven, good practice) -- **found in take-action.html:193**
- "May" / "could potentially" (either it does or it doesn't — be specific. Exception: genuine legal or future uncertainty.)
- "In terms of" (cut it)

### Words that work
- "Confirmed" (when something is proven)
- "Scraped" (what actually happens to the data)
- "Right now" (urgency without hysteria)
- "Here's the evidence" (directness and transparency)
- "Together" (community, not isolation)

## 11. Source/deployment integrity

### Principles
- **Local source files must match deployed content.** The local HTML files are the canonical source. If the live site has been updated independently (different page names, expanded content, newer data), the local files must be synced.
- **Data consistency.** If a statistic appears on multiple pages (e.g. Clearview AI's database size), all instances must use the same number. When data is updated, search all files for the old number.
- **URL continuity.** When page names change (e.g. take-action.html to what-you-can-do.html), the old URL must redirect. Broken bookmarks and shared links are a credibility risk.

### Current gaps (as of 2026-04-10)
- Local `how-it-works.html` and `take-action.html` do not match live `facebook-in-schools.html`, `what-you-can-do.html`, and `what-government-can-do.html`
- Homepage stat card says "30B+" for Clearview AI; live facial-recognition page says "50B+"
- Local ai-training.html says "17 million" Australian users; live says "19 million"
- Old URLs (how-it-works.html, take-action.html) return 404 on the live site

---

## Evolution notes

This section is updated by the content agent after each review cycle. It captures what was learned, what standards were refined, and what the agent should pay more attention to next time.

### 2026-04-10 — Review cycle 1 self-calibration

**What I expected to find:** Significant TOV violations, hedging language, passive voice problems, inconsistent voice across pages.

**What I actually found:** The writing quality is substantially higher than expected. Zero em dashes. Only two banned-phrase violations across 10 pages. Voice consistency is strong. The emotional calibration is sophisticated, particularly the three-levels-of-protection honesty and the LAION response section. The content is at or near the reference bar for several sections.

**Where the real problems are:** Not in the prose quality but in the information architecture and maintenance discipline. The local/live divergence is a systemic risk. Data inconsistencies between pages undermine the evidence-first credibility the writing works so hard to build. The missing credibility signals (no about section, no social proof, no direct Hansard links) are gaps that the quality of the writing alone cannot fill.

**What I should focus on next review:**
1. Whether the local/live sync has been resolved
2. Whether the headline anti-patterns identified here have been fixed
3. Whether relief valves have been added to the deepfakes page
4. Whether social proof has been added (any schools adopting the recommendation)
5. Readability metrics (Flesch-Kincaid, sentence length, paragraph length) — not measured this cycle due to tool constraints but should be quantified next time
6. Cross-linking density — are the natural connection points between pages now linked?

**Calibration note:** The content standards document itself was well-constructed from the start. The principles accurately predicted where violations would occur (label headings, missing relief valves, data consistency). The next version should add specific examples from the site as illustrations of both good and bad practice, turning the abstract principles into concrete guidance anchored to real content.
