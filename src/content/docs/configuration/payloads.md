---
title: payloads/ and dispatch/
description: "Saved event payload overrides and workflow_dispatch input defaults."
---

## `payloads/<event>.json`

A saved payload override for one event type: `payloads/pull_request.json`, `payloads/repository_dispatch.json`, and so on. When present, it takes precedence over the synthetic payload Overwire's event factories generate, and `${{ github.event.* }}` reflects it.

Use [`overwire simulate <event>`](/cli/simulate/) to see the factory baseline, then save an edited copy here. The desktop app's payload dialog edits these files with per-event forms for all supported event types.

The CLI flag `run --payload <file>` overrides even the saved payload for a single run.

## `dispatch/<workflow>.yml`

Saved `workflow_dispatch` defaults for one workflow: the event plus an input-value map.

```yaml
event: workflow_dispatch
inputs:
  environment: staging
  dry-run: "true"
```

The desktop app's dispatch form reads and writes this file, so your last-used inputs persist per workflow.
