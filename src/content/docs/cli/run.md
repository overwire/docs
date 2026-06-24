---
title: overwire run
description: "Execute a workflow locally. Mock by default, live in a container with --docker."
sidebar:
  order: 9
---

Executes one workflow locally. Mock is the default mode; `--docker` executes live steps in the runner container. Pre-run validation catches undefined secrets, missing required inputs, and dependency cycles before anything executes.

```sh
overwire run [options] [file]
```

## Arguments

| Argument | Description |
| --- | --- |
| `file` | Path to a `.github/workflows/*.yml` file. Optional when `--workflow` is used. |

## Options

| Option | Description |
| --- | --- |
| `--workflow <name-or-file>` | Select a workflow by name, file name, stem, or repo-relative path. |
| `-e, --event <name>` | Simulated event: `push` (default), `pull_request`, `pull_request_target`, `workflow_dispatch`, `workflow_call`, `repository_dispatch`, `workflow_run`, `schedule`, `release`, `create`, `delete`, `issues`, `issue_comment`, `pull_request_review`, `merge_group`. |
| `-m, --default-mode <mode>` | Step mode default (`skip`, `mock`, `live`); falls back to `modes.yml`, then `mock`. |
| `--json` | Emit each run event as a JSON line, ending with one `run:result` envelope (below). |
| `--mocks-dir <dir>` | Load mock contracts from this directory, recursively. |
| `--payload <file>` | Event payload override JSON; takes precedence over `.overwire/payloads/<event>.json`. |
| `--inputs <json>` | `workflow_dispatch`/`workflow_call` inputs as a JSON object. |
| `--config-root <dir>` | Flat `.overwire/` directory containing `variables.yml`, `modes/`, `secrets.yml`, `mocks/`, etc. |
| `--docker` | Execute live steps in a container, one per job. |
| `--runner-image <image>` | OCI image for live execution (default `overwireio/runner:ubuntu-24.04`). |
| `--action-cache-dir <dir>` | Directory for cached action sources (default `~/.cache/overwire/actions`). |
| `--workflow-cache-dir <dir>` | Directory for local `actions/cache` entries (defaults to `<config-root>/cache` when `--config-root` is set). |
| `--tool-cache-dir <dir>` | Host directory persisted as `RUNNER_TOOL_CACHE` across runs (default `~/.cache/overwire/tool-cache`). |
| `--api-mocks <file>` | Load declarative API mock routes from YAML. |
| `--no-action-cache` | Force re-fetch every action ref instead of using the cache. |
| `--changed-files <path>` | Declare a changed file for trigger path-filter evaluation. Repeatable. |
| `--force` | Run even when pre-run validation reports errors. |
| `--debug` | Enable runner debug mode: `RUNNER_DEBUG=1` in the container environment and `runner.debug` set to `'1'` in expressions. |
| `--rerun-failed <run-id>` | Re-run only the failed or cancelled jobs (and their dependents) of a recorded run; other jobs are restored from the record. |
| `--watch` | Re-run automatically when workflow or config files change. |

## Examples

```sh
# Mock run of a push event
overwire run .github/workflows/ci.yml

# Live run in the container
overwire run --workflow ci --docker

# Reusable workflow with inputs
overwire run --workflow deploy --event workflow_call --inputs '{"environment":"staging"}'

# Path-filtered trigger evaluation
overwire run --workflow docs --changed-files docs/index.md

# Re-run only what failed last time
overwire run --rerun-failed 01JXAMPLE --docker

# Watch mode: re-run on changes
overwire run --workflow ci --watch
```

## JSON output

With `--json`, the run streams one event per line (`run:started`, `job:started`, `step:started`, `step:log`, `step:completed`, `job:completed`, `run:completed`) and finishes with a single `run:result` envelope summarizing everything a script or agent needs:

```json
{
  "kind": "run:result",
  "runId": "…",
  "outcome": "success",
  "exitCode": 0,
  "recordPath": "~/.cache/overwire/runs/<owner>/<repo>/<run-id>",
  "jobs": { "build": { "outcome": "success", "steps": [ { "index": 0, "mode": "mock", "outcome": "success", "conclusion": "success" } ] } }
}
```

Failed steps carry `error` and a bounded `stderrTail`; the envelope also includes pre-run validation diagnostics, required-check evaluation, and the API capture summary (with the suggested-mocks path) when present. A validation abort emits the same envelope with `"outcome": "aborted"` before exiting `2`.

## Behavior notes

- The exit code is non-zero when the run concludes `failure` or `cancelled`.
- Watch mode re-runs on changes to the workflow file, the `.github/` tree, the config root (excluding its run-written `state/` and `cache/` subtrees), and workspace-peer `.github/` trees. It is incompatible with `--rerun-failed`.
- When an API mock server is active, runtime endpoints (`ACTIONS_RUNTIME_URL`, `ACTIONS_CACHE_URL`, OIDC token URLs) are injected into the container so cache, artifact, and OIDC-dependent actions resolve locally.
- Cross-repo reusable workflow references resolve against workspace peers before falling back to remote fetch.
