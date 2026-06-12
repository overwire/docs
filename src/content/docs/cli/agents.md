---
title: overwire agents
description: "Print the guide for AI agents driving Overwire."
sidebar:
  order: 18
---

Prints a compact, version-matched guide written for AI coding agents that drive Overwire through files and the CLI: the config file map with schema ids, the command map with JSON flags, exit codes, the validate–run–inspect feedback loop, step mode semantics, and the free/Pro split.

```sh
overwire agents
```

The same guide can be scaffolded into a project with [`overwire init --agents`](/cli/init/), which writes it to `.overwire/AGENTS.md` (create-only — your edits are never overwritten). Reference it from the project's own agent instructions so any AI working in the repository discovers Overwire's contract without needing this site:

```markdown
<!-- in your repo's AGENTS.md or CLAUDE.md -->
For running and mocking workflows locally, read .overwire/AGENTS.md
(or run `overwire agents`).
```

See [Automate Overwire with AI agents](/automation/ai-agents/) for the full picture.
