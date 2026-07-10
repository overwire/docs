---
title: overwire lint
description: "Lint a workflow file for common issues."
---

Lints a workflow file for common issues: deprecated workflow commands, unpinned action references, duplicate step IDs, and unknown runner labels.

```sh
overwire lint [options] <file>
```

## Arguments

| Argument | Description |
| --- | --- |
| `file` | Path to a `.github/workflows/*.yml` file. |

## Options

| Option | Description |
| --- | --- |
| `--json` | Emit diagnostics as JSON, for editor and CI integration. |

## Examples

```sh
overwire lint .github/workflows/ci.yml
overwire lint .github/workflows/ci.yml --json
```

The desktop app surfaces the same diagnostics inline in the workflow editor.
