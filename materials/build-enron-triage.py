#!/usr/bin/env python3
"""Build assets/triage-sample.js from the CMU Enron Email Dataset (maildir).

Source: https://www.cs.cmu.edu/~enron/  (enron_mail_20150507.tar.gz, the May 7 2015 version,
distributed by William W. Cohen, CMU, "as a resource for researchers who are interested in
improving current email tools, or understanding how email is currently used").

Usage: python3 build-enron-triage.py <path-to-maildir> <out.js>

Three mailboxes: corman-s, keiser-k, heard-m. The triage label comes from what each owner
actually DID with the message, read from their own folders:

  act      the owner replied to the sender (subject "RE: <same subject>" sent to that address)
           or forwarded it ("FW:"/"FWD:" + same subject) within 14 days of receipt,
           or filed it in a folder they named "to_do"
  archive  not acted on, and it sits in the owner's deleted_items folder
  read     not acted on, and it was kept: left in the inbox or filed in a named folder

Messages the owner sent, and the duplicate views (all_documents, discussion_threads,
calendar, contacts, notes_inbox), are excluded. Duplicates are dropped on
(normalised subject, sender, date). A seeded random sample of 130 per mailbox is shipped.
Any run of six or more digits in a shipped subject or body is masked with # (account numbers,
reset codes); no feature the bench uses depends on digits.
"""
import collections, email, json, os, random, re, sys
from email.utils import getaddresses, parseaddr, parsedate_to_datetime

USERS = ["corman-s", "keiser-k", "heard-m"]
PER_USER = 130
SEED = 20261005
BODY_CHARS = 160
SENT = {"sent", "sent_items", "_sent_mail"}
SKIP = {"all_documents", "discussion_threads", "notes_inbox", "calendar", "contacts"}
LABELS = ["act", "read", "archive"]


def norm_subj(s):
    s = (s or "").strip()
    while True:
        n = re.sub(r"^\s*(re|fw|fwd)\s*:\s*", "", s, flags=re.I)
        if n == s:
            break
        s = n
    return re.sub(r"\s+", " ", s).lower()


def addr(x):
    return (parseaddr(x or "")[1] or "").lower()


def body_text(m):
    if m.is_multipart():
        for part in m.walk():
            if part.get_content_type() == "text/plain":
                p = part.get_payload(decode=True) or b""
                return p.decode("latin-1", "replace")
        return ""
    p = m.get_payload(decode=True) or b""
    return p.decode("latin-1", "replace")


def clean(s):
    s = re.sub(r"\s+", " ", s or "").strip()
    s = re.sub(r"\d{6,}", lambda m: "#" * len(m.group(0)), s)  # mask account numbers and codes
    return "".join(ch for ch in s if 32 <= ord(ch) < 127)


def load_user(root, u):
    rows = []
    base = os.path.join(root, u)
    for dp, dn, fn in os.walk(base):
        dn.sort()
        top = os.path.relpath(dp, base).split(os.sep)[0]
        for f in sorted(fn):
            p = os.path.join(dp, f)
            with open(p, "rb") as fh:
                m = email.message_from_binary_file(fh)
            rows.append((top, m))
    return rows


def build_user(root, u):
    msgs = load_user(root, u)
    fc = collections.Counter(addr(m["From"]) for f, m in msgs if f in SENT)
    me = {a for a, c in fc.most_common(3) if c > 5}
    sent = collections.defaultdict(list)
    for f, m in msgs:
        if f not in SENT:
            continue
        s = m["Subject"] or ""
        pre = re.match(r"^\s*(re|fw|fwd)\s*:", s, flags=re.I)
        try:
            d = parsedate_to_datetime(m["Date"])
        except Exception:
            continue
        tos = {a.lower() for n, a in getaddresses(m.get_all("To", []) + m.get_all("Cc", []))}
        sent[norm_subj(s)].append((pre.group(1).lower() if pre else "", d, tos))
    seen, out = set(), []
    for f, m in msgs:
        if f in SENT or f in SKIP:
            continue
        frm = addr(m["From"])
        if not frm or frm in me:
            continue
        key = (norm_subj(m["Subject"]), frm, m["Date"])
        if key in seen:
            continue
        seen.add(key)
        try:
            d = parsedate_to_datetime(m["Date"])
        except Exception:
            continue
        acted = f == "to_do"
        for pre, sd, tos in sent.get(norm_subj(m["Subject"]), []):
            dt = (sd - d).total_seconds()
            if 0 < dt <= 14 * 86400 and ((pre == "re" and frm in tos) or pre in ("fw", "fwd")):
                acted = True
                break
        label = "act" if acted else ("archive" if f == "deleted_items" else "read")
        to = [a.lower() for n, a in getaddresses(m.get_all("To", [])) if a]
        cc = [a.lower() for n, a in getaddresses(m.get_all("Cc", [])) if a]
        meto = 1 if (me & set(to)) else (2 if (me & set(cc)) else 0)
        xfrom = clean(m["X-From"] or "")
        name = clean(re.sub(r"<.*?>", "", xfrom)).strip(' "') or frm
        out.append({
            "u": USERS.index(u), "d": d.strftime("%Y-%m-%d"), "f": frm, "nm": name[:40],
            "to": len(to), "cc": len(cc), "me": meto,
            "s": clean(m["Subject"] or "")[:90],
            "b": clean(body_text(m))[:BODY_CHARS],
            "fo": f, "y": LABELS.index(label),
        })
    out.sort(key=lambda r: (r["d"], r["f"], r["s"]))
    return out


def main():
    root, dest = sys.argv[1], sys.argv[2]
    rng = random.Random(SEED)
    rows, pop = [], {}
    for u in USERS:
        allrows = build_user(root, u)
        c = collections.Counter(LABELS[r["y"]] for r in allrows)
        pop[u] = {"n": len(allrows), **{k: c[k] for k in LABELS}}
        rows += rng.sample(allrows, PER_USER)
    rng.shuffle(rows)
    for i, r in enumerate(rows):
        r["i"] = i
    data = {
        "source": "CMU Enron Email Dataset, May 7 2015 version (www.cs.cmu.edu/~enron)",
        "users": USERS, "labels": LABELS, "seed": SEED, "bodyChars": BODY_CHARS,
        "population": pop, "rows": rows,
    }
    js = ("/* triage-sample.js - generated by materials/build-enron-triage.py with json.dumps. "
          "Do not edit by hand. */\nwindow.TRIAGE_SAMPLE = " + json.dumps(data, separators=(",", ":")) + ";\n")
    with open(dest, "w") as fh:
        fh.write(js)
    print(json.dumps(pop), len(rows), os.path.getsize(dest), "bytes")


if __name__ == "__main__":
    main()
