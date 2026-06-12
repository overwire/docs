---
title: overwire seed-mocks
description: "Write a mock contract for every uses: step in a workflow."
sidebar:
  order: 12
---

Walks every `uses:` reference in a workflow and writes a mock contract for each into `.overwire/mocks/`, resolving each action's real `action.yml` to derive inputs and outputs.

```sh
overwire seed-mocks [options] <file>
```

## Arguments

| Argument | Description |
| --- | --- |
| `file` | Path to a `.github/workflows/*.yml` file. |

## Options

| Option | Description |
| --- | --- |
| `-o, --out <dir>` | Directory to write contracts into. |
| `-w, --workspace <dir>` | Workspace root for `./local` references (default: current working directory). |
| `--force` | Overwrite existing contract files. |
| `--include-local` | Also seed contracts for `./local` actions. |
| `--from-run <run-id>` | Generate contracts from a completed run instead of fetching actions, capturing the outputs the run actually produced. |
| `--config-root <dir>` | Project config root (for `--from-run`). |
| `--json` | Output the seed report (outcomes and counts) as JSON. |

## Examples

```sh
# Seed contracts for every third-party action in a workflow
overwire seed-mocks .github/workflows/ci.yml

# Derive contracts from a real recorded run
overwire seed-mocks .github/workflows/ci.yml --from-run 01JXAMPLE
```

See [Mock contracts](/concepts/mock-contracts/) for the contract format and matching rules.
