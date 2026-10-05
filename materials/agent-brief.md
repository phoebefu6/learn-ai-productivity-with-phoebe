# Agent brief - shared by every fan-out page of learn-ai-productivity-with-phoebe

Filled from `~/.claude/skills/course-builder/references/agent-brief.template.md` on 2026-10-05.
Internal build document: never link it from an audience page.

You are writing ONE static HTML session page. No servers, no npm. **If your target file already
exists on disk, do not write it; report that and stop.** Write the file, return its path and one
line of coverage. No HTML in your reply.

## Read first, in this order

1. The template page. Copy its structure, classes, SVG grammar and quiz markup EXACTLY, including
   how many options each question has (FOUR options, A to D):
   `/Users/phoebe.fu/Documents/claude_work/github_repo/learn-ai-productivity-with-phoebe/courses/01-where-your-week-goes.html`
   Also skim the bench page for rhythm and for the canon numbers it prints:
   `/Users/phoebe.fu/Documents/claude_work/github_repo/learn-ai-productivity-with-phoebe/courses/04-the-triage-bench.html`
2. The source map: every verified number, its evidence tier, per-session coverage, the seams. Use
   ONLY its numbers; never invent a statistic; if a fact is missing, teach the uncertainty.
   `/Users/phoebe.fu/Documents/claude_work/github_repo/learn-ai-productivity-with-phoebe/materials/official-course-map.md`
3. The stylesheet `:root` block for the palette tokens (first 25 lines only):
   `/Users/phoebe.fu/Documents/claude_work/github_repo/learn-ai-productivity-with-phoebe/assets/style.css`

## Page skeleton (keep every component)

toolbar (crumb EXACTLY "learn-ai-productivity-with-phoebe / Session N of 6", #toggle-all, #zoom-toggle) ·
masthead (eyebrow "Learn AI Productivity with Phoebe · Session N of 6", h1 with one
`<span class="accent">`, .sub, .chip-row with the level chip given in your outline, two
`.chip.audience`, `.chip.time` "45 min", .agenda a1-a4 with flex weights 1/4/5/1) · main.wrap ·
section#intro (Part 0: kicker "Part 0" + h2 "Where we left off", .lede, .legend pills exactly as the
template, .callout.win "★ What you walk out with tonight.") · 3 Parts, each `section.section#part-N`
with section-kicker (klabel "Part N · covers ...", h2, `.tag.concept "N min live"`), a `.lede`,
ONE figure, `details.card` accordions (summary: `.mode.live` or `.mode.self`, title, `.mini`,
`.caret ▶`), at least one `.callout.example` with `span.ex-pill` "Real world" on the page ·
section#demo-1 Build-along (kicker klabel "Build-along", h2, `.tag.demo "★ 22 min · everyone builds"`,
.lede, ONE figure, `.steps > .step`, each step a `<p>` and then (for most steps) a
`.prompt-box.good` carrying a `span.label` "★ Step N · ...") · section#exercise Homework (kicker
klabel "Homework", h2 "Before session N+1", `.tag.exercise`; ol, 4 items) · section#quiz (kicker
klabel "Check yourself", h2 "Three questions", the passport line, 3 x `.quiz-q data-answer="0-based"`,
`p.qtext`, FOUR `button.qopt` "A · ..." to "D · ...", `p.qwhy`; one `p.quiz-score` after the last;
vary the correct letter) · section#official, kicker klabel "Sources covered", h2 EXACTLY "What this
session teaches, and where it came from", `.covered > .covered-row` (pill solid ✓ / light ◐ + name +
note), then the `.mono` line EXACTLY "Every fact on this page, and its verification tier, is recorded
in the course's source map." · section.cheat#cheatsheet (h3 "Session N cheat sheet <span>· pin
this</span>", .grid-2 of six .cheat-item with `<b>` and `<span>`) · `.callout.next` with `.nx-pill`
"Next session" · footer.pagefoot · `<script src="../assets/app.js?v=1"></script>`.

Head: the template's social meta block with this page's own title/description/url (og:image stays
`https://phoebefu6.github.io/learn-ai-productivity-with-phoebe/assets/og-cover.png`);
`<title>Session N · <Title> - learn ai productivity with phoebe</title>`;
`<link rel="stylesheet" href="../assets/style.css?v=1">`. Nothing else external.

First `details.card` in the FIRST Part is `open`; no other. Sentence case headings. Warm
practitioner voice, concrete, never dry. Inside prompt-boxes escape `&` `<` `>`. 450 to 650 lines
is guidance about depth, never a target: never collapse whitespace, dissolve a list into a
paragraph, or drop a component to fit.

## Hard rules (a violation is rework)

- NEVER an em dash or en dash, anywhere (prose, code, aria-labels, comments). Hyphen only.
- No meta text: never "this course", "in this course", "the course teaches", "banned here". State
  the professional norm directly with its reason. The two exact estate phrases above are the only
  self-references ("the course's source map" in the mono line); "session 5" cross-references are fine.
- Attribution "by Phoebe Fu". Never "built with" a tool.
- Every number comes from the map or is labelled constructed. For constructed data print "your
  numbers will differ", never invented outputs as if run.
- Contested or missing evidence: teach the disagreement; never resolve what the literature has not.
- Citations in the exact form of the map's appendix; anything marked secondary is "reported".
- NEVER "lottery" or "lotteries"; say the mechanism ("decided by row order", "arbitrary", "a
  random draw"). A verbatim quoted title in curly quotes is the only exception.
- Default to the English word. A Chinese term that is genuinely a name carries its English in
  brackets right after it, every occurrence.
- NEVER the "x" or "✗" cross mark as a bullet or glyph; use no bullet, or a ✓ where a tick is meant.
- Titles, widget ids and class names must not collide with siblings. Do not reuse these titles:
  "The hour back", "Inbox and meetings", "Make it repeatable", "Review that actually happens",
  "A system you keep", "Emails and messages that land", "Risk and governance", "Guardrails".
  Do not use the ids `triage`, `triage-live`, `triage-bench` on your page.
- Do not re-teach sibling material (see the map's seams table). Link it instead, with the absolute
  URL, in one sentence. In particular never repeat: Microsoft's RCT numbers (email reading -12.3
  min, meetings +2.38), the Cardon and Coman trust study, "the three messages you always write
  yourself", the Claude for Outlook Mail.Send property, oversharing, prompt injection in office
  files, "what never to automate" as a list (all AI Office); PARA, capture, the notes review (PKM);
  the seven guardrail types and draft-and-hold architecture (AI Agents); maker vs manager,
  Eisenhower, Parkinson (Data PMO b7).
- Light surfaces only in anything you add. Never a dark background.

## Figure grammar (hand-drawn, every figure)

Palette, ONLY these hexes (no invented greys): ink `#241A2E` · muted `#5E5370` · accent `#8957A2` ·
accent-deep `#4A2A5E` · accent-50 `#F6F0FA` · accent-soft `#DCC9E8` · faint `#D8CEE2` · hairline
`#E9E1F0` · warm `#9C5600` · warm-ink `#6B3A00` · warm-50 `#FCF1E3` · `#FFFFFF` · universal reds
`#991B1B` `#FEF2F2` `#FCA5A5` only for a wrong-way panel.

- `<figure class="zoomable">` > `<svg viewBox="0 0 880 H" xmlns="http://www.w3.org/2000/svg" role="img"
  aria-label="the data, not the shape">` > `<defs>` + `<style>` + content, then
  `<figcaption>🔍 Click to zoom - takeaway</figcaption>`. Grow H, never W.
- Prefix unique per figure, used for every class and id: `p<session><letter>` (session 2 uses
  p2a, p2b, p2c, p2d; session 3 p3a...; session 5 p5a...; session 6 p6a...).
- `<defs>` holds three things with the figure prefix P: a wobble filter `id="PSk"`
  (`feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="<int>"` +
  `feDisplacementMap scale="2.4" xChannelSelector="R" yChannelSelector="G"`, `x="-3%" y="-3%"
  width="106%" height="106%"`), a hachure pattern `id="PHc"` (7x7 userSpaceOnUse, rotate(-38), one
  accent line, opacity .5), an open arrowhead `id="PAr"` (path `M1 1 L9 5 L1 9`, fill none, ink
  stroke 1.6). ALL shapes sit inside ONE `<g filter="url(#PSk)" fill="none" stroke="#241A2E"
  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`; rects carry a tiny rotation
  (-4 to 4 degrees for hand-placed items, under 1 for panels). Fills: white, accent-50, the hachure
  for "the pile" or "the data", and the warm colour (`#FCF1E3` fill, `#9C5600` stroke) ONLY for the
  one thing the figure is about. One doodle anchor per figure, simple strokes, never a mascot.
  Text classes: `.PH` 800 12px ink heading · `.PL` 600 12px ink label · `.PS` 400 11px muted ·
  `.PB` 800 11px warm-ink · `.PV` 800 16-20px accent-deep value · `.PW` 800 12px white on a fill ·
  `.PA` 700 11px accent axis caption · `.PN` 400 12px muted note. Hand-stacked items must not
  overlap as painted rects (the gate flags a pile).
- ALL `<text>` outside any filtered group, sans stack, never below 10.5px.
- Fit: max chars ≈ (box width - 20) / 7 at 12px, 6.4px/char at 11px; full-width note under 110
  chars; 40px between neighbouring point labels; bottom note 22px below the last row, H clears it
  by 8px. When in doubt, shorten. NO line, arrow, curve or gridline may cross a label (the gate
  flags line-through-text and text-out-of-box): route arrows around text, and keep every label
  fully inside its box.
- Floor: one figure per Part plus one in the build-along. Draw the MECHANISM (where the label comes
  from, what a scope string unlocks, which step of the review touches which list, how a commitment
  travels from a sent message into the list), never a metaphor literally, never decoration.

## Voice and honesty

Every Part gets a real-world story from the map's cases. Constructed cases say "constructed" on the
page. Where a vendor document is quoted, quote it verbatim and name it. Products change: where a
page names a scope string or a product behaviour, say it was read in October 2026 and should be
re-checked before relying on it.

## Cross-links (absolute URLs)

- AI Office: https://phoebefu6.github.io/learn-ai-office-with-phoebe/ (sessions:
  courses/01-the-hour-back.html, courses/04-inbox-and-meetings.html, courses/06-make-it-repeatable.html)
- PKM: https://phoebefu6.github.io/learn-pkm-with-phoebe/ (courses/05-review-that-actually-happens.html)
- AI Agents: https://phoebefu6.github.io/learn-ai-agents-with-phoebe/ (courses/a4-risk-governance.html,
  courses/b7-guardrails.html)
- Life and Work Automation: https://phoebefu6.github.io/learn-automation-with-phoebe/
- AI Writing: https://phoebefu6.github.io/learn-ai-writing-with-phoebe/courses/b4-emails-and-messages.html
- Hub: https://phoebefu6.github.io/learn-with-phoebe/

## Footer chain and session titles

Footer left: "Session N of 6 · learn-ai-productivity-with-phoebe · by Phoebe Fu &nbsp;·&nbsp; 📚 <a href="https://phoebefu6.github.io/learn-with-phoebe/">Learn with Phoebe ↗</a>"
Footer right: `<a href="PREV.html">← Prev: <Prev title></a> &nbsp;·&nbsp; <a href="NEXT.html">Next: <Next title> →</a>`
(session 6: `← Prev: Read, draft, send` and `<a href="../index.html">Course home →</a>`).

Session titles and files (exact, sentence case, one accent span in h1):
1 `01-where-your-week-goes.html` Where your week actually goes
2 `02-rules-against-a-judge.html` Rules against a judge
3 `03-follow-ups-that-hold.html` Follow-ups that do not fall through
4 `04-the-triage-bench.html` The triage bench
5 `05-read-draft-send.html` Read, draft, send
6 `06-the-personal-ops-review.html` The personal ops review
