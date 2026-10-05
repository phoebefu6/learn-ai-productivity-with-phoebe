#!/usr/bin/env node
/* Runs the REAL bench engine (assets/triage-live.js) in node over the shipped data and prints the
 * same canon lines as materials/triage-reference.py, so the two can be diffed.
 * Usage: node triage-node-check.js <assets dir> */
var path = require("path"), fs = require("fs"), vm = require("vm");
var dir = process.argv[2];
function loadVar(file, name) {
  var ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(dir, file), "utf8"), ctx);
  return ctx.window[name];
}
var eng = require(path.resolve(dir, "triage-live.js"));
var sample = loadVar("triage-sample.js", "TRIAGE_SAMPLE");
var judge = fs.existsSync(path.join(dir, "triage-judge.js")) ? loadVar("triage-judge.js", "TRIAGE_JUDGE") : null;
var d = eng.prepare(sample, judge);
var agree = null;
[-1, 0, 1, 2].forEach(function (box) {
  ["real", "broken"].forEach(function (tag) {
    eng.PRESETS.forEach(function (p) {
      if (p.judge && !judge) return;
      var s = eng.evaluate(d, p, { mailbox: box, broken: tag === "broken" });
      if (p.judge && box === -1 && tag === "real") agree = s.agree;
      console.log("box=" + (box < 0 ? "" : " ") + box + " " + (tag + "      ").slice(0, 6) + " " + (p.id + "           ").slice(0, 11) +
        " n=" + s.n + " pos=" + s.pos + " flagged=" + s.flagged + " tp=" + s.tp +
        " share=" + (s.share * 100).toFixed(1) + " precision=" + (s.precision * 100).toFixed(1) +
        " recall=" + (s.recall * 100).toFixed(1) + " lift=" + s.lift.toFixed(2));
    });
  });
});
if (agree !== null) console.log("judge three-way agreement=" + (agree * 100).toFixed(1));
