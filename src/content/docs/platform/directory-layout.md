---
title: Directory layout
description: Where Overwire reads and writes on your machine, and what is safe to delete.
---

Overwire separates committable project config from local machine state. This page maps every location it touches.

## In your repository

| Path | What it is | Committable |
| --- | --- | --- |
| `.github/workflows/*.yml` | Your workflow files. Overwire reads them; it never modifies them. | Yes (yours) |
| `.overwire/` | The config root: settings, variables, modes, mocks, payloads, scenario files. | Yes |
| `.overwire/secrets.yml` | Secret declarations, optionally with local values. | No (ignored by the scaffolded `.gitignore`) |
| `.overwire/state/` | Run-derived state: API captures, sessions, status checks, suggestions. | No (ignored) |
| `.overwire/cache/` | Local workflow cache entries when configured to use the project cache. | No (ignored) |

## On your machine (macOS)

| Path | What it is |
| --- | --- |
| `~/.cache/overwire/runs/<owner>/<repo>/<run-id>/` | The run store. Every run persists a self-contained record here. |
| `~/.cache/overwire/actions/` | Cached action sources fetched for live runs. |
| `~/.cache/overwire/tool-cache/` | Persisted runner tool cache, mounted as `RUNNER_TOOL_CACHE` across runs. |
| `~/.cache/overwire/concurrency/` | Cross-process concurrency lock files. |
| `~/Library/Application Support/Overwire/` | Desktop app state: window layout, recent projects, theme, runner image settings. |

The Windows layout will be documented when that build ships.

## What is safe to delete

Everything under `~/.cache/overwire/` is rebuildable: deleting it loses run history and forces action re-fetching and tool re-installation, but breaks nothing. `overwire cache` inspects and clears the action and tool caches without manual deletion.

## Containers

Live runs require a Docker-API-compatible container engine (e.g., Docker Desktop, Colima, OrbStack, Rancher Desktop). Overwire connects to the engine's socket and manages its own runner containers and the `overwireio/runner` image. It never bundles or installs a container engine.
