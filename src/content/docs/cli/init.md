---
title: overwire init
description: "Scaffold a flat .overwire/ config tree."
---

Scaffolds the `.overwire/` config root: `settings.yml`, `variables.yml`, `secrets.yml`, the `modes/`, `mocks/`, and `payloads/` directories, and a `.gitignore` that keeps secret values and local run state out of git.

```sh
overwire init [options]
```

## Options

| Option | Description |
| --- | --- |
| `--owner <owner>` | Organization or user owning this repo. Inferred from the git remote if omitted; falls back to `local` when no remote owner is available. |
| `--config-root <dir>` | Root for the config tree, relative to cwd (default `.overwire`). |
| `--force` | Overwrite existing config files. Without it, re-running `init` is create-only and leaves your edits alone. |
| `--workspace` | Create a workspace-level `.overwire/` with auto-discovered child repos. Free from the CLI like every command; opening a multi-repo workspace in the desktop app requires [Pro](/cli/license/). |
| `--agents` | Also write the [AI agent guide](/cli/agents/) to `.overwire/AGENTS.md` (create-only). |
| `--json` | Output the scaffold report as JSON. |

## Workspace mode

`init --workspace` writes `instances.yml` at the workspace config root, listing every child directory that contains a `.github/` or `.overwire/` tree. Entries store relative paths, so the workspace stays portable across machines.

## Examples

```sh
# Single repo, owner from git remote
overwire init

# Explicit owner
overwire init --owner my-org

# Multi-repo workspace at the parent directory
overwire init --workspace
```

See [Initialize a project](/getting-started/initialize/) for the walkthrough.
