---
title: overwire status
description: "Show latest workflow and check status for a repository ref or SHA."
---

Summarizes the latest recorded workflow runs, commit statuses, check results, and PR state for a ref, SHA, or pull request, the local equivalent of glancing at a commit's checks page.

```sh
overwire status [options]
```

## Options

| Option | Description |
| --- | --- |
| `--config-root <dir>` | Flat `.overwire/` directory, relative to cwd (default `.overwire`). |
| `--ref <ref>` | Filter by branch, tag, or ref: `main`, `heads/main`, `refs/heads/main`. |
| `--sha <sha>` | Filter by commit SHA. |
| `--pr <number>` | Filter by pull request number. |
| `--limit <n>` | Number of matching workflow runs to include (default 5). |
| `--json` | Emit raw JSON instead of a human summary. |

## Examples

```sh
overwire status --ref main
overwire status --pr 142
```
