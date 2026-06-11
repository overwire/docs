---
title: Configuration overview
description: "Every file in the .overwire/ config root and what it does."
sidebar:
  order: 1
  label: Overview
---

The config root is a flat `.overwire/` directory. Every file is plain YAML or JSON, diffable and scriptable. The desktop app edits these files directly; nothing lives in hidden app state.

| Path | Purpose |
| --- | --- |
| [`settings.yml`](/configuration/settings/) | Repository owner and Overwire settings. |
| [`variables.yml`](/configuration/variables/) | Repository variables resolved by `${{ vars.* }}`. |
| [`secrets.yml`](/configuration/secrets/) | Secret declarations, optionally with local-only values. |
| [`rulesets.json`](/configuration/governance/) | Branch rulesets in GitHub's native export format. |
| [`github/rulesets/*.json`](/configuration/governance/) | Additional exported rulesets. |
| [`modes/<workflow>.yml`](/configuration/modes/) | Workflow default mode and per-step overrides. |
| [`mocks/**/*.yml`](/configuration/mocks/) | Mock contracts for `uses:` steps. |
| [`payloads/<event>.json`](/configuration/payloads/) | Saved event payload overrides. |
| [`dispatch/<workflow>.yml`](/configuration/payloads/) | Saved `workflow_dispatch` input defaults. |
| [`pull-requests.yml`](/configuration/scenarios/) | Local pull request scenarios. |
| [`statuses.yml`](/configuration/scenarios/) | External commit statuses and check runs. |
| [`api-mocks.yml`](/configuration/api-mocks/) | Declarative GitHub API mock routes. |
| [`environments/`](/configuration/environments/) | Per-environment variables, secrets, and protection rules. |
| [`instances.yml`](/configuration/instances/) | Workspace peer list (workspace roots only). |
| [`state/`](/configuration/state-and-cache/) | Run-derived state. Local-only. |
| [`cache/`](/configuration/state-and-cache/) | Local workflow cache. Local-only. |
| `.gitignore` | Scaffolded by `overwire init`: ignores `secrets.yml`, `state/`, and `cache/`. |
