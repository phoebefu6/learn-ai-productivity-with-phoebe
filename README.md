<!-- learn-with-phoebe hub banner -->
> ### 📚 Part of [**Learn with Phoebe**](https://phoebefu6.github.io/learn-with-phoebe/)
> The shelf of 140 free, hands-on courses on AI, data, and the craft around them. **[Browse every course ↗](https://phoebefu6.github.io/learn-with-phoebe/)**
<!-- /learn-with-phoebe hub banner -->

# Learn AI Productivity with Phoebe

Six 45-minute sessions on personal ops with AI: where your week actually goes, triage rules set
against an AI judge, follow-ups that do not fall through, assistants scoped to read, draft or send,
and the weekly review that keeps the whole system honest. Measured at every step.

**Live site:** https://phoebefu6.github.io/learn-ai-productivity-with-phoebe/

| # | Session | Signature thing |
|---|---|---|
| 1 | Where your week actually goes | The famous 28 percent traced to its source and scope; a five-day log by loop |
| 2 | Rules against a judge | Triage as a bet against a base rate; labels from behaviour; rules in search-operator syntax |
| 3 | Follow-ups that do not fall through | Requests and commitments, the open-loops list, and the research disagreement about why it helps |
| 4 | The triage bench | 390 real messages, seven rule sets and your own, precision and recall counted in the browser |
| 5 | Read, draft, send | OAuth scopes as the real permission; confirmation before irreversible actions |
| 6 | The personal ops review | The weekly ops review, the agent log check, the monthly rule re-score, a one-page spec |

The bench in session 4 (`assets/triage-live.js`) holds a seeded sample of 390 messages from three
mailboxes of the CMU Enron Email Dataset (May 7 2015 version). Each message is labelled by what its
owner did: replied or forwarded within 14 days, or filed in a to-do folder (act); kept (read); or
deleted (archive). Flagging everything gives recall 100 percent at a precision equal to the 25.9
percent base rate; the best header rule on the ladder reaches 50.0 percent precision at 46.5
percent recall. A break button shuffles the labels to show every rule falling back to the base
rate. The AI judge rung replays labels a real local model produced offline, and says so.

Data: Enron Email Dataset, distributed by William W. Cohen, CMU, for research on email tools.
Builders and the independent Python reference are in `materials/`.

by Phoebe Fu
