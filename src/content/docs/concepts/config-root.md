---
title: The config root
description: The flat .overwire/ directory is the source of truth for everything Overwire knows about a repository.
---

Config files are a source of truth, not a UI dump. Everything Overwire knows about a repository lives as plain files under a flat `.overwire/` directory: variables, secret declarations, step modes, mock contracts, payloads, rulesets, PR scenarios, and API mocks. The desktop app edits these files; it does not maintain a parallel store.

That principle has practical consequences. Config is diffable in code review, scriptable from the shell, editable in any editor, and identical for the CLI and the app. If you change a mode in the app, `git diff` shows it; if a script writes a payload file, the app picks it up.

## Layout

The config root sits next to your `.github/` tree:

| Path | Contents |
| --- | --- |
| `settings.yml` | Owner and Overwire settings |
| `variables.yml` | Repository variables |
| `secrets.yml` | Secret declarations, optionally with local-only values |
| `rulesets.json`, `github/rulesets/` | Branch rulesets in native export format |
| `modes/` | Workflow default and per-step mode overrides |
| `mocks/` | Mock contracts |
| `payloads/` | Saved event payloads |
| `dispatch/` | Saved `workflow_dispatch` input defaults |
| `pull-requests.yml`, `statuses.yml` | Platform scenario inputs |
| `api-mocks.yml` | Declarative API mock routes |
| `environments/` | Environment variables, secrets, and protection rules |
| `instances.yml` | Workspace peer list, when this root belongs to a workspace |
| `state/` | Run-written session, API, and artifact state |
| `cache/` | Local workflow and action cache, when configured |

The [configuration reference](/configuration/) documents every file's schema.

## Committable vs. local-only

Most of the config root belongs in git: modes, mocks, payloads, variables, rulesets, and scenarios are team-shareable test setup. [`overwire init`](/cli/init/) scaffolds a `.overwire/.gitignore` that keeps the rest out: `secrets.yml` (it may carry literal values), `state/`, and `cache/`. Secret values never belong upstream; the [secrets page](/configuration/secrets/) covers the hygiene checks that back this up.

## How the CLI finds it

Commands take `--config-root <dir>` and default to `./.overwire`. When the path points at a directory named `.overwire`, its parent is the project root, so this resolves identity and workflows for the right repository no matter where you run from:

```sh
overwire run ci.yml --config-root ~/code/some-repo/.overwire
```

The CLI and the app agree on this rule, so a config root means the same repository everywhere.
