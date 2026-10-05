/* triage-live.js - the triage bench for learn-ai-productivity-with-phoebe
 *
 * 390 real messages from three Enron mailboxes (a seeded sample, see triage-sample.js and
 * materials/build-enron-triage.py). Each carries the label its owner's own behaviour gave it:
 *   act      they replied or forwarded within 14 days, or filed it in their "to_do" folder
 *   read     they kept it (inbox or a named folder) and did nothing
 *   archive  it sits in their deleted items and they did nothing
 *
 * A rule set flags messages as "act". The bench counts, from the rows, in the browser:
 *   flagged (count and share), precision, recall, lift over the base rate, misses, false alarms.
 *
 * What is REAL: every message, every label, every count. What is a DECLARED SIMULATION: the
 * "AI judge" rung. No model runs in this page. Its labels were produced once, offline, by a real
 * local model (see triage-judge.js and materials/run-ai-judge.py) and are replayed here as data.
 *
 * The break button shuffles the act labels across the messages with a seeded generator
 * (mulberry32, seed 7). Every rule set should then fall to the base rate; if one did not, the
 * bench would be measuring an artifact instead of the rule.
 */
(function (root) {
  "use strict";

  /* ---------- the conditions a rule can use ---------- */
  var BULK = /(news|letter|announce|mailer|noreply|no\.?reply|no\.address|^info|update|alert|admin|research|digest|service|webmaster|notif|support|confirm|marketing|^team|^enron)/;
  var OWN_DOMAIN = "@enron.com";

  function words(v) {
    return (v || []).map(function (w) { return String(w).trim().toLowerCase(); })
      .filter(function (w) { return w.length > 0; });
  }
  function hasAny(text, list) {
    var t = text.toLowerCase();
    for (var i = 0; i < list.length; i++) if (t.indexOf(list[i]) !== -1) return true;
    return false;
  }
  function automated(r) { return BULK.test(r.f.split("@")[0]); }

  /* one condition against one row */
  function test(c, r) {
    switch (c.k) {
      case "all": return true;
      case "internal": return r.f.slice(-OWN_DOMAIN.length) === OWN_DOMAIN;
      case "external": return r.f.slice(-OWN_DOMAIN.length) !== OWN_DOMAIN;
      case "person": return !automated(r);
      case "meTo": return r.me === 1;
      case "meNamed": return r.me === 1 || r.me === 2;
      case "maxRcpt": return (r.to + r.cc) <= c.v;
      case "subjAny": return hasAny(r.s, words(c.v));
      case "subjRe": return /^\s*re\s*:/i.test(r.s);
      case "notFw": return !/^\s*(fw|fwd)\s*:/i.test(r.s);
      case "bodyQ": return r.b.indexOf("?") !== -1;
      case "askAny": return hasAny(r.s + " " + r.b, words(c.v));
      default: throw new Error("unknown condition " + c.k);
    }
  }
  /* a rule is an AND of conditions; a rule set is an OR of rules */
  function flags(ruleSet, r) {
    for (var i = 0; i < ruleSet.length; i++) {
      var rule = ruleSet[i], ok = rule.length > 0;
      for (var j = 0; j < rule.length && ok; j++) ok = test(rule[j], r);
      if (ok) return true;
    }
    return false;
  }

  /* ---------- the ladder ---------- */
  var ASK = ["please", "can you", "could you", "let me know", "need"];
  var PRESETS = [
    { id: "everything", anti: true, label: "Flag everything urgent",
      note: "Every message gets the red flag. Nothing is ever missed.",
      rules: [[{ k: "all" }]] },
    { id: "urgentword", label: "Subject says urgent",
      note: "Flag when the subject contains urgent, asap or important.",
      rules: [[{ k: "subjAny", v: ["urgent", "asap", "important"] }]] },
    { id: "internal", label: "From my company",
      note: "Flag anything from an @enron.com address.",
      rules: [[{ k: "internal" }]] },
    { id: "tome", label: "Addressed to me",
      note: "Flag when the owner is in To, not just Cc or a list.",
      rules: [[{ k: "meTo" }]] },
    { id: "person", label: "A person, to me, three or fewer",
      note: "Not an automated-looking sender, owner in To, at most 3 recipients.",
      rules: [[{ k: "person" }, { k: "meTo" }, { k: "maxRcpt", v: 3 }]] },
    { id: "thread", label: "...and a live thread or an ask",
      note: "The rung above, and the subject is a RE: or the text asks for something.",
      rules: [[{ k: "person" }, { k: "meTo" }, { k: "maxRcpt", v: 3 }, { k: "subjRe" }],
              [{ k: "person" }, { k: "meTo" }, { k: "maxRcpt", v: 3 }, { k: "askAny", v: ASK }]] },
    { id: "judge", judge: true, label: "AI judge (replayed)",
      note: "A real local model's labels, produced offline and shipped as data. Nothing runs here.",
      rules: null }
  ];

  /* ---------- seeded shuffle for the break button ---------- */
  function mulberry32(a) {
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffled(arr, seed) {
    var a = arr.slice(), rnd = mulberry32(seed);
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  var BREAK_SEED = 7;

  /* ---------- scoring ---------- */
  function prepare(sample, judge) {
    var rows = sample.rows;
    var truth = rows.map(function (r) { return r.y === 0; });
    var jl = null;
    if (judge && judge.labels) {
      var byI = {};
      judge.labels.forEach(function (x) { byI[x.i] = x.label; });
      jl = rows.map(function (r) { return byI[r.i]; });
    }
    return { rows: rows, truth: truth, broken: shuffled(truth, BREAK_SEED), judge: jl,
             users: sample.users, n: rows.length };
  }

  /* mailbox: -1 for all three, else the user index */
  function evaluate(d, preset, opts) {
    opts = opts || {};
    var mailbox = opts.mailbox === undefined ? -1 : opts.mailbox;
    var truth = opts.broken ? d.broken : d.truth;
    var n = 0, pos = 0, flagged = 0, tp = 0, agree = 0, misses = [], alarms = [];
    for (var i = 0; i < d.n; i++) {
      var r = d.rows[i];
      if (mailbox !== -1 && r.u !== mailbox) continue;
      n++;
      var y = truth[i];
      var f = preset.judge ? d.judge[i] === "act" : flags(preset.rules, r);
      if (preset.judge && d.judge[i] === ["act", "read", "archive"][r.y]) agree++;
      if (y) pos++;
      if (f) flagged++;
      if (f && y) tp++;
      if (y && !f) misses.push(i);
      if (f && !y) alarms.push(i);
    }
    var base = n ? pos / n : 0, prec = flagged ? tp / flagged : 0, rec = pos ? tp / pos : 0;
    return { n: n, pos: pos, base: base, flagged: flagged, share: n ? flagged / n : 0, tp: tp,
             precision: prec, recall: rec, lift: base ? prec / base : 0,
             fp: flagged - tp, fn: pos - tp, agree: preset.judge ? agree / n : null,
             misses: misses, alarms: alarms };
  }

  function evaluateAll(d, opts) {
    var out = {};
    PRESETS.forEach(function (p) { if (!p.judge || d.judge) out[p.id] = evaluate(d, p, opts); });
    return out;
  }

  /* ---------- the widget ---------- */
  var rootEl, data, current = "everything", custom = null, broken = false, mailbox = -1;
  var btns = {}, readout, listEl, breakBtn, boxSel;

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function pct(x) { return (x * 100).toFixed(1) + "%"; }
  function metric(label, value, unit, kind) {
    return '<div class="mb-metric"><span class="mb-mlabel">' + esc(label) + "</span>" +
      '<span class="mb-mvalue">' + esc(value) + "</span>" +
      '<span class="mb-munit">' + esc(unit) + "</span>" +
      '<span class="mb-mkind is-' + kind + '">' + kind + "</span></div>";
  }
  function presetById(id) {
    if (id === "custom") return { id: "custom", label: "Your rules", rules: readCustom() };
    for (var i = 0; i < PRESETS.length; i++) if (PRESETS[i].id === id) return PRESETS[i];
    return PRESETS[0];
  }
  function verdict(p, r) {
    if (broken) return ["bad", "Labels shuffled: every rule should now sit near the base rate of " + pct(r.base) + ". Precision " + pct(r.precision) + "."];
    if (r.flagged === 0) return ["bad", "Flags nothing. Precision is undefined and recall is 0: every act message is missed."];
    if (r.share >= 0.999) return ["bad", "Recall " + pct(r.recall) + ", precision " + pct(r.precision) + ": exactly the base rate. A flag on everything carries no information."];
    if (r.lift < 1.15) return ["bad", "Precision " + pct(r.precision) + " against a base rate of " + pct(r.base) + ": barely better than flagging everything."];
    if (r.lift >= 1.7) return ["good", "Precision " + pct(r.precision) + ", " + r.lift.toFixed(2) + " times the base rate, catching " + pct(r.recall) + " of the act messages."];
    return ["ok", "Precision " + pct(r.precision) + ", " + r.lift.toFixed(2) + " times the base rate, catching " + pct(r.recall) + " of the act messages."];
  }
  function rowLine(i, tag) {
    var r = data.rows[i];
    var who = r.nm && r.nm !== r.f ? r.nm : r.f;
    return "<tr><th>" + esc(r.s || "(no subject)") + "<em>" + esc(who) + " · " + esc(data.users[r.u]) +
      " · " + r.to + " To, " + r.cc + " Cc</em></th><td>" + ["act", "read", "archive"][r.y] + "</td><td>" + tag + "</td></tr>";
  }
  function render() {
    var p = presetById(current);
    var r = evaluate(data, p, { mailbox: mailbox, broken: broken });
    var g = verdict(p, r);
    var judgeNote = p.judge ? ' <span class="mb-mkind is-heuristic">declared simulation</span>' : "";
    readout.innerHTML =
      '<div class="mb-verdict is-' + g[0] + '">' + esc(g[1]) + ' <span class="mb-mkind is-measured">measured</span>' + judgeNote + "</div>" +
      '<div class="mb-metrics">' +
        metric("Base rate", pct(r.base), r.pos + " of " + r.n + " messages were acted on", "measured") +
        metric("Flagged", r.flagged + " · " + pct(r.share), "of the messages get the act flag", "measured") +
        metric("Precision", r.flagged ? pct(r.precision) : "n/a", "of flagged messages were really acted on", "measured") +
        metric("Recall", pct(r.recall), "of acted-on messages were flagged", "measured") +
        metric("Lift", r.flagged ? r.lift.toFixed(2) + "x" : "n/a", "precision divided by the base rate", "measured") +
        metric("Misses / false alarms", r.fn + " / " + r.fp, "act messages left unflagged / flags on the rest", "measured") +
      "</div>" +
      (p.judge ? '<p class="mb-hint">Three-way agreement with the owners\' own behaviour (act, read, archive): ' + pct(r.agree) +
        ". " + esc(data.judgeMeta) + "</p>" : "");
    var lines = r.misses.slice(0, 5).map(function (i) { return rowLine(i, "missed"); })
      .concat(r.alarms.slice(0, 5).map(function (i) { return rowLine(i, "false alarm"); }));
    listEl.innerHTML = lines.length ?
      '<table class="dt-table"><thead><tr><th>First misses and false alarms</th><th>Owner did</th><th>Rule said</th></tr></thead><tbody>' +
      lines.join("") + "</tbody></table>" : "";
    breakBtn.textContent = broken ? "Restore the real labels" : "Break it: shuffle the labels";
    breakBtn.classList.toggle("is-on", broken);
  }

  function setPreset(id) {
    current = id;
    Object.keys(btns).forEach(function (k) {
      btns[k].classList.toggle("is-on", k === id);
      var inp = btns[k].querySelector("input");
      if (inp) inp.checked = (k === id);
    });
    render();
  }

  /* the custom rule editor: two rules, OR-ed */
  function ruleEditor(n) {
    var w = document.createElement("div");
    w.className = "tb-rule";
    w.innerHTML =
      '<div class="tb-rhead">' + (n === 1 ? "Rule 1" : '<label><input type="checkbox" data-k="on"> Rule 2, OR-ed with rule 1</label>') + "</div>" +
      '<div class="tb-grid">' +
      '<label>Sender <select data-k="sender"><option value="">anyone</option><option value="internal">my company</option><option value="external">outside</option></select></label>' +
      '<label><input type="checkbox" data-k="person"> not automated-looking</label>' +
      '<label>Me <select data-k="me"><option value="">anywhere</option><option value="meTo">in To</option><option value="meNamed">in To or Cc</option></select></label>' +
      '<label>Recipients at most <select data-k="max"><option value="">any</option><option>1</option><option>2</option><option>3</option><option>5</option><option>10</option></select></label>' +
      '<label class="tb-wide">Subject contains any of <input type="text" data-k="subj" placeholder="urgent, asap"></label>' +
      '<label><input type="checkbox" data-k="re"> subject starts RE:</label>' +
      '<label><input type="checkbox" data-k="nofw"> not a forward</label>' +
      '<label><input type="checkbox" data-k="q"> body has a ?</label>' +
      '<label class="tb-wide">Subject or body contains any of <input type="text" data-k="ask" placeholder="please, can you"></label>' +
      "</div>";
    return w;
  }
  function readRule(w) {
    var q = function (k) { return w.querySelector('[data-k="' + k + '"]'); };
    var c = [];
    if (q("sender").value) c.push({ k: q("sender").value });
    if (q("person").checked) c.push({ k: "person" });
    if (q("me").value) c.push({ k: q("me").value });
    if (q("max").value) c.push({ k: "maxRcpt", v: parseInt(q("max").value, 10) });
    var sv = q("subj").value.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    if (sv.length) c.push({ k: "subjAny", v: sv });
    if (q("re").checked) c.push({ k: "subjRe" });
    if (q("nofw").checked) c.push({ k: "notFw" });
    if (q("q").checked) c.push({ k: "bodyQ" });
    var av = q("ask").value.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    if (av.length) c.push({ k: "askAny", v: av });
    return c;
  }
  function readCustom() {
    var r1 = readRule(custom[0]), set = [r1.length ? r1 : [{ k: "all" }]];
    var on = custom[1].querySelector('[data-k="on"]');
    if (on && on.checked) { var r2 = readRule(custom[1]); if (r2.length) set.push(r2); }
    return set;
  }

  function buildUI() {
    var panel = document.createElement("div");
    panel.className = "mb-presets";
    PRESETS.concat([{ id: "custom", label: "Your rules", note: "Build your own below. Every change rescores the 390." }]).forEach(function (p) {
      if (p.judge && !data.judge) return;
      var lab = document.createElement("label");
      lab.className = "mb-preset" + (p.anti ? " is-anti" : "");
      lab.innerHTML = '<input type="radio" name="tb-p" value="' + p.id + '">' +
        '<span class="mb-pname">' + esc(p.label) +
        (p.anti ? ' <em class="mb-anti">anti-lever</em>' : "") + "</span>" +
        '<span class="mb-pnote">' + esc(p.note) + "</span>";
      panel.appendChild(lab);
      btns[p.id] = lab;
      lab.querySelector("input").addEventListener("change", function () { setPreset(p.id); });
    });

    var bar = document.createElement("div");
    bar.className = "tb-bar";
    bar.innerHTML = '<label>Mailbox <select data-k="box"><option value="-1">all three (390)</option>' +
      data.users.map(function (u, i) { return '<option value="' + i + '">' + esc(u) + " (130)</option>"; }).join("") +
      '</select></label><button type="button" class="btn tb-break"></button>';
    boxSel = bar.querySelector("select");
    breakBtn = bar.querySelector("button");
    boxSel.addEventListener("change", function () { mailbox = parseInt(boxSel.value, 10); render(); });
    breakBtn.addEventListener("click", function () { broken = !broken; render(); });

    var ed = document.createElement("div");
    ed.className = "tb-editor";
    custom = [ruleEditor(1), ruleEditor(2)];
    ed.appendChild(custom[0]); ed.appendChild(custom[1]);
    ed.addEventListener("input", function () { if (current !== "custom") setPreset("custom"); else render(); });
    ed.addEventListener("change", function () { if (current !== "custom") setPreset("custom"); else render(); });

    var hint = document.createElement("p");
    hint.className = "mb-hint";
    hint.textContent = data.n + " real messages, 130 from each of three Enron mailboxes (CMU Enron Email Dataset, May 2015 version). " +
      "The label is what the owner did: replied or forwarded within 14 days, or filed in to_do (act); kept without acting (read); deleted without acting (archive). " +
      "The rules see sender, recipient counts, whether the owner is in To or Cc, subject and the first 160 characters of the body, nothing else.";

    readout = document.createElement("div"); readout.className = "mb-readout";
    listEl = document.createElement("div"); listEl.className = "dt-tablewrap";
    rootEl.appendChild(panel); rootEl.appendChild(bar); rootEl.appendChild(ed); rootEl.appendChild(hint);
    rootEl.appendChild(readout); rootEl.appendChild(listEl);
    setPreset("everything");
  }

  function init() {
    rootEl = document.getElementById("triage-bench");
    if (!rootEl || !root.TRIAGE_SAMPLE) return;
    data = prepare(root.TRIAGE_SAMPLE, root.TRIAGE_JUDGE || null);
    if (root.TRIAGE_JUDGE) {
      data.judgeMeta = "Judge labels: " + root.TRIAGE_JUDGE.model + " via " + root.TRIAGE_JUDGE.runner +
        ", temperature 0, run offline on " + root.TRIAGE_JUDGE.date + " and replayed here as data.";
    }
    buildUI();
    root.TRIAGE_LIVE = {
      presets: PRESETS.map(function (p) { return p.id; }),
      show: setPreset,
      setBroken: function (b) { broken = !!b; render(); },
      setMailbox: function (m) { mailbox = m; boxSel.value = String(m); render(); },
      evaluateAll: function (o) { return evaluateAll(data, o); },
      get current() { return current; }
    };
  }

  var api = { PRESETS: PRESETS, prepare: prepare, evaluate: evaluate, evaluateAll: evaluateAll,
              flags: flags, test: test, mulberry32: mulberry32, shuffled: shuffled };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
  }
})(typeof window !== "undefined" ? window : this);
