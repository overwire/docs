---
title: CLI overview
description: The overwire command line, every command at a glance.
sidebar:
  order: 1
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

Most commands accept `--config-root <dir>` to point at a `.overwire/` directory outside the current working directory. When the config root is `some/repo/.overwire`, the project identity derives from `some/repo`.
