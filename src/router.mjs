const IMPACT_POINTS = { low: 0, medium: 1, high: 2 };
const UNCERTAINTY_POINTS = { low: 0, medium: 1, high: 2 };

function asLevel(value, fallback = "medium") {
  return Object.hasOwn(IMPACT_POINTS, value) ? value : fallback;
}

function asList(value) {
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

function normalizeTask(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new TypeError("Task input must be a JSON object.");
  }

  const externalSystems = asList(input.externalSystems);
  const acceptance = asList(input.acceptance);
  return {
    title: typeof input.title === "string" && input.title.trim() ? input.title.trim() : "Untitled task",
    impact: asLevel(input.impact),
    uncertainty: asLevel(input.uncertainty),
    externalSystems,
    privateData: Boolean(input.privateData),
    reversible: input.reversible !== false,
    rollback: input.rollback !== false,
    acceptance
  };
}

function scoreTask(task) {
  let score = IMPACT_POINTS[task.impact] + UNCERTAINTY_POINTS[task.uncertainty];
  const reasons = [];

  if (task.impact !== "low") reasons.push(`${task.impact} impact`);
  if (task.uncertainty !== "low") reasons.push(`${task.uncertainty} uncertainty`);

  if (task.externalSystems.length > 0) {
    score += task.externalSystems.length > 2 ? 2 : 1;
    reasons.push(`${task.externalSystems.length} external system${task.externalSystems.length === 1 ? "" : "s"}`);
  }
  if (task.privateData) {
    score += 2;
    reasons.push("private data");
  }
  if (!task.reversible) {
    score += 2;
    reasons.push("not readily reversible");
  }
  if (!task.rollback) {
    score += 1;
    reasons.push("no rollback path");
  }
  if (task.acceptance.length === 0) {
    score += 1;
    reasons.push("acceptance checks missing");
  }

  return { score, reasons };
}

function routeFor(task, score) {
  if (task.privateData && (!task.reversible || !task.rollback)) return "stop-and-ask";
  if (task.acceptance.length === 0 && score >= 4) return "stop-and-ask";
  if (score >= 6) return "staged-review";
  if (score >= 3) return "one-review";
  return "ship-now";
}

const ROUTES = {
  "ship-now": {
    label: "Ship now",
    summary: "Make the smallest reversible change, then run the listed checks.",
    reviewBudget: "0 mandatory review rounds; one human spot-check"
  },
  "one-review": {
    label: "One review",
    summary: "Do one bounded implementation pass and one review pass; stop after acceptance checks pass.",
    reviewBudget: "1 review round"
  },
  "staged-review": {
    label: "Staged review",
    summary: "Split discovery, implementation, and verification; require a checkpoint before the next stage.",
    reviewBudget: "1 checkpoint per stage; no open-ended review loop"
  },
  "stop-and-ask": {
    label: "Stop and ask",
    summary: "Do not make the consequential change until the missing owner decision, rollback, or acceptance rule is explicit.",
    reviewBudget: "No implementation until the stop condition is resolved"
  }
};

export function routeTask(input) {
  const task = normalizeTask(input);
  const { score, reasons } = scoreTask(task);
  const decision = routeFor(task, score);
  const route = ROUTES[decision];
  const checklist = [
    "Write the intended outcome in one sentence",
    ...task.acceptance.map((item) => `Check: ${item}`)
  ];
  const stopConditions = [
    "Stop when the acceptance checks pass",
    "Stop and request an owner decision if scope changes"
  ];

  if (decision === "stop-and-ask") {
    stopConditions.unshift("Do not apply an irreversible or private-data change without explicit approval");
  }
  if (task.externalSystems.length > 0) {
    checklist.push("Record the external systems touched and the rollback result");
  }

  return {
    schema: "workflow-stoplight/v1",
    title: task.title,
    riskScore: score,
    decision,
    label: route.label,
    summary: route.summary,
    reviewBudget: route.reviewBudget,
    reasons,
    checklist,
    stopConditions
  };
}
