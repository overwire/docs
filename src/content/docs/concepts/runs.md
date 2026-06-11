---
title: Runs and the run store
description: Every run persists as a self-contained record you can inspect, compare, and re-run from.
sidebar:
  order: 6
---

Every run writes a self-contained record to the run store under `~/.cache/overwire/runs/`. Run records power `overwire history`, the desktop app's History page, run comparison, and re-running failed jobs or individual steps.

This page is being written. It will cover:

- What a run record contains: job and step outcomes, outputs, logs, diagnostics.
- Repo-visible state under `.overwire/state/` (API captures, sessions, artifacts).
- Re-run failed jobs and re-run from step.
- Run retention.
