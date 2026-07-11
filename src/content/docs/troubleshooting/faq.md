---
title: FAQ
description: Frequently asked questions about Overwire.
---

## Does Overwire need Docker?

Only for live step execution, and it requires a Docker-API-compatible container engine rather than Docker specifically: Docker Desktop, Colima, OrbStack, and Rancher Desktop all work. Parsing, linting, simulation, and fully mocked runs need no container engine at all.

## Does Overwire modify my workflow files?

No. Workflow YAML and `action.yml` files are read-only to Overwire. Step modes, mock contracts, and every other piece of Overwire state live in sidecar files under `.overwire/`.

## How accurate is local execution?

Matching real GitHub Actions semantics is the core engineering requirement: events, contexts, expressions, step ordering, and status behavior are implemented against the platform's documented behavior, and drift is treated as a bug. Where something is not supported, Overwire says so explicitly rather than approximating silently.

## Do my secrets leave my machine?

No. Secret values resolve from `.overwire/secrets.yml` or your environment, stay local, and are excluded from git by the scaffolded ignore rules. Step output capture is redacted by default, even in live mode.

## Purchasing

### What does Pro cost, and what does it include?

Current prices are on [overwire.io](https://overwire.io/#pricing) — monthly, yearly, or a one-time lifetime purchase. Pro unlocks the desktop app's multi-repo workspaces, governance simulation, and pull request views; everything else, including the entire CLI, is free. Details: [Licensing and purchases](/concepts/licensing/).

### Do I pay for updates?

No. Subscriptions include updates while active, and a lifetime license includes every future update we release — there is no update window and no renewal.

### How many machines can I use?

A seat covers **3 device activations** at a time — laptop, desktop, and a spare for reinstalls.

### How do I move my license to a new machine?

Deactivate on the old machine (Settings → License, or `overwire license deactivate`) to free the slot, then activate on the new one. If the old machine is gone, [contact@overwire.io](mailto:contact@overwire.io) can help.

### What is the refund policy?

14 days, no questions, on your first purchase; renewal charges may be refunded at our discretion within 14 days of the charge. The [terms](https://overwire.io/terms) are authoritative.

### Is there a Windows version?

Yes. Overwire ships a signed installer for 64-bit Windows — [download it from overwire.io](https://overwire.io/#download). For live runs, the container engine runs on WSL 2 (e.g., Docker Desktop with its WSL 2 backend).

### How do I report a bug or request a feature?

File it at [github.com/overwire/feedback](https://github.com/overwire/feedback) — attaching a diagnostic bundle (app: Settings → Data, or Help → Export Diagnostic Bundle; CLI: `overwire doctor --bundle`) answers most environment questions in one shot. The bundle is redacted: names and sizes only, no file contents, no secrets. License, billing, or refund questions go to [contact@overwire.io](mailto:contact@overwire.io) instead.

## Is Overwire affiliated with GitHub?

<!-- Canonical disclaimer — must match the overwire.io footer exactly. -->
No. Overwire is compatible with GitHub Actions workflow files. Overwire is not affiliated with, endorsed by, or sponsored by GitHub, Inc. "GitHub" and "GitHub Actions" are trademarks of GitHub, Inc.
