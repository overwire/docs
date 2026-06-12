---
title: chains/
description: "Workflow chain scenarios: ordered multi-workflow sessions run as one unit."
sidebar:
  order: 10
---

A chain is an ordered list of workflow runs executed as one session — CI then deploy, release then publish. Chain scenario files live in `.overwire/chains/<name>.yml` and run with [`overwire chain <file>`](/cli/chain/). JSON Schema: [`chain`](/schemas/chain.schema.json).

```yaml
# yaml-language-server: $schema=https://docs.overwire.io/schemas/chain.schema.json
name: CI then Deploy
runs:
  - id: ci
    workflow: ci.yml
    event: push
  - id: deploy
    workflow: deploy.yml
    event: workflow_dispatch
    continueOnError: true
```

## Run entry fields

| Field | Description |
| --- | --- |
| `workflow` | Workflow to run, by file name or stem (required). |
| `event` | Event to simulate for this run. Defaults to `push`. |
| `id` | Optional label for the entry. |
| `payload` | Optional path to an event payload override JSON file for this run. |
| `defaultMode` | Optional `skip`/`mock`/`live` default for this run, overriding `modes.yml`. |
| `continueOnError` | Keep the session going when this run fails. Defaults to `false` — a failed or cancelled run stops the chain. |

Saved [dispatch defaults](/configuration/payloads/) and payload overrides from `.overwire/` apply to chain runs the same way they apply to `overwire run`, so a `workflow_dispatch` entry does not need a `payload:` of its own.

## Downstream discovery

After each run completes, workflows triggered by `workflow_run` on the finished workflow join the session automatically, so a chain that runs CI also exercises everything CI triggers.

## Sessions

Each chain execution records a session under `.overwire/state/`. Inspect past sessions with `overwire chain list` and `overwire chain show <session-id>` — note that `list`/`show` operate on recorded sessions; running a chain always takes a scenario file path.
