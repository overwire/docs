---
title: overwire history
description: "List recent workflow runs from the run store."
---

Lists recent workflow runs for the current project from the run store, with subcommands for run details and retention.

```sh
overwire history [options] [command]
```

## Options

| Option | Description |
| --- | --- |
| `--config-root <dir>` | Project config root (default `.overwire`). |
| `--json` | Output as JSON. |
| `--limit <n>` | Max number of runs to show (default 20). |

## Subcommands

### `history show <run-id>`

Shows details for a single run: jobs, steps, outcomes, and durations.

```sh
overwire history show 01JXAMPLE
```

### `history prune`

Applies the retention policy to the run store across all repositories.

```sh
overwire history prune
```

## Examples

```sh
overwire history --limit 10
overwire history show 01JXAMPLE
```

Run ids from `history` feed [`overwire run --rerun-failed`](/cli/run/) and [`overwire seed-mocks --from-run`](/cli/seed-mocks/). See [Runs and the run store](/concepts/runs/).
