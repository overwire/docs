---
title: overwire explain
description: "Explain how Overwire would support a workflow without running it."
---

Prints the support plan for a workflow without executing anything: for every job and step, how Overwire would satisfy it (runner shell, Overwire service, action code, mock contract), its support status, and any warnings or configuration it needs.

```sh
overwire explain [options] <file>
```

## Arguments

| Argument | Description |
| --- | --- |
| `file` | Path to a `.github/workflows/*.yml` file. |

## Options

| Option | Description |
| --- | --- |
| `--json` | Emit raw JSON instead of a human summary. |
| `--default-mode <mode>` | Selected execution mode for steps: `skip`, `mock`, or `live`. The plan changes with the mode, since a step that is unsupported live may be fine mocked. |

## Examples

```sh
overwire explain .github/workflows/release.yml
overwire explain .github/workflows/release.yml --default-mode live
```

See [Action support tiers](/concepts/support-tiers/) for what the classifications mean. The desktop app shows the same plan in the Support plan panel.
