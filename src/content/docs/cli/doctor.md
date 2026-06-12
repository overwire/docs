---
title: overwire doctor
description: "Health-check Node, the container engine, and the .overwire config tree."
sidebar:
  order: 3
---

Runs a quick health check on Overwire's environment: Node version, container engine reachability, and the `.overwire/` config tree. The output tells you exactly what live runs are missing.

```sh
overwire doctor [options] [command]
```

## Options

| Option | Description |
| --- | --- |
| `--config-root <dir>` | Config tree to inspect (default `.overwire`). |
| `--bundle [file]` | Write a redacted diagnostic bundle (JSON) for support requests. |
| `--json` | Output the checks as JSON (`{ outcome, checks, bundlePath? }`). |

## Subcommands

### `doctor capabilities`

Reports which workflow features are available in the current environment, broken down by capability. Useful for understanding why a feature is degraded before starting a run.

```sh
overwire doctor capabilities
```

## Diagnostic bundles

`--bundle` writes a support bundle that is redacted by design: a names-and-sizes inventory of the config tree, environment facts, and failed-step run summaries. Secret values and file contents are never included, and home directory paths are scrubbed. See [Troubleshooting](/troubleshooting/).

## Examples

```sh
overwire doctor
overwire doctor --bundle support-bundle.json
```
