# Synthetic paid-pilot handoff

> This is a synthetic example for evaluating the delivery format. It is not a client engagement, testimonial, production audit, or revenue evidence.

## 1. Task record

```json
{
  "title": "Decide whether an AI-generated feature is ready to ship",
  "impact": "high",
  "uncertainty": "medium",
  "externalSystems": ["source repository", "test runner"],
  "privateData": false,
  "reversible": true,
  "rollback": true,
  "acceptance": [
    "B1: the named acceptance criteria pass",
    "B2: the existing behavior selected as an invariant has not regressed",
    "B3: the change cannot corrupt persisted state in the tested path",
    "B4: the relevant failure path is recoverable",
    "New findings that do not falsify B1-B4 are recorded as backlog, not blockers"
  ]
}
```

## 2. Decision

- Route: `one-review`
- Risk score: `4`
- Review budget: one bounded review round
- Stop condition: stop when B1–B4 are evidenced; stop and ask the owner if scope changes.

## 3. Handoff checklist

1. Record the intended outcome in one sentence.
2. Run the named acceptance checks.
3. Compare the selected invariant behavior with the baseline.
4. Test the recoverable failure path.
5. Record any non-blocking finding in backlog rather than reopening the whole review.
6. Record the external systems touched and the rollback result.

## 4. Missing evidence / owner decisions

- The task owner must name the exact acceptance test commands and invariant fixtures.
- The task owner must decide whether any new finding falsifies B1–B4.
- This handoff does not inspect a repository or claim that the feature is safe.

## 5. Re-run

Save the task JSON as `task.json`, then run:

```bash
npm install --global github:zhangyangyinglu/workflow-stoplight
workflow-stoplight task.json
```

The browser demo produces the same route without installation. A real paid handoff would use the buyer's sanitized task facts and an agreed acceptance scope; it would not include credentials or production access.
