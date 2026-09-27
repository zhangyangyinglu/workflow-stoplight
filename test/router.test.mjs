import test from "node:test";
import assert from "node:assert/strict";
import { routeTask } from "../src/router.mjs";

test("routes a small reversible task to ship-now", () => {
  const result = routeTask({
    title: "Small copy change",
    impact: "low",
    uncertainty: "low",
    acceptance: ["The expected text is present"]
  });
  assert.equal(result.decision, "ship-now");
  assert.equal(result.riskScore, 0);
});

test("routes a medium external workflow to one-review", () => {
  const result = routeTask({
    title: "Update a form automation",
    impact: "medium",
    uncertainty: "medium",
    externalSystems: ["form", "sheet"],
    acceptance: ["One valid test creates one row"]
  });
  assert.equal(result.decision, "one-review");
  assert.ok(result.checklist.some((item) => item.includes("external systems")));
});

test("stops a private irreversible task without rollback", () => {
  const result = routeTask({
    title: "Modify production customer records",
    impact: "high",
    uncertainty: "high",
    externalSystems: ["database"],
    privateData: true,
    reversible: false,
    rollback: false
  });
  assert.equal(result.decision, "stop-and-ask");
  assert.ok(result.stopConditions[0].includes("irreversible"));
});

test("does not invent acceptance checks", () => {
  const result = routeTask({ title: "Unspecified task" });
  assert.ok(result.checklist.includes("Write the intended outcome in one sentence"));
  assert.equal(result.checklist.length, 1);
});
