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

A contract can also declare the files a step would have produced. Declared artifacts are written into the run's artifact store when the step is mocked, so downstream `actions/download-artifact` steps restore real files and the run summary lists them like live uploads:

```yaml
uses: actions/upload-artifact@v4
artifacts:
  - name: sbom
    files:
      - path: app.tar.gz # no content — an empty placeholder file
      - path: sbom.cyclonedx.json
        fromFile: fixtures/sample-sbom.json # relative to mocks/
      - path: report.txt
        content: |
          build ok
```

| Key | Description |
| --- | --- |
| `uses` | The action reference this contract matches. Exactly one of `uses` or `stepId` is required. |
| `stepId` | Match a specific step id instead of an action reference. |
| `description` | Free-text note shown in tooling. |
| `inputs` | Expected inputs. Each entry is a declaration (`description`, `required`, `default`), a scalar shorthand treated as the default, or a bare name. |
| `outputs` | Outputs the mocked step returns. Values are coerced to strings. |
| `artifacts` | Artifacts to register in the run's artifact store when the step is mocked. Each artifact names its files; a file carries inline `content`, a `fromFile` fixture path resolved under `mocks/`, or neither for an empty file. |
| `durationMs` | Simulated duration for the step. |

At run time a mocked step validates required inputs against the action's real `action.yml` and returns the declared outputs, so `${{ steps.<id>.outputs.* }}` expressions keep working downstream. A mocked `actions/upload-artifact` step that declares artifacts also synthesizes the action's `artifact-id`, `artifact-url`, and `artifact-digest` outputs (explicit `outputs` entries win). Fixture references cannot escape the `mocks/` directory, and binary fixtures are copied byte for byte.

Generate contracts with [`overwire seed-mocks`](/cli/seed-mocks/), including `--from-run` to capture outputs a real run produced, or [`overwire resolve --contract`](/cli/resolve/) for a single action.
