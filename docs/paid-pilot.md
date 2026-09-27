# Bounded paid pilot

Status: a small, testable offer for a real inquiry. It is not evidence that a buyer has already paid, and the reference price is not market-validated.

## Offer

Starting reference price: **USD 29 for one bounded workflow**. The final scope, currency, platform fees, taxes, and schedule must be agreed in writing before work starts.

The pilot answers one question: **what is the smallest safe review path for this task, and what evidence ends the loop?**

## What the buyer provides

- a sanitized task description;
- impact and uncertainty estimates;
- external systems touched;
- acceptance checks and the desired rollback/recovery path;
- any constraints that must appear in the handoff.

Do not send passwords, API keys, private customer data, identity documents, payment credentials, or production access.

## Deliverables

1. one validated JSON task record;
2. one `workflow-stoplight` routing decision;
3. a bounded checklist and explicit stop conditions;
4. a short Markdown handoff explaining assumptions, missing evidence, and the next owner decision;
5. one clarification pass limited to the agreed task.

The buyer can run the result locally with Node.js or use the browser demo. Acceptance means the output is valid JSON, the stated assumptions are visible, and the handoff can be followed without hidden context.

## Not included

- coding, repository edits, deployment, or production changes;
- penetration testing or a security audit;
- reviewing secrets or private systems;
- model calls or a promise of token/cost savings;
- a guarantee that the underlying task is safe, complete, or profitable;
- unlimited review rounds or open-ended revisions.

## Payment and safety gate

No work begins until the buyer and seller agree on scope, price, delivery format, and a payment/contract path. Payment must use a mutually agreed lawful platform or invoice method. This repository does not collect payment data and does not ask for account credentials.

## Requesting a pilot

Share only a sanitized task shape through a public issue or an agreed private channel. A real inquiry still needs a scope check before any quote is treated as binding.
