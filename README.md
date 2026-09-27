# workflow-stoplight

`workflow-stoplight` is a dependency-free CLI that routes an AI-assisted task to the smallest safe review path.

It targets a common failure mode: a tiny task becomes a long chain of plans and reviews, while a consequential task has no explicit stop condition. The tool makes the trade-off visible before an agent spends more tokens.

## Why this exists

AI coding and knowledge-work workflows often fail in two opposite ways:

1. low-risk work is over-engineered until the process costs more than the change;
2. high-impact work is treated as routine because nobody wrote down rollback and acceptance checks.

This tool does not claim to replace a human reviewer. It gives the human and the agent a shared, auditable routing decision.

## Quick start

Requires Node.js 20+ and no package installation.

```bash
npm test
node bin/route.mjs examples/small-task.json
node bin/route.mjs examples/high-risk-task.json
```

You can also pipe a task record:

```bash
printf '%s\n' '{"title":"Change a landing-page headline","impact":"low","uncertainty":"low","acceptance":["Headline is visible"]}' | node bin/route.mjs -
```

The output is JSON with a route, risk score, reasons, checklist, and stop conditions. See [`docs/decision-table.md`](docs/decision-table.md) for the rules.

## Example output

```json
{
  "schema": "workflow-stoplight/v1",
  "decision": "one-review",
  "reviewBudget": "1 review round",
  "stopConditions": [
    "Stop when the acceptance checks pass",
    "Stop and request an owner decision if scope changes"
  ]
}
```

## MoSCoW scope

- **Must**: deterministic routing, explainable reasons, acceptance checks, stop conditions, CLI, tests, and examples.
- **Should**: JSON Schema, a small browser demo, and adapters for `AGENTS.md` / `CLAUDE.md` workflows.
- **Could**: saved decision history and team policy presets.
- **Won't (v0.1)**: model calls, automatic repository edits, credential handling, or a promise of token/cost savings.

## Safety and limits

- The tool never reads credentials, private files, or production systems.
- It never applies a change; it only returns a routing decision.
- A risk score is not a security audit and is not a substitute for a qualified reviewer.
- Examples are synthetic and do not represent paid-client results.

## License

MIT. See [`LICENSE`](LICENSE).
