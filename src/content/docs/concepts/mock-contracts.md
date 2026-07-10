---
title: Mock contracts
description: YAML sidecars that declare expected inputs and synthesized outputs for mocked actions.
---

A mock contract is a YAML file in `.overwire/mocks/` describing how a mocked `uses:` step behaves: which inputs it expects and which outputs it returns. Overwire resolves the action's real `action.yml`, validates required inputs at run time, and synthesizes the declared outputs, so downstream expressions like `${{ steps.x.outputs.y }}` keep working.

The point is honest mocking. A contract is not a stub that always succeeds; it is a declaration checked both ways. The step must receive the inputs the real action requires, and it produces exactly the outputs you declared, so the rest of the workflow exercises real data flow.

## Matching and naming

A contract targets either a `uses:` reference or a specific step ID, one or the other. File names follow the action reference with slashes flattened to dashes:

```text
.overwire/mocks/actions-checkout-v4.yml        # uses: actions/checkout@v4
.overwire/mocks/acme-deploy-action-v2.yml      # uses: acme/deploy-action@v2
```

A minimal contract:

```yaml
uses: acme/deploy-action@v2
inputs:
  environment: staging
outputs:
  deployment-url: https://staging.example.test
```

The [mocks reference](/configuration/mocks/) documents the full schema, including required-input declarations, defaults, and simulated duration.

## Generating contracts

Hand-writing contracts is rarely necessary:

- [`overwire seed-mocks <workflow>`](/cli/seed-mocks/) writes a contract for every `uses:` reference in a workflow, pre-filled from each action's resolved `action.yml`.
- `overwire seed-mocks --from-run <run-id>` generates contracts from a completed run's recorded outputs, turning one live run into a reusable mock setup.
- In the desktop app, the [support plan](/app/runs-panel/) links each mockable step to its contract and creates the file on first use; the [structured editor](/app/editors/) edits inputs and outputs as tables.

## Validation mirrors the real action

At run time a mocked `uses:` step resolves the action's real metadata. If the action declares a required input and the step does not provide it, the mock fails the same way the real action would upstream. That keeps a fully mocked workflow honest enough that passing locally still means something.

Contracts are one tier in the larger picture of how Overwire satisfies `uses:` references; see [action support tiers](/concepts/support-tiers/).
