---
title: Workspaces and instances
description: How Overwire models repositories, owners, and multi-repo workspaces.
sidebar:
  order: 2
---

A workspace is the directory you open. It may contain a single repository or many peer repositories listed in `.overwire/instances.yml`. Each repository is an instance with an `owner/repo` identity derived from its `settings.yml` owner and folder name.

## Three roots

| Term | What it is |
| --- | --- |
| Workspace root | The directory you open. Owns `instances.yml`, the list of repositories. |
| Project root | One repository directory inside the workspace. Contains `.github/` and may have its own `.overwire/` for repo-scoped config. |
| Config root | A flat `.overwire/` directory, at the workspace root or inside a project. See [the config root](/concepts/config-root/). |

A single-repo setup is just the degenerate case: the workspace root and the project root are the same directory, and `instances.yml` has one entry whose relative path is `.`.

## Peers, not satellites

Every repository in `instances.yml` is an equal peer; there is no primary repository. Each entry stores the instance's full name and its path relative to the workspace root, so the whole workspace stays portable: clone the same directories on another machine and the file still resolves.

```yaml
- fullName: acme-corp/starter-app
  relativePath: starter-app
- fullName: acme-corp/enterprise-actions
  relativePath: enterprise-actions
```

[`overwire init --workspace`](/cli/init/) writes this file by auto-discovering child directories that contain a `.github/` or `.overwire/` tree, and the desktop app does the same when you open or initialize a parent directory. New repositories join via the **Add repository** action in the app sidebar, and re-opening a workspace picks up freshly cloned children automatically.

## Instance identity

The `owner` half comes from the project's `.overwire/settings.yml`; the `repo` half is the project folder's name. When no owner is configured or inferable from a git remote, it falls back to `local`. Identities are normalized so neither segment carries whitespace or embedded slashes, and every surface (CLI, engine, app) derives them the same way: the `--config-root` you pass to the CLI and the repository you click in the app agree on which instance they mean.

Identity matters because workflows reference repositories by full name: `uses: acme-corp/enterprise-actions/.github/workflows/build.yml@main` only resolves locally if some peer in the workspace *is* `acme-corp/enterprise-actions`.

## Cross-repo resolution

When a workflow references a reusable workflow or action in another repository, Overwire resolves the reference against workspace peers first and only then falls back to fetching from the remote. That makes the producer-consumer loop local: edit a reusable workflow in one repo, run its caller in another, and the change is live immediately, no push required.

In the app, peers also keep their editing state separate: tabs are keyed by instance and path, so `variables.yml` from two repositories open side by side without colliding.

For a ready-made multi-repo example, clone the [demo workspace](/getting-started/demo/) and open the `multi-repo-demo/` directory: four repositories across two fictional organizations, with cross-repo reusable workflows and org-level rulesets.
