---
title: overwire resolve
description: "Fetch and parse an action's action.yml; optionally print a mock contract."
sidebar:
  order: 11
---

Fetches and parses the `action.yml` for a `uses:` reference, printing the action's inputs, outputs, and kind. With `--contract`, prints an auto-generated mock contract you can drop into `.overwire/mocks/`.

```sh
overwire resolve [options] <uses>
```

## Arguments

| Argument | Description |
| --- | --- |
| `uses` | A `uses:` reference, e.g. `actions/checkout@v4` or `./local/path`. |

## Options

| Option | Description |
| --- | --- |
| `-w, --workspace <dir>` | Workspace root for `./local` references (default: current working directory). |
| `--contract` | Emit a mock contract YAML body instead of the raw action JSON. |

## Examples

```sh
overwire resolve actions/checkout@v4
overwire resolve actions/setup-node@v4 --contract > .overwire/mocks/actions-setup-node-v4.yml
```

Remote actions are fetched at run time by your machine and cached under `~/.cache/overwire/actions`. See [`overwire cache`](/cli/cache/).
