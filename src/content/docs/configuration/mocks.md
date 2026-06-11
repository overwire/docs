---
title: mocks/
description: "Mock contracts for uses: steps."
sidebar:
  order: 6
---

Mock contracts live as YAML files under `mocks/`, conventionally named after the action with slashes replaced by dashes: `actions-checkout-v4.yml`.

```yaml
uses: actions/setup-node@v4
description: Synthesizes setup-node outputs without touching the network
inputs:
  node-version:
    required: false
    default: "20"
  # Scalar shorthand is accepted: <name>: <value>
  cache: npm
outputs:
  node-version: "20.11.1"
  cache-hit: "true"
durationMs: 350
```

| Key | Description |
| --- | --- |
| `uses` | The action reference this contract matches. Exactly one of `uses` or `stepId` is required. |
| `stepId` | Match a specific step id instead of an action reference. |
| `description` | Free-text note shown in tooling. |
| `inputs` | Expected inputs. Each entry is a declaration (`description`, `required`, `default`), a scalar shorthand treated as the default, or a bare name. |
| `outputs` | Outputs the mocked step returns. Values are coerced to strings. |
| `durationMs` | Simulated duration for the step. |

At run time a mocked step validates required inputs against the action's real `action.yml` and returns the declared outputs, so `${{ steps.<id>.outputs.* }}` expressions keep working downstream.

Generate contracts with [`overwire seed-mocks`](/cli/seed-mocks/), including `--from-run` to capture outputs a real run produced, or [`overwire resolve --contract`](/cli/resolve/) for a single action.
