# Configuration and delivery

## Input fields

| Field | Type | Meaning | Default when omitted |
| --- | --- | --- | --- |
| `title` | string | Human-readable task name | `Untitled task` |
| `impact` | `low` / `medium` / `high` | Consequence if the change is wrong | `medium` |
| `uncertainty` | `low` / `medium` / `high` | How much is unknown before work starts | `medium` |
| `externalSystems` | string array | Systems touched by the task | `[]` |
| `privateData` | boolean | Whether private or regulated data is involved | `false` |
| `reversible` | boolean | Whether the change can be safely undone | `true` |
| `rollback` | boolean | Whether a tested rollback exists | `true` |
| `acceptance` | string array | Concrete checks that define “done” | `[]` |

Omitted values use conservative defaults. If a task is consequential, write the facts explicitly instead of relying on defaults.

## Output fields

- `riskScore`: a transparent routing score, not a probability or safety certification.
- `decision`: one of `ship-now`, `one-review`, `staged-review`, or `stop-and-ask`.
- `reasons`: the input factors that increased the score.
- `checklist`: the supplied acceptance checks plus relevant external-system checks.
- `stopConditions`: conditions that end the work or require an owner decision.

## Delivery patterns

### Personal use

Run the CLI locally and paste the JSON output into the task note. Keep the input and output together so another person can audit the decision.

### Team repository

Commit task records under a team-approved folder, run the CLI in CI, and review the output as an artifact. Do not commit credentials or private customer data.

### Client handoff

Deliver the input template, the generated output, the decision table, and a short explanation of the human approval boundary. Do not present the score as a guarantee, client result, or security certification.
