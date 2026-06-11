---
title: Troubleshooting
description: Diagnose environment problems with doctor and share a redacted diagnostic bundle.
---

## Start with doctor

```sh
overwire doctor
```

`doctor` checks your Node version, container engine reachability, and the `.overwire/` config tree, and reports exactly what live runs are missing. `overwire doctor capabilities` breaks down feature support in detail.

## Diagnostic bundles

When reporting an issue, attach a diagnostic bundle:

```sh
overwire doctor --bundle
```

The bundle is redacted by design: it contains a names-and-sizes inventory of your config tree, environment facts, and failed-step run summaries. Secret values and file contents are never included, and home directory paths are scrubbed. The desktop app exports the same bundle from Settings.

## Common situations

- **Live runs fail to start.** A Docker-API-compatible container engine (e.g., Docker Desktop, Colima, OrbStack, Rancher Desktop) must be running. Mock runs work without one.
- **A mocked step fails on inputs.** The action's `action.yml` declares a required input the step does not provide. This mirrors how the step would fail upstream; fix the workflow or the mock contract.
- **Pre-run validation blocks a run.** Validation catches undefined secrets, missing required inputs, and dependency cycles before execution. Use `overwire run --force` to bypass it deliberately.
