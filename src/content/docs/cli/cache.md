---
title: overwire cache
description: "Inspect or clear the action cache and the persisted tool cache."
sidebar:
  order: 15
---

Inspects or clears the action source cache used by `--docker` live runs, with a subcommand for the persisted runner tool cache.

```sh
overwire cache [options] [command]
```

## Options

| Option | Description |
| --- | --- |
| `--dir <path>` | Cache directory (default `~/.cache/overwire/actions`). |
| `--clear` | Remove all entries from the cache directory. |

## Subcommands

### `cache tool-cache`

Inspects or manages the persisted `RUNNER_TOOL_CACHE` directory, where `setup-*` actions install tool versions that survive across runs. Supports listing, clearing, and evicting individual entries.

```sh
overwire cache tool-cache
```

## Examples

```sh
# What is cached right now?
overwire cache

# Start fresh
overwire cache --clear
overwire cache tool-cache
```

Everything under `~/.cache/overwire/` is rebuildable; clearing caches forces re-fetching but breaks nothing. See [Directory layout](/platform/directory-layout/).
