---
title: overwire license
description: "Manage the Overwire Pro license shared with the desktop app."
sidebar:
  order: 19
---

Manages the Overwire Pro license on this machine. The CLI and the desktop app share one license file, so activating on either covers both.

```sh
overwire license <command>
```

## Commands

| Command | Description |
| --- | --- |
| `status [--json]` | Show the current tier, trial, and license state. |
| `activate <key>` | Activate a license key on this machine. |
| `validate` | Re-check the active license against the licensing server. |
| `deactivate` | Deactivate this machine and free the activation slot. |

## What requires Pro in the CLI

Plain runs, validation, mocks, schemas, and chains never check a license. Three flags do:

- [`run --watch`](/cli/run/) — re-run on file changes.
- [`run --rerun-failed <run-id>`](/cli/run/) — selective re-runs.
- [`init --workspace`](/cli/init/) when auto-discovery finds two or more repositories. Single-repo workspaces, and running against an existing multi-repo workspace, stay free.

A 7-day full-Pro trial starts the first time a gated flag (or this command) is used. Gating is offline-safe: status comes from the locally cached state, with a 14-day grace window when the licensing server is unreachable. A gated command on the free tier exits with code `2` and an actionable message.

```sh
overwire license activate <key-from-purchase-email>
overwire license status --json
```
