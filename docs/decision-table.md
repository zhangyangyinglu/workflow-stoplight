# Decision table

`workflow-stoplight` is deliberately deterministic. It does not call an API, inspect a repository, or pretend to know a task's context. The caller supplies a small task record; the tool explains the route it chose.

## Inputs

- `impact`: `low`, `medium`, or `high`.
- `uncertainty`: `low`, `medium`, or `high`.
- `externalSystems`: systems that will be touched.
- `privateData`: whether private or regulated data is involved.
- `reversible`: whether the change can be safely undone.
- `rollback`: whether a tested rollback exists.
- `acceptance`: concrete checks that define done.

## Routes

| Route | Intended use | Stop rule |
| --- | --- | --- |
| `ship-now` | Low-risk, reversible work with checks | Stop when checks pass |
| `one-review` | Moderate impact or uncertainty | One bounded review round |
| `staged-review` | High score with a workable rollback | Checkpoint between stages |
| `stop-and-ask` | Private/irreversible work, missing rollback, or missing acceptance on a risky task | No implementation until the missing decision is explicit |

The score is a routing aid, not a guarantee of safety. A human owner remains responsible for the final decision.
