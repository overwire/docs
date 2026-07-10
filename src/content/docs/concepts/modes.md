---
title: Step modes
description: Every step has a mode, skip, mock, or live. Modes live in sidecar config, never in your workflow YAML.
---

Every step in every job has exactly one mode. The mode decides what happens when the scheduler reaches that step:

| Mode | Behavior |
| --- | --- |
| `skip` | No execution. The step emits a skipped result and the run continues. |
| `mock` | Overwire validates the step against its mock contract and synthesizes the declared outputs and logs. No external dependency is touched. |
| `live` | The step executes for real inside the runner container. |

## Where modes live

Modes are sidecar configuration in `.overwire/modes/<workflow>.yml`, never edits to your workflow YAML. A modes file holds a workflow-level default plus per-step overrides, so the same workflow can run fully mocked, fully live, or anything in between without a single change to `.github/workflows/`.

The CLI flag `--default-mode` overrides the default for one run; per-step entries in the modes file still win.

## Choosing modes

A practical pattern for a CI workflow:

- `live` for the steps you are debugging: build, test, lint.
- `mock` for third-party actions with external side effects: deploys, notifications, anything that talks to a vendor API.
- `skip` for steps that are irrelevant to the current iteration.

Mocked `uses:` steps validate against the action's real `action.yml`, so a missing required input fails the same way it would upstream. See [mock contracts](/concepts/mock-contracts/).

## One contract across surfaces

The CLI, the desktop app, and the engine share one definition of what each mode means. The workbench shows the mode of every step as a badge on the DAG canvas and in the editor gutter, with one-click switching.
