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

## CLI and Pro

For what a license covers, plans, activation limits, and refunds, see [Licensing and purchases](/concepts/licensing/). The CLI is free end to end — no command or flag checks a license. Pro covers desktop GUI surfaces only: multi-repo workspaces, governance simulation (rulesets, organization settings, custom properties, statuses), and pull request views. Since the CLI and the desktop app share one license file, activating on either covers both.

```sh
overwire license activate <key-from-purchase-email>
overwire license status --json
```
