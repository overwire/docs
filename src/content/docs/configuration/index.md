---
title: Configuration reference
description: Every file in the .overwire/ config root and what it does.
---

The config root is a flat `.overwire/` directory. Every file is plain YAML or JSON, diffable and scriptable. Per-file reference pages are being written; this index covers the full layout.

| Path | Purpose |
| --- | --- |
| `settings.yml` | Repository owner and Overwire settings. |
| `variables.yml` | Repository variables resolved by `${{ vars.* }}`. |
| `secrets.yml` | Secret declarations. Entries can be declared without values, carry a literal local-only value, or use the full form with description and required flag. |
| `rulesets.json` | Branch rulesets in GitHub's native export format. |
| `github/rulesets/*.json` | Additional exported rulesets. |
| `modes/<workflow>.yml` | Workflow default mode and per-step overrides. |
| `mocks/**/*.yml` | Mock contracts for `uses:` steps. |
| `payloads/<event>.json` | Saved event payload overrides. |
| `dispatch/<workflow>.yml` | Saved `workflow_dispatch` input defaults. |
| `pull-requests.yml` | Local pull request scenarios. |
| `statuses.yml` | External commit statuses and check runs. |
| `api-mocks.yml` | Declarative GitHub API mock routes. |
| `environments/` | Environment variables, secrets, and protection rules. |
| `instances.yml` | Workspace peer list (workspace roots only). |
| `state/` | Run and session derived state. Local-only. |
| `cache/` | Local workflow cache. Local-only. |
| `.gitignore` | Scaffolded by `overwire init`: ignores `secrets.yml`, `state/`, and `cache/`. |
