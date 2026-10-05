#!/usr/bin/env python3
"""Produce the bench's "AI judge" rung OFFLINE with a real model, once, and save the labels.

No model runs in the browser. This script asked a local model (Ollama, qwen2.5-coder:7b,
temperature 0, seed 0) to triage each of the 390 sampled messages, seeing exactly the fields the
rule builder sees: sender name and address, how many To and Cc recipients, whether the owner is in
To or Cc, subject, date and the first 160 characters of the body. Its answers are shipped as data
in assets/triage-judge.js. Re-running may differ slightly across Ollama versions; the shipped file
is the record of the run that the pages quote.

Usage: python3 run-ai-judge.py <triage-sample.js> <out.json>
"""
import datetime, json, re, sys, urllib.request

MODEL = "qwen2.5-coder:7b"
OWNERS = {"corman-s": "Shelley Corman", "keiser-k": "Kam Keiser", "heard-m": "Marie Heard"}
PROMPT = """You are triaging the email inbox of {owner}, who works at Enron (the year is 2000 or 2001).
Decide what {owner} should do with this one message. Answer with exactly one label:
- act: {owner} personally needs to reply, forward it, or do something
- read: worth reading or keeping, but no action is needed
- archive: can be deleted without reading

From: {nm} <{f}>
To: {to} address(es); Cc: {cc} address(es); {owner} is {where}
Date: {d}
Subject: {s}
Body (first 160 characters): {b}

Reply with JSON only, like {{"label": "act"}}."""
WHERE = {1: "in To", 2: "in Cc only", 0: "not named (a list or Bcc)"}


def ask(text):
    req = urllib.request.Request(
        "http://localhost:11434/api/generate",
        data=json.dumps({"model": MODEL, "prompt": text, "stream": False, "format": "json",
                         "options": {"temperature": 0, "seed": 0}}).encode(),
        headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=300) as r:
        return json.loads(r.read())["response"]


def main():
    src, dest = sys.argv[1], sys.argv[2]
    t = open(src).read()
    data = json.loads(t[t.index("{"):t.rindex("}") + 1])
    out = []
    for r in data["rows"]:
        owner = OWNERS[data["users"][r["u"]]]
        raw = ask(PROMPT.format(owner=owner, where=WHERE[r["me"]], **r))
        m = re.search(r"\b(act|read|archive)\b", raw.lower())
        lab = m.group(1) if m else "read"
        out.append({"i": r["i"], "label": lab, "raw": raw[:80], "parsed": bool(m)})
        print(r["i"], lab, flush=True)
    meta = {"model": MODEL, "runner": "Ollama", "options": {"temperature": 0, "seed": 0},
            "date": datetime.date.today().isoformat(), "prompt": PROMPT, "labels": out}
    json.dump(meta, open(dest, "w"), indent=1)


if __name__ == "__main__":
    main()
