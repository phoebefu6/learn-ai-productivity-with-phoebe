#!/usr/bin/env python3
"""Independent Python reference for the triage bench (assets/triage-live.js).

Re-implements every condition, the ladder, the seeded break shuffle (mulberry32, seed 7) and the
scoring from scratch, reads the same shipped data, and prints one canon line per rung. The node run
(materials/triage-node-check.js) must print identical counts before any page quotes a number.

Usage: python3 triage-reference.py <assets dir>
"""
import json, re, sys
from decimal import Decimal, ROUND_HALF_UP


def fx(x, nd=1):
    """Format like JavaScript toFixed: half-up on the exact binary value."""
    return str(Decimal(x).quantize(Decimal(1).scaleb(-nd), rounding=ROUND_HALF_UP))

BULK = re.compile(r"(news|letter|announce|mailer|noreply|no\.?reply|no\.address|^info|update|alert|admin|research|digest|service|webmaster|notif|support|confirm|marketing|^team|^enron)")
ASK = ["please", "can you", "could you", "let me know", "need"]


def any_in(text, ws):
    t = text.lower()
    return any(w.strip().lower() in t for w in ws if w.strip())


def cond(c, r):
    k = c[0]
    if k == "all": return True
    if k == "internal": return r["f"].endswith("@enron.com")
    if k == "external": return not r["f"].endswith("@enron.com")
    if k == "person": return not BULK.search(r["f"].split("@")[0])
    if k == "meTo": return r["me"] == 1
    if k == "meNamed": return r["me"] in (1, 2)
    if k == "maxRcpt": return r["to"] + r["cc"] <= c[1]
    if k == "subjAny": return any_in(r["s"], c[1])
    if k == "subjRe": return re.match(r"^\s*re\s*:", r["s"], re.I) is not None
    if k == "notFw": return re.match(r"^\s*(fw|fwd)\s*:", r["s"], re.I) is None
    if k == "bodyQ": return "?" in r["b"]
    if k == "askAny": return any_in(r["s"] + " " + r["b"], c[1])
    raise ValueError(k)


LADDER = [
    ("everything", [[("all",)]]),
    ("urgentword", [[("subjAny", ["urgent", "asap", "important"])]]),
    ("internal", [[("internal",)]]),
    ("tome", [[("meTo",)]]),
    ("person", [[("person",), ("meTo",), ("maxRcpt", 3)]]),
    ("thread", [[("person",), ("meTo",), ("maxRcpt", 3), ("subjRe",)],
                [("person",), ("meTo",), ("maxRcpt", 3), ("askAny", ASK)]]),
]


def mulberry32(a):
    a &= 0xFFFFFFFF
    def imul(x, y):
        return ((x & 0xFFFFFFFF) * (y & 0xFFFFFFFF)) & 0xFFFFFFFF
    def nxt():
        nonlocal a
        a = (a + 0x6D2B79F5) & 0xFFFFFFFF
        t = imul(a ^ (a >> 15), 1 | a)
        t = ((t + imul(t ^ (t >> 7), 61 | t)) & 0xFFFFFFFF) ^ t
        return ((t ^ (t >> 14)) & 0xFFFFFFFF) / 4294967296
    return nxt


def shuffled(arr, seed):
    a, rnd = list(arr), mulberry32(seed)
    for i in range(len(a) - 1, 0, -1):
        j = int(rnd() * (i + 1))
        a[i], a[j] = a[j], a[i]
    return a


def load(path, var):
    t = open(path).read()
    assert var in t
    return json.loads(t[t.index("{"):t.rindex("}") + 1])


def score(flags, truth, rows, box):
    n = pos = fl = tp = 0
    for f, y, r in zip(flags, truth, rows):
        if box != -1 and r["u"] != box:
            continue
        n += 1; pos += y; fl += f; tp += f and y
    prec = tp / fl if fl else 0.0
    base = pos / n
    return dict(n=n, pos=pos, flagged=fl, tp=tp, share=fl / n, precision=prec,
                recall=tp / pos if pos else 0.0, lift=prec / base if base else 0.0)


def main():
    d = sys.argv[1]
    sample = load(d + "/triage-sample.js", "TRIAGE_SAMPLE")
    rows = sample["rows"]
    truth = [r["y"] == 0 for r in rows]
    broken = shuffled(truth, 7)
    rungs = [(name, [any(all(cond(c, r) for c in rule) for rule in rules) for r in rows]) for name, rules in LADDER]
    try:
        judge = load(d + "/triage-judge.js", "TRIAGE_JUDGE")
        lab = {x["i"]: x["label"] for x in judge["labels"]}
        rungs.append(("judge", [lab[r["i"]] == "act" for r in rows]))
        agree = sum(lab[r["i"]] == ["act", "read", "archive"][r["y"]] for r in rows) / len(rows)
    except FileNotFoundError:
        agree = None
    for box in [-1, 0, 1, 2]:
        for tag, tr in (("real", truth), ("broken", broken)):
            for name, fl in rungs:
                s = score(fl, tr, rows, box)
                print(f"box={box:2d} {tag:6s} {name:11s} n={s['n']} pos={s['pos']} flagged={s['flagged']} tp={s['tp']} "
                      f"share={fx(s['share']*100)} precision={fx(s['precision']*100)} recall={fx(s['recall']*100)} lift={fx(s['lift'],2)}")
    if agree is not None:
        print(f"judge three-way agreement={fx(agree*100)}")


if __name__ == "__main__":
    main()
