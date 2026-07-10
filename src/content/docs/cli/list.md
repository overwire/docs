---
title: overwire list
description: "List workflows with their triggers and jobs."
---

Lists every workflow in a directory with its triggers and jobs.

```sh
overwire list [options]
```

## Options

| Option | Description |
| --- | --- |
| `-d, --dir <path>` | Directory to scan (default `.github/workflows`). |
| `--config-root <dir>` | Flat `.overwire/` directory to derive the workspace from. |
| `--json` | Emit raw JSON instead of a human summary. |

## Examples

```sh
overwire list
overwire list --config-root ../service-repo/.overwire
```
