---
title: CLI overview
description: The overwire command line, every command at a glance.
  label: Overview
---

The CLI is the scriptable companion to the desktop app. Both run the same engine, share the same `.overwire/` config, and write to the same run store.

```sh
overwire [options] [command]
```

| Command | Purpose |
| --- | --- |
| [`init`](/cli/init/) | Scaffold a flat `.overwire/` config tree |
| [`doctor`](/cli/doctor/) | Health-check Node, the container engine, and your config |
| [`parse`](/cli/parse/) | Parse a workflow YAML file and print its structure |
| [`list`](/cli/list/) | List workflows with their triggers and jobs |
| [`lint`](/cli/lint/) | Lint a workflow file for common issues |
| [`explain`](/cli/explain/) | Explain how Overwire would support a workflow without running it |
| [`simulate`](/cli/simulate/) | Print a simulated event payload |
| [`run`](/cli/run/) | Execute a workflow locally, mock by default |
| [`chain`](/cli/chain/) | Run or inspect workflow-chain scenario sessions |
| [`resolve`](/cli/resolve/) | Fetch and parse an action's `action.yml` |
| [`seed-mocks`](/cli/seed-mocks/) | Write a mock contract for every `uses:` in a workflow |
| [`status`](/cli/status/) | Show latest workflow and check status for a ref or SHA |
| [`history`](/cli/history/) | List recent workflow runs for the current project |
| [`cache`](/cli/cache/) | Inspect or clear the action cache |
| [`validate`](/cli/validate/) | Validate every workflow and config file without running anything |
| [`schema`](/cli/schema/) | Print the JSON Schema for a `.overwire/` config format |
| [`agents`](/cli/agents/) | Print the guide for AI agents driving Overwire |
| [`license`](/cli/license/) | Manage the Overwire Pro license shared with the desktop app |

Most commands accept `--config-root <dir>` to point at a `.overwire/` directory outside the current working directory. When the config root is `some/repo/.overwire`, the project identity derives from `some/repo`.

## JSON output

Every introspection and execution command has structured output: `parse`, `list`, `lint`, `explain`, `status`, `history`, `history show`, `chain`, `validate`, `doctor`, `doctor capabilities`, `init`, `seed-mocks`, `resolve` (with `--contract`), `cache`, and `license status` accept `--json`; `simulate` always prints JSON, `schema <id>` prints the schema as JSON, and `schema --list --json` emits the index as JSON; [`run --json`](/cli/run/) streams run events as JSON lines and ends with a single `run:result` envelope. Unhandled errors in `--json` invocations print one structured `{"error":{"kind","label","message","guidance"}}` object to stderr.

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Success — including a run correctly skipped by trigger filters and validation that found only warnings. |
| `1` | The run (or lint/validate) concluded `failure` or `cancelled`, or an unhandled error occurred. |
| `2` | Parse, configuration, validation, usage, or licensing errors — nothing executed. |
| `130` / `143` | Interrupted by SIGINT / SIGTERM. |
