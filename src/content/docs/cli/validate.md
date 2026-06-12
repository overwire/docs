---
title: overwire validate
description: "Validate every workflow and config file in the project without running anything."
sidebar:
  order: 16
---

Validates the whole project in one pass without executing anything: parses every workflow, lints each one, runs static expression analysis (bad `needs`/`steps`/`matrix` references), loads every `.overwire/` config file through its real loader, and checks every chain scenario. The fastest pre-run feedback loop for hand-written and generated projects alike.

```sh
overwire validate [options] [file]
```

## Arguments

| Argument | Description |
| --- | --- |
| `file` | Validate a single workflow file instead of the whole project. |

## Options

| Option | Description |
| --- | --- |
| `-d, --dir <path>` | Workflows directory to scan (default `.github/workflows`). |
| `--config-root <dir>` | Flat `.overwire/` directory to derive the workspace from. Enables the config and chain checks. |
| `--json` | Emit findings as JSON. |

## Output

Each finding carries the file, a `source` (`parse`, `lint`, `expressions`, `config`, or `chain`), severity, message, the rule id, the job/step location when known, and a suggested fix. `--json` wraps them with counts:

```json
{
  "workflowsChecked": 8,
  "configChecked": true,
  "chainsChecked": 2,
  "findings": [],
  "summary": { "errors": 0, "warnings": 0 }
}
```

## Exit codes

`0` when no error-severity findings exist (warnings alone pass), `1` when errors were found, `2` for usage problems such as a missing file.

```sh
# Whole project
overwire validate --config-root .overwire

# One workflow, machine-readable
overwire validate .github/workflows/ci.yml --json
```
