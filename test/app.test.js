import test from "node:test";
import assert from "node:assert/strict";
import { calculateProgress, DEFAULT_TASKS } from "../app.js";

test("calculateProgress reports completed tasks", () => {
  const progress = calculateProgress(DEFAULT_TASKS);
  assert.equal(progress.completed, 1);
  assert.equal(progress.total, 3);
  assert.ok(Math.abs(progress.percent - 33.333) < 0.001);
});

test("calculateProgress handles an empty list", () => {
  assert.deepEqual(calculateProgress([]), { completed: 0, total: 0, percent: 0 });
});
