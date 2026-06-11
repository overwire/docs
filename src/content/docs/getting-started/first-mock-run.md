---
title: First mock run
description: Execute a workflow locally with every step mocked. No container engine required.
sidebar:
  order: 3
---

Mock is Overwire's default mode. A mock run parses your workflow, evaluates triggers and expressions against a simulated event, schedules jobs in dependency order, and synthesizes step outputs from mock contracts. No container engine is required.

## Run a workflow

```sh
overwire run .github/workflows/ci.yml
```

By default this simulates a `push` event. Pick another event with `--event`:

```sh
overwire run --workflow ci --event pull_request
```

`--workflow` selects by name, file name, stem, or repo-relative path, so you rarely need the full path.

## Seed mock contracts

Third-party actions mock best with a contract describing their inputs and outputs. Generate one for every `uses:` reference in a workflow:

```sh
overwire seed-mocks .github/workflows/ci.yml
```

Contracts land in `.overwire/mocks/` as YAML you can edit. Overwire resolves each action's real `action.yml` to validate required inputs, then returns the declared outputs at run time.

## What you get

The run prints each job and step with its outcome, and the full record persists to the run store so `overwire history` and the desktop app can show it later. Failures from missing required inputs or undefined secrets surface in pre-run validation before anything executes.

## Next step

Execute real steps in a container: [first live run](/getting-started/first-live-run/).
