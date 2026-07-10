---
title: modes/
description: "Workflow default mode and per-job, per-step overrides."
---

One file per workflow, `modes/<workflow>.yml`, holding the default mode and overrides. Your workflow YAML is never touched.

```yaml
defaultMode: mock

jobs:
  # A bare mode applies to the whole job
  lint: skip
  # Or override individual steps inside a job
  build:
    steps:
      "0": live
      "2": live

# Flat form: step keys are <jobId>.<stepIndex>
steps:
  deploy.1: mock
```

| Key | Description |
| --- | --- |
| `defaultMode` | `skip`, `mock`, or `live`. Applies to every step without a more specific override. Falls back to `mock` when unset. |
| `jobs.<jobId>` | Either a bare mode for the whole job, or an object with a `steps` map of step index to mode. |
| `steps.<jobId>.<stepIndex>` | Flat per-step override. Step indices are zero-based. |

Precedence: per-step override, then per-job, then the workflow default, then `mock`. The CLI flag `--default-mode` replaces the default for one run without editing the file.

The desktop app edits this file through the mode buttons on the workflow editor and DAG canvas; the modes file viewer shows the same data with inline toggles.
