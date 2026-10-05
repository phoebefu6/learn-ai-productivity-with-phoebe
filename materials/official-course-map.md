# Official course map - learn-ai-productivity-with-phoebe ("AI-Powered Productivity")

Internal build document. Never linked from an audience page.

Bucket `prod`, single track, 6 sessions x 45 min, audience both (individual contributors and the
people who manage them), diff 3. Donor: learn-rfm-modeling-with-phoebe (page anatomy, hand-drawn
SVG grammar, real-rows bench). Palette: dusty violet `#8957A2` (CIE76 Delta-E 17.9 and CIEDE2000
12.9 from the nearest `--indigo` in all 136 live repos; white on it 5.32:1).

Scope (Phoebe-approved re-scope, 2026-10-05): PERSONAL OPS WITH AI - triage, follow-ups, the weekly
review, agents that act on your behalf, and when to trust them. Measured, not motivational.

## The seams (never re-teach; link)

| Sibling | Owns | What this course does instead |
|---|---|---|
| learn-ai-office-with-phoebe | AI inside documents, spreadsheets, inbox-and-meetings, the report; the 40-percent-task vs 2-percent-week dilution; Microsoft's RCT (email reading -12.3 min/week, meetings +2.38 not significant); Cardon and Coman trust study; the three piles hand-triage of 20 messages; "the three messages you always write yourself"; Claude for Outlook not requesting Mail.Send; oversharing; prompt injection in office files; "what never to automate" | Links to its sessions 1, 4 and 6. Does not repeat any of those numbers. Our triage is rules and a judge scored against real labels; our permissions are the OAuth scopes an agent asks for, not the add-in's design. |
| learn-pkm-with-phoebe | Note-taking method: capture, PARA, retrieval, the notes review (its session 5) | Our weekly review is an ops review (open loops, waiting-for, agent log, rules), and links PKM for the notes half. |
| learn-ai-agents-with-phoebe | Agent architecture, the seven guardrail types, risk-rating tools, draft-and-hold, agent evals | We stay at the user's chair: which scope to grant to an agent that touches YOUR mail and calendar. Link a4 and b7. |
| learn-automation-with-phoebe (sibling built in parallel, 2026-10-05) | No-code workflow plumbing (Zapier, Make, n8n), triggers, idempotency | We never build a pipeline; where a follow-up needs a trigger we link it. |
| learn-data-pmo-with-phoebe b7 | Maker vs manager schedule, Eisenhower, Parkinson, calendar skeleton | Not taught here; one link from session 1 if needed. |
| learn-ai-writing-with-phoebe b4 | Writing emails and messages that land | Not taught here. |

## Sessions (titles locked after sibling grep 2026-10-05; no collisions)

| # | File | Title | Diff |
|---|---|---|---|
| 1 | 01-where-your-week-goes.html | Where your week actually goes | green |
| 2 | 02-rules-against-a-judge.html | Rules against a judge | yellow |
| 3 | 03-follow-ups-that-hold.html | Follow-ups that do not fall through | yellow |
| 4 | 04-the-triage-bench.html | The triage bench | red (bench night) |
| 5 | 05-read-draft-send.html | Read, draft, send | orange |
| 6 | 06-the-personal-ops-review.html | The personal ops review | orange |

### Session 1 - Where your week actually goes
Measure before you automate. Two famous numbers and their small print (McKinsey 28 percent,
Microsoft "every two minutes"); a one-week time log by category (triage, replying, chasing,
actual work, meetings), counted not remembered; the automation-candidate test (frequent,
rule-shaped, reversible). Build-along: a five-day log template and the share-of-week arithmetic on
a CONSTRUCTED example week (labelled constructed). Links office session 1 for the task-vs-week
dilution instead of re-deriving it.

### Session 2 - Rules against a judge
Triage is classification against a base rate: flagged share, precision, recall. Where labels come
from (your own behaviour, as Gmail Priority Inbox did). Rules: transparent, cheap, brittle. An AI
judge: reads content, opaque, needs checking, and it reads instructions inside the email.
Build-along: three rules in Gmail search-operator syntax for your own inbox, tested by searching
before creating a filter.

### Session 3 - Follow-ups that do not fall through
Requests and commitments as the unit; even annotators disagree (Lampert kappa 0.681). The open-loops
list: "I owe" and "Waiting for". AI extraction is a recall job, so the human check is a precision
pass. The disagreement: plan-making ends intrusive goal activation (Masicampo and Baumeister 2011)
vs no memory advantage for unfinished tasks in a 2025 meta-analysis, with resumption robust.
Build-along: extract commitments from ten of your own sent messages, verify each, date each.

### Session 4 - The triage bench (canon below)

### Session 5 - Read, draft, send
Scopes are the real permission slip: Gmail's draft scope also sends; Graph separates draft
(Mail.ReadWrite, which includes delete) from send (Mail.Send). Human-in-the-loop where it bites:
Anthropic's four computer-use precautions; Claude in Chrome red-team 23.6 to 11.2 percent and the
"mailbox hygiene" email that deleted a user's mail. The delegation ladder read < label < draft <
send < delete, and irreversibility as the line. Build-along: audit every app with access to your
mailbox and write its scope next to it.

### Session 6 - The personal ops review
The weekly review structure (GTD: get clear, get current, get creative) adapted for ops, with AI
on the sweep and you on the decisions; the agent log review; the monthly rule re-score against your
own fresh labels (Priority Inbox tunes a per-user threshold for the same reason); cadence. Build-
along: a one-page personal-ops spec. Links PKM session 5 for the notes review.

## Verified facts with evidence tiers

Tier R = read at source (primary document fetched and read 2026-10-05). Tier Rep = reported only.

### McKinsey Global Institute, "The social economy" (July 2012) - Tier R (full report PDF, 184 pp.)
- Body text: "Typically, such a worker spends 65 percent of a workday collaborating and communicating
  with others. This includes 28 percent of work time reading, writing, or responding to e-mail, and
  19 percent of working hours trying to track down information needed to complete tasks."
- "Such a worker" = an **interaction worker** (high-skill knowledge workers whose roles rely on
  communication; defined via US BLS occupation codes), NOT all workers.
- Footnote 60: "McKinsey Global Institute analysis based on proprietary McKinsey data and Susan
  Feldman, Hidden cost of information work: A progress report, International Data Corporation,
  May 2009." Appendix: the split is based on "International Data Corporation estimates, which were
  based on multiple surveys on how workers spend their time, as well as McKinsey proprietary data".
- Exhibit A7: average workweek 46.5 hours; "Read and answer e-mail 13.0" hours; 13.0/46.5 = 28%.
  The ten IDC activity rows in the same exhibit sum to 65.8 hours, more than the 46.5-hour week
  (activities overlap); MGI rescaled into an "adjusted activity list" (28 / 19 / 14 / 39).
- The infographic page says "28 hours - Time each week spent by knowledge workers writing e-mails,
  searching for information, and collaborating internally" (13.0 + 8.8 + 6.4 = 28.2). **28 hours
  and 28 percent are two different numbers**, which is one route to the misquote.
- The same report's 20 to 25 percent productivity estimate is for social technologies, from
  interviews and case examples, not a measurement.
- Teach: self-report survey data (IDC 2009) rescaled by a consultancy, for one class of worker,
  before Slack/Teams existed. It is an estimate of a share of a specific worker's time, not a
  measurement of "workers".
- Sibling grep 2026-10-05: no learn-* course quotes it. No sibling fix owed.

### Microsoft Work Trend Index, "Breaking down the infinite workday" (June 17, 2025) - Tier R
- "The average worker receives 117 emails daily - most of them skimmed in under 60 seconds."
- "The average worker receives 153 Teams messages per weekday."
- Methodology: "Employees are interrupted every two minutes during core work hours - 275 times a
  day - by meetings, emails, or chats ... The two-minute figure reflects the average time between
  pings during an eight-hour workday. The 275 is based on the 24-hour day. **Based on the top 20%
  of users by ping volume received.**" Telemetry ending February 15, 2025; excludes education and
  EU tenants. A "ping" is a meeting invite, email or chat received, not a measured interruption.
- Teach: the headline is the heaviest fifth of users, and a ping is not an interruption.

### Gmail Priority Inbox - Aberdeen, Pacovsky, Slater, "The Learning Behind Gmail Priority Inbox", NIPS 2010 LCCC workshop - Tier R (PDF)
- "ranks mail by the probability that the user will perform an action on that mail."
- "Importance ground truth is based on how the user interacts with a mail after delivery" (opens,
  replies, manual corrections) - the same idea as the bench's labels.
- Features: social, content, thread, label. Logistic regression, global + per-user model.
- "users do not agree on the cost of a false positive versus a false negative"; per-user threshold.
- Accuracy "approximately 80 +/- 5% on a control group" on the implicit metric; false negative rate
  3 to 4 times the false positive rate due to threshold tuning.
- Error on 160k user markings: global model 45%, user models 38%, user models and thresholds 31%.
- About 2,000 Googlers with Priority Inbox "spent 6% less time reading mail overall, and 13% less
  time reading unimportant mail." Internal, Google employees, 2010.

### Lampert, Dale, Paris, "Detecting Emails Containing Requests for Action", NAACL 2010 - Tier R (PDF)
- 664 messages drawn at random from the Enron corpus, three annotators each, overall kappa 0.681.
- 505 unanimously agreed messages used; 52.08% contain a request.
- Message-level request classification 72.28% accuracy without zoning, 83.76% with email zoning
  (relative increase 15.9%, error reduction 41%).
- About 20% of errors are implicit requests; another 10% come from marketing and spam with
  request-like directives.
- Teach: "contains a request" is not "you acted on it"; humans disagree on what counts.

### Masicampo and Baumeister (2011), "Consider it done!", JPSP 101(4) - Tier R (abstract via Europe PMC)
- Unfinished goals caused intrusive thoughts, high accessibility of goal words, poorer anagram
  performance; "Allowing participants to formulate specific plans for their unfulfilled goals
  eliminated the various activation and interference effects."

### Ghibellini and Meier (2025), "Interruption, recall and resumption: a meta-analysis of the Zeigarnik and Ovsiankina effects", Humanit Soc Sci Commun 12, 962 - Tier R (open access, CC BY 4.0)
- "We found no memory advantage for unfinished tasks but found a general tendency to resume tasks."
- Weighted recall ratio interrupted/completed = 0.99 across 38 publications (0.99 excluding Zeigarnik 1927).
- "the Ovsiankina effect represents a general tendency, whereas the Zeigarnik effect lacks universal validity."
- Teach the disagreement: different outcomes (recall vs intrusion/accessibility). The list is
  justified by resumption and by not relying on memory, not by a settled memory effect.

### GTD Weekly Review checklist (David Allen Company, 1990-2006 PDF) - Tier R
- Three stages: GET CLEAR (collect loose papers, get "IN" to zero, empty your head), GET CURRENT
  (review action lists, previous and upcoming calendar, Waiting For list, projects, checklists),
  GET CREATIVE (someday/maybe, new ideas). A practitioner method, not a study; said so on the page.

### Gmail API scopes (developers.google.com, read 2026-10-05) - Tier R
- gmail.readonly "View your email messages and settings." Restricted.
- gmail.compose "Manage drafts and send emails." Restricted. **There is no draft-only Gmail scope.**
- gmail.send "Send email on your behalf." Sensitive.
- gmail.modify "Read, compose, and send emails from your Gmail account. This scope does not allow
  immediate, permanent deletion of threads and messages, bypassing the trash." Restricted.
- gmail.metadata "View your email message metadata such as labels and headers, but not the email body." Restricted.
- gmail.labels "See and edit your email labels." Non-sensitive.
- https://mail.google.com/ "Read, compose, send, and permanently delete all your email from Gmail."
  Restricted; "Request this scope only if your application needs to immediately and permanently
  delete threads and messages, bypassing the trash."
- gmail.settings.basic "See, edit, create, or change your email settings and filters in Gmail."
- Guidance: "choose the most narrowly focused scope possible".

### Microsoft Graph permissions reference (learn.microsoft.com, read 2026-10-05) - Tier R
- Mail.Read (delegated): "Allows the app to read the signed-in user's mailbox."
- Mail.ReadWrite (delegated): "Allows the app to create, read, update, and delete email in user
  mailboxes. Does not include permission to send mail."
- Mail.Send (delegated): "Allows the app to send mail as users in the organization."
- Mail.ReadBasic: everything "except body, previewBody, attachments and any extended properties".
- Teach: Graph splits draft from send; Gmail does not. Mail.ReadWrite includes delete.

### Anthropic computer use tool docs (platform.claude.com, read 2026-10-05) - Tier R
- Four precautions: dedicated VM or container with minimal privileges; avoid giving the model
  access to sensitive data such as account login information; limit internet access to an
  allowlist; "Asking a human to confirm decisions that might result in meaningful real-world
  consequences and any tasks requiring affirmative consent, such as accepting cookies, completing
  financial transactions, or agreeing to terms of service."
- "In some circumstances, Claude will follow commands found in content even when they conflict with your instructions."
- "If your application asks a human to confirm consequential actions, make that check before each
  block runs, because a batch can complete a multistep action within one turn."

### Anthropic, "Piloting Claude in Chrome" (August 25, 2025) - Tier R
- 123 test cases, 29 attack scenarios; 23.6% attack success without mitigations, 11.2% with
  mitigations in autonomous mode.
- Example: an email claiming emails "needed to be deleted" for "mailbox hygiene", "no additional
  confirmation required"; Claude deleted the user's emails without confirmation (before defences).
- Defences: site-level permissions; "Action confirmations: Claude asks users before taking
  high-risk actions like publishing, purchasing, or sharing personal data."
- Sibling: learn-ai-red-team b9 also cites this post; consistent.

### Gmail filters and search operators (support.google.com, read 2026-10-05) - Tier R
- Operators used: from:, to:me, cc:, subject:, -, OR, { }, category:, list:, older_than:.
- Filters can "send email to a label, or archive, delete, star, or automatically forward".
- Flow: search first, check what shows up, then "Create filter".

### OpenAI ChatGPT agent help page - NOT READ (403 to both fetchers). Not cited.

## The bench (session 4) - data, labels and canon

Data: CMU Enron Email Dataset, May 7 2015 version (www.cs.cmu.edu/~enron), distributed by William
W. Cohen "as a resource for researchers who are interested in improving current email tools, or
understanding how email is currently used"; asks users to "be sensitive to the privacy of the
people involved". Collected and prepared by the CALO Project; originally made public by FERC during
its investigation. No attachments; some messages removed "as part of a redaction effort due to
requests from affected employees". The CMU page (last modified April 20, 2026) also reports that
forensics experts identified a flaw that allowed impersonating other senders, and says "This
probably does not affect NLP uses of the corpus". Our labels come from folder placement and the
owner's own sent mail; a forged sender would still be a message the owner received and handled.

Three mailboxes: corman-s (Shelley Corman), keiser-k (Kam Keiser), heard-m (Marie Heard). Builder:
`materials/build-enron-triage.py` (json.dumps). Shipped: 390 messages (130 each, seed 20261005),
128,836 bytes, fields sender address and display name, To and Cc counts, whether the owner is in
To / Cc / neither, subject (90 chars), first 160 chars of body, date, folder, label. Runs of 6+
digits masked with # (one SAP password-reset message carried a code).

### Label mapping (from the owner's own behaviour, declared on the widget)

| Owner did | Label |
|---|---|
| Replied to the sender ("RE: same subject" with the sender in To/Cc) or forwarded it ("FW:"/"FWD:" + same subject) within 14 days, or filed it in their own folder named `to_do` | **act** |
| Not acted on, and it sits in `deleted_items` | **archive** |
| Not acted on, and kept: left in `inbox` or filed in a named folder (ingaastudy, osha, brokerage_agreements...) | **read** |

Excluded: messages the owner sent; duplicate views (all_documents, discussion_threads, notes_inbox,
calendar, contacts); duplicates on (normalised subject, sender, date).
Honest limits: an inbox snapshot taken in 2001-2002, so some "read" messages may simply be
unprocessed; a phone call or a reply under a new subject counts as not acted on; a thread already
running has more of the owner's replies to match, which flatters the RE: rule.

Full mailbox populations (not shipped): corman-s 1,246 (act 182, read 671, archive 393);
keiser-k 696 (act 207, read 263, archive 226); heard-m 826 (act 204, read 422, archive 200).

### Canon (python `triage-reference.py` and node `triage-node-check.js` IDENTICAL on all 48+ lines, 2026-10-05)

All three mailboxes, 390 messages, 101 act, **base rate 25.9%**:

| Rung | Flagged | Share | Precision | Recall | Lift |
|---|---|---|---|---|---|
| Flag everything urgent (ANTI) | 390 | 100.0% | 25.9% | 100.0% | 1.00 |
| Subject says urgent (urgent/asap/important) | 5 | 1.3% | 0.0% | 0.0% | 0.00 |
| From my company (@enron.com) | 284 | 72.8% | 27.8% | 78.2% | 1.07 |
| Addressed to me (in To) | 249 | 63.8% | 34.5% | 85.1% | 1.33 |
| A person, to me, three or fewer | 165 | 42.3% | 39.4% | 64.4% | 1.52 |
| ...and a live thread or an ask | 94 | 24.1% | 50.0% | 46.5% | 1.93 |
| AI judge (replayed, declared simulation) | 152 | 39.0% | 34.9% | 52.5% | 1.35 |

Break (labels shuffled, mulberry32 seed 7), all three mailboxes:
everything 25.9 / 100.0; urgentword 5 flagged, 3 hit by chance = 60.0% precision, recall 3.0%
(small-n noise, teach it); internal 27.8 / 78.2 (lift 1.07, unchanged because it never had any);
tome 26.9 / 66.3 (1.04); person 27.3 / 44.6 (1.05); thread 23.4 / 21.8 (0.90).

Per-mailbox base rates: corman-s 16/130 = 12.3%; keiser-k 40/130 = 30.8%; heard-m 45/130 = 34.6%.
The same rule set on corman-s flags 45 and hits 11 (person rung).

Automated-looking sender pattern (local part of the address): news, letter, announce, mailer,
noreply, no.reply, no.address, ^info, update, alert, admin, research, digest, service, webmaster,
notif, support, confirm, marketing, ^team, ^enron. Ask words: please, can you, could you, let me
know, need.

### AI judge rung (declared simulation)
Produced offline by a real local model: qwen2.5-coder:7b via Ollama 0.34.4, temperature 0, seed 0,
2026-10-05, one call per message, seeing exactly the fields the rules see. Prompt in
`materials/run-ai-judge.py`. Labels shipped in `assets/triage-judge.js`. Claude via the CLI was not
available (expired session); no other model was run. All 390 replies parsed.
JUDGE CANON (python and node identical): label counts act 152, read 213, archive 25 (owners: 101 /
178 / 111). Act flag: 152 flagged, 39.0% share, 53 hits, precision 34.9%, recall 52.5%, lift 1.35.
Three-way agreement with owners 46.4%. Broken (shuffled): precision 26.3%, recall 39.6%, lift 1.02.
Per mailbox (real): corman-s 28 flagged, 7 hits, 25.0% / 43.8%, lift 2.03; keiser-k 53 flagged,
15 hits, 28.3% / 37.5%, lift 0.92 (below its 30.8% base rate); heard-m 71 flagged, 31 hits,
43.7% / 68.9%, lift 1.26. Teach: one small local model, one prompt, one run; it gets the same four
numbers and break test as any rule.

## Not covered (honest list)
- Building automations, triggers, Zapier/Make/n8n (learn-automation-with-phoebe).
- Agent architecture and evaluation (learn-ai-agents-with-phoebe).
- Writing the emails themselves (learn-ai-writing-with-phoebe), AI in documents/sheets/reports
  (learn-ai-office-with-phoebe), note-taking method (learn-pkm-with-phoebe).
- Calendar optimisation and meeting hygiene (learn-data-pmo-with-phoebe b7).
- Tenant administration, DLP, retention (IT's job; office session 6 names the levers).
- Any vendor's agent product walkthrough; products change monthly. Re-verify every scope string and
  vendor quote before delivery.
- Whether rules generalise beyond these three 2001 mailboxes: not claimed. Only the method and the
  base-rate lesson transfer.

## Citation appendix
1. McKinsey Global Institute (2012). The social economy: Unlocking value and productivity through social technologies. July 2012. Full report PDF.
2. Microsoft WorkLab (2025). Breaking down the infinite workday. Work Trend Index special report, June 17, 2025.
3. Aberdeen, D., Pacovsky, O., Slater, A. (2010). The Learning Behind Gmail Priority Inbox. NIPS 2010 Workshop on Learning on Cores, Clusters and Clouds.
4. Lampert, A., Dale, R., Paris, C. (2010). Detecting Emails Containing Requests for Action. NAACL HLT 2010, 984-992.
5. Masicampo, E. J., Baumeister, R. F. (2011). Consider it done! Plan making can eliminate the cognitive effects of unfulfilled goals. JPSP 101(4), 667-683.
6. Ghibellini, R., Meier, B. (2025). Interruption, recall and resumption: a meta-analysis of the Zeigarnik and Ovsiankina effects. Humanities and Social Sciences Communications 12, 962.
7. David Allen Company. GTD Weekly Review checklist (1990-2006).
8. Google for Developers. Choose Gmail API scopes. developers.google.com/workspace/gmail/api/auth/scopes
9. Microsoft Learn. Microsoft Graph permissions reference.
10. Anthropic. Computer use tool, Security considerations. platform.claude.com docs.
11. Anthropic (2025). Piloting Claude in Chrome. August 25, 2025.
12. Google Gmail Help. Refine searches in Gmail; Create rules to filter your emails.
13. Cohen, W. W. Enron Email Dataset, May 7 2015 version. www.cs.cmu.edu/~enron
