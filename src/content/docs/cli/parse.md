---
title: overwire parse
description: "Parse a workflow YAML file and print its structure."
---

Parses a workflow file and prints its structure: name, triggers, jobs, steps, and how Overwire interpreted them. Useful for confirming that a workflow means what you think it means before running it.

```sh
overwire parse [options] <file>
```

## Arguments

| Argument | Description |
| --- | --- |
| `file` | Path to a `.github/workflows/*.yml` file. |

## Options

| Option | Description |
| --- | --- |
| `--json` | Emit raw JSON instead of a human summary. |

## Examples

```sh
overwire parse .github/workflows/ci.yml
overwire parse .github/workflows/ci.yml --json | jq '.jobs | keys'
```
