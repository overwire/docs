---
title: Runs and the run store
description: Every run persists as a self-contained record you can inspect, compare, and re-run from.
---

Every run writes a self-contained record to the run store under `~/.cache/overwire/runs/`. Run records power `overwire history`, the desktop app's History page, run comparison, and re-running failed jobs or individual steps.

## What a record contains

Records live at `~/.cache/overwire/runs/<owner>/<repo>/<run-id>/` and hold everything needed to understand the run after the fact: the triggering event, per-job and per-step outcomes with durations, step outputs, logs, step summaries, and diagnostics such as missing tools or runtime fallbacks. A record is independent of the repository checkout, so it survives branch switches and clean clones.

Facts about a run accumulate in its record rather than scattering into per-feature files: artifacts, check conclusions, and API activity all reference the run they belong to.

## Repo-visible state

Some run by-products are inputs to *later* runs, so they live with the repository instead, under `.overwire/state/`: API request captures and suggested mock routes, session state for [workflow chains](/cli/chain/), recorded status checks, and artifact indexes. The [state and cache reference](/configuration/state-and-cache/) breaks the directory down. This split keeps the run store append-only history while `.overwire/state/` reflects the repository's current simulated platform state.

## Re-running from a record

Because records capture outcomes and outputs, they can stand in for execution:

- **Re-run failed jobs** re-executes only the failed or cancelled jobs and their dependents; jobs that succeeded are restored from the record, including their outputs, so `needs:` contexts resolve without re-running anything that already passed. Available as [`overwire run --rerun-failed <run-id>`](/cli/run/) and a button on the run summary in the app.
- **Re-run from step** restores every step before the selected one inside a job and resumes execution there, from the step detail view in the app.

The History page also diffs two runs of the same workflow: step outcomes, modes, outputs, and durations side by side.

## Retention

The store prunes itself with a policy mirroring the platform default: records older than 90 days are removed, with a cap of 200 runs per repository as a local sanity bound. [`overwire history`](/cli/history/) lists what is currently retained; the app's **Recent runs to keep** setting separately caps the quick lists in the UI without touching the store.
