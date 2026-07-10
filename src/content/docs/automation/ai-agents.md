---
title: Automate Overwire with AI agents
description: "Drive Overwire from AI coding agents: files are the API, the CLI is the executor."
sidebar:
  order: 1
  label: AI agents
---

Overwire is built so an AI coding agent can do everything the desktop app does. Two properties make that work, and neither was bolted on:

1. **Files are the API.** Every scenario an agent might author — variables, secrets metadata, step modes, mock contracts, event payloads, PR scenarios, statuses, rulesets (repo and org), environments, API mocks, chains — is a plain YAML/JSON file under `.overwire/` with a [published JSON Schema](/cli/schema/). Writing those files is the integration.
2. **The CLI is the executor.** Every command reports structured output ([JSON conventions](/cli/)), exit codes are stable, and run results land in self-contained records an agent can read back.

The desktop app reads the same files and shows the same runs, so a human can watch the canvas while an agent works the repository.

## Give your agent the contract

Print the machine-oriented guide — config file map, command map, exit codes, the feedback loop — with:

```sh
overwire agents
```

or scaffold it into the project so agents find it without any docs access:

```sh
overwire init --agents     # writes .overwire/AGENTS.md (create-only)
```

Reference it from your repository's own agent instructions (`AGENTS.md`, `CLAUDE.md`, or your tool's equivalent): *"For running and mocking workflows locally, read `.overwire/AGENTS.md`."* A Claude Code plugin with the same knowledge packaged as a skill lives at [github.com/overwire/agents](https://github.com/overwire/agents).

## The feedback loop

The loop an agent should run, end to end, with no container engine required:

```sh
# 1. Scaffold (once)
overwire init

# 2. Author workflows and .overwire/ scenario files
#    (validate YAML against /schemas/<id>.schema.json as you write)

# 3. Static validation — parse, lint, expression analysis, config, chains
overwire validate --config-root .overwire --json

# 4. Execute and read the result envelope
overwire run .github/workflows/ci.yml --config-root .overwire -e push --json

# 5. Mine a successful run for mock contracts
overwire seed-mocks .github/workflows/ci.yml --out .overwire/mocks --from-run <run-id>
```

Each stage's output tells the agent what to do next: `validate` findings carry rule ids and fixes; the [`run:result` envelope](/cli/run/) carries per-step outcomes, modes, errors, and failure stderr tails plus the run-record path; unmatched API calls produce ready-to-copy suggestions in `.overwire/state/api-mocks.suggested.yml`.

## Mock-first iteration

Mock mode runs without Docker or network, so generated workflows can be exercised immediately and cheaply. Two habits keep generated workflows correct in both worlds:

- Mocked `run:` steps synthesize success with **empty outputs** — write expressions to tolerate that (`fromJSON(needs.x.outputs.y || '[]')`), which also makes them defensive upstream.
- Mocked `uses:` steps return their [mock contract's](/configuration/mocks/) declared outputs — seed contracts early so downstream expressions see realistic values.

## Simulating org controls

Governance is scenario input, which means an agent can stand up an entire simulated organization from files: org-level rulesets cascading over repositories ([governance](/configuration/governance/)), staged pull requests and external checks ([scenarios](/configuration/scenarios/)), [custom properties](/configuration/custom-properties/), protected [environments](/configuration/environments/), and [chains](/configuration/chains/) that walk a whole CI-to-deploy lifecycle. `overwire status --json` then reports merge prediction against those rules.

The [demo workspace](/getting-started/demo/) is a complete worked example with a verified command tour.

## What stays free

The CLI is free end to end — no command or flag is license-gated. Pro covers desktop GUI surfaces only (multi-repo workspaces, governance simulation, and pull request views).
