---
title: overwire chain
description: "Run or inspect workflow-chain scenario sessions."
sidebar:
  order: 10
---

Runs multi-workflow scenario sessions from a chain YAML file: ordered runs plus downstream `workflow_run` traversal, recorded as one session. Also lists and shows past sessions.

```sh
overwire chain [options] [file-or-command] [session-id]
```

## Arguments

| Argument | Description |
| --- | --- |
| `file-or-command` | Path to an Overwire workflow-chain YAML file, or `list` / `show`. |
| `session-id` | Session id for `overwire chain show`. |

## Options

| Option | Description |
| --- | --- |
| `--config-root <dir>` | Root for the config tree, relative to cwd (default `.overwire`). |
| `--docker` | Execute live steps in a container, one per job. |
| `--runner-image <image>` | OCI image for live execution (default `overwire/runner:ubuntu-24.04`). |
| `--action-cache-dir <dir>` | Directory for cached action sources (default `~/.cache/overwire/actions`). |
| `--workflow-cache-dir <dir>` | Directory for local `actions/cache` entries (defaults to `<config-root>/cache`). |
| `--tool-cache-dir <dir>` | Host directory persisted as `RUNNER_TOOL_CACHE` across runs (default `~/.cache/overwire/tool-cache`). |
| `-m, --default-mode <mode>` | Step mode default (`skip`, `mock`, `live`); falls back to the run entry, then `modes.yml`, then `mock`. |
| `--json` | Emit the final session JSON instead of a human summary. |
| `--details` | Include run, job, and check details for `overwire chain show`. |
| `--no-action-cache` | Force re-fetch every action ref instead of using the cache. |

## Examples

```sh
# Run a chain scenario
overwire chain release-chain.yml --docker

# Inspect past sessions
overwire chain list
overwire chain show 01JXAMPLE --details
```

A chain stops when a run concludes `failure` or `cancelled`, the same way a downstream `workflow_run` would not fire upstream.
