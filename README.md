# workflow-stoplight

[![CI](https://github.com/zhangyangyinglu/workflow-stoplight/actions/workflows/ci.yml/badge.svg)](https://github.com/zhangyangyinglu/workflow-stoplight/actions/workflows/ci.yml)
[![Latest release](https://img.shields.io/github/v/release/zhangyangyinglu/workflow-stoplight)](https://github.com/zhangyangyinglu/workflow-stoplight/releases)

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
node bin/route.mjs examples/review-stop-condition.json
```

To install the command locally:

```bash
npm install --global .
workflow-stoplight examples/medium-task.json
```

You can also pipe a task record:

```bash
printf '%s\n' '{"title":"Change a landing-page headline","impact":"low","uncertainty":"low","acceptance":["Headline is visible"]}' | node bin/route.mjs -
```

The output is JSON with a route, risk score, reasons, checklist, and stop conditions. See [`docs/decision-table.md`](docs/decision-table.md) for the rules.

To check public adoption metrics without a GitHub token:

```bash
npm run metrics -- zhangyangyinglu/workflow-stoplight
```

This reports the public Star, Fork, Issue, watcher, and Release counts at the time of the request. It does not modify the repository or manufacture adoption.

## Configuration and delivery

The input is a JSON object. The complete field reference and JSON Schema are in [`docs/configuration.md`](docs/configuration.md) and [`schema/task.schema.json`](schema/task.schema.json).

The smallest handoff is:

1. copy `examples/small-task.json` and edit the task fields;
2. run `workflow-stoplight your-task.json`;
3. attach the JSON output to the task record or review note;
4. stop when the returned acceptance checks pass, or resolve the returned stop condition first.

No account, API key, database, browser extension, or build service is required.

## What it can and cannot do

It can:

- make a repeatable routing decision from explicit task facts;
- show why the route was selected;
- turn supplied acceptance items into a bounded checklist;
- highlight missing rollback, private-data, and scope decisions.

It cannot:

- inspect whether the supplied facts are truthful;
- guarantee that a task is safe or that a review is complete;
- edit a repository, deploy a service, or send a message;
- read credentials, private files, production systems, or hidden context;
- prove token savings, revenue, or client outcomes.

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

## Feedback and Star

If this is useful, a GitHub Star and a short issue describing the task shape help prioritize the next release. A Star is a signal of interest, not proof of production adoption; the project will report actual Stars, Issues, and releases rather than inventing usage.

## License

MIT. See [`LICENSE`](LICENSE).
