---
title: state/ and cache/
description: "Run-derived state and the local workflow cache. Local-only."
sidebar:
  order: 13
---

Both directories are written by runs, ignored by the scaffolded `.gitignore`, and safe to delete.

## `state/`

Repo-visible state derived from runs:

| Path | Contents |
| --- | --- |
| `state/api-requests.json` | Captured API requests that matched no mock route. |
| `state/api-mocks.suggested.yml` | Suggested mock routes generated from captures, ready to move into `api-mocks.yml`. |
| Session, status, and artifact files | Chain session records, status check facts, and artifact state that commands like `overwire status` and `overwire chain show` read back. |

`state/` lives in the repo (rather than the machine-level cache) so that scenario tooling can see it next to the config that produced it, while staying out of version control.

## `cache/`

Local `actions/cache` entries when the project is configured to use the project cache (`run --workflow-cache-dir` defaults here when `--config-root` is set). Delete freely; workflows repopulate it.

Machine-level caches (action sources, tool cache, run store) live under `~/.cache/overwire/` instead. See [Directory layout](/platform/directory-layout/).
